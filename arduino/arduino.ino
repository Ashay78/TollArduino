#include <SPI.h> // SPI
#include <MFRC522.h> // RFID
#include "Ultrasonic.h"

#define SS_PIN 10
#define RST_PIN 9

#define GREEN_LED 7
#define RED_LED 6
    
// Déclaration 
MFRC522 rfid(SS_PIN, RST_PIN);

int sensorTrigPlotId = 3;
int sensorEchoPlotId = 2;
Ultrasonic ultrasonic(sensorTrigPlotId, sensorEchoPlotId); //(Trig,Echo)

bool goForward = false;

// Tableau contentent l'ID
byte nuidPICC[4];

void setup() {
  // Init RS232
  Serial.begin(9600);

  // Init SPI bus
  SPI.begin(); 

  // Init MFRC522 
  rfid.PCD_Init(); 

  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, HIGH);
}
 
void loop() {
  if (Serial.available() > 0) {
      // Create a new string variable to receive Serial data
      String receivedString = "";

      // Loop through received data and append to the receivedString variable
      while (Serial.available() > 0) {
        receivedString += char(Serial.read ());
      }
   
      if(receivedString == "1") {
        goForward = true;
      }
    }

  int distanceInCm = ultrasonic.Ranging(CM);

  if (goForward) {
    while(distanceInCm < 20) {
      
      distanceInCm = ultrasonic.Ranging(CM);
      digitalWrite(GREEN_LED, HIGH);
      digitalWrite(RED_LED, LOW);
    }
    if (distanceInCm > 20) {
      goForward = false;
      Serial.println("ok");
    }
  } else {
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);
  }
 
   
  // Initialisé la boucle si aucun badge n'est présent 
  
  if ( !rfid.PICC_IsNewCardPresent())
    return;

  // Vérifier la présence d'un nouveau badge 
  if ( !rfid.PICC_ReadCardSerial())
    return;
  
  // Enregistrer l'ID du badge (4 octets) 
  for (byte i = 0; i < 4; i++) 
  {
    nuidPICC[i] = rfid.uid.uidByte[i];
  }
  
  // Affichage de l'ID 
  for (byte i = 0; i < 4; i++) 
  {
    Serial.print(nuidPICC[i], HEX);
    Serial.print(" ");
  }
  Serial.println(" ");

  rfid.PICC_HaltA(); // Halt PICC
  rfid.PCD_StopCrypto1(); // Stop encryption on PCD
}
