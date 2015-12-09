# Pocket Beta
---

### Requirments:

* [Node & NPM](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/getting-started)
* [Sass](http://sass-lang.com/install)
* [Firebase Tools](https://www.firebase.com/docs/hosting/)


### Getting Started

```sh
$ git clone [git-repo-url]
$ cd pocket-beta
```

Install client side dependencies:

```sh
$ bower install
```

Install grunt and server side dependencies

```sh
$ npm install
```

Start the server locally

```sh
$ grunt
```

### Grunt Tasks

`grunt` : starts node server, watches for changes to backend and front-end code and triggers livereload

`grunt build` : optimizes resource files (js, css, images) for production environments

### Firebase

Setting up and deploying with Firebase

```sh
$ firebase init
$ firebase login
$ firebase deploy
```
