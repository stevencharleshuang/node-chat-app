const socket    = io();
const timestamp = Date.now();

socket.on('connect', () => {
  console.log('<<< Client: Connected to socket');

});

socket.on('disconnect', () => {
  console.log('<<< Client: Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('<<< Client: New Message: ', message);
  let li = $('<li></li>');
  li.text(`${message.origin}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');

  li.text(`${message.origin}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    origin: socket.id,
    text: $('[name=message]').val()
  }, () => {
    console.log('<<< Client: Message sent');
  })
});

const locationButton = $('#send-location');

locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser =(');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      long: position.coords.longitude
    })
  }, () => {
    alert('Unable to fetch location');
  })
});
