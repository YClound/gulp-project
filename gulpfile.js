const { series, parallel, src, dest, EventEmitter, watch } = require('gulp');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gulpClean = require('gulp-clean');
const less = require('gulp-less');
const liveReload = require('gulp-livereload');


function cleanJs() {
    return src('./dist', { read: false })
        .pipe(gulpClean());
}

function lessBuild() {
    return src('./src/**/*.less')
        .pipe(less())
        .pipe(dest('./dist'))
        .pipe(liveReload())
}

// 返回stream
function build() {
    return src(['./src/**/*.ts', '!./src/static/*.ts'])
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('./dist'))
        .pipe(liveReload())
}

function htmlBuild() {
    return src('./src/**/*.html')
        .pipe(liveReload())
}

function start() {
    watch('./src/**/*.ts', { ignoreInitial: false }, build);
    watch('./src/**/*.less', { ignoreInitial: false }, lessBuild);
    watch('./src/**/*.html', htmlBuild)
}

exports.start = start;



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



exports.build = build;
// exports.default = parallel(build, series(clean, build));
