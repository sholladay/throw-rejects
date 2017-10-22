'use strict';

const throwRejects = require('..');
throwRejects();

Promise.resolve().then(() => {
    oopsie();
});
