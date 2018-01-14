# Change Log

## 1.0.0 - 2018-01-13

**Added**

- Initial release

## 1.0.1 - 2018-01-14

**Added**

- Allow handling strings, HTMLCollections, and NodeLists as part of arrays
  passed to appendTo, prependTo, insertBefore and insertAfter. Previously
  only able to process arrays of nodes.

## 1.0.2 - 2018-01-14

**Added**

- Added version scripts to ensure 'npm version' artifacts are committed with
  bumped package.json and package-lock.json files. Specifically, this ensures
  that dist files have the appropriate version number added to the comments
  before pushing or publishing to NPM.
