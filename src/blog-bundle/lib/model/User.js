/**
 * @Bass:Document(collection="users")
 * @Rest:Resource(type="user")
 */
module.exports = class User {

    /**
     * USER Role
     */
    static get ROLE_USER() {
        return 'ROLE_USER';
    }

    /**
     * ADMIN Role
     */
    static get ROLE_ADMIN() {
        return 'ROLE_ADMIN';
    }

    /**
     * Author Role
     */
    static get ROLE_AUTHOR() {
        return 'ROLE_AUTHOR';
    }

    /**
     *
     * @constructor
     */
    constructor() {

        /**
         * @Bass:Id
         * @Bass:Field(type="ObjectID", name="_id")
         * @Rest:ID
         */
        this.id = null;

        /**
         * @Bass:Field(type="String", name="email")
         * @Rest:Attribute
         * @Assert:NotBlank
         * @Assert:Regex(pattern="^[^@]+@.+")
         */
        this.email = null;

        /**
         * @Bass:Encrypt
         * @Bass:Field(type="String", name="password")
         * @Assert:NotBlank
         * @Rest:Attribute(expose=false)
         */
        this.password = null;

        /**
         * @Bass:Field(type="Array", name="roles")
         * @Rest:Attribute
         */
        this.roles = [User.ROLE_USER];

        /**
         * @Bass:Field(type="String", name="first_name")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.firstName = null;

        /**
         * @Bass:Field(type="String", name="last_name")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.lastName = null;

        /**
         * @Bass:Version
         * @Bass:Field(type="Number", name="version")
         * @Rest:Attribute(update=false)
         */
        this.version = 0;

        /**
         * @Bass:CreatedAt
         * @Bass:Field(type="Date", name="created_at")
         * @Rest:Attribute(type="Date", format="Y-m-d h:i:s", update=false)
         */
        this.createdAt = null;

        /**
         * @Bass:UpdatedAt
         * @Bass:Field(type="Date", name="updated_at")
         * @Rest:Attribute(type="Date", format="Y-m-d h:i:s", update=false)
         */
        this.updatedAt = null;

    }

};