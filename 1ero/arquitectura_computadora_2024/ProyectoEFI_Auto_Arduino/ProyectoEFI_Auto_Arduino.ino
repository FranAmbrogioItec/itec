//Proyecto Auto a Control Remoto
//Realizado por alumnos de Comision "A":
//-Arballo Federico
//-Ambrogio Francisco
//-Cepeda Emanuel
//-Rodriguez Joaquin

#include <SoftwareSerial.h>
#include <Servo.h>

// CONEXIONES PARA EL BLUETOOTH.
int bluetoothTx = 9;
int bluetoothRx = 10;
SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);

// MOTOR 1.
int Motor1A = 6;
int Motor1B = 7;

// MOTOR 2.
int Motor2A = 4;
int Motor2B = 5;

// SENSOR ULTRASONIDO
int trigPin = 3; // Pin Trig
int echoPin = 2; // Pin Echo
long distancia;

void setup() {
  Serial.begin(9600); // Iniciar la comunicación serie para depuracion
  bluetooth.begin(115200);
  bluetooth.print("$$$");
  delay(100);
  bluetooth.println("U,9600,N");
  bluetooth.begin(9600);

  // Configuración de los pines del motor
  pinMode(Motor1A, OUTPUT);
  pinMode(Motor2A, OUTPUT);
  pinMode(Motor1B, OUTPUT);
  pinMode(Motor2B, OUTPUT);

  digitalWrite(Motor1A, LOW);
  digitalWrite(Motor2A, LOW);
  digitalWrite(Motor1B, LOW);
  digitalWrite(Motor2B, LOW);

  // Configuración del sensor de ultrasonido
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  Serial.println("Sistema iniciado."); // Mensaje de inicio en el monitor serie
}

int flag1 = -1;
int flag2 = -1;

void loop() {
  // Medir la distancia
  distancia = medirDistancia();
  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.println(" cm");

  if (bluetooth.available()) {
    char toSend = (char)bluetooth.read();

    bool objetoCerca = (distancia < 10);

    if (toSend == 'S') {
      flag1 = 0;
      flag2 = 0;
      detenerMotores();
      Serial.println("Detener todo: Comando S recibido.");
    }

    // Adelante (comandos para girar)
    if ((toSend == 'L' || toSend == 'G' || toSend == 'H') && !objetoCerca) {
      if (flag1 != 1) {
        flag1 = 1;
        digitalWrite(Motor1A, HIGH);
        analogWrite(Motor1B, 0);
        digitalWrite(Motor2A, HIGH);
        analogWrite(Motor2B, 0);
        Serial.println("Avanzar: Comando L/G/H recibido.");
      }
    } else if (toSend == 'L' || toSend == 'G' || toSend == 'H') {
      Serial.println("Movimiento de avanzar bloqueado por objeto cercano.");
    }

    // Reversa (comandos para girar)
    if ((toSend == 'R' || toSend == 'I' || toSend == 'J') && !objetoCerca) {
      if (flag1 != 2) {
        flag1 = 2;
        digitalWrite(Motor1B, HIGH);
        analogWrite(Motor1A, 0);
        digitalWrite(Motor2B, HIGH);
        analogWrite(Motor2A, 0);
        Serial.println("Reversa: Comando R/I/J recibido.");
      }
    } else if (toSend == 'R' || toSend == 'I' || toSend == 'J') {
      Serial.println("Movimiento de reversa bloqueado por objeto cercano.");
    }

    // Izquierda (comando original de avanzar)
    if (toSend == 'F' || toSend == 'G' || toSend == 'I') {
      if (flag2 != 1) {
        flag2 = 1;
        digitalWrite(Motor2B, HIGH);
        analogWrite(Motor2A, 0);
        digitalWrite(Motor1A, HIGH);
        analogWrite(Motor1B, 0);
        Serial.println("Girar Izquierda: Comando F/G/I recibido.");
      }
    } 
    // Derecha (comando original de retroceder)
    else if (toSend == 'B' || toSend == 'H' || toSend == 'J') {
      if (flag2 != 2) {
        flag2 = 2;
        digitalWrite(Motor1B, HIGH);
        analogWrite(Motor1A, 0);
        digitalWrite(Motor2A, HIGH);
        analogWrite(Motor2B, 0);
        Serial.println("Girar Derecha: Comando B/H/J recibido.");
      }
    } else {
      if (flag2 != 3) {
        flag2 = 3;
        detenerMotores();
        Serial.println("Parar: Comando desconocido recibido.");
      }
    }
  }
}

// Función para medir la distancia con el sensor de ultrasonido
long medirDistancia() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duracion = pulseIn(echoPin, HIGH);
  long distancia = duracion * 0.034 / 2;
  return distancia;
}

// Función para detener todos los motores
void detenerMotores() {
  digitalWrite(Motor1A, LOW);
  digitalWrite(Motor2A, LOW);
  digitalWrite(Motor1B, LOW);
  digitalWrite(Motor2B, LOW);
  Serial.println("Motores detenidos.");
}
