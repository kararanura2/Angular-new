const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const VAPID_PUBLIC = "BEr_Y7ZgrCC4ajt4b33CxeuMGRQFU0ALIZ4MX6vqPMMV42KFteuDTtDtwGZDKSqcGhieH9E_mZXxdrVdLkw3F3E";
const VAPID_PRIVATE = "WMWeGrw18nuVr4lWVoQN5FnTSm1dfGEAAXZV-vLxMfo";

webpush.setVapidDetails(
  "mailto:test@example.com",
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

webpush.sendNotification(subscription, JSON.stringify({
  title: "Test Notification",
  body: "If you see this, push works"
}));
 

let subscriptions = [];

app.post("/subscribe", (req, res) => {
  const sub = req.body;
  subscriptions.push(sub);
  res.status(201).json({});
  console.log("New subscription saved.");
});

app.get("/sendNotification", async (req, res) => {
  const payload = JSON.stringify({
    title: "Rick & Morty Notification!",
    body: "A new episode or update is available!",
    icon: "/icons/icon-192.png"
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => console.error(err));
  });

  res.send("Notifications sent.");
});

app.listen(3000, () => console.log("Server running on port 3000"));
