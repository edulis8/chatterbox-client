# chatterbox-client
A simple chat client app

Chatterbox client
==============

This is a project I completed as a student at Hack Reactor. This project was worked on with a pair. During the project we built a chat client using the parse API. 

## Structure:

The repository consist of

- jQuery app
- test Specs files.

#### Chatterbox app - Jquery version

The app allows the user to chose rooms and fetch/post messages from and to a parse based API backend.

## Install:

The project rely on bower for managing external libraries and dependencies, so be sure to first:

`bower install`

to run it, simply open `./client/index<type>.html` with your browser.
In particular:

- `./client/indexJQuery.html`
- `./client/indexBacknone.html`
- `./client/indexBacknoneES6.html`

Make sure to have a valid config.js inside the env folder.

### SpecRunner - mocha

The specrunner contain both the tests for the client

### Testing

Tests are made with the [Mocha](https://github.com/mochajs/mocha) testing framework.
Test are located in the ./spec directory. To run the Just open the spec runner file with chrome.

```
SpecRunner.html
```
