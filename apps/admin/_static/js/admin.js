/**
 * 鍚庡彴JS鎿嶄綔瀵硅薄 -
 *
 * 鍚庡彴鎵€鏈塉S鎿嶄綔閮介泦涓湪姝�
 */

var admin = {};
//var MY_JS_PATH = SITE_URL+'/apps/'+APPNAME+'/_static/';
var MY_JS_PATH = SITE_URL+'/apps/admin/_static/';
admin.pageBack = function(){
    window.history.back();
    return false;
};
/**
 * 鏀剁缉灞曞紑鏌愪釜DOM
 */
admin.fold = function(id){
    $('#'+id).slideToggle('fast');
};

/**
 * 澶勭悊ajax杩斿洖鏁版嵁涔嬪悗鐨勫埛鏂版搷浣�
 */
admin.ajaxReload = function(obj,callback){
    if("undefined" == typeof(callback)){
        callback = "location.href = location.href";
    }else{
        callback = 'eval('+callback+')';
    }
    if(obj.status == 1){
        ui.success(obj.data);
        setTimeout(callback,1500);
    }else{
        ui.error(obj.data);
    }
};

/*
 * 涓婄Щ瀵硅薄
 */
admin.moveUp = function(obj,topList)
{
    var current=$(obj).parent().parent();
    var prev=current.prev();
    if(!topList || topList=='undefined'){
        topList = 1;
    }
    if(current.index()>1)
    {
        current.insertBefore(prev);
        return true;
    }else{
        ui.error('涓嶅彲浠ュ啀涓婄Щ浜�');
        return false;
    }
}

/*
 * 涓嬬Щ瀵硅薄
 */
admin.moveDown = function(obj)
{
    var current=$(obj).parent().parent();
    var next=current.next();
    if(next)
    {
        current.insertAfter(next);
        return true;
    }else{
        ui.error('涓嶅彲浠ュ啀涓嬬Щ浜�');
        return false;
    }
};

/**
 * 澶氶€夋暟鎹�
 * @returns {Array}
 */
admin.getChecked = function() {
    var ids = new Array();
    $.each($('.table_dl input:checked,#list input:checked'), function(i, n){
        if($(n).val() !='0' && $(n).val()!='' ){
            ids.push( $(n).val() );
        }
    });
    return ids;
};

//缁戝畾tr涓婄殑on灞炴€�
admin.bindTrOn = function(){
    $("tr[overstyle='on']").hover(
        function () {
            $(this).addClass("bg_hover");
        },
        function () {
            $(this).removeClass("bg_hover");
        }
    );
};

/**
 * 鍒犻櫎API
 * @Author   Martinsun<syh@sunyonghong.com>
 * @DateTime 2018-05-04
 */
admin.deleteApi = function(api_id){
    if(!api_id){
        return false;
    }
    ui.confirm('鍒犻櫎鍚庝笉鍙仮澶�,纭畾瑕佸垹闄ゅ悧锛�', {
        yes:function(){
            $.post(U('admin/Api/deleteApi'),{api_id:api_id},function(res){
                if(res.status == 0){
                    ui.error(res.info);
                } else {
                    ui.success(res.info);
                    setTimeout(function(){
                        window.location.reload();
                    },1500);
                }
            },'json');
        }
    });
}

admin.upload = function(type,obj){
    if("undefined"  != typeof(core.uploadFile)){
        core.uploadFile.filehash = new Array();
    }
    core.plugInit('uploadFile',obj,function(data){
        $('.input-content').remove();
        $('#show_'+type).html('<img class="upload-pic-size" src="'+data.src+'">');
        $('#form_'+type).val(data.attach_id);
    },'image');
};

/**
 * 璁よ瘉璁插笀椹冲洖寮瑰嚭妗�
 * @param integer id 椹冲洖ID
 * @return void
 */
admin.getVerifyBox = function (id) {
    if (typeof id === 'undefined') {
        return false;
    }
    ui.box.load(U('classroom/AdminTeacher/getVerifyBox') + '&id='+id,  '椹冲洖鐞嗙敱');
    return false;
};

/**
 * 璁よ瘉閫氳繃
 * @param  integer id  璁よ瘉ID
 * @param  integer status 璁よ瘉鐘舵€�
 * @param  string info 璁よ瘉璧勬枡
 * @return void
 */
admin.verify = function(id){
    id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;
    if(id == ''){
        ui.error('璇烽€夋嫨瑕侀€氳繃璁よ瘉鐨勮甯�');
        return false;
    }
    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post(U('classroom/AdminTeacher/doVerify'),{id:id,status:1},function(msg){
                admin.ajaxReload(msg);
            },'json');
        }
    });
};

admin.checkMessage = function(form){

    if(!admin.checkEditor(Editor_content,form.content)){
        return false;
    }
    return true;
};

admin.checkEditor = function(editor,content){

    var html = editor.getContent();
    content.value =  html;

    var t =$('<div></div>');
    t.html(html);

    var imgnums = t.find('img').size();

    html = html.replace(/&nbsp;/g,"").replace(/\s+/g,"").replace(/<.*?>/g,"");

    if(getLength(html)<1 && imgnums <1 ){

        ui.error('璇疯緭鍏ュ唴瀹�');
        return false;
    }

    return true;
};

//褰诲簳鍒犻櫎鐧诲綍鏃ュ織
admin.delLoginRecord = function(){
    var ids=admin.getChecked();
    ids = ("undefined"== typeof(ids)|| ids=='') ? admin.getChecked() : ids;
    if(ids==''){
        ui.error('璇烽€夋嫨瑕佸垹闄ょ殑鐧诲綍鏃ュ織');
        return false;
    }
    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post(U('admin/AdminLoginRecord/delAdminLoginRecord'), {ids: ids}, function (msg) {
                if (msg.status == 0) {
                    ui.error(msg.info);
                } else {
                    ui.success(msg.info);
                    window.location.href = window.location.href;
                }
            }, 'json');
        }
    });
};

admin.checkon = function(o){
    if( o.checked == true ){
        $(o).parents('tr').addClass('bg_on');
    }else{
        $(o).parents('tr').removeClass('bg_on');
    }
};

//鍐呭绠＄悊鐢ㄥ埌鐨凧S
admin.ContentEdit = function(_id,action,title,type){
    var id = ("undefined"== typeof(_id)|| _id=='') ? admin.getChecked() : _id;
    if(id==''){
        ui.error('璇烽€夋嫨瑕佹搷浣滅殑鍐呭');
        return false;
    }

    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post(U('admin/Content/'+action),{id:id},function(msg){
                admin.ajaxReload(msg);
            },'json');
        }
    });
};

/**
 * 娉ㄥ唽閰嶇疆楠岃瘉
 */
admin.checkRegisterConfig = function(){
    if($('#dl_tag_open input:checked').val() == 1){
        var tag_num = $('#form_tag_num').val();
        if(getLength(tag_num) < 1){
            ui.error('璇疯緭鍏ュ厑璁歌缃爣绛炬暟閲�');
            return false;
        }
        if(isNaN(tag_num)){
            ui.error('鍏佽璁剧疆鏍囩鏁伴噺蹇呴』涓烘暟瀛�');
            return false;
        }
        if(tag_num < 0){
            ui.error('鍏佽璁剧疆鏍囩鏁伴噺涓嶈兘灏忎簬0');
            return false;
        }
    }
    if(!$('#dl_default_user_group input:checked').val()){
        ui.error('璇烽€夋嫨榛樿鐢ㄦ埛缁�');
        return false;
    }
    return true;

}

// 琛ㄥ崟淇℃伅楠岃瘉
admin.checkNavInfo = function(form) {
    if(form.navi_name.value.replace(/^ +| +$/g,'')==''){
        ui.error( '瀵艰埅鍚嶇О涓嶈兘涓虹┖');
        return false;
    }
    if(form.app_name.value.replace(/^ +| +$/g,'')==''){
        ui.error('鑻辨枃鍚嶇О涓嶈兘涓虹┖');
        return false;
    }
    if(form.url.value.replace(/^ +| +$/g,'')==''){
        ui.error('閾炬帴鍦板潃涓嶈兘涓虹┖');
        return false;
    }
    if(form.position.value.replace(/^ +| +$/g,'')==''){
        ui.error('瀵艰埅浣嶇疆涓嶈兘涓虹┖');
        return false;
    }
    if(form.order_sort.value.replace(/^ +| +$/g,'')==''){
        ui.error('搴旂敤鎺掑簭涓嶈兘涓虹┖');
        return false;
    }
    return true;
};

/**
 *
 * @param id
 * @returns {boolean}
 * seo璁板綍鎿嶄綔
 */
admin.doaction = function(id,action,type,status){
    id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;
    if(id == ''){
        ui.error( '璇烽€夋嫨瑕佹搷浣滅殑璁板綍' );return false;
    }
    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post(U('admin/Seo/doaction'+action),{id:id,type:type,status:status},function(obj){
                if(obj.status == 1){
                    ui.success(obj.info,3);
                    window.location.reload();
                }else{
                    ui.error(obj.info,3);
                }
            },'json');
        }
    });
};

//楠岃瘉搴旂敤淇℃伅
admin.checkAppInfo = function(form){
    if(form.app_name.value=='' || getLength(form.app_name.value) < 1 ){
        ui.error('搴旂敤鍚嶇О涓嶈兘涓虹┖');
        return false;
    }
    if(form.app_alias.value=='' || getLength(form.app_alias.value) < 1){
        ui.error('搴旂敤鍚嶇О涓嶈兘涓虹┖');
        return false;
    }
    if(form.app_entry.value=='' || getLength(form.app_alias.value) < 1){
        ui.error('搴旂敤鍓嶅彴鍏ュ彛涓嶈兘涓虹┖');
        return false;
    }
    return true;
};

admin.delSingle = function(id){
    var ids = id ? id : admin.getChecked();

    ids = ("undefined"== typeof(ids)|| ids=='') ? admin.getChecked() : ids;
    if(ids==''){
        ui.error("璇烽€夋嫨瑕佸垹闄ょ殑鍗曢〉");
        return false;
    }
    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post(U('admin/Single/del'), {ids: ids}, function (msg) {
                admin.ajaxReload(msg);
            }, 'json');
        }
    });
};

//妫€鏌ュ叕鍛婅〃鍗曟彁浜�
admin.checkNotice=function(form) {
    if(form.content.value.replace(/^ +| +$/g,'')==''){
        ui.error('鍙戝竷鍐呭涓嶈兘涓虹┖');
        return false;
    }
    return true;
};
/**
 * 褰诲簳鍒犻櫎鍏憡
 * @param integer id 鍏憡ID
 * @return void
 */
admin.delNotice = function(id){
    id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;
    if( id=='' ){
        ui.error('璇烽€夋嫨瑕佸垹闄ょ殑鍏憡!');
        return false;
    }

    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post(U('admin/Notice/delNotice'),{id:id},function(msg){
                if(msg.status==0){
                    ui.error(msg.info);
                }else{
                    ui.success(msg.info);
                    window.location.href = window.location.href;
                }
            },'json');
        }
    });
}

/**
 * 褰诲簳鍒犻櫎鎰忚鍙嶉
 * @param integer id 鍙嶉ID
 * @return void
 */
admin.delSuggest = function(id){
    id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;
    if( id==''  ){
        ui.error('璇烽€夋嫨瑕佸垹闄ょ殑鍙嶉');
        return false;
    }

    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post( U('admin/Suggest/delSuggest' ),{id:id},function(msg){
                if(msg.status==0){
                    ui.error(msg.info);
                }else{
                    ui.success(msg.info);
                    window.location.href = window.location.href;
                }
            },'json');
        }
    });

}

//澶勭悊绯荤粺娑堟伅
admin.SystemMessage = function(_id,action,title,type){
    var id = ("undefined"== typeof(_id)|| _id=='') ? admin.getChecked() : _id;
    if(id==''){
        ui.error('璇烽€夋嫨瑕佸鐞嗙殑娑堟伅');
        return false;
    }
    ui.confirm('纭畾瑕�'+title+'閫変腑鐨�'+type+'锛�', {
        yes: function () {
            $.post(U('admin/SystemMessage/'+action),{id:id},function(msg){
                admin.ajaxReload(msg);
            },'json');
        }
    });
}

//鍒犻櫎鐣欒█鏉挎秷鎭�
admin.delMsg = function(id, truedel){
    id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;
    if( id==''  ){
        ui.error('璇烽€夋嫨瑕佸垹闄ょ殑鐣欒█');
        return false;
    }

    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post( U('admin/MessageBoard/delMsg' ),{id:id,truedel:truedel},function(msg){
                if(msg.status==0){
                    ui.error(msg.info);
                }else{
                    ui.success(msg.info);
                    window.location.href = window.location.href;
                }
            },'json');
        }
    });
}

//鎭㈠鐣欒█鏉挎秷鎭�
admin.recMsg = function(id){
    id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;

    ui.confirm('纭畾瑕佽繘琛屾鎿嶄綔鍚楋紵', {
        yes: function () {
            $.post( U('admin/MessageBoard/recMsg' ),{id:id},function(msg){
                if(msg.status==0){
                    ui.error(msg.info);
                }else{
                    ui.success(msg.info);
                    window.location.href = window.location.href;
                }
            },'json');
        }
    });
}

//褰诲簳鍒犻櫎楠岃瘉鐮�
admin.delVerify = function(id){
    var id = ("undefined" == typeof(id) || id == '') ? admin.getChecked() : id;
    if( id=='' ){
        ui.error('璇烽€夋嫨浣犺鍒犻櫎鐨勯獙璇佺爜');
        return false;
    }

    ui.confirm('纭畾鍒犻櫎閫変腑鐨勯獙璇佺爜锛�', {
        yes: function () {
            $.post(U('admin/Verify/delVerify'),{id:id},function(msg){
                if(msg.status==0){
                    ui.error(msg.info);
                }else{
                    ui.success(msg.info);
                    window.location.href = window.location.href;
                }
            },'json');
        }
    });
};

admin.checkAll = function(o){
    if( o.checked == true ){
        $('#list input[name="checkbox"]').attr('checked','true');
        $('tr[overstyle="on"]').addClass("bg_on");
    }else{
        $('#list input[name="checkbox"]').removeAttr('checked');
        $('tr[overstyle="on"]').removeClass("bg_on");
    }
};

//鍒犻櫎瀵艰埅閰嶇疆
admin.delnav = function(id){
    ui.confirm('璇ュ鑸笅鑻ユ湁瀛愬鑸紝灏嗕細鍚屾鍒犻櫎锛佺‘瀹氳鍒犻櫎鍚楋紵', {
        yes: function () {
            $.post(U('admin/Config/delNav'),{id:id},function(msg){
                admin.ajaxReload(msg);
            },'json');
        }
    });
}

//娓呯悊鏃ュ織
admin.cleanLogs = function(m){
    if(m!=6 && m!=12){
        ui.error('鏃堕棿涓嶆纭�');
    }else{
        $.post(U('admin/Home/_cleanLogs'),{m:m},function(msg){
            admin.ajaxReload(msg);
        },'json');
    }
};

//鏃ュ織褰掓。
admin.logsArchive = function(){
    $.post(U('admin/Home/_logsArchive'),{},function(msg){
        admin.ajaxReload(msg);
    },'json') ;
};

//鍒犻櫎涓€鏉℃棩蹇�
admin.dellog = function(id,table){
    ui.confirm('纭畾鍒犻櫎姝ゆ潯鏃ュ織璁板綍锛�', {
        yes: function () {
            $.post(U('admin/Home/_delLogs'),{id:id,table:table},function(msg){
                admin.ajaxReload(msg,"$('#tr"+id+"').remove()");
            },'json');
        }
    });
};

admin.delselectLog = function(table){
    var id = admin.getChecked();
    if(id==''){
        ui.error('璇峰厛閫夋嫨瑕佹搷浣滅殑鏁版嵁');
        return false;
    }else{
        ui.confirm('纭畾鍒犻櫎姝ゆ潯鏃ュ織璁板綍锛�', {
            yes: function () {
                $.post(U('admin/Home/_delLogs'), {id: id, table: table}, function (msg) {
                    admin.ajaxReload(msg);
                }, 'json');
            }
        });
    }
};

admin.addPageSubmitCheck = function(id){
    var title = $("input[name='title']").val();
    var key   = $("input[name='key']").val();
    if ( '' == title || '' == key ){
        ui.error('璇疯緭鍏ユ爣棰樺拰鍞竴鏍囪瘑');
        return false;
    }
    var checkKey = false;
    if( '' !== key && !id){
        $.ajaxSettings.async = false;
        $.post(U('admin/Single/checkSingleKey'), {key: key}, function (msg) {
            if( '0' == msg ){
                ui.error('鍞竴鏍囪瘑宸茬粡瀛樺湪');
            }else{
                checkKey = true;
            }
        }, 'json');
        $.ajaxSettings.async = true;
        if(!checkKey){
            return false;
        }
    }
};

admin.marqueeContent = function(){
    $('#form_content').on('input propertychange', function() {
        var val     = $(this).val();
        var len     = val.length;
        var strLen  = 0;
        for( var i = 0; i < len ; i++ ){
            if( val.charCodeAt(i) < 27 || val.charCodeAt(i) > 126 ){ //涓枃鍜屼腑鏂囧瓧绗�
                strLen += 2;
            }else{
                strLen ++;
            }
        }
        if(strLen > 30){
            $(this).next('p').css('color','red');
            $('#form_submit').attr("disabled",true);
        }else{
            $(this).next('p').css('color','');
            $('#form_submit').attr("disabled",false);
        }
    });
};

admin.checkUserCenterNav = function(){
    var pc = '';
    var h5 = '';
    $("input[name='PC[]']:checked").each(function(){
        pc += $(this).val()+",";
    });
    $("input[name='H5[]']:checked").each(function(){
        h5 += $(this).val()+",";
    });
    var check = false;
    $.ajaxSettings.async = false;
    $.post(U('admin/Config/checkUserCenterNav'), {pc: pc, h5: h5}, function (msg) {
        console.log(msg);
        if( '0' == msg ){
            ui.error('淇敼澶辫触');
        }else{
            check = true;
        }
    }, 'json');
    $.ajaxSettings.async = true;
    return check;
};

//瀵煎叆鍚庡彴鍏朵粬鐨凧S
//閰嶇疆鎺у埗鍣ㄧ浉鍏崇殑js
document.write(unescape('%3Cscript src="'+MY_JS_PATH+'js/config.js"%3E%3C/script%3E'));
document.write(unescape('%3Cscript src="'+MY_JS_PATH+'js/admin.user.js"%3E%3C/script%3E'));