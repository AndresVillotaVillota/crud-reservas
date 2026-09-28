const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamodb, TABLE_NAME } = require("./dynamodb");

// OBTENER UNA RESERVA
exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const resultado = await dynamodb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (!resultado.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: "Reserva no encontrada",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(resultado.Item),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        mensaje: "Error al obtener la reserva",
      }),
    };
  }
};