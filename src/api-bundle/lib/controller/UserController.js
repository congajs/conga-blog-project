const Controller = require('@conga/framework-rest').BassRestController;

/**
 * @Route("/api/users")
 * @Rest:Controller(
 *     resource="user",
 *     isPaginationEnabled=true,
 *     defaultLimit=100,
 *     isIncludeRelatedSupported=true
 * )
 */
module.exports = class UserController extends Controller {

    /**
     * @Route("/custom", methods=['GET'])
     */
    custom(req, res) {

    }

}
