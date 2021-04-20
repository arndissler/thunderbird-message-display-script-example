/**
 * Use the startup phase to tell Thunderbird that it should load
 * our message-content-script.js file whenever a message is displayed
 */
const handleStartup = () => {
  messenger.messageDisplayScripts.register({
    js: [{ file: "/src/message-content-script.js" }],
  });
};

/**
 * Once a pmessage is displayed we have access to all the code we
 * have in our message-content-script.js file as it is loaded in the
 * context of the message, so call the showNotification method with
 * some additional details to show the notification
 */
const handleMessageDisplayed = async (tab, messageHeader) => {
  const { id } = tab;

  // create the information chunk we want to pass to our script
  const notificationDetails = {
    text: `Mail subject is "${messageHeader.subject}"`,
  };

  // tell Thunderbird to use the styles we defined in message-content-styles.css
  messenger.tabs.insertCSS(id, {
    file: "/src/message-content-styles.css",
  });

  // tell our script to create the notification.
  // As we can't pass objects here we have to serialize the content
  messenger.tabs.executeScript(id, {
    code: `showNotification(${JSON.stringify(notificationDetails)})`,
  });
};

/**
 * Add a handler to the handleMessageDisplayed event to
 * get notified when the user selects a new message
 */
browser.messageDisplay.onMessageDisplayed.addListener(handleMessageDisplayed);

/**
 * Execute the startup handler whenever Thunderbird starts
 */
document.addEventListener("DOMContentLoaded", handleStartup);
