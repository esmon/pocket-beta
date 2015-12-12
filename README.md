# Pocket Beta

### Requirments:

* [Node & NPM](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/getting-started)
* [Sass](http://sass-lang.com/install)
* [Nginx](https://www.nginx.com/resources/wiki/) 
* [Firebase Tools](https://www.firebase.com/docs/hosting/)

### Setting up nginx locally
Use [Homebrew] to [install nginx]

[Homebrew]: <http://brew.sh/>
[install nginx]: <https://github.com/Homebrew/homebrew-nginx>

Once Homebrew is installed, install nginx:

```sh
$ brew install nginx
```

Run

```sh
$ sudo nginx
```

Test nginx by going to `http://localhost:8080` in a browser

Once installed and running, open `/usr/local/etc/nginx/nginx.conf` in your favourite editor.

Setup a server block with port `3000` (grunt-open will open at 3000):
```
server {
    listen 3000;
    server_name localhost;
    root /YOUR DIRECTORY/binovi-web/public;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save and restart nginx
```sh
$ sudo nginx -s reload
```

#### Nginx commands

Start nginx
```sh
$ sudo nginx
```

Restart nginx
```sh
$ sudo nginx -s reload
```

Stop nginx
```sh
$ sudo nginx -s stop
```

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
