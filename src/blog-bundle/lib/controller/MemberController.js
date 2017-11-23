// framework libs
const { Controller } = require('@conga/framework');

/**
 * The member controller provides access to member features
 * The routes are secured by the configuration in app/config/security.yml
 *
 * @Route("/member")
 */
module.exports = class MemberController extends Controller {

    /**
     * The member index route
     *
     * ... annotations ...
     * @Route("/", name="member.index", methods=["GET"])
     * @Template
     *
     * ... jsdoc ...
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    index(req, res) {
        const { credentials } = this.container.get('security.context').getAuthToken();
        return Promise.resolve({
            credentials,
            message: req.session.getFlashBag().get('message')
        });
    }

    /**
     * The signup route for members
     * This route is allowed annonymously in the security configuration
     *
     * @Route("/signup", name="member.signup", methods=["GET","POST"])
     * @Template
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     */
    signup(req, res) {

        const security = this.container.get('security.context').getAuthToken();
        if (security.authenticated) {

            // if the user is already authenticated, redirect them to their home page
            req.session.getFlashBag().set('message',
                'You are logged in. Please log out before creating a new account.');

            res.redirect(302, '/member');
            return;
        }

        const manager = this.container.get('bass').createSession().getManager('blog');
        const validator = this.container.get('validator');
        const user = manager.createDocument('User', req.body || {});
        const data = {
            user,
            success: false,
            message: req.session.getFlashBag().get('message')
        };

        // if this is a GET request just return the data, don't process it
        if (req.method === 'GET' || !req.body) {
            return Promise.resolve(data);
        }

        // validate the Form data with the validator
        // the form data is in req.body and it's used to create our user document (see above)
        // this checks all assertions, where @Assert:* is placed above the document class property
        // if any assertion rules fail, the validator will fail with errors (see model/User.js)
        return validator.validate(user).then(() => {
            // if the validator resolves the promise, it means the User data has validated success
            // make sure the user email doesn't exist already
            return manager.findCountBy('User', {email: user.email}).then(num => {
                if (num > 0) {
                    data.errors = [{
                        message: 'The provided email address is already taken.',
                        property: 'email'
                    }];
                    return data;
                }
                // persist and flush the user with the manager
                manager.persist(user);
                return manager.flush(user).then(() => {
                    // let the view know that we succeeded
                    data.success = true;
                    // add the data to the flash-bag for the next controller to do something with
                    req.session.getFlashBag().set('member_signup_data', {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    });
                    // redirect to the member login
                    res.redirect(302, "/member/login");
                });
            });
        }).catch(err => {
            if (Array.isArray(err)) {
                // if the validator found errors, return them to the view and
                // return the data hash along a successful promise chain
                data.errors = err;
                return data;
            }
            // it's possible that some other error was caught
            return Promise.reject(err);
        });
    }

    /**
     * The member login action shows a form and allows the user to provide login credentials that
     * are evaluated by the firewall authenticator. The firewall handles everything, we just
     * need to set up some routes and views. This example uses one action and view to handle all
     * of the routes below. You can split them up how ever you like. The URL patterns are also
     * completely customizable; they are configured in the firewall.
     *
     * @Route("/login", name="member.login", methods=["GET","POST"])
     * The /login route is allowed anonymously in the security firewall. This route needs an action
     * that matches, so something can process it. This route should render a form so the user can
     * log in.
     *
     * @Route("/denied", name="member.denied", methods=["GET"])
     * The /denied route is configured for the firewall on ^/member as the access denied redirect
     * and so it is allowed anonymously; we use this to show access denied to the member section,
     * which can happen on a non-authenticated request. Our example just brings them to the login
     * page to show that access is denied, but we include a special property in the data payload.
     *
     * @Route("/_login", name="member_access.login.action", methods=["POST"])
     * The /_login route is used to submit the form, it is not allowed anonymously, so the firewall
     * will process the request and authenticate or fail the login attempt. If the request fails,
     * the user is redirected to /login/failed which ends up back here.  If the request succeeds,
     * the controller is allowed to execute, which will redirected the user to the configured
     * redirect route on success. If no success redirect is configured the controller action
     * matching the route will receive it.  Our app configures this to redirect to "/member"
     *
     * @Route("/logout", name="member_access.logout", methods=["GET"])
     * The /logout route will lo the user out of their session for this realm. The authenticator
     * should process this request, we just need a matching route.
     *
     * @Route("/login/failed", name="member.login.failed", methods=["GET"])
     * The /login/failed route is used on a failed login attempt from the authenticator. It comes
     * by a redirect from a POST to /_login, and when it fails, a 302 GET to /login/failed is
     * returned
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
            message: req.session.getFlashBag().get('message'),
            signup: req.session.getFlashBag().get('member_signup_data')
        });
    }

};