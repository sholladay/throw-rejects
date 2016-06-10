'use strict';

function onUnhandledRejection(err) {
    throw err;
}

let registered = false;

module.exports = () => {
    if (!registered) {
        process.on('unhandledRejection', onUnhandledRejection);
        registered = true;
    }
};
