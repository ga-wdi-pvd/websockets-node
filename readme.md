# WebSockets

## Learning Objectives

- Compare the Request/Response model of HTTP with the bi-directional model of WebSockets
- Use the Socket.io library to write a client & server that communicate over WebSockets

## Framing

Let's start with a problem: you as a developer take on a project for a client that wants you to create a dashboard to allow individual investors to easily view and track his / her portfolio. Seems simple enough until the client gives you their core requirement: users must be able to see their stocks update in real time!

### Think, Pair, Share (5 min, 0:05)

With the people at your table try to figure out how you might implement real time data fetching:

- List any necessary technologies
- Brainstorm a few technical approaches
- Identify any potential downsides to these approaches.

---

### HTTP Pitfalls (5 min, 0:10)

One common workaround for this problem when under traditional HTTP constraints is to utilize a technique called **polling** to make multiple requests on a set interval.

The resulting code will often look something like this:


```js
setInterval(function(){
    $.ajax({ url: '/my/api/endpoint', success: function(data){
        // do something with the data
    } });
}, 5000);
```

**Q**. What is a possible downfall of this approach?

---

> **A**. The server might not have any new data for us. In this case, we'd be producing a lot of network traffic, and request/response cycles overhead, for no purpose.

Simply put, HTTP wasn't designed for real-time, two-way communication.

#### Quick Aside: Beware of the Polls

Robin likes to tell the story of when he first developed a website called:

- INeedAPrompt.com
  - One day, caught a lot of attention on Reddit
    - It made me happy. The end.
- BUT THEN!
  - I got an e-mail from my hosting provider at 1:12AM:

> System administration was forced to suspend your site in an emergency to prevent server and system overloads.

> The suspension was placed due to an extremely large amount of traffic to ineedaprompt.com/counter.txt

> At the time of suspension, we were seeing over 1.86 million hits.

- Had a click counter: "Number of prompts generated"
  - Was making an AJAX request every second that was POSTing to a script, telling it to update this `counter.txt` file, and then showing the new number of clicks
  - That's 3600 extra requests per hour PER USER.
- fixed by having the clicks update only when you refresh the page.

### "PULL"

- AJAX uses HTTP
  - You "pull" information from the server
    - You make a request, and you get something back
  - It's as if to have a conversation over the phone, whenever you wanted to say something you had to hang up and dial again

### WebSockets

What is it? In essence a different type of model for the communication of a client and a server.

> WebSockets provides a standardized way for the server to send content to the browser without being solicited by the client, and allowing for messages to be passed back and forth while keeping the connection open. In this way, a two-way (bi-directional) ongoing conversation can take place between a browser and the server.

By utilizing WebSockets, a client can open up a connection to a server that allows for the easy two-way transfer of data.  WebSockets is therefore especially great for real-time, event-driven web applications.

Notable web apps powered by WebSockets:
- Twitch
- Slack

### "PUSH"

- Javascript can also use WebSockets
  - Instead of having to make a new request every time you want information from the server, it can "push" information to you
  - Opens a connection between two computers and *maintains* it
  - It's as if you just stayed on the phone with the person

### Pros / Cons of Each

- Expensive in different ways
  - HTTP, you have to worry about bombarding your server with requests
  - WebSocket, you have to worry about your server having too many connections

- Better for different things
  - HTTP is better for sending big packets of data
    - Inefficient for small packets of data, since you send a bunch of data each time as headers
  - WebSocket is better for sending small packets of data really frequently

## Break (10 min, 1:00)

## Let's do some WebSocketing!

### Socket.io

- A library for WebSockets, which we're going to use to make your server a WebSocket server
- Notice that you can make WebSocket requests in both the front end and the back end:
  - http://socket.io/docs/
- It works on every platform, browser or device, focusing equally on reliability and speed.

## You do (20 min, 1:20)
- Do Socket.io's walkthrough to make a chat app!  
  - Feeling adventurous? Use handlebars to do your templating
- http://socket.io/get-started/chat/

> [A solution](https://github.com/ga-wdi-exercises/mean-socket-chat/tree/socket-io-solution)

## Refactoring to use Angular (30 min, 1:50)

- Add links to angular CDNs to `index.html`
```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.min.js"></script>
```
- Define an your angular app's initial module
- Define a new controller
- Use `socket.on` to listen for any new message, when a new message arrives, pass the data to the view
- In `index.html` be sure to link your angular application with `ng-app` and initialize your view model with `ng-controller`
- Wire up a `ng-submit` on the form to a method defined in your controller so as to handle "sending a message"
- Bind the user input to a property on your view model
- When a user sends a message, make sure to use `socket` to broadcast the appropriate event and attach user input
- Render each message in the view

**Bonus**

Use `$scope.apply()` to trigger the angular event loop and force our app to re-render after a message is received from the server.

> [Solution](https://github.com/ga-wdi-exercises/mean-socket-chat/commit/3b16e046799b373c73569075769367291614ee4d)

## Break (10 min, 2:00)

## Persisting Data (30 min, 2:30)

- Use `npm` to install `mongoose` and require it in `index.js`
- Use `mongoose` to create a new model `Message` and define an appropriate schema for a message (keep it simple)
- Whenever a new message is sent to the server from the client, persist it

**Bonus**

Use angular to render all persisted messages.

- In your server, define a route for `/api/messages` that renders all your app's messages as `JSON`
- In your angular code, define a factory for `Message` that uses `$resource` to hit your server's api endpoint
- In your angular controller, use your newly defined factory to query for all messages and pass that data to the view
- In the view, render each message

> [Solution](https://github.com/ga-wdi-exercises/mean-socket-chat/commit/8c8214b98d62d4e851c700ba5e53cd056e30e18b)

## Next Steps

- Support deleting a message
- Support deleting all messages
- Broadcast a message to connected users when someone connects or disconnects
- Add support for nicknames
- Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- Add “{user} is typing” functionality
- Show who’s online
- Add private messaging
- Share your improvements!

## Resources

- [angular-socket-io](https://github.com/btford/angular-socket-io)
- [Writing an Angular app with socket.io](http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/)
- [Socket.io w/ Express](http://www.programwitherik.com/socket-io-tutorial-with-node-js-and-express/)
- [Socket.io w/ Node](http://danielnill.com/nodejs-tutorial-with-socketio/)
- [WebSockets w/ socket.io](https://howtonode.org/websockets-socketio)
- [Announcing WebSockets](https://www.websocket.org/quantum.html)
