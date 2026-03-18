# DNR - Ejercicios de Distribución Normal

# --------------------------------------------------------------------------
# EJERCICIO 1: Calcular el valor de a para P(4-a ≤ x ≤ 4+a) = 0.5934
# --------------------------------------------------------------------------
cat("EJERCICIO 1: Calcular el valor de a\n")
cat("-----------------------------------\n")

media <- 4
desviacion <- 2
probabilidad <- 0.5934

# P(4-a ≤ x ≤ 4+a) = P(x ≤ 4+a) - P(x ≤ 4-a) = 0.5934
# Por simetría: P(x ≤ 4+a) = 0.5 + 0.5934/2 = 0.7967

prob_acumulada <- 0.5 + probabilidad/2

# Calcular el valor z correspondiente
z <- qnorm(prob_acumulada)

# Calcular a: z = (x - media)/desviacion => x = media + z*desviacion
a <- z * desviacion

cat("Media =", media, ", Desviación =", desviacion, "\n")
cat("Probabilidad deseada =", probabilidad, "\n")
cat("Valor de z =", round(z, 4), "\n")
cat("Valor de a =", round(a, 4), "\n")
cat("Intervalo: [", round(media - a, 4), ",", round(media + a, 4), "]\n")

# Verificación
prob_calculada <- pnorm(media + a, media, desviacion) - pnorm(media - a, media, desviacion)
cat("Probabilidad verificada =", round(prob_calculada, 4), "\n\n")

# --------------------------------------------------------------------------
# EJERCICIO 2: Días con temperatura entre 21° y 27°
# --------------------------------------------------------------------------
cat("EJERCICIO 2: Temperaturas en junio\n")
cat("----------------------------------\n")

media_temp <- 23
desviacion_temp <- 5
dias_mes <- 30

# Probabilidad de temperatura entre 21° y 27°
prob_21_27 <- pnorm(27, media_temp, desviacion_temp) - pnorm(21, media_temp, desviacion_temp)
dias_esperados <- prob_21_27 * dias_mes

cat("Media de temperatura =", media_temp, "°\n")
cat("Desviación típica =", desviacion_temp, "°\n")
cat("Días en junio =", dias_mes, "\n")
cat("Probabilidad (21° ≤ T ≤ 27°) =", round(prob_21_27, 4), "\n")
cat("Días esperados entre 21° y 27° =", round(dias_esperados, 1), "días\n\n")

# --------------------------------------------------------------------------
# EJERCICIO 3: Distribución de pesos de estudiantes
# --------------------------------------------------------------------------
cat("EJERCICIO 3: Pesos de estudiantes\n")
cat("--------------------------------\n")

media_peso <- 70
desviacion_peso <- 3
total_estudiantes <- 500

# a) Entre 60 kg y 75 kg
prob_a <- pnorm(75, media_peso, desviacion_peso) - pnorm(60, media_peso, desviacion_peso)
estudiantes_a <- prob_a * total_estudiantes

# b) Más de 90 kg
prob_b <- 1 - pnorm(90, media_peso, desviacion_peso)
estudiantes_b <- prob_b * total_estudiantes

# c) Menos de 64 kg
prob_c <- pnorm(64, media_peso, desviacion_peso)
estudiantes_c <- prob_c * total_estudiantes

# d) Exactamente 64 kg (probabilidad puntual en distribución continua = 0)
prob_d <- 0
estudiantes_d <- 0

# e) 64 kg o menos (igual que c)
prob_e <- pnorm(64, media_peso, desviacion_peso)
estudiantes_e <- prob_e * total_estudiantes

cat("Media =", media_peso, "kg, Desviación =", desviacion_peso, "kg\n")
cat("Total de estudiantes =", total_estudiantes, "\n\n")

cat("a) Entre 60 kg y 75 kg:\n")
cat("   Probabilidad =", round(prob_a, 4), "\n")
cat("   Estudiantes =", round(estudiantes_a, 1), "\n\n")

cat("b) Más de 90 kg:\n")
cat("   Probabilidad =", round(prob_b, 6), "\n")
cat("   Estudiantes =", round(estudiantes_b, 1), "\n\n")

cat("c) Menos de 64 kg:\n")
cat("   Probabilidad =", round(prob_c, 4), "\n")
cat("   Estudiantes =", round(estudiantes_c, 1), "\n\n")

cat("d) Exactamente 64 kg:\n")
cat("   Probabilidad =", prob_d, "\n")
cat("   Estudiantes =", estudiantes_d, "\n\n")

cat("e) 64 kg o menos:\n")
cat("   Probabilidad =", round(prob_e, 4), "\n")
cat("   Estudiantes =", round(estudiantes_e, 1), "\n\n")

# --------------------------------------------------------------------------
# EJERCICIO 4: Resultados de examen
# --------------------------------------------------------------------------
cat("EJERCICIO 4: Resultados de examen\n")
cat("--------------------------------\n")

media_examen <- 78
desviacion_examen <- 36

# a) Probabilidad de calificación superior a 72
prob_a4 <- 1 - pnorm(72, media_examen, desviacion_examen)

# b) Puntuación que marca el límite del 25% más bajo (No-Apto)
puntuacion_no_apto <- qnorm(0.25, media_examen, desviacion_examen)

# Estudiantes que exceden en al menos 5 puntos esta puntuación
limite_superior <- puntuacion_no_apto + 5
prob_b4 <- 1 - pnorm(limite_superior, media_examen, desviacion_examen)

# c) Probabilidad condicional: P(X > 84 | X > 72)
prob_c4 <- (1 - pnorm(84, media_examen, desviacion_examen)) / (1 - pnorm(72, media_examen, desviacion_examen))

cat("Media =", media_examen, ", Desviación =", desviacion_examen, "\n\n")

cat("a) Probabilidad de calificación > 72:\n")
cat("   P(X > 72) =", round(prob_a4, 4), "\n\n")

cat("b) Puntuación límite para No-Apto (25% más bajo):\n")
cat("   Puntuación =", round(puntuacion_no_apto, 2), "\n")
cat("   Proporción que excede en al menos 5 puntos:\n")
cat("   P(X >", round(limite_superior, 2), ") =", round(prob_b4, 4), "\n\n")

cat("c) Probabilidad condicional P(X > 84 | X > 72):\n")
cat("   P(X > 84 | X > 72) =", round(prob_c4, 4), "\n\n")

# --------------------------------------------------------------------------
# GRÁFICOS DE DISTRIBUCIÓN NORMAL
# --------------------------------------------------------------------------
cat("Generando gráficos de distribución normal...\n")

# Configurar área de gráficos
par(mfrow = c(2, 2), mar = c(4, 4, 2, 1))

# Gráfico 1: Ejercicio 1
x <- seq(media - 3*desviacion, media + 3*desviacion, length.out = 100)
y <- dnorm(x, media, desviacion)
plot(x, y, type = "l", lwd = 2, col = "blue", main = "Ejercicio 1: Intervalo de probabilidad",
     xlab = "x", ylab = "Densidad")
abline(v = c(media - a, media + a), col = "red", lty = 2)
abline(v = media, col = "green")
legend("topright", legend = c("Distribución", "Límites", "Media"), 
       col = c("blue", "red", "green"), lty = c(1, 2, 1))

# Gráfico 2: Ejercicio 2
x_temp <- seq(media_temp - 3*desviacion_temp, media_temp + 3*desviacion_temp, length.out = 100)
y_temp <- dnorm(x_temp, media_temp, desviacion_temp)
plot(x_temp, y_temp, type = "l", lwd = 2, col = "purple", main = "Ejercicio 2: Temperaturas",
     xlab = "Temperatura (°)", ylab = "Densidad")
abline(v = c(21, 27), col = "orange", lty = 2)
polygon(c(21, seq(21, 27, length.out = 100), 27), 
        c(0, dnorm(seq(21, 27, length.out = 100), media_temp, desviacion_temp), 0), 
        col = "orange", density = 20)

# Gráfico 3: Ejercicio 3 - Distribución de pesos
x_peso <- seq(media_peso - 3*desviacion_peso, media_peso + 3*desviacion_peso, length.out = 100)
y_peso <- dnorm(x_peso, media_peso, desviacion_peso)
plot(x_peso, y_peso, type = "l", lwd = 2, col = "brown", main = "Ejercicio 3: Pesos de estudiantes",
     xlab = "Peso (kg)", ylab = "Densidad")
abline(v = c(60, 64, 75, 90), col = c("blue", "red", "blue", "green"), lty = 2)
legend("topright", legend = c("60-75 kg", "64 kg", ">90 kg"), 
       col = c("blue", "red", "green"), lty = 2)

# Gráfico 4: Ejercicio 4 - Distribución de calificaciones
x_examen <- seq(media_examen - 3*desviacion_examen, media_examen + 3*desviacion_examen, length.out = 100)
y_examen <- dnorm(x_examen, media_examen, desviacion_examen)
plot(x_examen, y_examen, type = "l", lwd = 2, col = "darkgreen", main = "Ejercicio 4: Calificaciones",
     xlab = "Calificación", ylab = "Densidad")
abline(v = c(72, 84, puntuacion_no_apto), col = c("red", "blue", "orange"), lty = 2)
legend("topright", legend = c("72", "84", "Límite No-Apto"), 
       col = c("red", "blue", "orange"), lty = 2)

# DNR - Ejercicios de Distribución Binomial y Normal (5-8)

# --------------------------------------------------------------------------
# EJERCICIO 5: Probabilidad binomial - Familias con teléfono
# --------------------------------------------------------------------------
cat("EJERCICIO 5: Familias con teléfono\n")
cat("----------------------------------\n")

n5 <- 90
p5 <- 1/3
k5 <- 30

# Probabilidad de que al menos 30 familias tengan teléfono
# P(X >= 30) = 1 - P(X <= 29)
prob_al_menos_30 <- 1 - pbinom(29, n5, p5)

# Usando aproximación normal (para verificar)
media_binom <- n5 * p5
varianza_binom <- n5 * p5 * (1 - p5)
desviacion_binom <- sqrt(varianza_binom)

# Corrección por continuidad
z <- (29.5 - media_binom) / desviacion_binom
prob_aprox <- 1 - pnorm(z)

cat("Parámetros binomiales:\n")
cat("n =", n5, ", p =", round(p5, 4), "\n")
cat("Media =", media_binom, "\n")
cat("Desviación estándar =", round(desviacion_binom, 4), "\n\n")

cat("Probabilidad exacta (binomial) P(X >= 30):\n")
cat("P(X >= 30) =", round(prob_al_menos_30, 6), "\n")

cat("Probabilidad aproximada (normal) P(X >= 30):\n")
cat("P(X >= 30) ≈", round(prob_aprox, 6), "\n\n")

# --------------------------------------------------------------------------
# EJERCICIO 6: Probabilidad binomial - Hogares con televisores
# --------------------------------------------------------------------------
cat("EJERCICIO 6: Hogares con televisores\n")
cat("------------------------------------\n")

n6 <- 50
p6 <- 0.60

# a) Probabilidad de que al menos 20 tengan al menos 2 televisores
# P(X >= 20) = 1 - P(X <= 19)
prob_a6 <- 1 - pbinom(19, n6, p6)

# b) Probabilidad de que entre 35 y 40 hogares tengan al menos 2 televisores
# P(35 <= X <= 40) = P(X <= 40) - P(X <= 34)
prob_b6 <- pbinom(40, n6, p6) - pbinom(34, n6, p6)

# Aproximación normal para verificación
media_6 <- n6 * p6
desviacion_6 <- sqrt(n6 * p6 * (1 - p6))

# a) con aproximación normal (corrección por continuidad)
z_a6 <- (19.5 - media_6) / desviacion_6
prob_a6_aprox <- 1 - pnorm(z_a6)

# b) con aproximación normal
z_b6_inf <- (34.5 - media_6) / desviacion_6
z_b6_sup <- (40.5 - media_6) / desviacion_6
prob_b6_aprox <- pnorm(z_b6_sup) - pnorm(z_b6_inf)

cat("Parámetros binomiales:\n")
cat("n =", n6, ", p =", p6, "\n")
cat("Media =", media_6, "\n")
cat("Desviación estándar =", round(desviacion_6, 4), "\n\n")

cat("a) Probabilidad de al menos 20 hogares:\n")
cat("   Exacta (binomial): P(X >= 20) =", round(prob_a6, 6), "\n")
cat("   Aproximada (normal): P(X >= 20) ≈", round(prob_a6_aprox, 6), "\n\n")

cat("b) Probabilidad entre 35 y 40 hogares:\n")
cat("   Exacta (binomial): P(35 ≤ X ≤ 40) =", round(prob_b6, 6), "\n")
cat("   Aproximada (normal): P(35 ≤ X ≤ 40) ≈", round(prob_b6_aprox, 6), "\n\n")

# --------------------------------------------------------------------------
# EJERCICIO 7: Probabilidad en distribución normal - Regla 3 sigma
# --------------------------------------------------------------------------
cat("EJERCICIO 7: Regla 3 sigma\n")
cat("--------------------------\n")

# P(μ - 3σ ≤ X ≤ μ + 3σ)
# Esto es la probabilidad dentro de 3 desviaciones estándar de la media

prob_3sigma <- pnorm(3) - pnorm(-3)
porcentaje_3sigma <- prob_3sigma * 100

cat("Probabilidad dentro de ±3 desviaciones estándar:\n")
cat("P(μ - 3σ ≤ X ≤ μ + 3σ) =", round(prob_3sigma, 6), "\n")
cat("Esto representa el", round(porcentaje_3sigma, 2), "% de la distribución\n\n")

# Verificación con valores específicos
mu <- 0
sigma <- 1
prob_verificacion <- pnorm(mu + 3*sigma, mu, sigma) - pnorm(mu - 3*sigma, mu, sigma)
cat("Verificación con μ = 0, σ = 1:\n")
cat("P(-3 ≤ X ≤ 3) =", round(prob_verificacion, 6), "\n\n")

# --------------------------------------------------------------------------
# EJERCICIO 8: Distribución normal - Venta de teléfonos
# --------------------------------------------------------------------------
cat("EJERCICIO 8: Venta de teléfonos móviles\n")
cat("--------------------------------------\n")

media_8 <- 15
desviacion_8 <- 4

# a) Probabilidad de vender más de 21 teléfonos
prob_a8 <- 1 - pnorm(21, media_8, desviacion_8)

# b) Probabilidad de vender menos de 7 teléfonos
prob_b8 <- pnorm(7, media_8, desviacion_8)

# c) Probabilidad de vender al menos 17 teléfonos
prob_c8 <- 1 - pnorm(17, media_8, desviacion_8)

# d) Probabilidad de vender entre 11 y 19 teléfonos
prob_d8 <- pnorm(19, media_8, desviacion_8) - pnorm(11, media_8, desviacion_8)

cat("Parámetros de la distribución normal:\n")
cat("Media =", media_8, "teléfonos\n")
cat("Desviación estándar =", desviacion_8, "teléfonos\n\n")

cat("a) Probabilidad de vender más de 21 teléfonos:\n")
cat("   P(X > 21) =", round(prob_a8, 6), "\n")

cat("b) Probabilidad de vender menos de 7 teléfonos:\n")
cat("   P(X < 7) =", round(prob_b8, 6), "\n")

cat("c) Probabilidad de vender al menos 17 teléfonos:\n")
cat("   P(X ≥ 17) =", round(prob_c8, 6), "\n")

cat("d) Probabilidad de vender entre 11 y 19 teléfonos:\n")
cat("   P(11 ≤ X ≤ 19) =", round(prob_d8, 6), "\n\n")

# --------------------------------------------------------------------------
# GRÁFICOS
# --------------------------------------------------------------------------
cat("Generando gráficos...\n")

# Configurar área de gráficos
par(mfrow = c(2, 2), mar = c(4, 4, 2, 1))

# Gráfico 1: Ejercicio 5 - Distribución binomial
x_binom <- 0:n5
y_binom <- dbinom(x_binom, n5, p5)
plot(x_binom, y_binom, type = "h", lwd = 2, col = "blue", 
     main = "Ejercicio 5: Distribución Binomial\nFamilias con teléfono",
     xlab = "Número de familias", ylab = "Probabilidad")
abline(v = 30, col = "red", lwd = 2)
legend("topright", legend = c("Distribución", "Umbral (30)"), 
       col = c("blue", "red"), lwd = 2)

# Gráfico 2: Ejercicio 6 - Distribución binomial
x_binom6 <- 0:n6
y_binom6 <- dbinom(x_binom6, n6, p6)
plot(x_binom6, y_binom6, type = "h", lwd = 2, col = "purple", 
     main = "Ejercicio 6: Distribución Binomial\nHogares con TV",
     xlab = "Número de hogares", ylab = "Probabilidad")
abline(v = c(20, 35, 40), col = c("red", "green", "green"), lwd = 2)
legend("topright", legend = c("Distribución", "Umbral 20", "Rango 35-40"), 
       col = c("purple", "red", "green"), lwd = 2)

# Gráfico 3: Ejercicio 7 - Regla 3 sigma
x_norm <- seq(-4, 4, length.out = 100)
y_norm <- dnorm(x_norm)
plot(x_norm, y_norm, type = "l", lwd = 2, col = "darkgreen", 
     main = "Ejercicio 7: Regla 3 Sigma",
     xlab = "Desviaciones estándar", ylab = "Densidad")
abline(v = c(-3, 3), col = "red", lty = 2)
polygon(c(-3, seq(-3, 3, length.out = 100), 3), 
        c(0, dnorm(seq(-3, 3, length.out = 100)), 0), 
        col = "lightgreen", density = 20)
legend("topright", legend = c("Distribución", "±3σ", "99.73%"), 
       col = c("darkgreen", "red", "lightgreen"), lwd = 2)

# Gráfico 4: Ejercicio 8 - Venta de teléfonos
x_telefonos <- seq(media_8 - 3*desviacion_8, media_8 + 3*desviacion_8, length.out = 100)
y_telefonos <- dnorm(x_telefonos, media_8, desviacion_8)
plot(x_telefonos, y_telefonos, type = "l", lwd = 2, col = "orange", 
     main = "Ejercicio 8: Venta de teléfonos",
     xlab = "Teléfonos vendidos", ylab = "Densidad")
abline(v = c(7, 11, 17, 19, 21), col = c("red", "blue", "blue", "blue", "red"), lty = 2)
legend("topright", legend = c("Distribución", "Umbrales críticos"), 
       col = c("orange", "red"), lwd = 2)

cat("--- EJERCICIOS COMPLETADOSS ---\n")


