const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamodb, TABLE_NAME } = require("./dynamodb");

// ACTUALIZAR RESERVA
exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body || "{}");

    if (!body.nombre || !body.fecha || !body.cancha) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          mensaje: "Los campos nombre, fecha y cancha son obligatorios",
        }),
      };
    }

    const resultado = await dynamodb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression:
          "SET nombre = :nombre, fecha = :fecha, cancha = :cancha, #estado = :estado",
        ExpressionAttributeNames: {
          "#estado": "estado",
        },
        ExpressionAttributeValues: {
          ":nombre": body.nombre,
          ":fecha": body.fecha,
          ":cancha": body.cancha,
          ":estado": body.estado || "activa",
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(resultado.Attributes),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        mensaje: "Error al actualizar la reserva",
      }),
    };
  }
};