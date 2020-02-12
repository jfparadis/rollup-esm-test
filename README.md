# Test of Rollup with native ESM module

<!--
  ⚡️ katchow! We 💛 issues.

  Please - do not - remove this template.
  Please - do not - skip or remove parts of this template.
  Or your issue may be closed.

  👉🏽 Need help or tech support? Please don't open an issue!
  Head to https://gitter.im/rollup/rollup or https://stackoverflow.com/questions/tagged/rollupjs

  👉🏽 Is this issue related to an official plugin? Please do not open an issue here, go to the plugins repository instead: https://github.com/rollup/plugins/issues

  ❤️ Rollup? Please consider supporting our collective:
  👉 https://opencollective.com/rollup/donate
-->

- Rollup Version: 1.27.5
- Operating System (or Browser): MacOS
- Node Version (if applicable): v13.6.0
- Link to reproduction (IMPORTANT, read below): https://github.com/jfparadis/rollup-esm-test

<!--
  Issues without minimal reproductions will be closed! Please provide a link to one by:
  1. Using the REPL at https://rollupjs.org/repl/, or
  2. Using the REPL.it reproduction template at https://repl.it/@rollup/rollup-repro
     (allows full use of all rollup options and plugins), or
  3. Provide a minimal repository link (Read https://git.io/fNzHA for instructions).
     These may take more time to triage than the other options.

  For some bugs it this may seem like overkill but believe us, very often what seems like a
  "clear issue" is actually specific to some details of your setup. Having a runnable
  reproduction not only "proves" your bug to us but also allows us to spend all our effort
  fixing the bug instead of struggling to understand your issue.
-->

Module support in node is still in early stages (and maybe not ready for runtime), but there are  benefits to use it in a tool chain, and to begin creating packages with native support:
- to get the native behavior of JS in tests
- to avoid caching issues with `esm` transpilation

Numerous options are possible as documented here:
https://github.com/nodejs/node/blob/master/doc/api/esm.md#approach-1-use-an-es-module-wrapper

### Expected Behavior

This form should be usable from a package with native ESM support:
``` js
import { rollup } from 'rollup';
```

As verifiable via a simple command-line test:
```
node  --input-type=module -e "import { rollup } from 'rollup'; console.log(typeof rollup)"
function
```

Or as verifiable in context of the test package provided:
```
git clone https://github.com/jfparadis/rollup-esm-test.git
cd rollup-esm-test
npm install

npm test

# rollup
ok 1 should be equal

1..1
# tests 1
# pass  1

# ok
```

### Actual Behavior

Error, as verifiable via a simple command-line test:
```
node  --input-type=module -e "import { rollup } from 'rollup';"
import { rollup } from 'rollup';
         ^^^^^^
SyntaxError: The requested module 'rollup' does not provide an export named 'rollup'
```

Or as verifiable in the context of the test package provided:
```
git clone https://github.com/jfparadis/rollup-esm-test.git
cd rollup-esm-test
npm install
npm test
import { rollup } from 'rollup';
         ^^^^^^
SyntaxError: The requested module 'rollup' does not provide an export named 'rollup'
```

### Workaround

The workaround is to use a wrapper or an alternate syntax to resolve the exports:
```js
import cjsRollup from 'rollup';
const { rollup } = cjsRollup;
```

As verifiable via a simple command-line test:
```
node  --input-type=module -e "import cjsRollup from 'rollup'; const { rollup } = cjsRollup; console.log(typeof rollup)"
function
```

Or as verifiable the in context of the test package provided, by commenting and uncommenting a few lines in `test.js`.

<!--
  Most issues can be expressed or demonstrated through the REPL or a repository.
  However, the situation may arise where some small code snippets also need to
  be provided. In that situation, please add your code below using
  Fenced Code Blocks (https://help.github.com/articles/creating-and-highlighting-code-blocks/)
-->
