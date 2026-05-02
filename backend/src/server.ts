import { app } from "./app.js";
import { env } from "./config/env.js";

const PORT = env.port || 5000;
const HOST = "0.0.0.0"; // allows localhost + LAN access

app.listen(PORT, HOST, () => {
  console.log("=======================================");
  console.log(`🚀 SIHS backend running`);
  console.log(`🌐 Local:   http://localhost:${PORT}`);
  console.log(`🌍 Network: http://YOUR_IP_ADDRESS:${PORT}`);
  console.log("=======================================");
});

// 🔴 Handle server errors (VERY IMPORTANT)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});