// framework libs
const { Controller } = require('@conga/framework');

/**
 * The AdminController defines the actions and routes for the admin panel
 *
 * @Route("/admin")
 */
module.exports = class DefaultController extends Controller {
    /**
     *
     * @Route("/", name="admin.index", methods=["GET"])
     * @Template
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    index(req, res) {
        const { credentials } = this.container.get('security.context').getAuthToken();
        return Promise.resolve({
            credentials,
            message: req.session.getFlashBag().get('admin_message')
        });
    }

    /**
     * The admin login controller
     *
     * @see blog-bundle/lib/controller/DefaultController
     *
     * @Route("/login", name="member.login", methods=["GET","POST"])
     * @Route("/denied", name="member.denied", methods=["GET"])
     * @Route("/_login", name="member_access.login.action", methods=["POST"])
     * @Route("/logout", name="member_access.logout", methods=["GET"])
     * @Route("/login/failed", name="member.login.failed", methods=["GET"])
     *
     * @Template
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    login(req, res) {
        return Promise.resolve({
            denied: (req.originalUrl.indexOf('/denied') !== -1),
            failed: (req.originalUrl.indexOf('/failed') !== -1),
            message: req.session.getFlashBag().get('admin_message'),
            signup: req.session.getFlashBag().get('admin_signup_data')
        });
    }
};