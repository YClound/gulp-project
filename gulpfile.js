const { series, parallel, src, dest, EventEmitter, watch } = require('gulp');
const ts = require("gulp-typescript");
const tsCompile = ts.createProject('tsconfig.json');
const browserify = require('browserify');
const tsify = require('tsify');

const gulpIf = require("gulp-if");
const babel = require("gulp-babel");
const webpackStream = require("webpack-stream");
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
const gulpClean = require('gulp-clean');
const less = require('gulp-less');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const jsMinify = require('gulp-minify');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');

sass.compiler = require('node-sass');
const env = process.env.NODE_ENV;
console.log(env)
const rootDir = env === 'production' ? './dist' : './dev';
const build = env === 'production' ? true : false;

// 返回stream
function cleanDir() {
    return src(rootDir, { read: false, allowEmpty: true })
        .pipe(gulpClean());
}

function cssBuild() {
    return src('./src/**/*.less')
        .pipe(less())
        .pipe(src('./src/**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(build, cssmin()))
        .pipe(dest(rootDir))
}

function jsbuild() {
    return src('./src/**/*.js')
        .pipe(named())
        .pipe(webpackStream({ mode: "development" }))
        .pipe(babel())
        .pipe(gulpIf(build, jsMinify({ noSource: true, ext: { min: '.js' } })))
        .pipe(dest(rootDir + '/js'))
}

function tsBuild() {
    return browserify({
        basedir: './src',
        debug: true,
        entries: ['**/*.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .pipe(gulpIf(build, uglify()))
        .pipe(dest(rootDir))
}

function htmlBuild() {
    return src('./src/**/*.html')
        .pipe(gulpIf(build, htmlmin({ collapseWhitespace: true })))
        .pipe(dest(rootDir))
}

function imageBuild() {
    return src('./src/images/*.*')
        .pipe(imagemin())
        .pipe(dest(`${rootDir}/images`))
}

function connectServer() {
    connect.server({
        root: rootDir,
        livereload: true,
        // host: '10.1.8.105',
        port: 9090, //服务器端口
        middleware: function (connect, opt) {
            return [
                proxy('/datahub', {
                    target: 'http://test.openapi.shuli.com',
                    changeOrigin: true
                })
            ]
        }
    });
}

function reloadPage() {
    return src('./src/**/*.*')
        .pipe(connect.reload());
}

function watchLive(cb) {
    watch('./src/**/*.js', { ignoreInitial: false }, jsbuild);
    watch('./src/**/*.ts', { ignoreInitial: false }, tsBuild)
    watch('./src/**/*.less', { ignoreInitial: false }, cssBuild);
    watch('./src/**/*.html', { ignoreInitial: false }, htmlBuild);
    watch('./src/images/*.*', { ignoreInitial: false }, imageBuild);
    cb();
}
function start(cb) {
    connectServer();
    watch('./src/**/*.*', { ignoreInitial: false }, reloadPage);
    cb();
}

exports.start = series(cleanDir, watchLive, start);
exports.build = series(cleanDir, jsbuild, cssBuild, htmlBuild, imageBuild, connectServer);



// 返回promise
function promiseTask() {
    return Promise.resolve('the value is ignored');
}

// 返回event emitter
function eventEmitterTask() {
    const emitter = new EventEmitter();
    setTimeout(() => emitter.emit('finish'), 250);
    return emitter;
}

// 返回child process
const { exec } = require('child_process');
function childProcessTask() {
    return exec('date');
}
exports.childProcessTask = childProcessTask;


// 返回 observable
const { Observable } = require('rxjs');

function observableTask() {
    return Observable.of(1, 2, 3);
}

exports.default = observableTask;


const fs = require('fs');

async function asyncAwaitTask() {
    const { version } = fs.readFileSync('package.json');
    console.log(version);
    await Promise.resolve('some result');
}

exports.asyncAwaitTask = asyncAwaitTask;



// exports.build = build;
// exports.default = parallel(build, series(clean, build));
