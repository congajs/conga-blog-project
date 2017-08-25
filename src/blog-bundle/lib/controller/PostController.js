// framework libs
const { Controller } = require('@conga/framework');

/**
 * The DefaultController defines the default actions and routes
 *
 * @Route("/post")  <-- this defines the prefix for all routes in this controller
 */
module.exports = class PostController extends Controller {

    /**
     * @Route("/:slug")
     * @Template
     */
    show(req, res) {

        const manager = this.container.get('bass').createSession().getManager('blog');

        manager.findOneBy('Post', { slug: '/' + req.params.slug }).then(post => {

            console.log(post);

            res.return({
                post: post
            });

        });

    }

}
