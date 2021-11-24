/* Proyecto Muto por Melina Avalo */
function randombg(){
    var bg = document.getElementById("bg");
    var random= Math.floor(Math.random() * 14) + 1;
    bg.style.backgroundImage='url('+templateDir+'/imgs/fondo'+[random]+'.jpeg';
}

randombg();

(function($) {
    function animacionScroll() {
        if(window.innerWidth > 960) {       
            var WinScrollTop = $(window).scrollTop(); 
            var galeriaHeight = $('.content-galeria').height() - $('.header').outerHeight(true) - $('.galeria-nav').outerHeight(true);
            if((WinScrollTop > $('.content-galeria').offset().top) && (WinScrollTop < galeriaHeight)) { 
                $('.animacion').css({'top':WinScrollTop - $('.header').outerHeight(true) - $('.galeria-nav').outerHeight(true) +'px'})           
            } else if(WinScrollTop > galeriaHeight) {
                console.log('bottom')
                $('.animacion').css({'top':'auto', 'bottom':'0'});
            } else if (WinScrollTop < $('.content-galeria').offset().top) {
                $('.animacion').css('top','0');
                console.log('top')
            }
        }
    }

    function minHeightVideo() {
        $('.animacion').css({'height':$(window).height()*0.92});
    }

    $(document).ready(function(){

        if($('.content-galeria').length) {
            animacionScroll();
            minHeightVideo();
        }
       
        $(window).scroll(function(){
            if($('.content-galeria').length) {
                animacionScroll();
            }
        });

        $(document).on('click', '.galeria-nav button', function(){
            $('.galeria-nav button').removeClass('active');
            $(this).addClass('active');

            var galeriaTipo = $(this).data('galeria');
            var postID =  $(this).data('id');          
            $.ajax({  
                type: 'GET',  
                url: adminAjax,  
                data: { action : 'loadPart', galeria : galeriaTipo, postID : postID }, 
                beforeSend: function() {
                    $( '.content-galeria' ).append( '<div class="loader-wrapper"><div class="loader"></div></div>' ); 
                },
                success: function(textStatus){  
                    $( '.content-galeria' ).html( textStatus ); 
                },  
                error: function(MLHttpRequest, textStatus, errorThrown){  
                    alert(errorThrown);  
                }  
            });  
        });

        $(document).on('click', '.galeria-item-video', function(){
            var video = $(this).data('video');
            $('.galeria-item-video').removeClass('active');
            $(this).addClass('active');
            $('.animacion video').attr("src", video);
            if(window.innerWidth < 960) {
                $('body,html').stop(true,true).animate({'scrollTop':$('.animacion').offset().top},500);
            }
        });

        $(document).on('click', '.galeria-item', function(){
            var img = $(this).data('img');
            $('.popup').addClass('visible');
            $('.popup-image').html( '<div class="loader-wrapper"><div class="loader"></div></div>' ); 
            $('.popup-image').append('<img src="'+img+'" alt="P r o y e c t o M U T O">');
            $('.popup-image .loader-wrapper').remove();
        });

        $(document).on('click', '.popup-close', function(){
            $('.popup').removeClass('visible');
        });

        $(document).on('click', '.popup.visible:not(.popup-content)', function(){
            $('.popup').removeClass('visible');
        });
        

    });

    /*Resize Window scripts*/
    var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();
	
	
	$(window).resize(function () {
		waitForFinalEvent(function(){

            if($('.content-galeria').length) {
                minHeightVideo();
            }			
			
		}, 500, "resize");
	});
})(jQuery);
