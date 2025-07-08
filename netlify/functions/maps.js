const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // 從環境變數讀取金鑰

  // 從前端拿到路線參數，例如起點、終點
  const { origin, destination } = JSON.parse(event.body);

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};