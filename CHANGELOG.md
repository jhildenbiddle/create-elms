# Change Log

## 1.0.5 - 2018-01-31

**Updated**

- Dev dependencies
- Rollup configuration
- README

## 1.0.4 - 2018-01-17

**Fixed**

- Unminified /dist files now include JSDOC comments from /src. This allows
  documentation to be displayed in IDEs.

## 1.0.3 - 2018-01-14

**Added**

- Added NPM badge to README.md

## 1.0.2 - 2018-01-14

**Added**

- Added version scripts to ensure 'npm version' artifacts are committed with
  bumped package.json and package-lock.json files. Specifically, this ensures
  that dist files have the appropriate version number added to the info comment
  before committing the version bump or publishing to NPM.

## 1.0.1 - 2018-01-14

**Added**

- Allow handling strings, HTMLCollections, and NodeLists as part of arrays
  passed to appendTo, prependTo, insertBefore and insertAfter. Previously
  only able to process arrays of nodes.

## 1.0.0 - 2018-01-13

**Added**

- Initial release.