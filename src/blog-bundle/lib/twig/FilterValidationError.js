/*
 * This file is part of the conga-blog-project application.
 *
 * (c) Anthony Matarazzo <email@anthonymatarazzo.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// third party libs
const _ = require('lodash');

/**
 * The FilterValidationError TwigJS filter, filters a validation error
 * by property and returns its message
 */
module.exports = class FilterValidationError {
    /**
     * Register the filter
     * @param {Container} container The service container
     * @param {twig} Twig The twig instance
     * @returns {void}
     */
    register(container, Twig) {

        // https://github.com/twigjs/twig.js/wiki/Extending-twig.js#filters

        Twig.exports.extendFilter('validation_error', (errors, args) => {
            const [ property ] = args;
            return (_.find(errors, { property }) || {}).message;
        });

    }
};