let messageInput = null;
let messagesWrapper = null;
let ownedMessage = null;
let notOwnedMessage = null;

let lastMessageId = 0;

const name = 'Capybara';

async function sendMessage() {
 const messageText = messageInput.value.trim();
  if (messageText == '')
    return;

  messageInput.value = '';
  messageInput.focus();

  const newMessage = ownedMessage.cloneNode(true);
  newMessage.innerText = messageText;
  newMessage.style.display = 'flex';
  messagesWrapper.append(newMessage);

  ++lastMessageId;

  const encoder = new TextEncoder();
  const nameBytes = encoder.encode(name);
  const messageBytes = encoder.encode(messageText);

  const nameLen = nameBytes.length;
  const messageLen = messageBytes.length;

  const buffer = new ArrayBuffer(nameLen + messageLen + 2);
  const view = new DataView(buffer);

  view.setUint8(0, nameLen);
  for (let i = 0; i < nameLen; ++i)
      view.setUint8(1 + i, nameBytes[i]);

  view.setUint8(nameLen + 1, messageLen);
  for (let i = 0; i < messageLen; ++i)
      view.setUint8(nameLen + 2 + i, messageBytes[i]);

  const response = await fetch(URL + 'min/api/send-message', {
    method: 'POST',
    body: buffer,
  });

  const responseText = (await response.text()).trim();
  if (responseText != 'Success')
    console.error(responseText);
}

async function pollMessages() {
  const response = await fetch(URL + 'min/api/poll-messages', {
    method: 'POST',
    body: lastMessageId.toString(),
  });
  const responseText = await response.text();

  const messages = responseText
                     .split('\n')
                     .map((message) => message.split(': '))
                     .filter((message) => message[0] != '' && message[0] != name);

  messages.forEach((message) => {
    const newMessage = notOwnedMessage.cloneNode(true);
    newMessage.innerText = message[0] + ': ' + message[1];
    newMessage.style.display = 'flex';
    messagesWrapper.append(newMessage);
  });

  if (messages.length > 0)
    ++lastMessageId;

  setTimeout(pollMessages, 200);
}

window.onload = () => {
  messageInput = document.querySelector('.message-input');
  messagesWrapper = document.querySelector('.messages-wrapper');
  ownedMessage = document.querySelector('.owned-message');
  notOwnedMessage = document.querySelector('.non-owned-message');

  messageInput.focus();

  messageInput.onkeydown = async (event) => {
    if (event.key == 'Enter')
      await sendMessage();
  };

  document.querySelector('.send-message-button').onclick = async () => {
    await sendMessage();
  };

  setTimeout(pollMessages, 200);
};
