/**
* --------------------------------
* SERVEQ JS
* --------------------------------
*/

/* COMMON */

// SUB 로케이션
$('#path div[class^="path"]').click(function(){
    $(this).toggleClass('on');
});

// FOOTER 패밀리사이트
$('#footer .family').click(function(){
    $(this).toggleClass('on');
});

// HEADER 검색
$('#header .menu_search, #search ~ .dimd').click(function(e){
    e.preventDefault();
    $('#search').toggleClass('on');
    $('#search').siblings('.menu_search').toggleClass('on');
});

// 앵커이동 X
$('a[href="#"]').click(function(e){
    e.preventDefault();
});

// SELECT
$('select').selectmenu();
fn.selectTrigger('.ui-selectmenu-menu');

// 말줄임처리
fn.ellipsis('.ellipsis');

// 탭메뉴
$('.tab_menu a').click(function(e){
    fn.tabMenu(e, this);
});

fn.upload('.upload');

if ($('#path')) {

}

/*
    클래스 타입
    특문제외 타입 : inpStr
    정수 타입 : inpInteger
    실수 타입 : inpRealNum
    ※ 두타입 숫자 입력기반에 특수문자입력 방지
*/
// refreshInterval 종료변수, memoryVar 실수체크 변수
/* 정규식 // */
var refreshInterval = "";
var memoryVar = "";
$(document).on('focus','.inpStr',function(){
    var objinp = $(this);
    refreshInterval=setInterval(function(){
        objinp.trigger('change');
    },40);
    return;
});
$(document).on('focus','.inpInteger',function(){
    var objinp = $(this);
    refreshInterval=setInterval(function(){
        objinp.trigger('change');
    },40);
    return;
});
$(document).on('focus','.inpRealNum',function(){
    var objinp = $(this);
    refreshInterval=setInterval(function(){
        objinp.trigger('change');
    },40);
    return;
});

$(document).on('focusout','.inpStr',function(){
    clearInterval(refreshInterval);
    memoryVar='';
});
$(document).on('focusout','.inpInteger',function(){
    clearInterval(refreshInterval);
    memoryVar='';
});
$(document).on('focusout','.inpRealNum',function(){
    clearInterval(refreshInterval);
    memoryVar='';
    if(!$(this).val()==""){
        var x = parseFloat($(this).val());
        $(this).val(x.toFixed(1));
    }
});

$(document).on('change','.inpStr',function(){
    $(this).val();
    var pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;

    $(this).val(
        $(this).val().replace(/[\"\',]/,"")
     );
});

$(document).on('change','.inpInteger',function(){
    $(this).val(
        $(this).val().replace(/[^0-9]/gi,"")
     );
});
$(document).on('change','.inpRealNum',function(){
    var reg = /^[+-]?\d*(\.?\d*)$/;
    var x =reg.test($(this).val());
    if(x==false){
        $(this).val(memoryVar);
    }
    $(this).val(
        $(this).val().replace(/[^0-9.]/gi,"")
    );
    memoryVar = $(this).val();
});
/* // 정규식 */



$(window).scroll(function(){
    var wScrollTop = $(this).scrollTop();
    var wScrollLeft = $(this).scrollLeft();

    // $('#header .inner').css({'transform':'matrix(1, 0, 0, 1, '+(0-wScrollLeft)+', 0)'});

    // MAIN HEADER 스크롤
    if($('.main_banner').hasClass('open')){
        if (wScrollTop > $('.main_banner img').height()) {
            $('.main').addClass('scroll');
        } else {
            $('.main').removeClass('scroll');
        }
    }else{
        if (wScrollTop > 0) {
            $('.main').addClass('scroll');
        } else {
            $('.main').removeClass('scroll');
        }
    }

    // FOOTER 탑 스크롤
    if(wScrollTop > 0){
        $('#footer').addClass('on');
    }else{
        $('#footer').removeClass('on');
    }

    if(wScrollTop > 71){
        $('body').addClass('searchFade');
    }else{
        $('body').removeClass('searchFade');
    }
});

/* cookie banner */
function setCookiePopup(name, value, expiredays){
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + ";path=/;"
}
//쿠키 체크
function getCookiePopup(name){
    var Found = false
    var start, end
    var i = 0;
    while(i <= document.cookie.length) {
        start = i
        end = start + name.length
        if(document.cookie.substring(start, end) == name) {
            Found = true
            break
        }
        i++
    }
    if(Found == true) {
        start = end + 1
        end = document.cookie.indexOf(";", start)
        if(end < start)
            end = document.cookie.length
        return document.cookie.substring(start, end)
    }
    return ""
}
//쿠키값 체크후 레이어 팝업
function popupCookieCheck(cookiename, obj, any){
    if (getCookiePopup(cookiename) != "no") {
        $(obj).addClass('open');
        layerFadeIn(obj);
    }else{
        $(obj).addClass('close');
    }
}
//layer fadeIn
function layerFadeIn(obj){
    $(obj).css({'height':$(obj).attr('data-height')});
}
//layer fadeOut
function layerFadeOut(obj, any){
   $(obj).animate({'height':0},400,function(){
       $(obj).removeClass('open');
       $(obj).addClass('close');
   });
}

/* MAIN */
if ($('body').hasClass('main')) {
    // 메인 비주얼
    var visualLen = $('.visual').length;
    var visualNum = 1;

    for (visualNum; visualNum <= visualLen; visualNum++) {
        var pagination = '<span>'+visualNum+'</span>';
        $('.pagination').append(pagination);
    }

    var visual = function(direction){
        switch (direction) {
            case 'next' :
                if (!$('.visual:last-child').hasClass('show')) {
                    $('.show').next().addClass('show');
                    $('.show').prev().removeClass('show');
                } else {
                    $('.visual:first-child').addClass('show');
                    $('.visual:last-child').removeClass('show');
                }
            break;

            case 'prev' :
                if (!$('.visual:first-child').hasClass('show')) {
                    $('.show').prev().addClass('show');
                    $('.show').next().removeClass('show');
                } else {
                    $('.visual:first-child').removeClass('show');
                    $('.visual:last-child').addClass('show');
                }
            break;

            default :
                $('.visual').removeClass('show');
                $('.visual:nth-child('+direction+')').addClass('show');

            break;
        }

        var showNum = $('.show').index()+1;
        $('.pagination span').removeClass('active');
        $('.pagination span:nth-child('+showNum+')').addClass('active');

        clearInterval(visualInterval);
        visualInterval = setInterval(function(){
            visual('next');
        }, 6000);
    };

    $('.visual').removeClass('first loading');
    $('.visual:first-child').addClass('show');
    $('.pagination span:first-child').addClass('active');

    $('.btn_next').click(function(){
        visual('next');
    });

    $('.btn_prev').click(function(){
        visual('prev');
    });

    $('.pagination span').click(function(){
        visual($(this).index()+1);
    });

    var visualInterval = setInterval(function(){
        visual('next');
    }, 8000);

    // 메인 세미나
    fn.slide('.seminar_list_wrap',{
        btnPrev : '.btn_prev',
        btnNext : '.btn_next',
        margin : '0'
    });

    // 메인 레시피
    fn.slide('.recipe_list_wrap',{
        btnPrev : '.btn_prev',
        btnNext : '.btn_next',
        margin : '65px'
    });

    // 매거진
    $(document).ready(function(){
        $(".bbs_masonry_list").imagesLoaded(function(){
            var $grid =	$('.bbs_masonry_list .result_list').masonry({
                  itemSelector: '.result_list > li',
                  columnWidth: 280,
                  gutter: 20
                });
        });
    });
}

/* SUB */
if ($('body').hasClass('sub')) {
    if ($('#path').length) {
        var pathT = $('#path').offset().top;
    }


    $(window).scroll(function(){
        var wScrollTop = $(this).scrollTop();
        var wScrollLeft = $(this).scrollLeft();

        // SUB HEADER 스크롤
        if (wScrollTop > pathT) {
            $('.sub').addClass('scroll');
        } else {
            $('.sub').removeClass('scroll');
        }
    });
}

var path1 = $('#wrap').attr('class'),
    path2 = $('#contents').attr('class');

switch (path1) {
    //인프라
    case 'infra' :
        $('.quick_nav li').click(function(){
            $('.quick_nav li').removeClass('on');
            $(this).addClass('on');
            var offset = $($(this).find('a').attr('data-position')).offset();
            $('html, body').animate({scrollTop : offset.top}, 400);
        });
        $(window).scroll(function(){
            var winScrollTop = $(document).scrollTop();
            var quickArr = [];
            $('#contents > section').each(function(){
                //windScrollTop
                quickArr.push($(this).offset().top);
            });
            if(winScrollTop > 240){
                $('.quick_nav').addClass('on');
            }else{
                $('.quick_nav').removeClass('on');
            }
            for( var i=0; i < quickArr.length; i++){
                if(i == quickArr.length-1){
                    $('.quick_nav li').removeClass('on');
                    $('.quick_nav li').eq(quickArr.length-1).addClass('on');
                    return;
                }
                if(winScrollTop + 200 < quickArr[i+1]){
                    $('.quick_nav li').removeClass('on');
                    $('.quick_nav li').eq(i).addClass('on');
                    return;
                }
            }
        });
    break;

    // 상품안내
    case 'product' :
        $('.quick_nav li').click(function(){
            $('.quick_nav li').removeClass('on');
            $(this).addClass('on');
            var offset = $($(this).find('a').attr('data-position')).offset();
            $('html, body').animate({scrollTop : offset.top}, 400);
        });
        $('.continent_list li a').click(function(e){
            e.preventDefault();
        });
        $(window).scroll(function(){
            var winScrollTop = $(document).scrollTop();
            var quickArr = [];
            $('#contents > section').each(function(){
                //windScrollTop
                quickArr.push($(this).offset().top);
            });
            if(winScrollTop > 240){
                $('.quick_nav').addClass('on');
            }else{
                $('.quick_nav').removeClass('on');
            }
            for( var i=0; i < quickArr.length; i++){
                if(i == quickArr.length-1){
                    $('.quick_nav li').removeClass('on');
                    $('.quick_nav li').eq(quickArr.length-1).addClass('on');
                    return;
                }
                if(winScrollTop + 200 < quickArr[i+1]){
                    $('.quick_nav li').removeClass('on');
                    $('.quick_nav li').eq(i).addClass('on');
                    return;
                }
            }
        });
    break;

    // 고객지원서비스
    case 'service' :

        switch (path2) {
            // 레시피
            case 'recipe' :
                // 슬라이드
                fn.slide('.product_area',{
                    btnPrev : '.btn_prev',
                    btnNext : '.btn_next',
                    margin : '71px',
                    btnHide: '5'
                });
                fn.slide('.recommend_area',{
                    btnPrev : '.btn_prev',
                    btnNext : '.btn_next',
                    margin : '20px',
                    btnHide: '5'
                });

                // 프린트
                var infoAreaImg = $('.info_area .img').clone();
            	var infoAreaTit = $('.info_area .tit').clone();
            	var tabContents = $('.tab_contents').clone();
            	var useArea = $('.use_area').clone();

            	$('.btn_print').click(function(){
                    $('#header, #wrap, #footer, .btn_print').addClass('no_print');
            		$('.print_contents').empty();
                    $('.print_contents').append('<div class="info_area"></div>');
                    $('.print_contents div').append(infoAreaTit, infoAreaImg);
            		$('.print_contents').append(tabContents);
            		$('.print_contents .product_area button').remove();
            		$('#print').addClass('show');
            	});

            	$('#print .btn_close').click(function(){
                    $('#header, #wrap, #footer, .btn_print').removeClass('no_print');
            		$('#print').removeClass('show');
            	});
            break;

            // 세미나
            case 'seminar' :
                // 슬라이드
                // fn.slide('.schedule_area',{
                //     btnPrev : '.btn_prev',
                //     btnNext : '.btn_next',
                //     pagination: '.btn_area',
                //     margin : '0px'
                // });

                // 세미나 리스트 열기 / 닫기
                $('.schedule_list').each(function(){
                    $(this).css({'width':$(this).children('li').outerWidth()*$(this).children('li').length});
                });
                $('.calendar_area tbody td .cellInner').mouseenter(function(){
                    $(this).closest('td').addClass('open');
                    $(this).find('.schedule_area').css({'width':$(this).find('.schedule_area li').outerWidth()*$(this).find('li').length});
                });
                $('.calendar_area tbody td .cellInner').mouseleave(function(){
                    $(this).closest('td').removeClass('open');
                    $(this).find('.schedule_area').css({'width':$(this).find('.schedule_area li:nth-child(1)').outerWidth()});

                });

            break;

            // 원가계산기
            case 'calculator' :
                // 이용안내
                fn.slide('.info_contents',{
                    btnPrev : '.btn_prev',
                    btnNext : '.btn_next',
                    width : '1080px',
                    margin : '0'
                });
                $('.btn_info').click(function(){
                    $('#popup_info').addClass('show');
            	});
                $('.popup_info .btn_close').click(function(){
                    $('#popup_info').removeClass('show');
            	});

                $('.btn_ingredients').click(function(){
                    $('#popup_ingredients').addClass('show');
                });
                $('.popup_ingredients .btn_close').click(function(){
                    $('#popup_ingredients').removeClass('show');
                });

                $('.service .calculator [class^="step"] .result_list input[type=radio]').change(function(){
                    $('.btn_next').addClass('active');
                });

                // 계산기 STEP3 전체선택



                // 내가선택한 재료 열기/닫기
                $('.choose_area .ea').click(function(){
            		$('.choose_area').toggleClass('open');
            	});

                // 재료 직접 추가
                $('.btn_add').click(function(){
                    if ($('.input_wrap input').val() !== '') {
                        $('.input_wrap').addClass('add');
                        setTimeout(function(){
                            $('.input_wrap').removeClass('add');
                        }, 1000);
                    } else {
                        fn.alertOpen('#add_alert');
                    }
                });
            break;

            case 'form' :
                // 이용안내
                fn.slide('.info_contents',{
                    btnPrev : '.btn_prev',
                    btnNext : '.btn_next',
                    width : '1040px',
                    margin : '0'
                });
                $('.btn_info').click(function(){
                    $('#popup_info').addClass('show');
                });
                $('.popup_info .btn_close').click(function(){
                    $('#popup_info').removeClass('show');
                });
            break;
        }

    break;

    // 홍보센터
    case 'pr' :

        switch (path2) {
            //글로벌 구매 네트워크
            case 'event' :
                fn.reply('.reply_box');
            break;
        }

    break;

    // 고객센터
    case 'customer' :

        switch (path2) {
            //문의 등록
            case 'qna_edit' :

            break;
        }

    break;

    case 'etc' :
        switch (path2) {
            case 'search':
                $('body').addClass('htype2');
                break;
            default:
        }
    break;
}
