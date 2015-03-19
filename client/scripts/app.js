// YOUR CODE HERE:
//how to do the ajax gets request
//how does parse store stuff
(function(){

window.app = {
  init: function(){
    $('#main').on('click', '.username', function(){
      // console.log("I've been clicked!")
      app.addFriend($(this).text());
      // console.log(app.friends);
    })

    // $('.submit').click(function() {
    //   var message = {
    //     text: $('.text').val(),
    //     username: window.location.search.slice(10),
    //     roomname: '' //whut
    //   };
    // })

    // $('option').click(function() {
    //   $('.active').removeClass('active');
    //   $(this).addClass('active');
    // })

    // console.log("Handler count:", jQuery._data( $('#main')[0], "events" ).click.length)
  },
  send: function(message){
    //post request via ajax
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    })
  },
  addMessage: function(message){
    //adds messages to the DOM
    $('#chats').prepend('<div><a href="#" class="username">' + message.username + '</a>: ' + message.text + '</div>');
  },
  clearMessages: function(){
    //clear messages from the DOM
    $('#chats').empty();
    // console.log($('#chats').children());
  },
  addRoom: function(roomname){
    $('#roomSelect').append('<option>' + roomname + '</option>');
  },
  fetch: function(){
    // $.get(function(data){
    //   console.log(data);
    // }) 

    $.ajax('https://api.parse.com/1/classes/chatterbox', {
      // url: this.url,
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Messages received');
      },
      error: function (data) {   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve messages');
      }
    })

  },
  friends: {},
  addFriend: function(username) {
    // alert('hi')
    app.friends[username] = true;
  },
  server: 'https://api.parse.com/1/classes/chatterbox'
};

})();






//Create object called app
  //Create method called init
  //Allow users to create rooms and enter existing rooms
  //   - Rooms are defined by the `.room` property of messages, so you'll need to sort them somehow.
  //   - app.addRoom('roomname')
  //app.send(message)
  // Display messages retrieved from the parse server.
  //   - Setup a way to refresh the displayed messages (either automatically or with a button).
  // Add messages to the DOM   
  //   -  app.addMessage(message)
  // Clear messages from the DOM
  //   - app.clearMessages()



  //Buttons: add friend / submit message


// Be careful to use proper escaping on any user input.
// Allow users to select a username and send messages
// Allow users to 'befriend' other users by clicking on their username

// Display all messages sent by friends in bold