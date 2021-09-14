const socket = new WebSocket('ws://localhost:3001');

socket.onopen = () => {
  console.info('connected to ws://localhost:3001');
};

socket.onmessage = (event) => {
  log(event.data);
};

function log(message) {
  const ratingsArray = JSON.parse(message);
  console.log(ratingsArray);
  document.querySelector('#data').innerHTML = ratingsArray
    .map(
      (rating) =>
        `ProductId: ${rating.productId}<br>UserId: ${rating.userId}<br>Rating: ${rating.rating}<br>Date: ${rating.createdAt}`
    )
    .join('<br><br>');
}
