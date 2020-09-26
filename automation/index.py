from json.decoder import JSONDecodeError
import pymysql
import time
import datetime
import paho.mqtt.client as mqtt
import json
import os
import socketio

default_setting = dict(fan={
    "start": [], "end": [], "term": 1, "enable": False
}, waterpump={
    "start": [], "end": [], "term": 1, "enable": False
}, temperature={
    "range": [10, 40], "enable": False
}, led={
    "range": [0, 23], "enable": False
})

# SERVER CHANGE:
# os.chdir("/home/server/hydroponics/")
# with open("server/db_conf.json") as json_file:
with open("../server/db_conf.json") as json_file:
    conf = json.load(json_file)

host = conf['host']
user = conf['user']
password = conf['password']

SOCKET_PORT = 9000
SOCKET_HOST = "localhost"

MQTT_PORT = 1883
#MQTT_HOST = "192.168.0.3"
MQTT_HOST = "localhost"
CLIENT_ID = 'Auto'

min_index, max_index = 0, 1

LED_TOPIC = "switch/led"
HEATER_TOPIC = "switch/heater"
COOLER_TOPIC = "switch/cooler"
FAN_TOPIC = "switch/fan"
WT_TOPIC = "switch/waterpump"


class MQTT():
    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("connected OK")
        else:
            print("Bad connection Returned code=", rc)

    def on_disconnect(self, client, userdata, flags, rc=0):
        print(str(rc))

    def on_publish(self, client, userdata, mid):
        print("In on_pub callback mid= ", mid)


class Automagic(MQTT):
    def __init__(self):
        self.settings = {"waterpump": {}, "temperature": {}, "fan": {}, "led": {}}
        self.environments = {"temperature": 0, "humidity": 0, "co2": 0}
        self.machines = {"heater": 0, "cooler":0, "led": 0, "fan": 0, "waterpump": 0}
        self.sections = ['1', '2', '3']

        self.conn = pymysql.connect(host=host, user=user, password=password, charset='utf8')
        self.cursor = self.conn.cursor()

        self.client = mqtt.Client(client_id=CLIENT_ID)
        self.client.on_connect = self.on_connect
        self.client.on_disconnect = self.on_disconnect
        self.client.on_publish = self.on_publish
        self.client.connect(MQTT_HOST, MQTT_PORT)
        self.client.loop_start()

        self.sio = socketio.Client()
        self.sio.connect(f'http://{SOCKET_HOST}:{SOCKET_PORT}')
        self.fetch_machines()
        self.fetch_settings()
        self.fetch_environments_mean()

    def make_topic(self, machine):
        return f"switch/{machine}"

    def make_environments_sql(self):
        sqls = []
        selects = ",".join(list(self.environments.keys()))
        for section in self.sections:
            sqls.append(f"(SELECT {selects} FROM iot.env WHERE section = \"{section}\" ORDER BY id DESC LIMIT 1)")
        return " UNION ALL ".join(sqls)

    def make_machine_sql(self):
        sqls = []
        for machine in self.machines.keys():
            sqls.append(f"(SELECT machine, status  FROM iot.switch WHERE machine = \"{machine}\" ORDER BY id DESC LIMIT 1)")
        return " UNION ALL ".join(sqls)

    def fetch_environments_mean(self):
        try:
            sql = self.make_environments_sql()
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            mean_fetch = [sum(ele) / len(fetch) for ele in zip(*fetch)]
            for (index, key) in enumerate(self.environments.keys()):
                self.environments[key] = mean_fetch[index]
        except:
            self.environments = {"temperature": 0, "humidity": 0, "co2": 0}

    def fetch_settings(self):
        try:
            # server :
            # with open("automation/automation_setting.json") as _json:
            with open("../automation/automation_setting.json") as _json:
                self.settings = json.load(_json)
                print(json.dumps(self.settings, indent=4, sort_keys=True))
        except JSONDecodeError:
            print("Please, set the auto settings through dashboard page.")
            self.settings = default_setting

    def fetch_machines(self):
        try:
            sql = self.make_machine_sql()
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            for row in fetch:
                machine = row[0]
                self.machines[machine] = row[1]
        except:
            self.machines = {"heater": 0, "cooler": 0, "led": 0, "fan": 0, "waterpump": 0}

    def insert_database(self, machine, status):
        name = "Auto"
        sql = f"INSERT INTO iot.switch VALUES (null, \"{machine}\", {status}, \"{name}\", now(), 0)"
        self.cursor.execute(sql)

    @staticmethod
    def check_cooler_on(machine_power):
        return machine_power == 1

    @staticmethod
    def check_heater_on(machine_power):
        return machine_power == 1

    def check_temperature(self, upper, lower):
        return lower < upper

    def temp_control(self):
        heater_topic = self.make_topic('heater')
        cooler_topic = self.make_topic('cooler')
        current_value = self.environments['temperature']
        heater_status = self.machines['heater']
        cooler_status = self.machines['cooler']
        auto_switch = self.settings['temperature']['enable']
        off, on = 0, 1

        _min = self.settings['temperature']['range'][min_index]
        _max = self.settings['temperature']['range'][max_index]
        heater_off_limit = _min + (_max - _min) * (1 / 4)
        cooler_off_limit = _min + (_max - _min) * (3 / 4)

        if not auto_switch:
            print('AirConditioner Auto Switch Disabled')

        # 난방
        elif not self.check_heater_on(heater_status) and self.check_temperature(upper=_min,
                                                                                lower=current_value):

            if self.check_cooler_on(cooler_status):
                self.sio.emit('sendSwitchControl', {"machine": 'cooler', "status": False})

            print("AirConditioner Heater ON")
            self.insert_database(machine="heater", status=on)
            self.client.publish(heater_topic, on, qos=2)

        # 냉방
        elif not self.check_cooler_on(cooler_status) and self.check_temperature(upper=current_value,
                                                                                lower=_max):
            if self.check_heater_on(heater_status):
                self.sio.emit('sendSwitchControl', {"machine": 'heater', "status": False})

            print("AirConditioner Cooler ON")
            self.insert_database(machine="cooler", status=on)
            self.client.publish(cooler_topic, on, qos=2)

        elif self.check_heater_on(heater_status) and self.check_temperature(upper=current_value,
                                                                            lower=heater_off_limit):
            print("AirConditioner Heater OFF")
            self.insert_database(machine="heater", status=off)
            self.client.publish(heater_topic, off, qos=2)

        elif self.check_cooler_on(cooler_status) and self.check_temperature(upper=cooler_off_limit,
                                                                            lower=current_value):
            print("AirConditioner Cooler OFF")
            self.insert_database(machine="cooler", status=off)
            self.client.publish(cooler_topic, off, qos=2)

        else:
            print('AirConditioner Do Nothing.')

    @staticmethod
    def check_power_on(machine_power):
        return machine_power != 0

    def check_led_valid_hour(self, current_hour):
        return self.settings['led']['range'][min_index] <= current_hour < self.settings['led']['range'][max_index]

    def led_control(self):
        topic = self.make_topic('led')
        current_hour = int(time.strftime('%H', time.localtime(time.time())))
        auto_switch = self.settings['led']['enable']
        led_status = self.machines['led']
        off, on = 0, 1

        if not auto_switch:
            print('LED Auto Switch Disabled')

        elif self.check_led_valid_hour(current_hour) and not self.check_power_on(led_status):
            print("LED ON")
            self.insert_database(machine="led", status=on)
            self.client.publish(topic, on, qos=2)

        elif not self.check_led_valid_hour(current_hour) and self.check_power_on(led_status):
            print("LED OFF")
            self.insert_database(machine="led", status=off)
            self.client.publish(topic, off, qos=2)

        else:
            print('LED Do Nothing.')

    def make_last_auto_switch_sql(self, machine):
        return f"SELECT created FROM iot.switch WHERE controlledBy = \"Auto\" and machine = \"{machine}\" and status = 1 ORDER BY id DESC LIMIT 1"

    #   TODO : 처음 자동화할 경우, 이전 자동 데이터로 하는 방법으로는 불가능.
    def get_last_auto_day(self, machine):
        try:
            sql = self.make_last_auto_switch_sql(machine)
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()[0][0]
            return fetch.day
        # No Auto Data. make last_on_diff 0.
        except IndexError:
            return int(time.strftime('%d', time.localtime(time.time())))

    def check_right_term(self, cycle_machine):
        current_day = int(time.strftime('%d', time.localtime(time.time())))
        last_on_day = int(self.get_last_auto_day(cycle_machine))
        last_on_diff = current_day - last_on_day

        if last_on_diff == self.settings[cycle_machine]['term'] or last_on_diff == 0:
            return True
        else:
            return False

    def check_right_hour(self, cycle_machine):
        current_time = int(time.strftime('%H', time.localtime(time.time())))

        for start, end in zip(self.settings[cycle_machine]['start'], self.settings[cycle_machine]['end']):
            int_start, int_end = self.get_int_hour(start), self.get_int_hour(end)
            if int_end == 0:
                int_end = 24
            if int_start <= current_time < int_end:
                return True
        return False

    def get_int_hour(self, hour_and_minute):
        return int(hour_and_minute.split(':')[0])

    def cycle_control(self, cycle_machine):
        auto_switch = self.settings[cycle_machine]['enable']
        topic = self.make_topic(cycle_machine)
        status = self.machines[cycle_machine]
        off, on = 0, 1

        if not auto_switch:
            print(f"{cycle_machine} Auto Switch Disabled")

        elif not self.check_power_on(status) and (self.check_right_term(cycle_machine) and self.check_right_hour(cycle_machine)):
            print(f"{cycle_machine} ON")
            self.insert_database(machine=cycle_machine, status=on)
            self.client.publish(topic, on, qos=2)

        elif self.check_power_on(status) and not (self.check_right_term(cycle_machine) and self.check_right_hour(cycle_machine)):
            print(f"{cycle_machine} OFF")
            self.insert_database(machine=cycle_machine, status=off)
            self.client.publish(topic, off, qos=2)

        else:
            print(f"{cycle_machine} Do Nothing.")


    def finish_automagic(self):
        self.conn.commit()
        self.conn.close()
        self.client.disconnect()
        self.sio.disconnect()


auto = Automagic()
print(datetime.datetime.now())
print(auto.machines)
auto.led_control()
auto.temp_control()
auto.cycle_control('fan')
auto.cycle_control('waterpump')
print()
auto.finish_automagic()
