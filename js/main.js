$(document).ready(function(){

	var $images = $('.gallery .images img'),
		$thumbs = $('.gallery .thumbs img'),
		$mask = $('.gallery .images'),
		$nextBtn = $('.next-btn'),
		$prevBtn = $('.prev-btn'),
		$slider,
		numImages = $images.length,
		currentIndex = 0,
		lastIndex = numImages - 1,
		delay = 4000,
		timeout;

	function slideToImage(){
		$slider.css({'margin-left': -currentIndex*100+"%"});
		$thumbs.filter('.selected').removeClass('selected');
		$thumbs.eq(currentIndex).addClass('selected');
	}

	function nextImage(){
		clearTimeout(timeout)
		currentIndex = (currentIndex < lastIndex)? currentIndex + 1 : 0;
		slideToImage();
		timeout = setTimeout(nextImage, delay);
	}
	//initialise
	//wrap the images in a slider
	$images.wrapAll('<div class="slider">');
	$slider = $('.gallery .slider');
	//set slider and images width
	$slider.width(100*numImages+"%").css({transition:'all 1s'});
	$images.width(100/numImages+"%");
	//set thumb selected state
	$thumbs.eq(currentIndex).addClass('selected');
	$mask.css({overflow: 'hidden'});
	timeout = setTimeout(nextImage, delay);

	$thumbs.click(function(){
		currentIndex = $thumbs.index(this);
		slideToImage()
	});

	$nextBtn.click(nextImage);

	$prevBtn.click(function(){
		currentIndex = (currentIndex > 0)? currentIndex - 1 : lastIndex;
		slideToImage()
	});
});