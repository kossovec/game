'use strict';
const gulp = require('gulp');
const path = require('path');
const sequence = require('run-sequence');
const del = require('del');
const webpackStream = require('webpack-stream');

const webpackConfigName = './webpack.config.js';
const webpackConfig = require(webpackConfigName);


const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const LIBS_DIR = path.join(ROOT_DIR, 'libs');
const BUILD_DIR = webpackConfig.output.path;
const BUILD_DATA_FILES = [
    `${DATA_DIR}/**/*`,
];

const BUILD_LIBS_FILES = [
    `${LIBS_DIR}/**/*`
];

const defaultTasks = [];

defaultTasks.push('clean:binFiles');
defaultTasks.push('copy:libs');
defaultTasks.push('copy:wrapper');
defaultTasks.push('copy:data');


gulp.task("clean:binFiles", () => del([`${BUILD_DIR}/*.*`], {force: true})); //TODO use /** instead of *.* but it has bug.

gulp.task('copy:data', () => gulp.src(BUILD_DATA_FILES).pipe(gulp.dest(`${BUILD_DIR}/data`)));

gulp.task('build:clean', done => rimraf(BUILD_DIR, () => mkdirp(BUILD_DIR, done)));

gulp.task('copy:wrapper', () => {gulp.src('index.html').pipe(gulp.dest(BUILD_DIR))});

gulp.task('copy:libs', () => gulp.src(BUILD_LIBS_FILES).pipe(gulp.dest(`${BUILD_DIR}/libs`)));


gulp.task("server", () => {
    const liteServer = require('lite-server');

    process.chdir(path.resolve(BUILD_DIR));
    liteServer.server();
});
gulp.task('build:webpack', defaultTasks, () =>
    gulp.src(`${__dirname}/_src/index.js`).
    pipe(webpackStream(webpackConfig)).
    pipe(gulp.dest(BUILD_DIR)));

gulp.task('build:version', ()=>{}),

gulp.task('default', () => sequence('build:webpack', 'build:version'));

