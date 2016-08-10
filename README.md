# throw-rejects [![Build status for throw-rejects on Circle CI.](https://img.shields.io/circleci/project/sholladay/throw-rejects/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/throw-rejects "Throw Rejects Builds")

> Throw unhandled promise rejections.

## Why?

 - Unhandled rejections are almost always accidental.
 - Handling rejections asynchronously is almost always a bad idea.
 - You want to know about errors and Node [doesn't help](https://github.com/nodejs/promises/issues/26).

## Install

```sh
npm install throw-rejects --save
```

## Usage

Get it into your program.

```js
const throwRejects = require('throw-rejects');
```

Install the listener when you are ready.

```js
throwRejects();
```

Alternatively, have us install the listener for you.

```js
require('throw-rejects/register');
```

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
