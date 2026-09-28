const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamodb, TABLE_NAME } = require("./dynamodb");

// LISTAR TODAS LAS RESERVAS
exports.handler = async () => {
  try {
    const resultado = await dynamodb.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(resultado.Items || []),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        mensaje: "Error al listar las reservas",
      }),
    };
  }
};