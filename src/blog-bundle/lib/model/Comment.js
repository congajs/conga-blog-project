/**
 * @Bass:EmbeddedDocument
 * @Rest:Resource(type="comments")
 */
module.exports = class Comment {

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
         * @Bass:Field(type="String", name="user_id")
         * @Rest:Attribute
         */
        this.userId = null;

        /**
         * @Bass:Field(type="String", name="body")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.body = null;

        /**
         * @-Bass:EmbedMany(document="Comment", sort="createdAt", direction="desc")
         * @-Rest:Attribute
         */
        this.comments = [];

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