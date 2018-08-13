[![Dependencies](https://img.shields.io/david/maxrumsey/hookcord.svg)](https://david-dm.org/maxrumsey/hookcord)
[![Coverage Status](https://coveralls.io/repos/github/maxrumsey/hookcord/badge.svg?branch=master)](https://coveralls.io/github/maxrumsey/hookcord?branch=master)
[![Build Status](https://travis-ci.org/maxrumsey/hookcord.svg?branch=master)](https://travis-ci.org/maxrumsey/hookcord)
[![npm](https://img.shields.io/npm/v/hookcord.svg)](https://npmjs.org/package/hookcord)
[![npm](https://img.shields.io/npm/l/hookcord.svg)](https://npmjs.org/package/hookcord)
[![npm](https://img.shields.io/github/issues/maxrumsey/hookcord.svg)](https://github.com/maxrumsey/hookcord)
<br><br>
[![npm](https://nodei.co/npm/hookcord.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hookcord/)
<br><br>
# Hookcord
A user-friendly, sleek and fast client used to create and send Discord Webhooks.
## Features
* Object-oriented
* Complete coverage of the Discord Webhook API
* Lightweight but powerful

API Documentation available at [maxrumsey.xyz/hookcord/](https://maxrumsey.xyz/hookcord)
# Usage
## Installation
```
$ npm i hookcord
```
## Initialisation
```javascript
var hookcord = require('hookcord');
var Base = hookcord.Base;
var hook = new Base("HOOK_ID/HOOK_SECRET");
```
Or:
```javascript
var hookcord = require('hookcord');
var Base = hookcord.Base;
var hook = new Base("", {'link':'https://custom.link/to/webhook'});
```
## Messages
```javascript
var hookcord = require('hookcord');
var Base = hookcord.Base;

var hook = new Base("HOOK_ID/HOOK_SECRET", {}, {'content':"Hello World!"});
hook.send().then(function(request) {
  console.log(request);
});
```
More information is available at the [documentation](https://maxrumsey.xyz/hookcord/?api).
## Embeds
```javascript
var hookcord = require('hookcord');

var Base = hookcord.Base;

var hook = new Base("HOOK_ID/HOOK_SECRET", {}, {
  'embeds': [{
    'title': 'Hookcord',
    'description': '',
    'fields': [{
      'name': 'Version',
      'value': '1.0.0',
      'inline': true
    }],
    'timestamp': new Date();
  }]
});
hook.send().then(function(request) {
  console.log(request);
});
```
Embed documentation is available at [Discord's Documentation](https://discordapp.com/developers/docs/resources/channel#embed-object).
More information is available at the [Hookcord documentation](https://maxrumsey.xyz/hookcord/?api).

## Ratelimits
By default, Hookcord will throw an error if it encounters a ratelimit. You can override this by setting a handler function like this:
```javascript
var Base = require('hookcord').Base;
var hook = new Base("HOOK_ID/HOOK_SECRET", {
  handler: function(err) {
    console.log('Ratelimit Request Limit: ' + err.limit);
    console.log('Remaining Requests: ' + err.remaining);
    console.log('Time until Reset: ' + err.reset)
  }
}, {
  content: 'Hello World!'
})
```
It provides the remaining requests allowed (0), the total requests permitted (usually 5) and the time until the Ratelimit resets.

More information is available at the [Hookcord documentation](https://maxrumsey.xyz/hookcord/?api).

## Parsing Discord.JS Embeds
Hookcord has the ability to parse embeds created via [Discord.JS's RichEmbed](https://discord.js.org/#/docs/main/stable/class/RichEmbed). These parsed embeds can be sent via Hookcord as a Webhook.
```javascript
var hookcord = require('hookcord');
var discord = require('discord.js')

var embed = new discord.RichEmbed();
embed.setTitle('Hi!');
var parsed = hookcord.DiscordJS(embed);

await hookcord.Fire("HOOK_ID/HOOK_SECRET", {}, parsed);
```
If you attempt to parse a file, the file will be removed and the incident will be logged to console.

## Contributing
If you wish to contribute, feel free to open a pull request on the [GitHub Repository](https://github.com/maxrumsey/hookcord)! Also, make sure to join our [Discord Server](https://discord.gg/PyEecVA)!
