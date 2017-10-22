import path from 'path';
import test from 'ava';
import execa from 'execa';
import throwRejects from '.';

const fixture = (...args) => {
    const filepath = path.join('fixture', ...args);
    return execa('node', [filepath]);
};

test('basics', (t) => {
    t.is(typeof throwRejects, 'function');
});

test('ReferenceError in Promise without module', async (t) => {
    const prom = fixture('reference-error.js');
    await t.notThrows(prom);
    const resolved = await prom;
    t.is(resolved.code, 0);
    t.is(resolved.stdout, '');
    t.is(resolved.stderr, '');
});

test('ReferenceError in Promise with module', async (t) => {
    const err = await t.throws(fixture('reference-error-thrown.js'));
    t.is(err.code, 1);
    t.true(err.stderr.includes('ReferenceError: oopsie is not defined'));
});
