const socket    = io();
const timestamp = Date.now();

socket.on('connect', () => {
  console.log('<<< Client: Connected to socket');

});

socket.on('disconnect', () => {
  console.log('<<< Client: Disconnected from server');
});

socket.on('newMessage', (message) => {
  // console.log('<<< Client: New Message: ', message);
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  li.text(`${message.origin} ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');

  li.text(`${message.origin} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
  let messageTextbox = $('[name=message]');

  e.preventDefault();
  socket.emit('createMessage', {
    origin: socket.id,
    text: messageTextbox.val()
  }, () => {
    messageTextbox.val('');
  })
});

const locationButton = $('#send-location');

locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser =(');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      long: position.coords.longitude
    })
  }, () => {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  })
});
