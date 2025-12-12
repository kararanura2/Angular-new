self.addEventListener('push', (event) => {
  console.log("Push received:", event);
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
    })
  );
});
