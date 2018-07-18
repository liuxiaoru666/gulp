
//导入工具包 require('node_modules里面对应模块')
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');


//自动处理浏览器前缀
gulp.task('autoprefixer',function(){
  gulp.src('src/css/index.css')
  .pipe(autoprefixer({
    browsers:['last 2 versions','Android >= 4.0'],
    cascade:true,//是否美化属性值，默认 true
    //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true,//是否去掉不必要的前缀 默认：true
  }))
  .pipe(gulp.dest('dist/css'))
})
//合并javascript文件,减少网络请求
gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});


