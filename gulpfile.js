
var gulp = require('gulp');
var cssMin=require('gulp-clean-css');//压缩css
var webserver = require("gulp-webserver");//开启服务器
var notify = require('gulp-notify');//显示错误信息，报错后不终止任务
var uglify = require('gulp-uglify');//压缩js
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');//压缩html
var imagemin = require('gulp-imagemin');//压缩图片
var fontSpider = require( 'gulp-font-spider' );//压缩字体

// 调用方法打印
gulp.task('message', function(){
  return console.log('Gulp is running...');
});

/*开启有一个服务器*/
gulp.task("webserver",function(){
    gulp.src("./")
        .pipe(webserver({
            livereload: true, /*修改文件自动刷新*/
            directoryListing: {  /*要不要显示目录，开发环境下可以显示*/
                enable:true,
                path: './'  /*有哪个目录下开始访问*/
            },
            port: 81, /*端口号*/
            host: 'localhost'
        }))
});

//复制并压缩html
gulp.task("copyHtml",function(){
    gulp.src("src/html/*.html")
    	.pipe(htmlmin({collapseWhitespace: true}))
		 .pipe(notify({
		    message: 'html compress done'
		  }))
        .pipe(gulp.dest("dist/html"))
});

//复制并压缩js
gulp.task('copyJs', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        notify({
		    message: 'js compress done'
		  }),
        gulp.dest('dist/js'),
       
    ],
    cb
  );
});

//复制并压缩css
gulp.task("copyCss",function(){
    gulp.src("src/css/*.css")
    		.pipe(cssMin())
			  .pipe(notify({
			    message: 'css compress done'
			  }))
        .pipe(gulp.dest("dist/css"))
});

//压缩图片
gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
         .pipe(notify({
			    message: 'images compress done'
			  }))
);
//压缩字体
gulp.task('fontspider', function() {
    return gulp.src('./src/html/*.html')
        .pipe(fontSpider())
        .pipe(notify({
			    message: 'font compress done'
			  }))
});

gulp.task("watch",function(){
  gulp.watch('./src/html/*.html', ['copyHtml']);
  gulp.watch('./src/css/*.css', ['copyCss']);
  gulp.watch('./src/js/*.js', ['copyJs']);
  gulp.watch('./src/images/*', ['imagemin']);
  gulp.watch('./src/html/*.html', ['fontspider']);
})

gulp.task('default', ['webserver','watch','message', 'copyHtml', 'copyCss','copyJs','imagemin','fontspider']);
