# WebSockets

## Learning Objectives

- Compare the request-response model of HTTP with the bi-directional model of WebSockets
- Use the Socket.io library to write a client and server that communicate over WebSockets

## Framing

Let's start with a problem: you take on a project for a client that wants you to create a dashboard that allows individual investors to easily view and track his / her portfolio. Seems simple enough until the client gives you their core requirement: users must be able to see their stocks update in real time.

## Think, Pair, Share (10 minutes / 0:10)

> 5 minutes exercise. 5 minutes review.

With the people at your table try to figure out how you might implement real time data fetching...

* List any necessary technologies
* Brainstorm a few technical approaches
* Identify any potential downsides to these approaches

<!-- AM: Prompt seems a little vague -- make more specific -->

## HTTP Pitfalls (10 minutes / 0:20)

One common workaround for this problem when under traditional HTTP constraints is to utilize a technique called **polling** to make multiple requests on a set interval.

The resulting code will often look something like this...

```js
setInterval(function(){
  $.ajax({ url: '/my/api/endpoint', success: function(data){
      // Do something with the response here
  } });
}, 5000);
```
<details>
  <summary><strong>What is a possible downfall of this approach?</strong></summary>

  > AM: Add answers

</details>

Simply put: HTTP wasn't designed for real-time, two-way communication.

### Beware of the Polls: A Cautionary Tale

Robin -- a former WDI instructor -- likes to tell the story of when he first developed a website called [INeedAPrompt.com](http://www.INeedAPrompt.com) which generates writing prompts designed to spur creative writing and break through writer's block. One day, it was posted to reddit and it caught a lot of attention, which made Robin happy. Everyone lived happily ever after. That is, until Robin got an e-mail from his hosting provider at 1:12AM...

> System administration was forced to suspend your site in an emergency to prevent server and system overloads.
>
> The suspension was placed due to an extremely large amount of traffic to ineedaprompt.com/counter.txt
>
> At the time of suspension, we were seeing over 1.86 million hits.


Robin's website has a click counter that counts the number of prompts generated.
* Originally, it was making an AJAX request every second that was POSTing to a script, telling it to update a `counter.txt` file, and then showing the new number of clicks
* That's 3600 extra requests per hour **per user**!
* Fixed by having the clicks update only when you refresh the page.

## Comparing WebSockets & HTTP (20 minutes / 0:40)

### HTTP & "PULL"

AJAX uses HTTP.
* You "pull" information from the server (i.e., you make a request and you get something back)
* It's much like having a conversation via walkie-talkies, where each walkie-talkie has a unique number to you have to dial in order to reach that particular walkie-talkie. Think of it as a one-way phone.

### WebSockets

What is it? Long story short, a different type of model for the communication of a client and a server.

> WebSockets provides a standardized way for the server to send content to the browser without being solicited by the client, and allowing for messages to be passed back and forth while keeping the connection open. In this way, a two-way (bi-directional) ongoing conversation can take place between a browser and the server.

By utilizing WebSockets, a client can open up a connection to a server that allows for the easy two-way transfer of data. This makes it great for real-time, event-driven web applications.

Twitch and Slack are a couple of the notable web apps out there that are powered by WebSockets.

### We Do: WDI Plays Pokemon

> 5 minutes exercise.

You may recall that a version of Pokémon Red was deployed 2 years ago on twitch.tv called "[Twitch Plays Pokemon](https://www.twitch.tv/twitchplayspokemon)." At its peak, 121,000 users simultaneously entered commands to control a single character. As you can image, the result was exceptionally chaotic. Nevertheless, this bizarre social-experiment was made possible by a WebSockets-powered interface.

Let's take a few minutes to navigate [here and play some pokemon as a class](http://socket.io/demos/weplay/). While playing, consider the following questions...
* How many 'states' of the game are there?
* While this is sort of an experiment with the absurd, can you infer from this example any drawbacks websockets might have?

<!-- AM: Is this the best demo of this concept? -->
<!-- AM: Is there a better link that the socket.io address? -->

### "PUSH"

We can use WebSockets with Javascript
- Our code opens a connection between two computers and maintains it
- Instead of having to make a new request every time you want information from the server, it can "push" information to you via this open connection
- It's as if you were on the phone instead of using walkie-talkies

### Pros and Cons: HTTP vs. WebSockets

Each is expensive in different ways
* HTTP, you have to worry about bombarding your server with requests
* WebSocket, you have to worry about your server having too many connections

Each is best suited for different things
* HTTP is better for sending big packets of data, but inefficient for small packets of data since you send a bunch of data each time as headers
* WebSockets is better for sending small packets of data at a frequent rate

## Break (10 minutes / 0:50)

## You Do: Implement WebSockets

> The important part of this exercise is to (1) implement WebSockets and (2) integrate it with what we have learned over the past several weeks. Parts I & II are most important for this lesson.

### Socket.io Walkthrough (30 minutes / 1:20)

Socket.io is a library for WebSockets, which we'll be using to create a WebSockets server
- You can make WebSocket requests in both the front end and the back end ([documentation](http://socket.io/docs/))
- It works on every platform, browser or device, focusing equally on reliability and speed

[Do Socket.io's walkthrough to make a chat app.](http://socket.io/get-started/chat/)

> [Solution](https://github.com/ga-wdi-exercises/mean-socket-chat/tree/socket-io-solution)

## Part II: Refactor With Angular (30 minutes / 1:50)

We're going to pluck out the DOM manipulation done with jQuery and replace that functionality with Angular functionality. Below are some concrete steps to guide you through this process. There are some gaps, however, you will need to fill in.

Don't forget to add links to angular CDNs in `index.html`...

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.min.js"></script>
```

#### Next Steps

* Define an your angular app's initial module
* Define a new controller
* Use `socket.on` to listen for any new message, when a new message arrives, pass the data to the view
* In `index.html` be sure to link your angular application with `ng-app` and initialize your view model with `ng-controller`
* Wire up a `ng-submit` on the form to a method defined in your controller so as to handle "sending a message"
* Bind the user input to a property on your view model with `ng-model`
* When a user sends a message, make sure to use `socket` to broadcast the appropriate event and attach user input
* Render each message in the view

> You do not need to do anything with ngResource until you implement data persistence

#### Bonus

Use `$scope.apply()` to trigger the angular event loop and force our app to re-render after a message is received from the server.

> [Solution](https://github.com/ga-wdi-exercises/mean-socket-chat/commit/3b16e046799b373c73569075769367291614ee4d)

## Break (10 minutes / 2:00)

## Part III: Persisting Data (30 minutes / 2:30)

* Use `npm` to install `mongoose` and require it in `index.js`
* Use `mongoose` to create a new model `Message` and define an appropriate schema for a message
* Whenever a new message is sent to the server from the client, persist it

#### Bonus

Use angular to render all persisted messages.
* In your server, define a route for `/api/messages` that renders all your app's messages as `JSON`
* In your angular code, define a factory for `Message` that uses `$resource` to hit your server's api endpoint
* In your angular controller, use your newly defined factory to query for all messages and pass that data to the view
* In the view, render each message

> [Solution](https://github.com/ga-wdi-exercises/mean-socket-chat/commit/8c8214b98d62d4e851c700ba5e53cd056e30e18b)

#### More Feature Ideas

* Support deleting a message
* Support deleting all messages
* Broadcast a message to connected users when someone connects or disconnects
* Add support for nicknames
* Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
* Add “{user} is typing” functionality
* Show who’s online
* Add private messaging

------

## Resources

- [angular-socket-io](https://github.com/btford/angular-socket-io)
- [Writing an Angular app with socket.io](http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/)
- [Socket.io w/ Express](http://www.programwitherik.com/socket-io-tutorial-with-node-js-and-express/)
- [Socket.io w/ Node](http://danielnill.com/nodejs-tutorial-with-socketio/)
- [WebSockets w/ Socket.io](https://howtonode.org/websockets-socketio)
- [Announcing WebSockets](https://www.websocket.org/quantum.html)
