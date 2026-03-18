//Proyecto Tender Automatico
//Realizado por alumnos de Comision "A":
//-Arballo Federico
//-Ambrogio Francisco
//-Cepeda Emanuel
//-Rodriguez Joaquin

#include <Servo.h>

const int sensorDeAgua = A0;
const int servoPin = 7;
const int buzzerPin = 4;
const int ledVerdePin = 6;
const int ledRojoPin = 5;
const int pulsadorPin = 3;
const int umbralHumedad = 700;
const int tiempoBuzzer = 1000;

Servo miServo;
bool aguaDetectada = false;
bool sistemaActivo = false;
bool estadoAnteriorPulsador = HIGH;

void setup() {
  Serial.begin(9600);
  pinMode(sensorDeAgua, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledVerdePin, OUTPUT);
  pinMode(ledRojoPin, OUTPUT);
  pinMode(pulsadorPin, INPUT_PULLUP);
  miServo.attach(servoPin);
  
  apagarSistema();
}

void moverServoLento(int posicionObjetivo) {
  int posicionActual = miServo.read();
  
  if (posicionActual < posicionObjetivo) {
    for (int pos = posicionActual; pos <= posicionObjetivo; pos++) {
      miServo.write(pos);
      delay(15);
    }
  } else {
    for (int pos = posicionActual; pos >= posicionObjetivo; pos--) {
      miServo.write(pos);
      delay(15);
    }
  }
}

void apagarSistema() {
  digitalWrite(ledVerdePin, LOW);
  digitalWrite(ledRojoPin, LOW);
  moverServoLento(90);
  aguaDetectada = false;
}

void encenderSistema() {
  // Indica que el sistema está activo con el LED rojo
  digitalWrite(ledVerdePin, LOW);
  digitalWrite(ledRojoPin, HIGH);
  // Abre el servo inmediatamente al encender
  moverServoLento(0);
  // Tono de activación
  tone(buzzerPin, 2000);
  delay(200);
  noTone(buzzerPin);
}

void procesarSistemaAgua() {
  int valorAgua = analogRead(sensorDeAgua);
  Serial.print("Valor del sensor de agua: ");
  Serial.println(valorAgua);

  if (valorAgua < umbralHumedad && !aguaDetectada) {
    // Agua detectada
    aguaDetectada = true;
    digitalWrite(ledVerdePin, HIGH);
    digitalWrite(ledRojoPin, LOW);
    moverServoLento(90);
    tone(buzzerPin, 1000);
    delay(tiempoBuzzer);
    noTone(buzzerPin);
  } 
  else if (valorAgua >= umbralHumedad && aguaDetectada) {
    // No hay agua detectada
    aguaDetectada = false;
    digitalWrite(ledVerdePin, LOW);
    digitalWrite(ledRojoPin, HIGH);
    moverServoLento(0);   
    tone(buzzerPin, 1000);
    delay(tiempoBuzzer);
    noTone(buzzerPin);
  }
}

void loop() {
  bool estadoActualPulsador = digitalRead(pulsadorPin);
  
  if (estadoActualPulsador == LOW && estadoAnteriorPulsador == HIGH) {
    delay(50); // Debounce
    if (digitalRead(pulsadorPin) == LOW) {
      sistemaActivo = !sistemaActivo;
      
      if (sistemaActivo) {
        encenderSistema();
      } else {
        apagarSistema();
        tone(buzzerPin, 1000);
        delay(200);
        noTone(buzzerPin);
      }
    }
  }
  
  estadoAnteriorPulsador = estadoActualPulsador;

  if (sistemaActivo) {
    procesarSistemaAgua();
  }
  
  delay(100);
}
#include <Servo.h>

const int sensorDeAgua = A0;
const int servoPin = 7;
const int buzzerPin = 4;
const int ledVerdePin = 6;
const int ledRojoPin = 5;
const int pulsadorPin = 3;
const int umbralHumedad = 700;
const int tiempoBuzzer = 1000;// Duración del tono del buzzer (en ms)

// Declaración de variables
Servo miServo;              // Objeto para el control del servomotor
bool aguaDetectada = false; // Indica si se ha detectado agua
bool sistemaActivo = false; // Indica si el sistema está encendido o apagado
bool estadoAnteriorPulsador = HIGH; // Estado anterior del pulsador para manejo de cambio de estado

void setup() {
  Serial.begin(9600);
  pinMode(sensorDeAgua, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledVerdePin, OUTPUT);
  pinMode(ledRojoPin, OUTPUT);
  pinMode(pulsadorPin, INPUT_PULLUP);
  miServo.attach(servoPin);
  
  apagarSistema();
}

void moverServoLento(int posicionObjetivo) {
  int posicionActual = miServo.read();
  
  if (posicionActual < posicionObjetivo) {
    for (int pos = posicionActual; pos <= posicionObjetivo; pos++) {
      miServo.write(pos);
      delay(15);
    }
  } else {
    for (int pos = posicionActual; pos >= posicionObjetivo; pos--) {
      miServo.write(pos);
      delay(15);
    }
  }
}

void apagarSistema() {
  digitalWrite(ledVerdePin, LOW);
  digitalWrite(ledRojoPin, LOW);
  moverServoLento(90);
  aguaDetectada = false;
}

void encenderSistema() {
  // Indica que el sistema está activo con el LED rojo
  digitalWrite(ledVerdePin, LOW);
  digitalWrite(ledRojoPin, HIGH);
  // Abre el servo inmediatamente al encender
  moverServoLento(0);
  // Tono de activación
  tone(buzzerPin, 2000);
  delay(200);
  noTone(buzzerPin);
}

void procesarSistemaAgua() {
  int valorAgua = analogRead(sensorDeAgua);
  Serial.print("Valor del sensor de agua: ");
  Serial.println(valorAgua);

  if (valorAgua < umbralHumedad && !aguaDetectada) {
    // Agua detectada
    aguaDetectada = true;
    digitalWrite(ledVerdePin, HIGH);
    digitalWrite(ledRojoPin, LOW);
    moverServoLento(90);
    tone(buzzerPin, 1000);
    delay(tiempoBuzzer);
    noTone(buzzerPin);
  } 
  else if (valorAgua >= umbralHumedad && aguaDetectada) {
    // No hay agua detectada
    aguaDetectada = false;
    digitalWrite(ledVerdePin, LOW);
    digitalWrite(ledRojoPin, HIGH);
    moverServoLento(0);   
    tone(buzzerPin, 1000);
    delay(tiempoBuzzer);
    noTone(buzzerPin);
  }
}

void loop() {
  bool estadoActualPulsador = digitalRead(pulsadorPin);
  
  if (estadoActualPulsador == LOW && estadoAnteriorPulsador == HIGH) {
    delay(50); // Debounce
    if (digitalRead(pulsadorPin) == LOW) {
      // Cambiar estado del sistema (activado/desactivado)
      sistemaActivo = !sistemaActivo;
      
      if (sistemaActivo) {
        encenderSistema();
      } else {
        apagarSistema();
        // Emitir un tono breve para indicar apagado
        tone(buzzerPin, 1000);
        delay(200);
        noTone(buzzerPin);
      }
    }
  }
  
  estadoAnteriorPulsador = estadoActualPulsador;

  if (sistemaActivo) {
    procesarSistemaAgua();
  }
  
  delay(100);
}  estadoAnteriorPulsador = estadoActualPulsador; // Actualizar el estado del pulsador

  // Si el sistema está activo, ejecutar proceso de detección de agua
  if (sistemaActivo) {
    procesarSistemaAgua();
  }
  
  delay(100); // Retardo para evitar lecturas demasiado rápidas
}
