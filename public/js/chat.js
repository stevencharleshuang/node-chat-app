const socket    = io();
const timestamp = Date.now();

function scrollToBottom() {
  // Selectors
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child');
  // Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  // console.log('<<< Client: Connected to socket');
  let params = $.deparam(window.location.search);
  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('<<< Client: No Error');
    }
  });
});

socket.on('disconnect', () => {
  console.log('<<< Client: Disconnected from server');
});

socket.on('newMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    origin: message.origin,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
  // console.log('<<< Client: New Message: ', message);
  // let li = $('<li></li>');
  // li.text(`${message.origin} ${formattedTime}: ${message.text}`);
  // $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    origin: message.origin,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
  // let li = $('<li></li>');
  // let a = $('<a target="_blank">My current location</a>');

  // li.text(`${message.origin} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // $('#messages').append(li);
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
