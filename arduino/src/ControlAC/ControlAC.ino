
#include <IRremoteESP8266.h>
#include <IRsend.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "nicesesang";
const char* password = "01055646565";
const char* mqtt_server = "192.168.0.3";

WiFiClient espClient;
PubSubClient client(espClient);
int cnt;
void setup_wifi() {
  delay(10);
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

IRsend irsend(14);  // An IR LED is controlled by GPIO pin 14 (D5)

// 0 : TOWER
// 1 : WALL
const unsigned int kAc_Type  = 1;
// 0 : cooling
// 1 : heating
unsigned int ac_heat = 0;
// 0 : off
// 1 : on
unsigned int ac_power_on = 0;
// 0 : off
// 1 : on --> power on
unsigned int ac_air_clean_state = 0;
// temperature : 18 ~ 30
unsigned int ac_temperature = 18;
// 0 : low
// 1 : mid
// 2 : high
// if kAc_Type = 1, 3 : change
unsigned int ac_flow = 2;
const uint8_t kAc_Flow_Tower[3] = {0, 4, 6};
const uint8_t kAc_Flow_Wall[4] = {0, 2, 4, 5};

uint32_t ac_code_to_sent;

void Ac_Send_Code(uint32_t code) {
  Serial.print("code to send : ");
  Serial.print(code, BIN);
  Serial.print(" : ");
  Serial.println(code, HEX);
#if SEND_LG
  irsend.sendLG(code, 28);
#else  // SEND_LG
  Serial.println("Can't send because SEND_LG has been disabled.");
#endif  // SEND_LG
}

void Ac_Activate(unsigned int temperature, unsigned int air_flow,
                 unsigned int heat) {
  ac_heat = heat;
  unsigned int ac_msbits1 = 8;
  unsigned int ac_msbits2 = 8;
  unsigned int ac_msbits3 = 0;
  unsigned int ac_msbits4;
  if (ac_heat == 1)
    ac_msbits4 = 4;  // heating
  else
    ac_msbits4 = 0;  // cooling
  unsigned int ac_msbits5 =  (temperature < 15) ? 0 : temperature - 15;
  unsigned int ac_msbits6 = 0;
  if (air_flow <= 2) {
    if (kAc_Type == 0)
      ac_msbits6 = kAc_Flow_Tower[air_flow];
    else
      ac_msbits6 = kAc_Flow_Wall[air_flow];
  }
  unsigned int ac_msbits7 = (ac_msbits3 + ac_msbits4 + ac_msbits5 +
                             ac_msbits6) & B00001111;
  ac_code_to_sent = ac_msbits1 << 4;
  ac_code_to_sent = (ac_code_to_sent + ac_msbits2) << 4;
  ac_code_to_sent = (ac_code_to_sent + ac_msbits3) << 4;
  ac_code_to_sent = (ac_code_to_sent + ac_msbits4) << 4;
  ac_code_to_sent = (ac_code_to_sent + ac_msbits5) << 4;
  ac_code_to_sent = (ac_code_to_sent + ac_msbits6) << 4;
  ac_code_to_sent = (ac_code_to_sent + ac_msbits7);
  Ac_Send_Code(ac_code_to_sent);
  ac_power_on = 1;
  ac_temperature = temperature;
  ac_flow = air_flow;
}

void Ac_Change_Air_Swing(int air_swing) {
  if (kAc_Type == 0) {
    if (air_swing == 1)
      ac_code_to_sent = 0x881316B;
    else
      ac_code_to_sent = 0x881317C;
  } else {
    if (air_swing == 1)
      ac_code_to_sent = 0x8813149;
    else
      ac_code_to_sent = 0x881315A;
  }
  Ac_Send_Code(ac_code_to_sent);
}

void Ac_Power_Down() {
  ac_code_to_sent = 0x88C0051;
  Ac_Send_Code(ac_code_to_sent);
  ac_power_on = 0;
}

void Ac_Air_Clean(int air_clean) {
  if (air_clean == '1')
    ac_code_to_sent = 0x88C000C;
  else
    ac_code_to_sent = 0x88C0084;
  Ac_Send_Code(ac_code_to_sent);
  ac_air_clean_state = air_clean;
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
      client.subscribe("AirConditioner");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(2000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  if ((char)payload[0] == '0') {  // POWER OFF
    Ac_Power_Down();
  }
  if ((char)payload[0] == '1') {  // POWER ON
    Ac_Activate(ac_temperature, ac_flow, ac_heat);
  }
  if ((char)payload[0] == '2') {  // TEMP DOWN
    if (19 <= ac_temperature && ac_temperature <= 30)
      Ac_Activate((ac_temperature - 1), ac_flow, ac_heat);
  }
  if ((char)payload[0] == '3') {  // TEMP UP
    if (18 <= ac_temperature && ac_temperature <= 29)
      Ac_Activate((ac_temperature + 1), ac_flow, ac_heat);
  }
  if ((char)payload[0] == '4') { // FLOW 1
    Ac_Activate(ac_temperature, 3, ac_heat);
  }
  if ((char)payload[0] == '5') { // FLOW 2
    Ac_Activate(ac_temperature, 1, ac_heat);
  }
  if ((char)payload[0] == '6') { // FLOW 3
    Ac_Activate(ac_temperature, 2, ac_heat);
  }
  if ((char)payload[0] == '7') { // COOLING + 18도 + 바람세기 3
    ac_heat = 0;
    ac_temperature = 18;
    ac_flow = 2;
    Ac_Activate(ac_temperature, ac_flow, ac_heat);
  }
  if ((char)payload[0] == '8') { // HEATING
    ac_heat = 1;
    ac_temperature = 30;
    ac_flow = 2;
    Ac_Activate(ac_temperature, ac_flow, ac_heat);
  }
  if ((char)payload[0] == '9') { // SWING
    if (cnt == 1) {
      Ac_Change_Air_Swing(1);
      cnt = 0;
    }
    else
      Ac_Change_Air_Swing(0);
    cnt = cnt + 1;
  }
}


void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  irsend.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
