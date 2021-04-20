const showNotification = (notificationDetails) => {
  console.log(notificationDetails);
  // get the details back from the formerly serialized content
  const { text } = notificationDetails;

  // create the notification element itself
  const notification = document.createElement("div");
  notification.className = "thunderbirdMessageDisplayActionExample";
  notification.innerText = text;

  // and insert it as the very first element in the message
  document.body.insertBefore(notification, document.body.firstChild);
};
