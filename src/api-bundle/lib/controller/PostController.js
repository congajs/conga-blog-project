const Controller = require('@conga/framework-rest').BassRestController;

/**
 * @Route("/api/posts")
 * @Rest:Controller(
 *     resource="post",
 *     isPaginationEnabled=true,
 *     defaultLimit=100,
 *     isIncludeRelatedSupported=true
 * )
 */
module.exports = class PostController extends Controller {

    /**
     * Modify the Post before being updated
     *
     * @param  {Object}   req
     * @param  {Object}   req
     * @param  {Object}   resource
     * @param  {Session}  session
     * @param  {Manager}  manager
     * @return {Promise}
     */
    onUpdate(req, res, resource, session, manager) {
        return Promise.resolve();
    }

}
