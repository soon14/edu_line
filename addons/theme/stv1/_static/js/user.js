


/**
 * Created by Ashang on 14-10-8.
 */

var user;//鑾峰彇鐢ㄦ埛鐧诲綍璐﹀彿
var verify;//鑾峰彇楠岃瘉鐮�
var password;//鑾峰彇瀵嗙爜
var password2;//鑾峰彇瀵嗙爜
var type;//娉ㄥ唽绫诲瀷 1閭 2鎵嬫満
var this_mhm_id;
//鎵嬫満娉ㄥ唽
function phoneReg(cate){
    $(cate).addClass("f3");
    $(cate).next().removeClass();
    $("#phoneReg").css("display","block");
    $("#emailReg").css("display","none");
}
//閭娉ㄥ唽
function emailReg(cate){
    $(cate).addClass("f3");
    $(cate).prev().removeClass();
    $("#emailReg").css("display","block");
    $("#phoneReg").css("display","none");
}
//閭娉ㄥ唽涓嬩竴閮�
function onemaliNext(){

    user      = $.trim($("#erusername").val());//鑾峰彇鐢ㄦ埛閭鍦板潃
    verify    = $.trim($("#erverify").val());//鑾峰彇楠岃瘉鐮�
    uname     = $.trim($("#eruname").val());//鑾峰彇鐢ㄦ埛鏄电О
    password  = $.trim($("#erpasswrod").val());//鑾峰彇瀵嗙爜
    password2 = $.trim($("#erpasswrod2").val());//鑾峰彇瀵嗙爜
    mhm_id    = $.trim($("#this_mhm_id").val());//鏈烘瀯
    invite_code = $.trim($("#invite_code").val());//閭€璇风爜

    //妫€鏌ヤ俊鎭槸鍚︿负绌�
    if(user == ""){
        ui.error('璇疯緭鍏ラ偖绠�');
        return false;
    }
    if(uname == ""){
        ui.error('璇疯緭鍏ユ樀绉�');
        return false;
    }
    if(password == ""){
        ui.error('璇疯緭鍏ュ瘑鐮�');
        return false;
    }
    if(password2 == ""){
        ui.error('璇峰啀娆¤緭鍏ュ瘑鐮�');
        return false;
    }
    if(verify == ""){
        ui.error('璇疯緭鍏ラ獙璇佺爜');
        return false;
    }

    //楠岃瘉閭
    if(!user.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
        ui.error('閭鏍煎紡閿欒');
        return false;
    }

    //楠岃瘉鏄电О
    if( uname.length > 10){//妫€鏌ユ樀绉�
        ui.error('鏄电О闀垮害涓嶈兘澶т簬10浣�');
        return false;
    }

    //妫€鏌ュ瘑鐮�
    if( password.length<6 || password.length>20 ){
        ui.error('瀵嗙爜闀垮害涓�6-20浣�');
        return false;
    }
    if( password != password2 ){
        ui.error('涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�');
        return false;
    }

    //妫€鏌ラ獙璇佺爜
    if( verify.length != 4){
        ui.error('楠岃瘉鐮侀暱搴︿笉姝ｇ‘');
        return false;
    }

    if($('input[name="agreement_"]').is(":checked") == false){
        ui.error("璇峰厛闃呰骞跺悓鎰忋€�"+SITE_KEYWORD+"缃戠珯鏈嶅姟鏉℃銆�");
        return false;
    }

    $.ajax({
        async:false,
        type: "POST",
        url:REG_ADDRESS,
        data:"email="+user+"&uname="+uname+"&password="+password+"&type=1&verify="+verify+"&mhm_id="+mhm_id+"&invite_code="+invite_code,
        dataType:"json",
        success:function(data){
            if( data.status == '0'){
                ui.error(data.info);
                return false;
            }else{
                ui.success("娉ㄥ唽鎴愬姛!");
                location = data.data;
            }
        }
    });
}


//鎵嬫満娉ㄥ唽涓嬩竴閮�
function phoneNext(){

    user      = $.trim($("#prphone").val());//鑾峰彇鐢ㄦ埛閭鍦板潃
    verify    = $.trim($("#prverify").val());//鑾峰彇楠岃瘉鐮�
    uname     = $.trim($("#uname").val());//鑾峰彇鐢ㄦ埛鏄电О
    password  = $.trim($("#prpassword").val());//鑾峰彇瀵嗙爜
    password2 = $.trim($("#prpassword2").val());//鑾峰彇瀵嗙爜
    mount_reg = $.trim($("#mount_reg").val());//鎸傝浇鏈烘瀯
    mhm_id    = $.trim($("#this_mhm_id").val());//鏈烘瀯
    invite_code = $.trim($("#invite_code").val());//閭€璇风爜

    //妫€鏌ヤ俊鎭槸鍚︿负绌�
    if(user == ""){
        ui.error('璇疯緭鍏ユ墜鏈哄彿');
        return false;
    }
    if(verify == ""){
        ui.error('璇疯緭鍏ラ獙璇佺爜');
        return false;
    }
    if(uname == ""){
        ui.error('璇疯緭鍏ユ樀绉�');
        return false;
    }
    if(password == ""){
        ui.error('璇疯緭鍏ュ瘑鐮�');
        return false;
    }
    if(password2 == ""){
        ui.error('璇峰啀娆¤緭鍏ュ瘑鐮�');
        return false;
    }


    //妫€鏌ユ墜鏈哄彿鏍煎紡
    if(!user.match(PHONE_MATCH)){
        ui.error('璇峰～鍐欐纭殑鎵嬫満鍙�!');
        return false;
    }

    //妫€鏌ラ獙璇佺爜
    if( verify.length !=6 ){
        ui.error('鎵嬫満楠岃瘉鐮侀暱搴︿笉姝ｇ‘!');
        return false;
    }

    //楠岃瘉鏄电О
    if( uname.length > 10){//妫€鏌ユ樀绉�
        ui.error('鏄电О闀垮害涓嶈兘澶т簬10浣�');
        return false;
    }

    //妫€鏌ュ瘑鐮�
    if( password.length<6 || password.length>20 ){
        ui.error('瀵嗙爜闀垮害涓�6-20浣�');
        return false;
    }
    if( password != password2 ){
        ui.error('涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�');
        return false;
    }

    if($('input[name="agreement"]').is(":checked") == false){
        ui.error("璇峰厛闃呰骞跺悓鎰忋€�"+SITE_KEYWORD+"缃戠珯鏈嶅姟鏉℃銆�");
        return ;
    }

    $.ajax({
        async:false,
        type: "POST",
        url:REG_ADDRESS,
        data:"phone="+user+"&uname="+uname+"&password="+password+"&type=2&verify="+verify+"&mhm_id="+mhm_id+"&invite_code="+invite_code,
        dataType:"json",
        success:function(data){
            if( data.status == '0'){
                ui.error(data.info);
                return false;
            }else{
                ui.success("娉ㄥ唽鎴愬姛!");
                location = data.data;
            }
        }
    });
}

var timerc;
function dtime(){
    if(timerc > 1){
        timerc=timerc-1;
        $("#dtime").text(timerc);
        setTimeout("dtime()", 1000); //璁剧疆1000姣浠ュ悗鎵ц涓€娆℃湰鍑芥暟
    }else{
        $('.width97').css("display","none");
        $('.width80').removeAttr("style");
    }
}
/**
 * 鍙戦€佹墜鏈洪獙璇佺爜
 */
function getPhoneVerify(){
    user=$.trim($("#prphone").val());//鑾峰彇鐢ㄦ埛鎵嬫満鍙�
    var phoneVerify=function(){
        //鑾峰彇鎵嬫満楠岃瘉鐮�
        $.ajax({
            type: "POST",
            url:GET_PHONEVERIFY,
            data:"phone="+user,
            dataType:"json",
            success:function(data){
                if(data.status=='0'){
                    ui.error(data.info);
                    return false;
                }else{
                    ui.success(data.info);
                    $('.width80').css("display","none");
                    $('.width97').removeAttr("style");
                    timerc = 60;
                    dtime();
                    return false;
                }
            }
        });
    }

    //妫€鏌ユ墜鏈哄彿鏍煎紡
    if(!user.match(PHONE_MATCH)){
        ui.error('璇峰～鍐欐纭殑鎵嬫満鍙�!');
        return false;
    }else{
        //楠岃瘉姝ゆ墜鏈烘槸鍚﹀凡琚敞鍐�
        $.ajax({
            type: "POST",
            url:CLICK_PHONE,
            data:"phone="+user,
            dataType:"text",
            success:function(data){
                if(data==0){
                    ui.error('姝ゆ墜鏈哄凡琚敞鍐岋紝璇锋洿鎹�!');
                    return false;
                }else{
                    phoneVerify();
                }

            }
        });
    }
}

//涓存椂澶勭悊鏂规硶
var timerc;
function dctime(){
    if(timerc > 1){
        timerc=timerc-1;
        $("#dctime").text(timerc);
        setTimeout("dctime()", 1000); //璁剧疆1000姣浠ュ悗鎵ц涓€娆℃湰鍑芥暟
    }else{
        $('.width97').css("display","none");
        $('.width80').removeAttr("style");
    }
}

/**
 * 鎵惧洖瀵嗙爜鍙戦€佹墜鏈洪獙璇佺爜
 */
function getRepPhoneVerify(){
    phone=$.trim($("#rephoneval").val());//鑾峰彇鐢ㄦ埛鎵嬫満鍙�
    //妫€鏌ユ墜鏈哄彿鏍煎紡
    if(!phone.match(PHONE_MATCH)){
        ui.error('璇峰～鍐欐纭殑鎵嬫満鍙�!');
        return false;
    }
    //鑾峰彇鎵嬫満楠岃瘉鐮�
    $.ajax({
        type: "POST",
        url:REPOHNE_VAR,
        data:"phone="+phone,
        dataType:"json",
        success:function(data){
            if(data.status=='0'){
                ui.error(data.info);
                return false;
            }else{
                ui.success(data.info);
                $('.width80').css("display","none");
                $('.width97').removeAttr("style");
                timerc = 60;
                dctime();
                return false;
            }
        }
    });
}

//鐢ㄦ埛淇℃伅
function setUserInfo(){
    var uname=$.trim($("#uname").val());//鑾峰彇鐢ㄦ埛鏄电О
    var sex=$('input[name="sex"]:checked').val();//鑾峰彇鎬у埆
    var profession=$("#profession").val();//鍙栧緱鑱屼笟淇℃伅
    var intro=$.trim($("#intro").val());//鍙栧緱鐢ㄦ埛绠€浠�
    var interest=$.trim($("#interest").val());//鍙栧緱鎰熷叴瓒ｆ暟鎹�
    var mhm_id=$.trim($("#mhm_id").val());//鍙栧緱閫夋嫨鏈烘瀯
    var this_mhm_id=$.trim($("#this_mhm_id").val());//鏈烘瀯
    var city_names= $("input[name=city_names]").val();//鍦板尯淇℃伅
    var city_ids= $("input[name=city_ids]").val();//鍦板尯淇℃伅ids
    var province=$("#province").val();//鍙栧緱鐪�
    var city=$("#city").val();//鍙栧緱甯�
    var area=$("#area").val();//鍙栧緱鍖�
    var ckemailreg=function(){
        /*if(province==0){//妫€鏌ョ渷
            ui.error('璇烽€夋嫨鍦板尯鎵€鍦ㄧ渷!');
             return false;
        }
        if(city==0){//妫€鏌ュ競
            ui.error('璇烽€夋嫨鎵€鍦ㄥ煄甯�!');
             return false;
        }*/
        // if(mhm_id==0){//妫€鏌ユ満鏋�
        //    ui.error('璇烽€夋嫨鏈烘瀯!');
        // 	 return false;
        // }
        var udata;
        if(type==1){
            udata="&email="+user;
        }else{
            udata="&phone="+user;
        }
        $.ajax({
            async:false,
            type: "POST",
            url:REG_ADDRESS,
            data:"uname="+uname+"&sex="+sex+"&password="+password+"&profession="+profession+"&intro="+intro+"&interest="+interest+"&mhm_id="+this_mhm_id+udata+"&city_names="+city_names+"&city_ids="+city_ids+"&type="+type+"&verify="+verify,
            dataType:"json",
            success:function(data){
                if(data.status=='0'){
                    ui.error(data.info);
                    return false;
                }else{
                    ui.success("娉ㄥ唽鎴愬姛!");
                    location = data.data;
                }
            }

        });
    }

    if(user=="" || password==""){
        return false;
    }
    if(uname=="" || uname.length>6){//妫€鏌ユ樀绉�
        ui.error('鏄电О闀垮害涓嶆纭�!');
        return false;
    }else{
        $.ajax({
            type: "POST",
            url:CLICK_UNAME,
            data:"uname="+uname,
            dataType:"text",
            success:function(data){
                if(data==0){
                    ui.error('姝ゆ樀绉板凡琚敞鍐岋紝璇锋洿鎹�!');
                    return false;
                }else{
                    ckemailreg();
                }

            }
        });
    }





}
/**
 * 鐢ㄦ埛澶村儚璁剧疆
 */
/*function setUserFace(){

	$(".regsiter-main").css("z-index","306");
	$(".regsiter-main-headerworap").css("z-index","340");


}*/
/*//鐧诲綍鎸変笅鍥炶溅
$("#log_username").keydown(function(event){
    if(event.keyCode == 13){
        logSub();
    }
});
$("#log_pwd").keydown(function(event){
    if(event.keyCode == 13){
        logSub();
    }
});*/
/**
 * 鐢ㄦ埛鎴愬姛璁剧疆澶村儚
 */
/*function avatarOk(){
 ui.success("璁剧疆鎴愬姛锛�");
    location.reload();
}*/

/**
 * 杩斿洖涓婁竴姝�
 */
function prevBang(){
    $(".reg_set_info").css("display","block");
    $(".reg_set_user_info").css("display","none");
    $(".regsiter-main").css("z-index","200");
    $("#loging-worap-regsiter").css("z-index","1001");
}

//璇锋眰浜嬩欢
function ajaxBang(url,clickid,fdata,callback,type){

    if(fdata!=""){
        var fdata="&"+fdata;
    }
    $.ajax({
        type: "POST",
        url:url,
        data:"p="+p+fdata,
        dataType:"json",
        success:function(data){
            appendHtml(data,clickid,type);
            callback && callback();
        }
    });
}
//杩藉姞html
function appendHtml(data,clickid,type){
    $(".more").remove();
    $('.user-imglist').html('');
    if(data.data==""){
        var text = '';
        if( clickid == 'getbuyvideoslist') {
            text = '鎮ㄨ繕娌℃湁璐拱璇剧▼';
        } else if( clickid == 'getcollectvideolist' ) {
            text = '鎮ㄨ繕娌℃湁鏀惰棌璇剧▼';
        } else if( clickid == 'getbuyalbumslist' ) {
            text = '鎮ㄨ繕娌℃湁璐拱鐝骇';
        }
        else if( clickid == 'getupvideoslist') {
            text = '鎮ㄨ繕娌℃湁涓婁紶璇剧▼';
        }
        else if( clickid == 'getbuyliveslist') {
            text = '鎮ㄨ繕娌℃湁璐拱鐩存挱';
        }
        else if( clickid == 'getcollectlivelist') {
            text = '鎮ㄨ繕娌℃湁鏀惰棌鐩存挱';
        }
        else if( clickid == 'getmyvideolist' ){
            text = '鎮ㄨ繕娌℃湁涓婁紶璇剧▼';
        } else if( clickid == 'getTeacherVideo' ){
            text = '鎮ㄨ繕娌℃湁涓婁紶鐐规挱璇剧▼';
        } else if( clickid == 'getTeacherLive' ){
            text = '鎮ㄨ繕娌℃湁涓婁紶鐩存挱璇剧▼';
        } else if( clickid == 'getTeacherFace' ){
            text = '鎮ㄨ繕娌℃湁涓婁紶闈㈡巿璇剧▼';
        }else {
            text = '鎮ㄨ繕娌℃湁鏀惰棌鐝骇';
        }
        $('.user-Release-l').hide();
        $(".user-imglist").append("<span>"+text+"</span>");
    }else{
        $('.user-Release-l').show();
        $(".user-imglist").append(data.data);
    }
    if(data.nowPage+1>data.totalPages){
        return false;
    }else{
        var html="<div class=\"more\" ><a href=\"javascript:void(0)\" onclick='fallBang(this)' id=\""+clickid+"\">鏌ョ湅鏇村</a></div>"
        $(".user-imglist").append(html);
        p=data.nowPage+1;//涓嬩竴椤�
    }

}
/**
 * 閫夐」鍗℃晥鏋�
 * @param cate
 */
function magbtn(cate){
    var status =$(cate).parent().attr("id");
    if(status=="dshow"){
        $(cate).parent().nextAll().fadeOut();
        $(cate).parent().attr("id","dhide");
    }else{
        $(cate).parent().nextAll().fadeIn();
        $(cate).parent().attr("id","dshow");
    }

}
var onstatus;
/**
 * 鐧诲綍娉ㄥ唽椤甸潰
 */
function reg_login(){
    var count = $("#transparent");

    if(count.length > 0){
        var cssStu = $("#transparent");
        if(cssStu.css("display") == "block"){
            count.css("display","none");
        }else{
            count.css("display","block");
        }
    }else{
        if(onstatus == 1){
            return false;
        }
        onstatus = 1;
        $.ajax({
            type: "POST",
            url:REG_LOGIN,
            dataType:"json",
            success:function(data){
                $("body").prepend(data);
            }
        });
    }
}

/**
 * 閫€鍑烘垚鍔�
 */
function logout(){
    $.ajax({
        type: "POST",
        async:false,
        url:LOGINOUT_ADDRESS,
        dataType:"json",
        success:function(data){
            ui.success("閫€鍑烘垚鍔燂紒");
            location.reload();
        }
    });

}
/**
 * 鍙栨秷娉ㄥ唽
 */
function removeReg(){
    $("#transparent").css("display","none");
}
/*//鐐瑰嚮鍘婚櫎鎻愮ず淇℃伅
$("#username").live("focus",function(){
    $("#usernameMeg").css("display","none")
});
$("#password").live("focus",function(){
    $("#passwordMeg").css("display","none")
});
$("#okpwd").live("focus",function(){
    $("#okpwdMeg").css("display","none")
});*/





/**
 * 娉ㄥ唽Ajax
 */
function okReg(){
    if(!email_status){
        $("#username").focus();
        return false;
    }
    if(!pwd_status){
        $("#password").focus();
        return false;
    }
    if(!okpwd_status){
        $("#okpwd").focus();
        return false;
    }
    if(!$("#okxy").attr("checked")){
        return false;
    }
    //寮€濮嬪紓姝ユ敞鍐�
    $.ajax({
        type: "POST",
        url:REG_ADDRESS,
        data:"username="+$.trim($("#username").val())+"&password="+ $.trim($("#password").val()+"&okpwd="+ $.trim($("#okpwd").val())),
        dataType:"text",
        success:function(data){
            if(data==500){
                return false;
            }else{
                ui.success('娉ㄥ唽鎴愬姛!');
                location.reload();
            }
        }
    });

}
/**
 * 鎼滅储妗�
 * @returns {boolean}
 */
function checkSearch(){
    var text= $.trim($("#searchkey").val());
    if(text==""){
        $("#searchkey").val(text);
        $("#searchkey").focus();
        return false;
    }else{
        return true;
    }
}
/**
 * 闂瓟鎼滅储妗�
 * @returns {boolean}
 */
function checkWendaSearch(){
    var text= $.trim($("#stu_wdsearch").val());
    if(text==""){
        $("#stu_wdsearch").val(text);
        $("#stu_wdsearch").focus();
        return false;
    }else{
        return true;
    }
}
/**
 * 寮傛鐧诲綍
 */
function logSub(){
    var log_username=$.trim($("#log_username").val());
    var log_pwd=$.trim($("#log_pwd").val());
    if(log_username=="" || log_username.length<2){
        ui.error('璐﹀彿鏍煎紡涓嶆纭�!');
        return false;
    }
    if(log_pwd=="" || log_pwd.length<6){
        ui.error('瀵嗙爜鏍煎紡涓嶆纭�!');
        return false;
    }
    $("#logSub").val("鐧诲綍涓�..");
    $("#logSub").css("disabled","true");
    //寮€濮嬪紓姝ョ櫥褰�
    $.ajax({
        type: "POST",
        url:LOGIN_ADDRESS,
        data:"log_username="+$.trim($("#log_username").val())+"&log_pwd="+ $.trim($("#log_pwd").val()),
        dataType:"json",
        success:function(data){
            if(data.status=='0'){
                $("#logSub").val("鐧诲綍");
                $("#logSub").css("disabled","false");
                ui.error(data.info);
                return false;
            }else{
                $("#transparent").hide();
                ui.success(data.info);
                location.reload();
            }
        }
    });
}

//鎵惧洖瀵嗙爜js  寮€濮�---------------
//鎵嬫満楠岃瘉
function repPhone(cate){
    $(cate).addClass("f3");
    $(cate).next().removeClass();
    $("#repPhone").css("display","block");
    $("#repEmail").css("display","none");
}
//閭楠岃瘉
function repEmail(cate){
    $(cate).addClass("f3");
    $(cate).prev().removeClass();
    $("#repEmail").css("display","block");
    $("#repPhone").css("display","none");
}

/**
 * 纭閫氳繃鎵嬫満閲嶇疆瀵嗙爜
 */
function okPhonepwd(cate){
    $("p").text("");
    var phone=$.trim($("#rephoneval").val());//鑾峰彇鐢ㄦ埛鎵嬫満鍙�
    var pverify=$.trim($("#repverval").val());//鑾峰彇楠岃瘉鐮�
    var pwd=$.trim($("#ppwd").val());//鑾峰彇鏂板瘑鐮�
    var pwds=$.trim($("#ppwds").val());//鑾风‘璁ゅ瘑鐮�
    if( !phone.match(PHONE_MATCH)){
        ui.error("鎵嬫満鏍煎紡涓嶆纭紒");
        return false;
    }

    if(pwd.length<6 || pwd.length>20){
        ui.error("鏂板瘑鐮侀暱搴︿笉姝ｇ‘锛�");
        return false;
    }
    if(pwds!=pwd){
        ui.error("涓ゆ瀵嗙爜杈撳叆涓嶄竴鑷�");
        return false;
    }
    $(cate).attr("disabled","disabled");
    $(cate).val("鎻愪氦涓�....");
    //淇敼瀵嗙爜
    $.ajax({
        type: "POST",
        url:REPWDHANDLE,
        data:"phone="+phone+"&pwd="+pwd+"&repwd="+pwds+"&code="+pverify,
        dataType:"json",
        success:function(data){
            if(data.status=='0'){
                $(cate).removeAttr('disabled');
                $(cate).val("纭畾");
                ui.error(data.info);
                return false;
            }else{
                ui.success(data.info);
                window.location.href="/";
            }
        }
    });
}
/**
 * 閭鎵惧洖瀵嗙爜
 */
function repEmailNext(cate){

    var email=$.trim($("#repemail").val());//鑾峰彇鐢ㄦ埛鎵嬫満鍙�
    var code=$.trim($("#repcode").val());//鑾峰彇鐢ㄦ埛鎵嬫満鍙�
    if(!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
        ui.error("閭涓嶆纭�");
        return false;
    }

    $(cate).attr("disabled","disabled");
    $(cate).val("鎻愪氦涓�....");
    //淇敼瀵嗙爜
    $.ajax({
        type: "POST",
        url:REPWDEMAIL,
        data:"email="+email+"&everify="+code,
        dataType:"json",
        success:function(data){
            if(data.status=='0'){
                $(cate).removeAttr('disabled');
                $(cate).val("涓嬩竴姝�");
                ui.error(data.info);
                return false;
            }else{
                $("p").text("");
                ui.success(data.info);
                window.location.href=OKEMAILADD;
            }
        }
    });

}

