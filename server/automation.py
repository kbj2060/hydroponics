from json.decoder import JSONDecodeError
import pymysql
import time
import datetime
import paho.mqtt.client as mqtt
import json
import socketio
import requests
import os

# TODO [SERVER CHANGE] : Change Directory
#os.chdir("/home/pi/hydroponics/")
os.chdir("../")
with open('values/strings.json', "rt", encoding='UTF8') as string_json:
    strings = json.load(string_json)
    WordsTable = strings['WordsTable']

with open('values/defaults.json', "rt", encoding='UTF8') as default_json:
    defaults = json.load(default_json)
    DEFAULT_SETTING = defaults['auto']
    DEFAULT_ENV = defaults['environments']
    DEFAULT_SWITCHES = defaults['switches']
    DEFAULT_SECTIONS = defaults['sections']

with open('values/db_conf.json', "rt", encoding='UTF8') as db_conf:
    conf = json.load(db_conf)
    DB_HOST = conf['host']
    DB_USER = conf['user']
    DB_PW = conf['password']

with open('values/telegram_conf.json', "rt", encoding='UTF8') as tg_conf:
    telegram_conf = json.load(tg_conf)
    token = telegram_conf['token']
    chat_id = telegram_conf['chat_id']

with open('values/preferences.json', "rt", encoding='UTF8') as pref_json:
    preference = json.load(pref_json)
    SOCKET_PORT = preference['SOCKET_PORT']
    SOCKET_HOST = preference['SOCKET_HOST']
    MQTT_PORT = int(preference['MQTT_PORT'])
    MQTT_HOST = preference['MQTT_BROKER']
    CLIENT_ID = preference['CLIENT_ID']
    LED_TOPIC = preference['LED_TOPIC']
    HEATER_TOPIC = preference['HEATER_TOPIC']
    COOLER_TOPIC = preference['COOLER_TOPIC']
    FAN_TOPIC = preference['FAN_TOPIC']
    WT_TOPIC = preference['WT_TOPIC']

min_index, max_index = 0, 1


class MQTT():
    def on_connect(self, client, userdata, flags, rc):
        """

        :param client:
        :param userdata:
        :param flags:
        :param rc:
        """
        if rc == 0:
            print("MQTT connected")
        else:
            print("Bad connection Returned code=", rc)

    def on_disconnect(self, client, userdata, flags, rc=0):
        """

        :param client:
        :param userdata:
        :param flags:
        :param rc:
        """
        print("MQTT Disconnected")
        print("-----------------------------------------------------")

    def on_publish(self, client, userdata, mid):
        print("In on_pub callback mid= ", mid)


def check_machine_on(machine_power):
    """

    :param machine_power:
    :return:
    """
    return machine_power == 1


class Automagic(MQTT):
    """

    """
    def __init__(self):
        self.auto = DEFAULT_SETTING
        self.environments = DEFAULT_ENV
        self.switches = DEFAULT_SWITCHES
        self.sections = DEFAULT_SECTIONS

        self.conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PW, charset='utf8')
        self.cursor = self.conn.cursor()

        self.client = mqtt.Client(client_id=CLIENT_ID)
        self.client.on_connect = self.on_connect
        self.client.on_disconnect = self.on_disconnect
        self.client.on_publish = self.on_publish
        self.client.connect(MQTT_HOST, MQTT_PORT, keepalive=60)
        # self.client.loop_start()

        self.sio = socketio.Client()
        self.sio.connect(f"http://{SOCKET_HOST}:{SOCKET_PORT}")

        self.fetch_switches()
        self.fetch_auto()
        self.fetch_environments_mean()
        
        #임시작업
        self.fetch_environments_main()

    def make_topic(self, machine):
        """

        :param machine:
        :return:
        """
        return f"switch/{machine}"

    def make_environments_sql(self):
        """

        :return:
        """
        sqls = []
        selects = ",".join(list(self.environments.keys()))
        for section in self.sections:
            sqls.append(f"(SELECT {selects} FROM iot.env WHERE section = \"{section}\" ORDER BY id DESC LIMIT 1)")
        return " UNION ALL ".join(sqls)

    def make_machine_sql(self):
        """

        :return:
        """
        sqls = []
        for machine in self.switches.keys():
            sqls.append(
                f"(SELECT machine, status FROM iot.switch WHERE machine = \"{machine}\" ORDER BY id DESC LIMIT 1)")
        return " UNION ALL ".join(sqls)

    def fetch_environments_mean(self):
        """

        """
        try:
            sql = self.make_environments_sql()
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            mean_fetch = [sum(ele) / len(fetch) for ele in zip(*fetch)]
            for (index, key) in enumerate(self.environments.keys()):
                self.environments[key] = mean_fetch[index]
        except:
            self.environments = {"temperature": 0, "humidity": 0, "co2": 0}

    def fetch_environments_main(self):
        try:
            sql = f"SELECT temperature FROM iot.env WHERE section = \"s1-2\" ORDER BY id DESC LIMIT 1"
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            self.environments['temperature'] = fetch[0][0]
            print(self.environments['temperature'])
        except:
            self.environments = {"temperature" : 0, "humidity":0, "co2":0}

    def make_setting_sql(self):
        """

        :return:
        """
        sqls = []
        for setting in self.auto.keys():
            sqls.append(
                f"(SELECT item, enable, duration FROM iot.auto WHERE item = \"{setting}\" ORDER BY id DESC LIMIT 1)")
        return " UNION ALL ".join(sqls)

    def fetch_auto(self):
        """

        """
        try:
            res_dic = {}
            sql = self.make_setting_sql()
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            for setting in fetch:
                dic = json.loads(setting[2])
                dic['enable'] = setting[1] == 1
                res_dic[setting[0]] = dic
            self.auto = res_dic
        except JSONDecodeError:
            print("Please, set the auto settings through dashboard page.")
            self.auto = DEFAULT_SETTING

    def fetch_switches(self):
        """

        """
        try:
            sql = self.make_machine_sql()
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            for row in fetch:
                machine = row[0]
                self.switches[machine] = row[1]
        except:
            self.switches = {"heater": 0, "cooler": 0, "led": 0, "fan": 0, "waterpump": 0}

    # TODO : Section Field needs to be changed!
    # TODO : FETCH 값들이 비어있을 경우, 출력 메세지 띄울 것.
    def insert_database(self, machine, status):
        """

        :param machine:
        :param status:
        """
        name = "Auto"
        sql = f"INSERT INTO iot.switch VALUES (null,\"s1\", \"{machine}\", {status}, \"{name}\", now(), 0)"
        self.cursor.execute(sql)

    def check_temp_condition(self, ac_type):
        """

        :param ac_type:
        :return:
        """
        current_value = self.environments['temperature']
        _min = self.auto[ac_type]['range'][min_index]
        _max = self.auto[ac_type]['range'][max_index]
        if ac_type == "heater":
            if current_value > _max:
                return False
            elif current_value < _min:
                return True
            else:
                return None
        elif ac_type == "cooler":
            if current_value < _min:
                return False
            elif current_value > _max:
                return True
            else:
                return None

    def get_opposite_ac(self, ac_type):
        return "cooler" if ac_type == "heater" else "heater"

    def telegram_post_text(self, text):
        telegram_url = f"https://api.telegram.org/bot{token}/sendMessage"
        data = {"chat_id": chat_id, "text": text}
        x = requests.post(telegram_url, json=data)

    def emit_switch_socket(self, machine, status):
        self.sio.emit('sendSwitchControl', {"machine": machine, "status": status})

    def temp_control(self, ac_type):
        opposite_ac_type = self.get_opposite_ac(ac_type)
        ac_topic = self.make_topic(ac_type)
        ac_status = self.switches[ac_type]
        auto_switch = self.auto[ac_type]['enable']
        _min = self.auto[ac_type]['range'][min_index]
        _max = self.auto[ac_type]['range'][max_index]
        temperature_condition = self.check_temp_condition(ac_type)
        machine_power = check_machine_on(ac_status)
        off, on = 0, 1
        ko_ac_type = WordsTable[ac_type]

        if not auto_switch:
            print('AirConditioner Auto Switch Disabled')

        elif temperature_condition is None:
            print(f'{ac_type} Do Nothing.')

        elif not machine_power and temperature_condition:
            if check_machine_on(opposite_ac_type):
                self.emit_switch_socket(opposite_ac_type, False)
                self.insert_database(machine=opposite_ac_type, status=off)

            print(f"AirConditioner {ac_type} ON")
            self.telegram_post_text(f"자동화에 의해 {ko_ac_type}이 켜졌습니다.")
            self.emit_switch_socket(ac_type, True)
            self.insert_database(machine=ac_type, status=on)
            self.client.publish(ac_topic, on)

        elif machine_power and not temperature_condition:
            print(f"AirConditioner {ac_type} OFF")
            self.emit_switch_socket(ac_type, False)
            self.telegram_post_text(f"자동화에 의해 {ko_ac_type}이 꺼졌습니다.")
            self.insert_database(machine=ac_type, status=off)
            self.client.publish(ac_topic, off)

        else:
            print(f'{ac_type} Do Nothing.')

    def check_led_valid_hour(self, current_hour):
        return self.auto['led']['range'][min_index] <= current_hour < self.auto['led']['range'][max_index]

    def led_control(self):
        topic = self.make_topic('led')
        current_hour = int(time.strftime('%H', time.localtime(time.time())))
        auto_switch = self.auto['led']['enable']
        led_status = self.switches['led']
        off, on = 0, 1

        if not auto_switch:
            print('LED Auto Switch Disabled')

        elif self.check_led_valid_hour(current_hour) and not check_machine_on(led_status):
            print("LED ON")
            self.emit_switch_socket("led", True)
            self.telegram_post_text(f"자동화에 의해 조명이 켜졌습니다.")
            self.insert_database(machine="led", status=on)
            self.client.publish(topic, on)

        elif not self.check_led_valid_hour(current_hour) and check_machine_on(led_status):
            print("LED OFF")
            self.emit_switch_socket("led", False)
            self.telegram_post_text(f"자동화에 의해 조명이 꺼졌습니다.")
            self.insert_database(machine="led", status=off)
            self.client.publish(topic, off)

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
            return fetch
        # No Auto Data. make last_on_diff 0.
        except IndexError:
            return datetime.datetime.now()

    def check_right_term(self, cycle_machine):
        current_day = datetime.datetime.now()
        last_on_day = self.get_last_auto_day(cycle_machine)
        last_on_diff = (current_day - last_on_day).days
        if last_on_diff >= self.auto[cycle_machine]['term'] or last_on_diff == 0:
            return True
        else:
            return False

    def check_right_hour(self, cycle_machine):
        current_time = int(time.strftime('%H', time.localtime(time.time())))

        for start, end in zip(self.auto[cycle_machine]['start'], self.auto[cycle_machine]['end']):
            int_start, int_end = self.get_int_hour(start), self.get_int_hour(end)
            if int_end == 0:
                int_end = 24
            if int_start <= current_time < int_end:
                return True
        return False

    def get_int_hour(self, hour_and_minute):
        return int(hour_and_minute.split(':')[0])

    def cycle_control(self, cycle_machine):
        auto_switch = self.auto[cycle_machine]['enable']
        topic = self.make_topic(cycle_machine)
        status = self.switches[cycle_machine]
        off, on = 0, 1

        if not auto_switch:
            print(f"{cycle_machine} Auto Switch Disabled")

        elif not check_machine_on(status) and (
                self.check_right_term(cycle_machine) and self.check_right_hour(cycle_machine)):

            print(f"{cycle_machine} ON")
            self.emit_switch_socket(cycle_machine, True)
            self.telegram_post_text(f"자동화에 의해 {WordsTable[cycle_machine]}이 켜졌습니다.")
            self.insert_database(machine=cycle_machine, status=on)
            self.client.publish(topic, on)

        elif check_machine_on(status) and not (
                self.check_right_term(cycle_machine) and self.check_right_hour(cycle_machine)):

            print(f"{cycle_machine} OFF")
            self.emit_switch_socket(cycle_machine, False)
            self.telegram_post_text(f"자동화에 의해 {WordsTable[cycle_machine]}이 꺼졌습니다.")
            self.insert_database(machine=cycle_machine, status=off)
            self.client.publish(topic, off)

        else:
            print(f"{cycle_machine} Do Nothing.")

    def finish_automagic(self):
        self.conn.commit()
        self.conn.close()
        self.client.disconnect()
        self.sio.disconnect()


auto = Automagic()
print(datetime.datetime.now())
print(auto.switches)
print(auto.environments)
auto.led_control()
auto.temp_control("heater")
auto.temp_control("cooler")
auto.cycle_control('fan')
auto.cycle_control('waterpump')
auto.finish_automagic()
