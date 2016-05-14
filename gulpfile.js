var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var nunjucksRender = require('gulp-nunjucks-render');
var open = require('gulp-open');

var bases = {
    app: 'app/',
    dist: 'dist/',
};
var paths = {
    scripts: ['scripts/main.js', '!scripts/app.js', '!scripts/libs/**/*.js'],
    libs: ['scripts/libs/jquery/dist/jquery.js'],
    styles: ['styles/**/*.scss'],
    html: ['index.html'],
    images: ['images/**/*.png']
};

// GULP CONNECT
gulp.task('connect', function() {
    connect.server({
        root: ['app'],
        livereload: true,
        port: 9000,
        open: {
            browser: 'chrome' // if not working OS X browser: 'Google Chrome' 
        }
    });
});

// LIVE RELOAD
gulp.task('reload', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});






// GULP OPEN
gulp.task('open', function() {
    var options = {
        uri: 'http://localhost:9000',
        app: 'chrome'
    };
    gulp.src('app/index.html')
        .pipe(open(options));
});
// TEMPLATING
gulp.task('nunjucks', function() {
    return gulp.src(['app/pages/*.nunjucks'])
        .pipe(nunjucksRender({
            path: ['app/pages/', 'app/partials/', 'app/templates/'] // String or Array
        }))
        .pipe(gulp.dest('app'));
});


/*DEVELOPMENT*/
// Process scripts and concatenate them into one output file
gulp.task('dev_scripts', function() {
    gulp.src(paths.scripts, { cwd: bases.app })
        .pipe(concat('app.js'))
        .pipe(gulp.dest(bases.app + 'scripts/'))
        .pipe(connect.reload());
});



//Converting sass file to css
gulp.task('dev_sass', function() {
    gulp.src(paths.styles, { cwd: bases.app })
    	.pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))      
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(bases.app + 'styles/'))
        .pipe(connect.reload());
});



// Imagemin images and ouput them in dist
gulp.task('dev_imagemin', function() {
    gulp.src(paths.images, { cwd: bases.app })
        .pipe(imagemin())
        .pipe(gulp.dest(bases.app + 'images/'));
});



/*PRODUCTION*/
// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src(bases.dist)
        .pipe(clean());
});



// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
    gulp.src(paths.images, { cwd: bases.app })
        .pipe(imagemin())
        .pipe(gulp.dest(bases.dist + 'images/'));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
    // Copy html
    gulp.src(paths.html, { cwd: bases.app })
        .pipe(gulp.dest(bases.dist));

    // Copy styles
    gulp.src('styles/app.css', { cwd: bases.app })
        .pipe(cleanCSS())
        .pipe(gulp.dest(bases.dist + 'styles'));

    // Copy script and minify
    // Process scripts and concatenate them into one output file
    gulp.src('scripts/app.js', { cwd: bases.app })
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));

    // Copy lib scripts, maintaining the original directory structure
    gulp.src(paths.libs, { cwd: 'app/**' })
        .pipe(gulp.dest(bases.dist));
});
//watching for CHANGES
gulp.task('watch', function() {
    gulp.watch(['app/**/*.scss', ], ['dev_sass']);
    gulp.watch(['app/**/*.nunjucks'], ['nunjucks']);
    gulp.watch(['app/*.html'], ['reload']);
    gulp.watch(['app/scripts/*.js'], ['dev_scripts']);
});


// Running developmen task
gulp.task('default', ['connect', 'dev_scripts', 'dev_imagemin', 'dev_sass', 'nunjucks', 'open', 'watch']);


// Creating 'dist' folder
gulp.task('dist', ['clean', 'imagemin', 'copy']);
