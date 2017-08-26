// core libs
const path = require('path');

// framework libs
const { AbstractFixture } = require('@conga/framework-bass');

/**
 * This fixture loads dummy posts
 */
module.exports = class PostFixture extends AbstractFixture {

    /**
     * Get the priority order to run this fixture on
     * @returns {Number}
     */
    getOrder() {
        return 2;
    }

    /**
     * Ge tthe name of the model that this fixture is for
     * @returns {String}
     */
    getModelName() {
        return 'Post';
    }

    /**
     * Load the data into the database
     * @param {function} next The callback function
     * @returns {void}
     */
    load(next) {

        const manager = this.getManager();

        this.mapFromYmlDirectory(path.join(__dirname, 'data', 'posts'), (model, row, idx, cb) => {

            model.referenceId = row.id;
            model.user = this.getReference('user-' + row.user_id);
            model.categories = row.categories;
            model.tags = row.tags;
            model.title = row.title;
            model.body = row.body;
            model.author = row.author;

            // add a reference to this user so other fixtures can reference it
            this.addReference('post-' + row.id, model);

            manager.persist(model);

        }, () => {

            manager.flush().then(next).catch(err => {
                console.error(err.stack || err);
            });

        });

        // map the comments first
        // const comments = {};
        // this.mapFromFile(path.join(__dirname, 'data', 'CommentFixture.csv'), (model, row, idx, cb) => {
        //
        //     model.body = row.body;
        //     model.userId = parseInt(row.user_id, 10);
        //
        //     comments[row.id] = model;
        //
        // });

        // map nested comments
        // for (let id in comments) {
        //     if (Math.random() * 10 > 7) {
        //         const comment = comments[id];
        //         const randId = Math.max(1, Math.floor(Math.random() * (1000 - id) + id));
        //         if (!comment.__assigned && randId != id) {
        //             const randComment = comments[randId];
        //             if (!randComment.__assigned) {
        //                 randComment.__assigned = true;
        //                 comment.__hasNested = true;
        //                 comment.comments.push(randComment);
        //             }
        //         }
        //     }
        // }

        // map the posts
        // this.mapFromFile(path.join(__dirname, 'data', 'PostFixture.csv'), (model, row, idx, cb) => {
        //
        //     model.referenceId = row.id;
        //     model.user = this.getReference('user-' + row.user_id);
        //     model.categories = Function('return ' + row.categories)();
        //     model.tags = Function('return ' + row.tags)();
        //     model.title = row.title;
        //     model.body = row.body;
        //     model.author = row.author;
        //
        //     // if (Math.random() * 10 < 7) {
        //     //     let numComments = Math.floor(Math.random() * 10);
        //     //     while (numComments > 0) {
        //     //         let comment;
        //     //         do {
        //     //             comment = this.getReference('comment-' +
        //     //                 (Math.max(1, Math.floor(Math.random() * 1000)))
        //     //             );
        //     //         } while (comment && comment.__assigned);
        //     //         if (comment) {
        //     //             comment.__assigned = true;
        //     //             if (comment.__hasNested) {
        //     //                 for (let child of comment.comments) {
        //     //                     manager.persist(child);
        //     //                 }
        //     //             }
        //     //             manager.persist(comment);
        //     //             model.comments.push(comment);
        //     //         }
        //     //     }
        //     // } else if (Math.random() * 5 > 3) {
        //     //     model.options.nestedComments = false;
        //     // } else {
        //     //     model.options.comments = false;
        //     // }
        //
        //     // add a reference to this user so other fixtures can reference it
        //     this.addReference('post-' + row.id, model);
        //
        //     manager.persist(model);
        //
        // }, () => {
        //
        //     manager.flush().then(next).catch(err => {
        //         console.error(err.stack || err);
        //     });
        //
        // });

    }

}
