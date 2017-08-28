# conga-blog-project

This is a conga.js demo project which demonstrates how to use many of the core conga bundles
to create a real world application.

Note: you must have mongodb installed and running in order to run this example.

## Installation

Clone this repository:

    $ git clone git@github.com:congajs/conga-blog-project.git my-project

Change in to directory and install npm dependencies:

    $ cd my-project
    $ npm install

Create the parameters config file:

    $ cp app/config/parameters.yml.dist app/config/parameters.yml

Run the database fixtures to get initial demo data:

    $ conga bass:fixtures

To start up the application, run:

    $ npm start

or to run through nodemon and restart on file changes:

    $ npm run watch

Then open up http://localhost:3000
