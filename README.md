# CRUD de Reservas - Serverless AWS

API REST serverless para la gestión de reservas, desarrollada con Node.js y Serverless Framework y desplegada en Amazon Web Services (AWS).

El proyecto implementa las operaciones CRUD (Crear, Consultar, Actualizar y Eliminar) utilizando AWS Lambda para la lógica de negocio, Amazon API Gateway para exponer los endpoints HTTP y Amazon DynamoDB como base de datos NoSQL.

## Tecnologías utilizadas

- Node.js 24
- Serverless Framework v4
- Serverless Offline
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- AWS SDK for JavaScript v3
- AWS CloudFormation
- Postman
- Git y GitHub

## Arquitectura

La aplicación utiliza una arquitectura serverless:

```text
Cliente / Postman
       |
       v
Amazon API Gateway
       |
       v
   AWS Lambda
       |
       v
 Amazon DynamoDB
```

Cada operación del CRUD está implementada en una función independiente dentro de la carpeta `src`.

## Estructura del proyecto

```text
crud-reservas/
│
├── src/
│   ├── actualizarReserva.js
│   ├── crearReserva.js
│   ├── dynamodb.js
│   ├── eliminarReserva.js
│   ├── listarReservas.js
│   └── obtenerReserva.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── serverless.yml
```

Las carpetas `node_modules` y `.serverless` son generadas localmente y no se incluyen en el repositorio.

## Modelo de una reserva

Una reserva contiene la siguiente información:

```json
{
  "id": "UUID generado automáticamente",
  "nombre": "Andres Villota",
  "fecha": "2026-10-06",
  "cancha": "Cancha Postman 1",
  "estado": "activa",
  "creadaEn": "fecha y hora de creación"
}
```

El campo `id` se genera automáticamente mediante UUID.

Si no se especifica un estado al crear una reserva, el sistema utiliza `activa` como valor predeterminado.

## Endpoints

La API desplegada en AWS utiliza la siguiente URL base:

```text
https://w531fh8s2f.execute-api.us-east-1.amazonaws.com
```

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/reservas` | Crear una reserva |
| GET | `/reservas` | Listar todas las reservas |
| GET | `/reservas/{id}` | Obtener una reserva por ID |
| PUT | `/reservas/{id}` | Actualizar una reserva |
| DELETE | `/reservas/{id}` | Eliminar una reserva |

## Crear una reserva

### POST `/reservas`

Ejemplo de solicitud:

```json
{
  "nombre": "Andres Villota",
  "fecha": "2026-10-06",
  "cancha": "Cancha Postman 1"
}
```

Ejemplo de respuesta:

```json
{
  "id": "UUID",
  "nombre": "Andres Villota",
  "fecha": "2026-10-06",
  "cancha": "Cancha Postman 1",
  "estado": "activa",
  "creadaEn": "fecha y hora de creación"
}
```

Código HTTP esperado:

```text
201 Created
```

## Listar reservas

### GET `/reservas`

Retorna todas las reservas almacenadas en DynamoDB.

Código HTTP esperado:

```text
200 OK
```

Si no existen reservas, la API retorna:

```json
[]
```

## Obtener una reserva

### GET `/reservas/{id}`

Permite consultar una reserva específica mediante su identificador.

Código HTTP esperado:

```text
200 OK
```

Si la reserva no existe:

```json
{
  "mensaje": "Reserva no encontrada"
}
```

Código HTTP:

```text
404 Not Found
```

## Actualizar una reserva

### PUT `/reservas/{id}`

Ejemplo:

```json
{
  "nombre": "Andres Villota",
  "fecha": "2026-10-07",
  "cancha": "Cancha Postman 2",
  "estado": "confirmada"
}
```

Código HTTP esperado:

```text
200 OK
```

## Eliminar una reserva

### DELETE `/reservas/{id}`

Cuando la operación se realiza correctamente, la API responde:

```json
{
  "mensaje": "Reserva eliminada correctamente",
  "reserva": {
    "id": "UUID"
  }
}
```

Código HTTP esperado:

```text
200 OK
```

Si el ID no existe, la API responde con:

```text
404 Not Found
```

## Validaciones

Los campos obligatorios para crear y actualizar una reserva son:

- `nombre`
- `fecha`
- `cancha`

Si alguno de estos campos no se proporciona, la API responde con código:

```text
400 Bad Request
```

## Instalación

Clonar el repositorio y acceder al proyecto:

```bash
git clone https://github.com/AndresVillotaVillota/crud-reservas.git
cd crud-reservas
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución local

El proyecto utiliza `serverless-offline` para ejecutar la API localmente.

```bash
serverless offline
```

La API estará disponible en:

```text
http://localhost:3000
```

Endpoints locales:

```text
POST   http://localhost:3000/reservas
GET    http://localhost:3000/reservas
GET    http://localhost:3000/reservas/{id}
PUT    http://localhost:3000/reservas/{id}
DELETE http://localhost:3000/reservas/{id}
```

La ejecución local utiliza las credenciales y configuración de AWS disponibles en el entorno para acceder a DynamoDB.

## Despliegue en AWS

Para desplegar la aplicación:

```bash
serverless deploy
```

El despliegue crea o actualiza los recursos definidos en `serverless.yml`, incluyendo:

- Funciones AWS Lambda
- API Gateway
- Tabla DynamoDB
- Recursos administrados mediante CloudFormation

Región utilizada:

```text
us-east-1
```

Stage:

```text
dev
```

Tabla DynamoDB:

```text
crud-reservas-dev-reservas
```

Stack:

```text
crud-reservas-dev
```

## Pruebas

El funcionamiento de la API fue validado tanto localmente con `serverless-offline` como sobre el despliegue realizado en AWS.

También se realizaron pruebas utilizando Postman para verificar:

- Creación de reservas (`POST`)
- Consulta de reservas (`GET`)
- Consulta por identificador (`GET`)
- Actualización de reservas (`PUT`)
- Eliminación de reservas (`DELETE`)
- Respuesta `404 Not Found` después de eliminar una reserva

## Autor

**Andres Villota**

Proyecto desarrollado para el Taller 3 de Cloud Computing.