# Simple REST Website 
A simple website demonstrating CRUD, built using AngularJS, and powered by [Simple REST API](https://github.com/simpulton/simple-rest-api).

## Prerequisites
You will need:
* [Git](http://git-scm.com/)
* [NodeJS and NPM](https://gist.github.com/isaacs/579814)
* [Simple REST API](https://github.com/simpulton/simple-rest-api)

## Getting Started
1. Head over to [Simple REST API](https://github.com/simpulton/simple-rest-api) and follow the directions there to run the API.
2. Once the API is running, run the following commands

  ```bash
  git clone git@github.com:simpulton/simple-rest-website.git
  cd simple-rest-website
  npm install -g serve
  serve public
  ```
  * Note: If you want to use the version without authentication, checkout the "without-auth" branch. Be sure to do the same in the simple-rest-api repo. Restart the API if necessary.

3. Navigate to [localhost:1338](http://localhost:1338)
4. Hooray! Now you can interact with the API! How simple was that??
