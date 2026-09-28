const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamodb, TABLE_NAME } = require("./dynamodb");

// ELIMINAR RESERVA
exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const resultado = await dynamodb.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
        ReturnValues: "ALL_OLD",
      })
    );

    if (!resultado.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          mensaje: "Reserva no encontrada",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        mensaje: "Reserva eliminada correctamente",
        reserva: resultado.Attributes,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        mensaje: "Error al eliminar la reserva",
      }),
    };
  }
};