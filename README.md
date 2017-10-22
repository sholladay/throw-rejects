# throw-rejects [![Build status for throw-rejects on Circle CI.](https://img.shields.io/circleci/project/sholladay/throw-rejects/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/throw-rejects "Throw Rejects Builds")

> Throw unhandled promise rejections.

Fixes error handling for [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), including the [swallowed error](http://jamesknelson.com/are-es6-promises-swallowing-your-errors/) problem, by converting unhandled rejections into normal thrown exceptions. Ensures that the process [crashes correctly](https://github.com/nodejs/node/pull/12010#issuecomment-289361496), just like [throwing non-Promise errors](https://nodejs.org/api/process.html#process_event_uncaughtexception) does.

## Why?

 - Promises do not distinguish between [operational and programmer errors](https://joyent.com/node-js/production/design/errors#operational-errors-vs-programmer-errors).
 - Unhandled rejections are usually accidental programmer errors.
 - By default, Node [doesn't even tell you](https://github.com/nodejs/promises/issues/26) about these errors.

The main argument _against_ crashing for uhandled rejections is that JavaScript allows programs to catch rejections asynchronously and crashing as soon as a Promise is rejected prevents this behavior. However, adding those "late" `.catch()` handlers asynchronously is almost always a bad idea and programs can be designed to avoid doing so. Crashing with a stack trace, as this module does, is a much more safe and helpful default behavior, as opposed to doing nothing and hoping that _maybe_ someone will handle the error in the future.

You can still use `.catch()` to avoid crashing, see [usage](#usage) for details.

## Install

```sh
npm install throw-rejects --save
```

## Usage

Get it into your program.

```js
const throwRejects = require('throw-rejects');
```

Activate the listener, which will convert unhandled Promise rejections into thrown exceptions. _We recommend doing this as early as possible, in case your other dependencies use Promises._

```js
throwRejects();
```

Or, you can shorten this by calling the function immediately.

```js
require('throw-rejects')();
```

Alternatively, use the [register](https://github.com/sholladay/throw-rejects/blob/master/register.js) script, which self-activates as a side effect.

```js
require('throw-rejects/register');
```

The `register` script is especially useful for modules using `import`, because that syntax does not allow immediate function calls. Thus, importing `register` is the shortest syntax in that environment.

```js
import 'throw-rejects/register';
```

## Handling errors

After the listener is activated, you can still handle errors yourself to avoid crashing, as long as you don't do something weird like reject a Promise and then [start a timeout](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args) which adds the `.catch()` 5 seconds later, for example.

```js
// Will crash with throw-rejects.
// Will NOT crash without throw-rejects.
const prom = Promise.reject(new Error('Uh oh'));
```
```js
const prom = Promise.reject(new Error('Uh oh'));
// Prevents throw-rejects from crashing the process.
// Will NOT crash, with or without throw-rejects.
prom.catch(() => {});
```
```js
const prom = Promise.reject(new Error('Uh oh'));
setTimeout(() => {
    // Will crash with throw-rejects. Does not prevent a crash because it is too late.
    // Will NOT crash without throw-rejects.
    prom.catch(() => {});
}, 5);
```

Specifically, rejections will be considered handled and the process will **not** crash as long as you add `.catch()` anytime within the same event loop as the Promise is rejected, That is basically anywhere you would normally do so. It doesn't have to be chained directly, it can be later in a function, etc.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/throw-rejects/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/throw-rejects/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/throw-rejects/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/throw-rejects/blob/master/LICENSE "The license for throw-rejects.") © [Seth Holladay](http://seth-holladay.com "Author of throw-rejects.")

Go make something, dang it.
