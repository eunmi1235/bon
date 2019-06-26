/**
* --------------------------------
* FUNCTION JS
* --------------------------------
*/

var fn = (function() {
    'use strict';

    return {
        scroll : function(state){
            switch (state) {
                case 'enabled' :
                    $('body').off('touchmove');
                break;

                case 'disabled' :
                    $('body').on('touchmove', function(e) {
                        e.preventDefault();
                        return false;
                    });
                break;
            }
        },

        alertOpen : function(obj){
            if (typeof obj === 'object') {
                obj = obj.attributes.href.value
            }

            var $obj = $(obj);

            $obj.fadeIn(400);
            $obj.find('.inner').animate({'top':'50%'},400);

            fn.scroll('disabled');
        },

        alertClose : function(callback){
            var $obj = $('.alert');

            $obj.find('.inner').animate({'top':'60%'},400);
            $obj.fadeOut(400);

            fn.scroll('enabled');

            if (callback) {
                setTimeout(function(){
                    callback();
                }, 400);
            }
        },

        popupOpen : function(obj){
            if (typeof obj === 'object') {
                obj = obj.attributes.href.value
            }
            var $obj = $(obj);

            $obj.show();
            $('.iScrollVerticalScrollbar').remove();
            var myScroll = new IScroll('.popup .contents', {
    			scrollbars: true,
    			mouseWheel: true,
    			interactiveScrollbars: true,
    			shrinkScrollbars: 'scale',
    			fadeScrollbars: true
    		});
        },

        popupClose : function(callback){
            var $obj = $('.popup');

            $obj.hide();

            if (callback) {
                setTimeout(function(){
                    callback();
                }, 400);
            }
        },

        // 말줄임 처리
        ellipsis : function(obj) {
            var $obj = $(obj);

            $obj.each(function() {
                var $obj = $(this),
                    tempTxt = $obj.text(),
                    tempTxtArr = tempTxt.split(''),
                    tempTxtLen = tempTxt.length,
                    ellipsisTxt = '',
                    ellipsisTxtLen;

                $obj.empty();
                $obj.append('<div></div>');

                for (var i = 0; i <= tempTxtLen - 1; i++) {
                    if ($obj.height() >= $obj.children().height()) {
                        ellipsisTxt += tempTxtArr[i];
                        $obj.children().text(ellipsisTxt);
                    }
                }

                if ($obj.height() < $obj.children().height()) {
                    ellipsisTxtLen = ellipsisTxt.length;
                    ellipsisTxt = ellipsisTxt.substr(0, ellipsisTxtLen - 3);
                    ellipsisTxt += '...';
                }

                $obj.empty();
                $obj.text(ellipsisTxt);
            });
        },

        // 탭메뉴
        tabMenu : function(e, obj){
            var $obj = $(obj),
                objHref = obj.attributes.href.value;

            if (objHref.indexOf('#') != -1) {
                e.preventDefault();

                $('.tab_menu a').removeClass('on');
    			$obj.addClass('on');

    			$('.tab_contents').removeClass('show');
    			$(objHref).addClass('show');
            }
        },

        // 슬라이드
        slide : function(obj, option){
            var $obj = $(obj);

            $obj.each(function(){
                var $obj = $(this),
                    $objInner = $obj.children('.inner'),
                    $objMain = $obj.children('.inner').children('ul'),
                    $btnPrev = $obj.find(option.btnPrev),
                    $btnNext = $obj.find(option.btnNext),
                    $optionPagination = $obj.find(option.pagination),
                    optionWidth = parseInt(option.width),
                    optionMargin = parseInt(option.margin),
                    $btnHide = option.btnHide;

                var listLen = $obj.find('li').length;

                if (!optionWidth) {
                    var listWidth = listLen * ($obj.find('li').outerWidth() + optionMargin) - optionMargin;
                } else {
                    var listWidth = listLen * (optionWidth + optionMargin) - optionMargin;
                }

                $objMain.css({'width':listWidth});


                if (listLen > 1) {
                    for (var i=1; i<=listLen; i++) {
                        if (i === 1) {
                            $optionPagination.append('<span class="active"></span>');
                        } else {
                            $optionPagination.append('<span></span>');
                        }
                    }
                }
                if($btnHide!=undefined&&$btnHide!=NaN){
                    if(listLen < $btnHide){
                        $btnPrev.hide();
                        $btnNext.hide();
                    }
                }
                $optionPagination.find('span').click(function(){
                    $optionPagination.find('span').removeClass('active');
                    var idx = $(this).index();

                    $(this).addClass('active');
                    $objMain.animate({'left':0-($obj.find('li').outerWidth()*idx)}, 300);
                });

            	$btnNext.click(function(){
            		if (!$objMain.is(':animated') && parseInt($objMain.css('left')) > $objInner.width() - $objMain.width()) {
            			$objMain.animate({'left':'-=' + ($obj.find('li').outerWidth() + optionMargin)}, 500);
            		}
            	});
                $btnPrev.click(function(){
            		if (!$objMain.is(':animated') && parseInt($objMain.css('left')) !== 0 ) {
            			$objMain.animate({'left':'+=' + ($obj.find('li').outerWidth() + optionMargin)}, 500);
            		}
            	});
            })
        },

        // 댓글 입력
        reply : function(obj){
            var $obj = $(obj);

            $(obj).find('textarea').keyup(function(e){
				var counter = $(this).val();
				if($(this).val().length > 400){
					$(this).val($(this).val().substring(0, 400));
				}
				$(this).closest('.reply_box').find('.re_counter').html('<b>' + counter.length + '</b>' + '/400');
			});
            $(obj).find('textarea').each(function(){
                $(this).keyup();
            });
        },

        //파일첨부 업로드
        upload : function(obj){
            var obj = $(obj);
            var filename='';
            obj.find('.upload_hidden').on('change', function(){
                if(window.FileReader){
                    if($(this)[0].files[0]==undefined){
                        filename='';
                    }else{
                        filename = $(this)[0].files[0].name;
                    }
                    obj.find('label').text(filename);
                } else {
                    filename = $(this).val().split('/').pop().split('\\').pop();
                    obj.find('label').text(filename);
                }
             });
        },

        //셀렉 트리거
        selectTrigger : function(obj){
            var obj = $(obj);

            obj.each(function(){
                $(this).click(function(){
        			selChange($(this).find('ul').attr('id'));
        		});
            });
    		function selChange(strid){
    			var selId = strid.split('-menu');
    			$('#'+selId[0]).trigger('change');
    		}
        }
    }
})();
