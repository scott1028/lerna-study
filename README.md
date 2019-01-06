# Notice

1. To lerna run will include `./node_moduls/**/*` & `./packages/**/node_modules/**/*`, so put the `lerna add` after `yarn add`.
2. After `lerna add` it will restore `./package.json` but `node_modules` with installed packages.
