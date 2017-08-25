# conga-blog-project

This is a minimal project to get started with conga.js. It just includes the core @conga/framework and allows you to create annotated controllers which pass through the default JSON response handler.

Use this as a basis for a project and expand it with additional bundles to add template response handlers, database access, security, etc.

Clone this repository:

    $ git clone git@github.com:congajs/conga-blog-project.git my-project

Change in to directory and install npm dependencies:

    $ cd my-project
    $ npm install

Create the parameters config file:

    $ cp app/config/parameters.yml.dist app/config/parameters.yml

To start up the application, run:

    $ npm start

or to run through nodemon and restart on file changes:

    $ npm run watch

Then open up http://localhost:3000
