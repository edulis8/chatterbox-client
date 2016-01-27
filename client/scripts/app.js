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
  room : 'lobby',
  username : "anonymous",
  lastMessageId: 0,

  init : function(){
    app.username = window.location.search.slice(10);

    app.$main = $('#main');
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$send = $('#send');
    /////// Event Listeners /////////////
    app.$roomSelect.on('change', app.saveRoom);
    app.$send.on('submit', app.handleSubmit);

    app.stopSpinner();
    app.fetch();

    setInterval(app.fetch, 3000);
  },

  saveRoom: function(event){
    var selectedIndex = app.$roomSelect.prop('selectedIndex');
    if (selectedIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        app.room = roomname;
        // This should check if room already exists!:
        app.addRoom(roomname);
        // This is already in populateRooms. Not DRY. Could be decoupled/functioned out:
        app.$roomSelect.val(roomname);

        app.fetch();
      }
    } else {
      app.room = app.$roomSelect.val();

      app.fetch();
    }

  },
  
  send : function(message){
    app.startSpinner();

    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        app.fetch();
        console.log('suc',JSON.stringify(message));
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (reason) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', reason);
      },
      complete: function(){
        app.stopSpinner();
      }
    });  
  },
  
  fetch: function(){
    app.startSpinner();
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: { order: '-createdAt'},
      complete: function(){
        app.stopSpinner();
      },
      success: function (data) {
        // Process room data
        app.populateRooms(data.results);
        //Process chat data
        app.populateMessages(data.results);
      },      
      error: function (reason) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message. Error: ', reason);
      }
    });
  },
  startSpinner : function(){
    $('.spinner img').show();
  },
  stopSpinner : function(){
    $('.spinner img').hide();
  },
  populateMessages: function(results){
    app.clearMessages();
    if (Array.isArray(results)) {
      results.forEach(app.addMessage);
    }
  },

  populateRooms : function(results){
    app.$roomSelect.html('<option value="__newRoom">NewRoom...</option><option value="lobby" selected>Lobby</option>');

    if (results) {
      var processedRooms = {};

      if (app.room !== 'lobby') {
        app.addRoom(app.room);
        processedRooms[app.room] = true;
      }

      results.forEach(function(data){
        var roomname = data.roomname;
        if (roomname && !processedRooms[roomname]) {
          app.addRoom(roomname);

          processedRooms[roomname] = true;
        }
      });
    }
    app.$roomSelect.val(app.room);
  },

  clearMessages : function(){
    app.$chats.empty();
  },
  addMessage : function(data){
    if (!data.roomname) {
      data.roomname = 'lobby';
    }
    // only append to selected room
    if (data.roomname === app.room) {
      $chat = $('<div />').addClass("chat");
      var $username = $('<span class="username" />');
      $username.text(data.username + ': ')
        .attr('data-username', data.username)
        .attr('data-roomname', data.roomname)
        .appendTo($chat);

      var $message = $('<br /><span />');
      $message.text(data.text)
        .appendTo($chat);

      app.$chats.append($chat);
    }
  },
  
  addRoom : function(roomname){
    var $option = $('<option />').val(roomname).text(roomname);
    app.$roomSelect.append($option);
  },
  
  addFriend : function(username){
    app.friendList[username] = true;
  },

  
  handleSubmit : function(event){
    event.preventDefault();
    var message = {
      username: app.username,
      roomname: app.room || 'lobby',
      message: app.$message.val()
    };
    console.log(app.$message.val())
    app.send(message);    
  }
};


});










