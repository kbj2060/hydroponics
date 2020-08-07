#include "SCD30.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

int TIMER = 60000;

const char* ssid = "nicesesang";
const char* password = "01055646565";
const char* mqtt_server = "192.168.0.21";

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


}
unsigned long prev_time = 0;

void loop() {
  float result[3] = {0};
  if (scd30.isAvailable()) {
    scd30.getCarbonDioxideConcentration(result);
    Serial.print("SCD30 Temperature : ");
    Serial.print(result[1]);
    Serial.print("℃");
    Serial.print("SCD30 Humidity : ");
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
  String sht1116_str = String(co2);
  char sht1116[20];
  sht1116_str.toCharArray(sht1116, sht1116_str.length() + 1);
  client.publish("CO2", sht1116);
}
