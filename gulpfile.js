var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('createDocsConf', shell.task([
  'rm -rf ./docs',
  './node_modules/.bin/jsdoc -c jsdoc.json'
]));

gulp.task('pushGH', shell.task([
    'git subtree push --prefix docs origin gh-pages'
]));
