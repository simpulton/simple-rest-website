# Simple REST Website 
A simple website demonstrating CRUD, built using AngularJS, and powered by [Simple REST API](https://github.com/simpulton/simple-rest-api).

## Prerequisites
You will need:
* [Git](http://git-scm.com/)
* [NodeJS and NPM](https://gist.github.com/isaacs/579814)
* [Simple REST API](https://github.com/simpulton/simple-rest-api)

## Getting Started
1. Run the following commands

  ```bash
  git clone git@github.com:simpulton/simple-rest-website.git
  cd simple-rest-website
  npm install -g serve
  serve public
  ```

2. Navigate to [localhost:3000](http://localhost:3000).

3. Hooray! Now you can interact with the API running on heroku! How simple was that??

### Running your own API server

If you would like to run your own api, then 
1. head over to [Simple REST API](https://github.com/simpulton/simple-rest-api) and follow the directions there to run the API.

2. Update public/app/app.js to use the local api server at [http://localhost:1337/api/](http://localhost:1337/api/)

* Note: If you want to use the version without authentication, checkout the "without-auth" branch. Be sure to do the same in the simple-rest-api repo. Restart the API if necessary.


