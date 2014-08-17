pokerGame [![Build Status](https://travis-ci.org/turn/pokerGame.svg?branch=master)](https://travis-ci.org/turn/pokerGame) [![Coverage Status](https://img.shields.io/coveralls/turn/pokerGame.svg)](https://coveralls.io/r/turn/pokerGame)
=========

### dependencies

- angular (1.0.8)
- lodash (^2.4)

### usage

**html**

```html
...
<link rel="stylesheet" href="pokerGame.css">

</head>
<body>

<div ng-controller="fooCtrl">
	<!-- ... -->
</div>
...
<script src="pokerGame.js"></script>
```

**js**

```js
angular
.module('foo', ['turn/pokergame'])
.controller('fooCtrl', function ($scope) {
	
	// ...

});
```

### run the demo

```shell
bower install
npm install
grunt
```

then pop open index.html in a browser.

### run the tests

```
bower install
npm install
grunt test
```

### hack on it

```
bower install
npm install
grunt watch
```

### license

Apache2