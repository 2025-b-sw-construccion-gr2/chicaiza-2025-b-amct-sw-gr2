# ETAPA 3 – Vulnerabilidad en React

Contexto: React es una librería muy usada para construir interfaces web. En diciembre de 2025 se reportó una vulnerabilidad grave que permitía a atacantes ejecutar código en el servidor.
 

## Párrafo correcto: Párrafo 5 ✅  
Dentro de los detalles técnicos, se menciona que React Server Components utiliza un mecanismo de serialización y deserialización para transmitir estados entre cliente y servidor. Cuando este proceso no valida adecuadamente los datos recibidos, un atacante puede inyectar estructuras manipuladas que, al ser interpretadas por el servidor, terminan ejecutando instrucciones arbitrarias. Aunque en los comunicados oficiales se habla de “fallo de seguridad en la comunicación”, lo que realmente ocurre es que la deserialización insegura abre la puerta a la ejecución remota de código, incluso sin credenciales previas.

## Explicación:

La vulnerabilidad ocurre porque React Server Components envía información entre el cliente y el servidor usando procesos de serialización y deserialización.
El problema aparece cuando el servidor no valida correctamente los datos deserializados, permitiendo que un atacante envíe estructuras manipuladas.
Al interpretarlas, el servidor termina ejecutando código arbitrario, lo que provoca ejecución remota de código, incluso sin autenticación previa.
