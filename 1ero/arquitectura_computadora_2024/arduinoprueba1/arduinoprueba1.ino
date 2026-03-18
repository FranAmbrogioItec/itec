// C++ code
//
int tiemporaya=1000;
int tiempopunto=500;
int led=10;

void setup()
{
  pinMode(led, OUTPUT);}

void prendeled (int queled, int quetiempo) {
digitalWrite (queled, HIGH);
  delay (quetiempo);}

void apagaled (int queled, int quetiempo=1){
  digitalWrite (queled, LOW);
     delay (quetiempo);} //Wait for algun tiempo
    
void loop () 
{
  //punto
  prendeled(led,tiempopunto);
  apagaled(led,tiempopunto);
  //raya
  prendeled(led,tiemporaya);
  apagaled(led);
  delay (2000); //pausa
}



    delay (2000); //pausa
  }

void flash (int duracion)
{
  digitalWrite(led, HIGH);
  delay(duracion);
  digitalWrite(led, LOW);
  delay(duracion);
}
