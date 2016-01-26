// YOUR CODE HERE:

// Note: The URL you should be using is https://api.parse.com/1/classes/chatterbox

// Display messages retrieved from the parse server.
// Setup a way to refresh the displayed messages (either automatically or with a button).
// Be careful to use proper escaping on any user input. Since you're
// displaying input that other users have typed, your app is vulnerable to
// XSS attacks.
// Note: If you issue an XSS attack, please make it innocuous enough to be educational, rather than disruptive.

// Allow users to select a username and send messagaes
$(document).ready(function(){

var app = {
  
  server : 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
  
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
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      success: function (data) {
        for(var i = 0; i < data.results.length; i++){
          this.addMessage(data.results[i]);
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
  
  addMessage : function(msg){
      var username = _.escape(msg.username);
      var text = _.escape(msg.text);
      var message_div = $('<div>' + username + ' : ' + text + '</div>');
      $('#chats').append(message_div);
  },
  
  addRoom : function(name){
    $('#roomSelect').append('<option value="'+name+'">'+name+'</option>');
  },
  
  addFriend : function(){}
  
};


//app.send(message);
app.fetch();

setInterval(function(){app.fetch();}, 5000);


/////////////////// Event Listeners ///////////////////////////
$('form').submit(function(e){
  e.preventDefault();
  var message = $('.message').val();
  var room = $('#roomSelect').val();
  console.log($('.message').val());
});
  

});




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









