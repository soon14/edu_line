$(function(){
    /*header閫夋嫨瑕佹悳绱㈢殑绫诲瀷*/
    $(".direction a").on("click",function(){
        var inputKey = $(this).index();
        if(inputKey==0){
            $(".lookup input").attr('placeholder','璇疯緭鍏ユ偍瑕佹悳绱㈢殑璇剧▼');
            $(".direction a").css({"background-color":"transparent","color":"#555"});
            $(this).css({"background-color":"#00bed4","color":"#fff"});
        }else if(inputKey==1){
            $(".lookup input").attr('placeholder','璇疯緭鍏ユ偍瑕佹悳绱㈢殑鏈烘瀯');
            $(".direction a").css({"background-color":"transparent","color":"#555"});
            $(this).css({"background-color":"#00bed4","color":"#fff"});
        }else if(inputKey==2){
            $(".lookup input").attr('placeholder','璇疯緭鍏ユ偍瑕佹悳绱㈢殑鑰佸笀');
            $(".direction a").css({"background-color":"transparent","color":"#555"});
            $(this).css({"background-color":"#00bed4","color":"#fff"});
        }
    });
    /*banner*/
    var swiper = new Swiper('.swiper-container', {
        autoplay : 4000,
        speed:800,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        effect: 'fade',
        autoplayDisableOnInteraction : false,
        simulateTouch : false,
        preventClicks : false,
        keyboardControl : true,
        loop:true
    });
    /*鐩存挱棰勫憡*/
    $(".slideTxtBox").slide({
        effect:"left",
        autoPlay:true,
        pnLoop:false,
        interTime:4000,
        delayTime:500,
        easing:"easeInQuint"
    });
    /*鍒嗕韩*/
    var options = {
        useEasing : true,
        useGrouping : false,
        separator : ',',
        decimal : '.',
        prefix : '',
        suffix : ''
    };
    /*鐑棬璧勮*/
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    });

})