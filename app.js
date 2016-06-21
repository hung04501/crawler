var request = require('request');
var cheerio = require('cheerio');
// var fs = require('fs');
// var url_img;
// //Server
// var express = require('express');

// var app = express();


// //configure routes

// var router=express.Router();

// app.set('port', process.env.PORT || 8000);


// var server = app.listen(app.get('port'), function() {
  // console.log('Express server listening on port ' + server.address().port);
// });


// app.get('/',function (req, res) {
	// res.sendFile(__dirname+'/index.html');
// });

// app.post('/route',function (req, res) {
	// page = req.query.id;
		
		// request("http://kinhdoanh.vnexpress.net/", function(error, response, body) {
		  // if(error) {
			// console.log("Error: " + error);
		  // }
		  // console.log("Status code: " + response.statusCode);
		  
		  // var $ = cheerio.load(body);

		 // $('div.block_mid_new > ul#news_home > li').each(function(index) {
			// debugger;
		   // var title = $(this).find('h2.title_news > a').text().trim();
		   // var test_link = $(this).find('div.block_image_news > div.thumb > a').attr('href');
		   // var url_img = $(this).find('div.block_image_news > div.thumb > a > img').attr('src');
			// fs.appendFileSync('link/reddit.txt', title +'\n' + url_img + '\n' + test_link +'\n');
		  // });

		// });
		
		
		request('http://vnexpress.net/noi-that-dep/tag-195148-1.html', function (error, response, html) {
		  if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			$('h2.title_news').each(function(i, element){
		   
			  var a = $(this).next();
			  var c = $(this).prev().children().children('img');
			  var b = $(this).children();
			  var imglink = c.attr('src');
			  var subtext = a.text();
			  var url = b.attr('href');
			  var title = b.text();
			   
			  // Our parsed meta data object
			  var metadata = {
				title: title,
				url: url,
				imglink : imglink,
				subtext: subtext
			  };
			  console.log(metadata);
			});
		  }
		});
		
// });





