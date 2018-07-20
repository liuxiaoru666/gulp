
//导入工具包 require('node_modules里面对应模块')
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-clean-css');
var sass = require('gulp-sass');
var  babel = require('gulp-babel');


// //压缩css,自动处理浏览器前缀
// gulp.task('autoprefixer', function () {
//   gulp.src('src/css/**/*.css')
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions', 'Android >= 4.0'],
//       cascade: true,//是否美化属性值，默认 true
//       remove: true,//是否去掉不必要的前缀 默认：true
//     }))
//     .pipe(cssmin())
//     .pipe(notify({
//       message:'css压缩完成'
//     }))
//     .pipe(gulp.dest('dist/css'))
//     .pipe(reload({ stream: true }))
// })
//sass编译css
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error',sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true,//是否美化属性值，默认 true
      remove: true,//是否去掉不必要的前缀 默认：true
    }))
    .pipe(notify({
      message:'sass编译完成'
    }))
    .pipe(gulp.dest('dist/css'))
});
//html处理
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
      message:'html处理完成'
    }))
});
//合并压缩javascript文件,减少网络请求
gulp.task('jsMin', function () {
  gulp.src(['src/js/**/*.js','!src/js/asset/*.js'])
    .pipe(concat('all.js'))//合并后的文件名
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({
      message: 'js处理完成'
    }))
});
//监听
gulp.task('watch',function(){
  gulp.watch('./src/scss/**/*.scss',['sass']);
  gulp.watch('./src/**/*.html',['htmlMin']);
  gulp.watch('./src/js/**/*.js',['jsMin'])
})

/* 添加自动打开浏览器，实现热更新 */
gulp.task('webserver', function() {
  gulp.src("./")
    .pipe(webserver({
      livereload: true,
      host:"localhost",
      directoryListing: true,
      port:3001,
      open: true,
      // fallback: 'dist/'
    }));
  });


gulp.task('default', ['jsMin','htmlMin','sass','watch','webserver'])


