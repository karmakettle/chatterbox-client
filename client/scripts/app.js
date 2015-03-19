// YOUR CODE HERE:
//how to break down the ajax gets and post requests
//how does parse store stuff?
//Event listeners: best practices?

(function(){

window.app = {
  storage: null,
  init: function(){
    $('#main').on('click', '.username', function(){
      // console.log("I've been clicked!")
      app.addFriend($(this).text());
      console.log(app.friends);
    })

    $('#main').on('click', '.submit', function() {
      console.log('click handler activated!')
      app.submitHandler()
    })

    $('#roomSelect').on('change', function() {
      var roomnameCache = $('#roomSelect option:selected').text()
      if ( roomnameCache === "Create New Room..." ) {
        var newRoom = prompt("Choose a room name: ");
        app.addRoom(newRoom);
        roomnameCache = newRoom;
      } 

      //clear the dom
      var data = app.storage;
      app.clearMessages();
      
      app.roomFilter(data, roomnameCache)
    })
  },
    //filter and add messages from the clicked room
  roomFilter: function(data, roomnameCache){
    data.results.filter(function(message){
      return message.roomname === roomnameCache;
    }).forEach(function(message){
      app.addMessage(message);
    })
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
        app.fetch(); //should we be fetching?
      },
      error: function (data) {   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    })
  },
  addMessage: function(message){
    //adds messages to the DOM
    $('#chats').append('<div><a href="#" class="username">' + message.username + '</a>: ' + message.text + '</div>');
  },
  clearMessages: function(){
    $('#chats').empty();
  },
  addRoom: function(roomname){
    $('#roomSelect').append('<option class="active">' + roomname + '</option>');
  },
  fetch: function(){
    // $.get(function(data){
    //   console.log(data);
    // }) 
    app.clearMessages();

    $.ajax('https://api.parse.com/1/classes/chatterbox', {
      type: 'GET',
      data: {'order':'-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.roomFilter(data, $('#roomSelect option:selected').text())
        app.storage = data  

        console.log('chatterbox: Messages received');
      },
      error: function (data) {   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve messages');
      }
    })
  },
  friends: {},
  addFriend: function(username) {
    app.friends[username] = true;
  },
  submitHandler: function() {
    var message = {
      text: $('.text').val(),
      username: decodeURI(window.location.search.slice(10)),
      roomname: $('#roomSelect option:selected').text()
    };
    app.send(message)
  },

  server: 'https://api.parse.com/1/classes/chatterbox'
};

app.init()
app.fetch()

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