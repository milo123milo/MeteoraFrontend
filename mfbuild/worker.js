console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "https://lh3.googleusercontent.com/drive-viewer/AKGpiharD2U4CAqBWP8ROwYkY2tkp-3Gl08iwQheAbpdxvU22C6kLKX4pjdzqPY_4x8-P6-TqFhg2tkCR2xmO_tc_8QEfY0kZ8A0vvY=s2560"
  });
});