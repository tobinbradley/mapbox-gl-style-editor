// TODO: init arg to make base style

var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  path = require('path'),
  minimist = require('minimist'),
  exec = require('child_process').exec,
  fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  clean = require('gulp-clean'),
  validate = require('mapbox-gl-style-spec').validate;

var options = minimist(process.argv.slice(2), {
  string: 'style',
  default: { style: 'bright' }
});
var stylePath = './styles/' + options.style;

// make sure style folder exists
if (!fs.existsSync(stylePath)) {
  console.error(stylePath + " does not exist!");
  process.exit(1);
}

// function mkdir -p
function makeDir(path) {
  path.forEach(function(p) {
    mkdirp(p, function (err) {
        if (err) console.error(err);
    });
  });
}

// Live reload server
gulp.task('browser-sync', ['fonts', 'sprites'], function() {
  browserSync.init({
    server: 'app',
    plugins: ['bs-fullscreen-message'],
    files: [
        './app/*.html',
        './app/*.json'
    ]
  });
});

// make sprites
gulp.task('sprites', ['clean'], function(cb) {
    makeDir(['./app/assets/font']);
    exec('npm run makesprite -- ./app/assets/sprite ' + path.join(stylePath, '/svg'), function (err, stdout, stderr) {
      console.log('Generating sprites...');
      exec('npm run makesprite -- --retina ./app/assets/sprite@2x ' + path.join(stylePath, '/svg'), function (err, stdout, stderr) {
        console.log('Generating retina sprites...');
        cb();
      });
    });
});

// make fonts
gulp.task('fonts', ['clean'], function(cb) {
  fs.readdir(path.join(stylePath, '/font'), function(err, files) {
    console.log('Generating fonts...');
    files
       .filter(function(file) {
         return file.substr(-4) === '.ttf';
       })
       .forEach(function(file) {
         exec('npm run makefont -- ' + path.join(stylePath, '/font', file) + ' ./app/assets/font');
       });
    cb();
  });
});

// validate the style before moving to app folder
gulp.task('gl-style-validate', function() {
  try {
    var test = validate(fs.readFileSync(path.join(stylePath, 'style.json'), 'utf8'));
    if (test.length > 0) {
      browserSync.sockets.emit('fullscreen:message', {
          title: "Mapbox GL Style Error",
          body:  JSON.stringify(test, null, '    '),
          timeout: 1000000
      });
      console.log(test);
    } else {
      return gulp.src(path.join(stylePath, 'style.json'))
        .pipe(gulp.dest('app'));
    }
  } catch (e) {
    browserSync.sockets.emit('fullscreen:message', {
        title: "Mapbox GL Style Error",
        body:  'Message: ' + e.message + '\n   Line: ' + e.lineNumber,
        timeout: 1000000
    });
    console.log(e);
  }
});

// wipe old assets folder
gulp.task('clean', function() {
  return gulp.src(['./app/assets'], {read: false})
    .pipe(clean());
});

// watch for style changes
gulp.task('watch', function() {
  gulp.watch(['./styles/**/*.json'], ['gl-style-validate']);
});


gulp.task('default', ['clean', 'sprites', 'fonts', 'browser-sync', 'watch', 'gl-style-validate']);
//gulp.task('default', ['clean', 'sprites', 'browser-sync', 'watch', 'gl-style-validate']);
gulp.task('generate', ['clean', 'sprites', 'fonts']);
