#include <WEMOS_SHT3X.h>
#include "SCD30.h"

/*
#if defined(ARDUINO_ARCH_AVR)
#pragma message("Defined architecture for ARDUINO_ARCH_AVR.")
#elif defined(ARDUINO_ARCH_SAM)
#pragma message("Defined architecture for ARDUINO_ARCH_SAM.")
#elif defined(ARDUINO_ARCH_SAMD)
#pragma message("Defined architecture for ARDUINO_ARCH_SAMD.")
#elif defined(ARDUINO_ARCH_STM32F4)
#pragma message("Defined architecture for ARDUINO_ARCH_STM32F4.")
#else
#pragma message("Not found any architecture.")
#endif
*/

SHT3X sht35(0x45);

void setup() {
  Wire.begin();
  Serial.begin(115200);
  Serial.println("SCD30 Raw Data");
  scd30.initialize();

}

void loop() {

  if (sht35.get() == 0) {
    Serial.print("SHT35 Temperature : ");
    Serial.print(sht35.cTemp);
    Serial.print("℃");
    Serial.print("    SHT35 Humidity : ");
    Serial.print(sht35.humidity);
    Serial.println("%");
  }
  else
  {
    Serial.println("SHT35  Error!"); 
  }

  float result[3] = {0};
  if (scd30.isAvailable()) {
    scd30.getCarbonDioxideConcentration(result);
    Serial.print("SCD30 Temperature : ");
    Serial.print(result[1]);
    Serial.print("℃");
    Serial.print("    SCD30 Humidity : ");
    Serial.print(result[2]);
    Serial.println("%")M;
    Serial.print("SCD30 CO2 : ");
    Serial.print(result[0]);
    Serial.println(" ppm");
  }
    else
  {
    Serial.println("SCD30  Error!"); 
  }
  delay(2000);
  Serial.println("");
  Serial.println("");
}
