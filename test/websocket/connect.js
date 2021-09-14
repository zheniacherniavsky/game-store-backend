const socket = new WebSocket('ws://localhost:3001');

socket.onmessage = (event) => {
  log(event.data);
};

function log(message) {
  const div = document.createElement('div');
  div.innerHTML = message;
  document.body.appendChild(div);
}
