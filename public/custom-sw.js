self.addEventListener('push', (event) => {
  console.log("Push received:", event);
  console.log("CUSTOM SW LOADED!");

  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
    })
  );
});


webpush.sendNotification(subscription, JSON.stringify({
  title: "Test Notification",
  body: "If you see this, push works"
}));

