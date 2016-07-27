var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
		request('http://vnexpress.net/noi-that-dep/tag-195148-1.html', function (error, response, html) {
		  if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			//list article short content 
			$('h2.title_news').each(function(i, element){
			//init value
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
			  //content details article
			  request(metadata.url, function (error, response, html) {
					if (!error && response.statusCode == 200) {
					  //init variable
						var $ = cheerio.load(html);
						var titleH1 = $('.title_news > h1').text();				  
						var item_slide_show=[];
						//have slide show
						var slideshow = $('#article_content >div').hasClass('item_slide_show');
						console.log(slideshow);
						if(slid	eshow){
						  $('.item_slide_show').each(function(i, element){
							var imge = $(this).children().children('img');
							var imgSlide = imge.attr('src');
							item_slide_show.push(imgSlide);
						  });
						  } else{
								//table tplCaption
							  $('table.tplCaption > tbody > tr > td').each(function(i, element){
									var img_tplCaption = $(this).children('img').attr('src');
									item_slide_show.push(img_tplCaption);
							  });
						}
					  //save to file
						for(var i=0;i<item_slide_show.length;i++){
							fs.appendFileSync('link/details.txt',titleH1+'\n'+ item_slide_show[i]+'\n');
						}
					}
			  });
			 fs.appendFileSync('link/reddit.txt', metadata.title+'\n'+metadata.url+'\n'+metadata.imglink+'\n'+metadata.subtext);
			});
		  }
		});
		





