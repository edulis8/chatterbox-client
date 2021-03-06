// YOUR CODE HERE:

// Note: The URL you should be using is https://api.parse.com/1/classes/chatterbox

// Display messages retrieved from the parse server.
// Setup a way to refresh the displayed messages (either automatically or with a button).
// Be careful to use proper escaping on any user input. Since you're
// displaying input that other users have typed, your app is vulnerable to
// XSS attacks.
// Note: If you issue an XSS attack, please make it innocuous enough to be educational, rather than disruptive.

// Allow users to select a username and send messagaes

var app;
$(document).ready(function(){
app = {
  
  server : 'https://api.parse.com/1/classes/chatterbox',
  
  username : window.location.search.slice(10),
  lastMessageId: 0,

  init : function(value){
    return value;
  },
  
  send : function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });  
  },
  
  fetch: function(){
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      data: { order: '-createdAt'},
      success: function (data) {
        var mostRecentMessage = data.results[0];
        if (mostRecentMessage.objectId !== app.lastMessageId){
          for(var i = 0; i < data.results.length; i++){
            this.addMessage(data.results[i]);
          }
          app.lastMessageId = mostRecentMessage.objectId;
        }

      }.bind(this),      
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message. Error: ', data);
      }
    });
  },
  
  clearMessages : function(){
    $('#chats').empty();
  },
  hideMessages : function(room){
    $('#chats').children().hide();
    // hide all messages that aren't in our selected room
    console.log('yo');
    $('.'+room).show();
    // messages.not('.'+room).hide();
  },
  addMessage : function(msg){
      var username = _.escape(msg.username);
      var text = _.escape(msg.text);
      var room = _.escape(msg.roomname);
      var message_div = $('<div class = "'+room+'"><span class = "username">' + username + '</span>' + ' : ' + text + '</div>');
      $('#chats').append(message_div);
      app.addRoom(room);
  },
  
  addRoom : function(room){
    if(!app.roomList[room]){
      app.roomList[room] = true;
      $('#roomSelect').append('<option value="'+room+'">'+room+'</option>');
    }
  },
  
  roomList : {
    'BoomBoom':true,
    'Champagne': true,
    'VIP Room': true,
    'DarkRoom': true
  },
  
  addFriend : function(username){
    app.friendList[username] = true;
  },

  friendList : {},
  
  handleSubmit : function(message){
    app.send(message);
  }
};


app.fetch();

// setInterval(function(){
//   app.clearMessages();
//   app.fetch();
// }, 5000);


  $('.form-message').submit(function(e){
    e.preventDefault();
    var text = $('.message').val();
    var room = $('#roomSelect').val();

    var message = {
      username: app.username,
      text: text,
      roomname: room
    };

    app.handleSubmit(message);
    $('.message').val('');
  });
  
  $('select').change(function(){
    var room = _.escape($(this).val());
    console.log(room);
    app.hideMessages(room);
  });
  

  $('body').on('click', '.username', function(){
    var username = $(this).html();
    app.addFriend(username);
    if(app.friendList[username]){
      $('span:contains('+username+')').parent().addClass('highlight');
    }
  });

  $('.createRoom').on('click', function(){
    $('.roomInput').show();
  });

  $('.createRoom form').on('submit', function(event){
    var room = _.escape($('.roomInput').val());
    event.preventDefault();
    // var room = _.escape($('.roomInput').val());
    console.log(room);
    app.addRoom(room);
    $('.roomInput').hide();
  });


});

// $('div:contains("test")'


////////////// ESCAPE FUNCTION //////////
//////////////////////
// use underscore _.escape or:
/////////////////////
// var escape = document.createElement('textarea');
// function escapeHTML(html) {
//     escape.textContent = html;
//     return escape.innerHTML;
// }

// function unescapeHTML(html) {
//     escape.innerHTML = html;
//     return escape.textContent;
// }









