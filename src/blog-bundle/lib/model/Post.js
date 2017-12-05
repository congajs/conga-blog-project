// third party libs
const marked = require('marked');
const Slugify = require('slugifyjs').fromLocale('en');

/**
 * @Bass:Document(collection="posts")
 * @Rest:Resource(type="post")
 */
module.exports = class Post {

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
         * @Bass:OneToOne(document="User")
         * @Rest:Relationship(type="one", relatedType="user")
         */
        this.user = null;

        /**
         * @Bass:Field(type="Array", name="categories")
         * @Rest:Attribute(type="Array")
         */
        this.categories = [];

        /**
         * @Bass:Field(type="Array", name="tags")
         * @Rest:Attribute(type="Array")
         */
        this.tags = [];

        /**
         * @Bass:Field(type="Object", name="options")
         * @Rest:Attribute(type="Object")
         */
        this.options = {
            comments: true,
            nestedComments: true,
            guestComments: true,
            searchEngines: true
        };

        /**
         * @Bass:Field(type="Boolean", name="is_featured")
         * @Rest:Attribute(type="Boolean")
         */
        this.isFeatured = false;

        /**
         * @Bass:Field(type="Array", name="is_private")
         * @Rest:Attribute(type="Boolean")
         */
        this.isPrivate = false;

        /**
         * If this field is empty, any logged in user can access the post
         * If this field is not empty, it contains a list of user ids that are allowed access
         *
         * @Bass:Field(type="Array", name="private_user_access")
         * @Rest:Attribute(expose=false)
         */
        this.privateUserAccess = [];

        /**
         * @Bass:Field(type="String", name="author")
         * @Rest:Attribute
         */
        this.author = null;

        /**
         * @Bass:Field(type="String", name="title")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.title = null;

        /**
         * @Bass:Field(type="String", name="slug")
         * @Assert:NotBlank
         * @Rest:Attribute(update=false)
         */
        this.slug = null;

        /**
         * @Bass:Field(type="String", name="body")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.body = null;

        /**
         * @Bass:Field(type="String", name="image")
         * @Rest:Attribute
         */
        this.image = null;

        /**
         * @Bass:Field(type="Array", name="links")
         * @Rest:Attribute(type="Array")
         */
        this.links = [];

        /**
         * @-Bass:EmbedMany(document="Comment", sort="createdAt", direction="desc")
         * @-Rest:Attribute(type="Array")
         */
        this.comments = [];

        /**
         * @Bass:Version
         * @Bass:Field(type="Number", name="version")
         * @Rest:Attribute(type="Number", update=false)
         */
        this.version = 0;

        /**
         * @Bass:CreatedAt
         * @Bass:Field(type="Date", name="created_at")
         * @Rest:Attribute(type="Date", format="YYYY-MM-DD HH:mm:ss", update=false)
         */
        this.createdAt = null;

        /**
         * @Bass:UpdatedAt
         * @Bass:Field(type="Date", name="updated_at")
         * @Rest:Attribute(type="Date", format="YYYY-MM-DD HH:mm:ss", update=false)
         */
        this.updatedAt = null;

    }

    /**
     * Update the slug before persisting
     *
     * @Bass:PrePersist
     * @-Bass:PreUpdate
     */
    onPrePersist(evt, cb) {
        this.slug = Slugify.parse(this.title);
        cb();
    }

    /**
     * Get the Post body as HTML converted from markdown
     *
     * @Rest:Attribute(property="html", update=false)
     *
     * @return {String}
     */
    getBodyAsHtml() {
        return marked(this.body);
    }

};
