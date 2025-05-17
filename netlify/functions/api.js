exports.handler = async function(event, context) {
  // Simple handler without dependencies
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: "API is working!",
      timestamp: new Date().toISOString()
    })
  };
};