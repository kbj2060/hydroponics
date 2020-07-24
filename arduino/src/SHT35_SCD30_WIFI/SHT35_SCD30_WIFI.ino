#include <WEMOS_SHT3X.h>
#include "SCD30.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>


int TIMER = 60000;
SHT3X sht35(0x45);

const char* ssid = "ssomecafe";
const char* password = "ssomecafe1";
const char* mqtt_server = "192.168.0.12";
WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe("WaterPump");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(2000);
    }
  }
}




void setup() {
  Wire.begin();
  Serial.begin(115200);
  Serial.println("SCD30 Raw Data");
  scd30.initialize();
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

}
unsigned long prev_time = 0;

void loop() {
  float result[3] = {0};
  if (sht35.get() == 0 || scd30.isAvailable()) {
    scd30.getCarbonDioxideConcentration(result);
    Serial.print("SHT35 Temperature : ");
    Serial.print(sht35.cTemp);
    Serial.print("℃");
    Serial.print("    SHT35 Humidity : ");
    Serial.print(sht35.humidity);
    Serial.println("%");
    Serial.print("SCD30 Temperature : ");
    Serial.print(result[1]);
    Serial.print("℃");

    Serial.print("    SCD30 Humidity : ");
    Serial.print(result[2]);
    Serial.println("%");
    Serial.print("SCD30 CO2 : ");
    Serial.print(result[0]);
    Serial.println(" ppm");
    
   unsigned long current_time = millis();
   if(current_time - prev_time > TIMER){
      time_Pub(result[0]);
      prev_time = millis();
    }
  }
  else
  {
    Serial.println("Error!");
  }

  delay(2000);
  Serial.println("");

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void time_Pub(float co2) {
  float sht35TEMP =  sht35.cTemp;
  String sht1114_str = String(sht35TEMP);
  char sht1114[20];
  sht1114_str.toCharArray(sht1114, sht1114_str.length() + 1);
  client.publish("Temperature", sht1114);

  float sht35HUMI =  sht35.humidity;
  String sht1115_str = String(sht35HUMI);
  char sht1115[20];
  sht1115_str.toCharArray(sht1115, sht1115_str.length() + 1);
  client.publish("Humidity", sht1115);

  String sht1116_str = String(co2);
  char sht1116[20];
  sht1116_str.toCharArray(sht1116, sht1116_str.length() + 1);
  client.publish("CO2", sht1116);
}
