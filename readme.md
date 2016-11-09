# WebSockets

## Learning Objectives

- Compare the request-response model of HTTP with the bi-directional model of WebSockets
- Use the Socket.io library to write a client and server that communicate over WebSockets

## Framing

Let's start with a problem: you take on a project for a client that wants you to create a dashboard that allows individual investors to easily view and track his / her portfolio. Seems simple enough until the client gives you their core requirement: users must be able to see their stocks update in real time.

## Think, Pair, Share (10 minutes / 0:10)

> 5 minutes exercise. 5 minutes review.

With the people at your table try to figure out how you might implement real time data fetching (i.e., constantly be listening for changes in data in a database)...

* List any necessary technologies
* Brainstorm a few technical approaches
* Identify any potential downsides to these approaches

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

  * There may not be any new data to retrieve
  * It's expensive to do this over and over again

</details>

Simply put: HTTP wasn't designed for real-time, two-way communication.

### Beware of the Polls: A Cautionary Tale

Robin -- a former WDI instructor -- likes to tell the story of when he first developed a website called [INeedAPrompt.com](http://www.ineedaprompt.com) which generates writing prompts designed to spur creative writing and break through writer's block. One day, it was posted to Reddit and it caught a lot of attention, which made Robin happy. Everyone lived happily ever after. That is, until Robin got an e-mail from his hosting provider at 1:12AM...

> System administration was forced to suspend your site in an emergency to prevent server and system overloads.
>
> The suspension was placed due to an extremely large amount of traffic to `ineedaprompt.com/counter.txt`
>
> At the time of suspension, we were seeing over 1.86 million hits.

Robin's website has a click counter that counts the number of prompts generated.
* Originally, it was making an AJAX request every second that was POSTing to a script, telling it to update a `counter.txt` file and then show the new number of clicks
* That's 3600 extra requests per hour **per user**!
* Solution: update the click counter only when you refresh the page

## Comparing WebSockets & HTTP (20 minutes / 0:40)

### HTTP & Pulling

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

### WebSockets & Pushing

We can use WebSockets with Javascript
- Our code opens a connection between two computers and maintains it
- Instead of having to make a new request every time you want information from the server, it can "push" information to you via this open connection
- It's as if you were on the phone instead of using walkie-talkies

### Pros and Cons: HTTP vs. WebSockets

Each is expensive in different ways
* HTTP, you have to worry about bombarding your server with requests
* WebSockets, you have to worry about your server having too many connections

Each is best suited for different things
* HTTP is better for sending big packets of data, but inefficient for small packets of data since you send a bunch of data each time as headers
* WebSockets is better for sending small packets of data at a frequent rate

## Break (10 minutes / 0:50)

## You Do: Implement WebSockets

> The important part of this exercise is to (1) implement WebSockets and (2) integrate it with what we have learned over the past several weeks. Parts I & II are most important for this lesson.

### Socket.io Walkthrough (40 minutes / 1:30)

> 30 minutes exercise. 10 minutes review.

Socket.io is a library for WebSockets, which we'll be using to create a WebSockets server
- You can make WebSocket requests in both the front end and the back end ([documentation](http://socket.io/docs/))
- It works on every platform, browser or device, focusing equally on reliability and speed

[Do Socket.io's walkthrough to make a chat app.](http://socket.io/get-started/chat/)

> [Solution](https://github.com/ga-wdi-exercises/mean-socket-chat/tree/socket-io-solution)

## Break (10 minutes / 1:40)

## Part II: Refactor With Angular (Rest of Lesson)

We're going to pluck out the DOM manipulation done with jQuery and replace that functionality with Angular functionality. Below are some concrete steps to guide you through this process. There are some gaps, however, you will need to fill in.

Don't forget to add links to angular CDNs in `index.html`...

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-resource.min.js"></script>
```

### Next Steps

All of your front-end Javascript can go in the `<script>` tag in `index.html` that currently contains the Socket and jQuery code.

#### 1. Define an Angular module

#### 2. Bootstrap the Angular app using `ng-app`

#### 3. Define an Angular controller

It should initialize a `messages` value as an empty array. This will contain all of the incoming chat messages.

#### 4. Link the controller to the app using `ng-controller`

Even though we're not using UI Router, we can still link it to our app using the `"controllerName as vm"` syntax.

#### 5. Move `socket.on` into the controller

#### 6. Update `socket.on` callback function

Instead of using jQuery or Vanilla JS to display messages in the browser, we will use Angular directives and our controller to do the following inside of the `socket.on` callback...
* Add the new messages to the `messages` variable we defined earlier
* Add `$scope.$apply()` at the end of the callback.
* In order to use `$scope.$apply()`, we need to inject `"$scope"` as a dependency to our controller and pass in `$scope` as an argument to our controller function

> **What is `$scope.$apply()`?**
>
> Socket events will not trigger a state change in Angular. This means that, without some additional code, our chat app will not update the view when a new message comes in. We can use `$scope.$apply()` to force this state change.

#### 7. Use an Angular directive to display messages in the view

Add an Angular directive to `index.html` that will render all of our `messages`.

<details>
  <summary><strong>Hint...</strong></summary>

  > Use `ng-repeat`

</details>

#### 8. Update form submit

Add an Angular directive to the form in `index.html` that triggers a yet-to-be-defined controller method -- let's call it `sendMessage` -- that will handle submitting messages to our server.

<details>
  <summary><strong>Hint...</strong></summary>

  > Use `ng-submit`

</details>

Use another Angular directive that will allow bind whatever value is currently in the input field in the controller.

<details>
  <summary><strong>Hint...</strong></summary>

  > Use `ng-model`

</details>

#### 9. Add `sendMessage` method to controller

Create a `sendMessage` method in the controller. Then, move the `socket.emit` line of code into that method.

Update `socket.emit` so that it sends whatever message the user has entered into the input field.

Also, once a message is submitted through Socket.io, the input should be cleared so that a new message can be sent.

> [A solution](https://github.com/ga-wdi-exercises/mean-socket-chat/commit/3b16e046799b373c73569075769367291614ee4d)

## (Bonus) Part III: Persisting Data

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


<!-- Framing about not forcing Angular just to make it hard - good to know how to do this in the context of a front-end framework -->
<!-- Add testing notes (i.e., now you should be able to do/see this) -->
<!-- Add note about already seeing this in action with Firebase -->
