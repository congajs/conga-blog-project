// core libs
const os = require('os');

// framework libs
const { Controller } = require('@conga/framework');

/**
 * The DefaultController defines the default actions and routes
 *
 * @Route("/")  <-- this defines the prefix for all routes in this controller
 */
module.exports = class DefaultController extends Controller {

    /**
     * Show the application's index page
     *
     * @Route("/", name="default.index", methods=["GET"])
     * @Template
     *
     * The template file lives at resources/view/DefaultController/index.html.twig where index is
     * the name of the method or function processing your route.
     *
     * TwigJS is configured for this example, but you can change that at app/config/config.yml
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    index(req, res) {
        // set up the return data
        const data = {
            conga_version: this.container.getParameter('conga.version'),
            environment: this.container.getParameter('kernel.environment'),
            installed_bundles: this.container.getParameter('app.bundles').sort().map(name => ({
                name,
                url: name[0] === '@' ? 'https://www.npmjs.com/package/' + name : null
            })),
            os: {
                cpus: os.cpus().length,
                hostname: os.hostname(),
                type: os.type(),
                platform: os.platform(),
                release: os.release()
            },
            featured: null,
            posts: null
        };

        // execute queries asynchronously!
        const manager = this.container.get('bass').createSession().getManager('blog');
        return Promise.all([
            manager.findOneBy('Post', {isFeatured: true}).then(post => {
                data.featured = post;
            }),
            manager.findBy('Post', {isFeatured: false}).then(posts => {
                data.posts = posts;
            })
        ]).then(all => data);   // resolve with the return data
    }

    /**
     * Here is an action that uses URL parameters and also demonstrates using a promise
     *
     * Go to http://localhost:3000/hello/world
     *
     * or:
     *
     * http://localhost:3000/hello/error to trigger an error
     *
     * @Route("/hello/:name", methods=["GET"])
     * @Template
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    hello(req, res) {

        // you can also return promises, and when you do it helps the profiler more
        // accurately report on your controller's performance

        return new Promise((resolve, reject) => {

            if (req.params.name === 'error') {
                reject(this.buildErrorResponse({ error: 'this is an error', code: 403}, 403));
            }

            resolve({
                message: 'Hello ' + req.params.name
            });
        });

    }

    /**
     * @Route("/error", methods=["GET"])
     * @Template
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    error(req, res) {
        throw new Error('This is a test!');
    }

    /**
     * @Route("/error-no-template", methods=["GET"])
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    errorNoTemplate(req, res) {
        throw new Error('This is a test!');
    }

};
