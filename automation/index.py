import pymysql
from numpy import mean
import time
import paho.mqtt.client as mqtt

host = 'localhost'
user = 'root'
password = 'dnjfem2006'
settings_path = './settings.json'
environments_path = './environments.json'
MQTT_PORT = 1883
min_index, max_index = 0, 1
client_id = 'Auto'

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
        self.conn = pymysql.connect(host=host, user=user, password=password, charset='utf8')
        self.cursor = self.conn.cursor()
        self.settings = {"co2": [], "temperature": [], "humidity": [], "led": []}
        self.environments = {"temperature": 0, "humidity": 0, "co2": 0}
        self.machines = {"AirConditioner": 0, "LED": 0, "FAN": 0, "WaterPump": 0}

        self.client = mqtt.Client(client_id)
        self.client.on_connect = self.on_connect
        self.client.on_disconnect = self.on_disconnect
        self.client.on_publish = self.on_publish
        self.client.connect('127.0.0.1', MQTT_PORT)
        self.client.loop_start()

        self.fetch_settings()
        self.fetch_machines()
        self.fetch_environments_mean()

    def get_settings_column(self):
        res = []
        for setting in self.settings.keys():
            res.extend([f"{setting}_min", f"{setting}_max"])
        return ','.join(res)

    def make_environments_sql(self, env):
        return f"(SELECT {env} FROM iot.plant1 ORDER BY id DESC LIMIT 1) UNION ALL (SELECT {env} FROM iot.plant2 ORDER BY id DESC LIMIT 1) UNION ALL (SELECT {env} FROM iot.plant3 ORDER BY id DESC LIMIT 1);"

    def make_settings_sql(self):
        cols = self.get_settings_column()
        return f"SELECT {cols} FROM iot.setting ORDER BY id DESC LIMIT 1;"

    def make_machine_sql(self, machine):
        return f"SELECT status FROM iot.switch WHERE machine = \"{machine}\" ORDER BY id DESC LIMIT 1;"

    def fetch_environments_mean(self):
        for key, value in self.environments.items():
            sql = self.make_environments_sql(key)
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            self.environments[key] = mean(fetch)

    def fetch_settings(self):
        sql = self.make_settings_sql()
        self.cursor.execute(sql)
        fetch = self.cursor.fetchall()[0]
        for (i, key) in enumerate(self.settings.keys()):
            start = i * 2
            end = i * 2 + 2
            self.settings[key] = fetch[start:end]

    def fetch_machines(self):
        for key, value in self.machines.items():
            sql = self.make_machine_sql(key)
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()[0]
            self.machines[key] = fetch[0]

    # TODO : 7 전송 시 에어컨 켜지고 냉방 / 8 전송 시 에어컨 켜지고 온방 -> 0 : 끄기 / 1 : 냉방 / 2 : 온방
    # TODO : 최저 온도보다 낮을 시, 허용 최고 온도까지 올리고 끄기 / 온방도 마찬가
    def temp_control(self):
        current_value = self.environments['temperature']
        if self.settings['temperature'][min_index] > current_value:
            print("AirConditioner Boiler ON")
            self.client.publish("AirConditioner", "8", qos=2)
        elif self.settings['temperature'][max_index] < current_value:
            print("AirConditioner Cooler ON")
            self.client.publish("AirConditioner", "7", qos=2)
        else:
            print("AirConditioner OFF")
            self.client.publish("AirConditioner", "0", qos=2)

    def led_control(self):
        current_hour = int(time.strftime('%H', time.localtime(time.time())))
        if self.settings['led'][min_index] <= current_hour <= self.settings['led'][max_index]:
            self.client.publish("LED", '1')
        else:
            self.client.publish("LED", '0')

    def finish_automagic(self):
        self.conn.commit()
        self.conn.close()
        self.client.disconnect()


# TODO : 현재 조절 가능한 환경 변수는 온도와 조명 뿐.
auto = Automagic()

auto.led_control()

auto.finish_automagic()



# sql = "SELECT * FROM user where department = %s"
# cursor.execute(sql, ("AI"))

