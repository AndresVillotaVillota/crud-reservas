const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");
const { dynamodb, TABLE_NAME } = require("./dynamodb");

// CREAR RESERVA
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    if (!body.nombre || !body.fecha || !body.cancha) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: "Los campos nombre, fecha y cancha son obligatorios",
        }),
      };
    }

    const reserva = {
      id: randomUUID(),
      nombre: body.nombre,
      fecha: body.fecha,
      cancha: body.cancha,
      estado: body.estado || "activa",
      creadaEn: new Date().toISOString(),
    };

    await dynamodb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: reserva,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(reserva),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        mensaje: "Error al crear la reserva",
      }),
    };
  }
};