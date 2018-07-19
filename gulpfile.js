
//导入工具包 require('node_modules里面对应模块')
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-clean-css');
var sass = require('gulp-sass');



//实时重载
gulp.task('serve', ['autoprefixer', 'jsMin'], function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });
  gulp.watch('src/css/**/*.css', ['autoprefixer']);
  gulp.watch('src/js/**/*.js', ['jsMin']);
  gulp.watch('src/**/*.html', ['htmlMin']);
  gulp.watch('src/**/*.scss', ['sass']);
});

//压缩css,自动处理浏览器前缀
gulp.task('autoprefixer', function () {
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true,//是否美化属性值，默认 true
      remove: true,//是否去掉不必要的前缀 默认：true
    }))
    .pipe(cssmin())
    .pipe(notify({
      message:'css压缩完成'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({ stream: true }))
})
//sass编译css
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error',sass.logError))
    .pipe(notify({
      message:'sass编译完成'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({ stream: true }))
});
//压缩html
gulp.task('htmlMin', function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  gulp.src('src/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/html'))
    .pipe(notify({
      message:'html压缩完成'
    }))
    .pipe(reload({ stream: true }))
});
//合并压缩javascript文件,减少网络请求
gulp.task('jsMin', function () {
  gulp.src(['src/js/**/*.js','!src/js/asset/*.js'])
    .pipe(concat('all.js'))//合并后的文件名
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({
      message: 'js合并完成'
    }))
    .pipe(reload({ stream: true }))
});

gulp.task('default', ['serve', "autoprefixer", 'jsMin','htmlMin','sass'])


