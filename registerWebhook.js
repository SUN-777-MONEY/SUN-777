const axios = require("axios");
require("dotenv").config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // e.g., https://sun-777.onrender.com
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

const registerWebhook = async () => {
  try {
    console.log("Setting Telegram webhook with URL:", `${WEBHOOK_URL}/bot${BOT_TOKEN}`); // Debug log
    const telegramResponse = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
      {
        params: {
          url: `${WEBHOOK_URL}/bot${BOT_TOKEN}`
        }
      }
    );
    console.log("Telegram webhook response:", telegramResponse.data);

    // Register Helius Webhook
    if (HELIUS_API_KEY) {
      console.log("Attempting to register Helius webhook with URL:", `${WEBHOOK_URL}/webhook`);
      const heliusPayload = { webhookUrl: `${WEBHOOK_URL}/webhook`, webhookType: "EVENTS" };
      const heliusResponse = await axios.post(
        "https://api.helius.xyz/v1/webhooks",
        heliusPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${HELIUS_API_KEY}` // Direct API key without extra encoding
          }
        }
      );
      console.log("Helius webhook response:", heliusResponse.data);
    } else {
      console.log("HELIUS_API_KEY not found, skipping Helius webhook registration");
    }
  } catch (error) {
    console.error("Failed to register webhook:", error.response?.data || error.message);
  }
};

// Run the function
registerWebhook();
