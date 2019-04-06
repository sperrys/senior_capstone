
#include <Wire.h>
#include <WiFi.h>
#include <WiFiUdp.h>

/// DEBUG FUNCTIONS

// print a variable's value along with its name
#define VAR_(a) Serial.print(#a); Serial.print(": "); Serial.print(a)

#define VARln_(a) Serial.print(#a); Serial.print(": "); Serial.println(a)
// print the function and line number
#define DBG  Serial.print("{");Serial.print("--");Serial.print("}[");Serial.print(__func__);Serial.print("](");Serial.print(__LINE__);Serial.println(")")

// print the function, line number, and halt functionality
#define DBG_STP DBG; do {} while(true)


struct Reading {
    int16_t AcX;
    int16_t AcY;
    int16_t AcZ;
    int16_t GyX;
    int16_t GyY;
    int16_t GyZ;
    time_t    t;
};

const int MPU_addr=0x68;  // I2C address of the MPU-6050
const int baudrate=9600;

// WiFi network name and password:
const char * ssid = "HI_ASHTON";
const char * pwd = "PASSWORD";

const char * udpAddress = "192.168.5.1";
const int udpPort = 3333;

//Are we currently connected?
boolean connected = false;

//The udp library class
WiFiUDP udp;

void setup()
{

    // setup printing environment
    Serial.begin(115200);
    while (!Serial) {}
    Serial.println("printing ready");

    //Connect to the WiFi network
    WiFi.begin(ssid, pwd);
    Serial.println("");

    // Wait for connection

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.print("Connected to ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    //This initializes udp and transfer buffer
    udp.begin(udpPort);

    Wire.begin();

    Wire.beginTransmission(MPU_addr);
    Wire.write(0x6B);  // PWR_MGMT_1 register
    Wire.write(0);     // set to zero (wakes up the MPU-6050)
    Wire.endTransmission(true);
}

#define READINGS_PER_PACKET 64
#define PACKET_SIZE (sizeof (struct Reading)) * READINGS_PER_PACKET

// 20 ms --> 50 Hz
#define READ_DELAY 20

void loop() {

    // int8_t packet [BYTES_PER_PACKET];
    
    struct Reading body [READINGS_PER_PACKET];

    // setup fudge header
    // for (int i = 0; i < HEADER_SIZE; ++i) {
    //     packet[i] = 0;
    // }
    
    // Serial.println(sizeof(struct Reading));



    while (someone_is_listening()) {

        // ----------------------------------
        // CREATE PACKET BODY

        // body = (struct Reading *) (packet + HEADER_SIZE);
        for (uint16_t i = 0; i < READINGS_PER_PACKET; ++i) {
            read_data(&(body[i]));
            delay(READ_DELAY);
        }

        // setup and send data
        udp.beginPacket(udpAddress,udpPort);
        udp.write((uint8_t*) body, PACKET_SIZE);
        udp.endPacket();

    }


    /* 
    Serial.print("header: ");
    for (int i = 0; i < HEADER_SIZE; ++i) {
        Serial.print(data[i]);
    } Serial.println("");
    check_data (((int16_t *)(data + HEADER_SIZE)), READINGS_PER_PACKET);
    */

    // ----------------------------------
    // SEND PACKET

    while (true) {}
}

void read_data(struct Reading *r) 
{

    Wire.beginTransmission(MPU_addr);
    Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)
    Wire.endTransmission(false);
    Wire.requestFrom(MPU_addr,14,true);  // request a total of 14 registers

    r->AcX = Wire.read()<<8|Wire.read();
    r->AcY = Wire.read()<<8|Wire.read();
    r->AcZ = Wire.read()<<8|Wire.read();

    Wire.read()<<8|Wire.read(); // thow away data

    r->GyX = Wire.read()<<8|Wire.read();
    r->GyY = Wire.read()<<8|Wire.read();
    r->GyZ = Wire.read()<<8|Wire.read();

    r->t = millis();
}

bool someone_is_listening ()
{
    return true;
}

/* ------------------------------------------------------------ *
 * DEBUG PRINTING
 * ------------------------------------------------------------ */

void check_data (struct Reading *rs, int times)
{
    for (int i = 0 ; i < times; ++i) {
        print_reading(&(rs[i]));
    }
}

/* */
void print_reading (struct Reading *r)
{
    VAR_(r->AcX);
    VAR_(r->AcY);
    VAR_(r->AcZ);
    VAR_(r->GyX);
    VAR_(r->GyY);
    VAR_(r->GyZ);
    VARln_(r->t);
    return;
}


/*
OTHER CODE FOR CONNECTING TO WIFI


void connectToWiFi(const char * ssid, const char * pwd){
  Serial.println("Connecting to WiFi network: " + String(ssid));

  // delete old config
  WiFi.disconnect(true);
  //register event handler
  WiFi.onEvent(WiFiEvent);
  
  //Initiate connection
  WiFi.begin(ssid, pwd);

  Serial.println("Waiting for WIFI connection...");
}*/

// //wifi event handler
// void WiFiEvent(WiFiEvent_t event){
//     switch(event) {
//       case SYSTEM_EVENT_STA_GOT_IP:
//           //When connected set 
//           Serial.print("WiFi connected! IP address: ");
//           Serial.println(WiFi.localIP());  
//           //initializes the UDP state
//           //This initializes the transfer buffer
//           udp.begin(WiFi.localIP(),udpPort);
//           connected = true;
//           break;
//       case SYSTEM_EVENT_STA_DISCONNECTED:
//           Serial.println("WiFi lost connection");
//           connected = false;
//           break;
//     }
// }