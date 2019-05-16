/**
 * 鍏ㄧ珯渚涚敤鐨凧s鐩戝惉
 * @author jason <yangjs17@yeah.net>
 * @version TS3.0
 */
M.addModelFns({
    invite_colleague_form: {
        callback: function( txt ) {
            ui.success( txt.info );
            ui.box.close();
        }
    },
    drop_menu_list: {
        load: function() {
            var parentModel = this.parentNode,
                list = this;
            // 榧犳爣杩涘叆鐖禡odel锛屾樉绀篗enu锛涘弽涔嬶紝鍒欓殣钘廙enu銆�
            M.addListener( parentModel, {
                mouseenter: function() {
                    var className = this.className;
                    this.className = [ className, " drop" ].join( "" );
                    list.style.display = "block";
                },
                mouseleave: function() {
                    var className = this.className;
                    this.className = className.replace(/(\s+drop)+(\s+|$)/g, "");
                    list.style.display = "none";

                }
            });
        }
    },
    search_icon:{
        mouseleave:function(){
            // $('.search_footer').attr('ison','no');
            // setTimeout(function(){
            // 	if($('.search_footer').attr('ison')=='no'){
            // 		$('.search_footer').hide();
            // 	}
            // },150);
        },
        click:function(){
            if($('.search_footer').attr('ison') == 'yes'){
                $('.search_footer').attr('ison','no');
                $('.search_footer').hide();
                return true;
            }
            $('.search_footer').attr('ison','yes');
            $('.search_footer').show();
        }
    },
    search_menu_footer:{
        click:function(){
            var offset = $(this).offset();
            $('#search_menu').css({'left':offset.left+'px','top':offset.top-35+'px','width':'81px'}).show();
            $('#search_menu').attr('ison','yes');
        },
        mouseleave:function(){
            //setTimeout(core.search.hideMenu,300);
        },
        blur:function(){
            core.search.dohide();
        }
    },
    search_menu:{
        click:function(){
            var offset = $(this).offset();
            $('#search_menu').css({'left':offset.left+'px','top':offset.top+$(this).height()+12+'px','width':'81px'}).show();
            $('#search_menu').attr('ison','yes');
        },
        mouseleave:function(){
            setTimeout(core.search.hideMenu,300);
        },
        blur:function(){
            core.search.dohide();
        }
    },
    search_menu_ul:{
        mouseleave:function(){
            $('.search_footer').attr('ison','yes');
            core.search.dohide();
        },
        mouseenter:function(){
            core.search.doshow();
        }
    },
    search_footer:{
        mouseleave:function(){
            // $(this).attr('ison','no');
            // var _this = this;
            // setTimeout(function(){
            // 	$(_this).hide();
            // },'250');
        },
        mouseenter:function(){
            $(this).attr('ison','yes');
        }
    },
    drop_search:{
        load:function(){
            var _this = this;
            core.plugInit('search');
            $(this.childEvents['searchKey'][0]).click(function(){
                core.search.searchInit(this);
            });
        }
    },
    wigdet_setform:{
        callback:function(data){
            core.widget.afterSet(data);
        }
    },
    diy_widget:{
        load:function(data){
            var child = this.childModels['widget_box'];
            var _this = this;
            var args  = M.getModelArgs(this);
            core.plugFunc('widget',function(){
                //鎷栧姩澶勭悊
                core.loadFile(THEME_URL+'/js/ui.sortable.js',function(){
                    $(_this).sortable({
                        items: '.ui-state-disabled',
                        placeholder: 'ui-selected',
                        revert: 0.01,
                        helper: 'clone',
                        update:function(){
                            core.widget.dosort(args,_this);
                        }
                    });
                    $(child).disableSelection();
                });
            });
        }
    }
});
M.addEventFns({
    widget_toggle:{
        click:function(){
            $(this.parentModel.childModels['widget_child'][0]).toggle('500');
        }
    },
    widget_setup:{
        click:function(){
            $(this.parentModel.childModels['wigdet_setbox'][0]).toggle('500');
        }
    },
    widget_cancel_set:{
        click:function(){
            $(this.parentModel).hide('500');
        }
    },
    widget_close:{
        click:function(){
            var args = M.getModelArgs(this.parentModel);
            core.widget.removeWidget(this,args,this.parentModel);
        }
    },
    widget_add:{
        click:function(){
            var args = M.getEventArgs(this);
            core.widget.addWidget(args);
        }
    },
    invite_colleague: {
        click: function() {
            ui.box.load( this.href, '閭€璇峰ソ鍙�');
            return false;
        }
    },
    invite_addemail:{
        click: function() {
            var input1 = document.getElementById("email_input").value,
                $email_input = $("#email_input"),
                dInput = this.parentModel.childEvents["email"][0],
                dInputClone = dInput.cloneNode( true );

            dInputClone.value = "";
            $email_input.append( dInputClone );
            M( dInputClone );
            return false;
        }
    },
    //涓汉淇℃伅
    more_person_info: {
        click: function() {
            var li;

            li = this.parentNode;
            li.style.display = "block";

            if($(this).attr('rel')=='hide'){
                var _display = 'block';
                $(this).attr('rel','show');
                $('.mod-person .person-info a').text("鏀惰捣鈫�")
            }else{
                var _display = 'none';
                $(this).attr('rel','hide');
                $('.mod-person .person-info a').text("灞曞紑鏇村鈫�")
            }

            while ( li = li.nextSibling ) {
                ( "LI" === li.tagName ) && ( li.style.display = _display );

            }

            return false;
        }
    },
    ico_wallet:{//璐㈠瘜
        mouseenter:function(){
            this._model.style.display = 'block';
        },
        mouseleave:function(){
            this._model.style.display = 'none';
        },
        load:function(){
            var _model = M.getModels('layer_wallet');
            this._model = _model[0];
        }
    },
    ico_level:{//绛夌骇
        mouseenter:function(){
            this._model.style.display = 'block';
        },
        mouseleave:function(){
            this._model.style.display = 'none';
        },
        load:function(){
            var _model = M.getModels('layer_level');
            this._model = _model[0];
        }
    },
    share:{//鍒嗕韩鎿嶄綔
        click : function(){
            var attrs =M.getEventArgs(this);
            var sid = attrs.sid;
            var stable = attrs.stable;
            var initHTML = attrs.initHTML;
            var curtable =attrs.curtable;
            var curid = attrs.curid;
            var appname = attrs.appname;
            var cancomment = attrs.cancomment;
            var is_repost = attrs.is_repost;
            share(sid,stable,initHTML,curid,curtable,appname,cancomment,is_repost);
            return false;
        }
    },
    share_to_feed:{//鍒嗕韩鎿嶄綔
        load: function () {
            var attrs = M.getEventArgs(this);
            if (attrs.isLoad == 1) {
                var initHTML = attrs.initHTML;
                var attachId = attrs.attachId;
                var from = attrs.from;
                var appname = attrs.appname;
                var source_url = attrs.url;
                var url = U('basic/Share/shareToFeed')+'&initHTML='+initHTML+'&attachId='+attachId+'&from='+from+'&appname='+appname+'&source_url='+source_url;
                ui.box.load(url,'鍒嗕韩');
            }
            return false;
        },
        click : function(){
            var attrs =M.getEventArgs(this);
            var initHTML = attrs.initHTML;
            var attachId = attrs.attachId;
            var from = attrs.from;
            var appname = attrs.appname;
            var source_url = attrs.url;
            var url = U('basic/Share/shareToFeed')+'&initHTML='+initHTML+'&attachId='+attachId+'&from='+from+'&appname='+appname+'&source_url='+source_url;
            ui.box.load(url,'鍒嗕韩');
            return false;
        }
    },
    setremark:{	//璁剧疆澶囨敞
        click:function(){
            var remark = $(this).attr('remark');
            var uid = $(this).attr('uid');
            ui.box.load(U('widget/Remark/edit')+'&remark='+remark+'&uid='+uid,'淇敼澶囨敞');
        }
    },
    /**
     * 娣诲姞鍏虫敞
     * @type {Object}
     */
    doFollow: {
        click: function() {
            follow.doFollow(this);
            return false;
        },
        load: function() {
            follow.createBtn(this);
        }
    },
    unFollow: {
        click: function() {
            follow.unFollow( this );
            return false;
        },
        load: function() {
            follow.createBtn( this );
        }
    },
    setFollowGroup:{
        click:function(){
            var args = M.getEventArgs(this);
            follow.setFollowGroup(this,args.fid);
        }
    },
    follow_check: {
        click: function( e ) {
            var check = this.getElementsByTagName( "input" )[0];
            setTimeout( function() {
                check.checked = !check.checked;
                check = undefined;
            }, 1);
            return false;
        }
    },
    comment:{
        click:function(){	//鐐瑰嚮璇勮鐨勬椂鍊�
            var attrs = M.getEventArgs(this);
            var comment_list = this.parentModel.childModels['comment_detail'][0];

//			if("undefined" == typeof(core.comment)){
//				core.plugInit('comment',attrs,comment_list);
//				core.setTimeout("core.comment.display()",150);
//			}else{

            core.comment.init(attrs,comment_list);
            core.comment.display();
//			}
            return false;
        }
    },
    reply_comment:{	//鐐规煇鏉″洖澶�
        click:function(){
            var attrs = M.getEventArgs(this);
            var comment_list = this.parentModel.parentModel;
            var docomment = comment_list.childModels['comment_textarea'][0].childEvents['do_comment'][0];
            $(docomment).attr('to_comment_id',attrs.to_comment_id);
            $(docomment).attr('to_uid',attrs.to_uid);
            $(docomment).attr('to_comment_uname',attrs.to_comment_uname);
            core.plugFunc('comment',function(){
                core.comment.init(attrs,comment_list);
                core.comment.initReply();
            });
            //core.plugInit('comment',attrs,comment_list);
            //core.setTimeout("core.comment.initReply()",150);

            $('.form-textlength').val("");
        }
    },
    comment_del:{
        click:function(){
            var attrs = M.getEventArgs(this);
            // 娣诲姞鍒犻櫎鍚庣殑妤煎眰缁熻鏁板彉鍖�
            $(this.parentModel).fadeOut('normal', function () {
                var $commentList = $(this).parent();
                if ($commentList.length > 0) {
                    // 鑾峰彇寰崥ID
                    var wid = parseInt($commentList.attr('id').split('_')[1]);
                    var $commentListVisible = $commentList.find('dl:visible');
                    var len = parseInt($commentListVisible.eq(0).find('span.floor').html());
                    $commentListVisible.each(function (i, n) {
                        $(this).find('span.floor').html((len - i)+'妤�');
                    });
                }
            });
            if("undefined"==typeof(core.comment)){
                core.plugFunc('comment',function(){
                    core.comment.delComment(attrs.comment_id);
                });
            }else{
                core.comment.delComment(attrs.comment_id);
            }
        }
    },
    do_comment:{	//鍥炲鎿嶄綔
        click:function(){
            if ( this.noreply == 1 ){
                ui.error('鎿嶄綔杩囦簬棰戠箒锛岃绋嶅悗鍐嶈瘯');
                return;
            }
            var attrs = M.getEventArgs(this);
            attrs.to_comment_id = $(this).attr('to_comment_id');
            attrs.to_uid = $(this).attr('to_uid');
            attrs.to_comment_uname = $(this).attr('to_comment_uname');
            attrs.addToEnd = $(this).attr('addtoend');

            var comment_list = this.parentModel.parentModel;
            core.comment.init(attrs,comment_list);

            var _this = this;
            var after = function(){
                $(_this).attr('to_uid','0');
                $(_this).attr('to_comment_id','0');
                $(_this).attr('to_comment_uname','');
                if(attrs.closeBox == 1){
                    ui.box.close();
                    ui.success( '鍥炲鎴愬姛' );
                }
            }
            core.comment.addComment(after,this);
            this.noreply = 1;
            setTimeout(function (){
                _this.noreply = 0;
            },5000);
        },
        load:function(){
            var attrs = M.getEventArgs(this);
            attrs.to_comment_id = $(this).attr('to_comment_id');
            attrs.to_uid = $(this).attr('to_uid');
            attrs.to_comment_uname = $(this).attr('to_comment_uname');
            attrs.addToEnd = $(this).attr('addtoend');
            var comment_list = this.parentModel.parentModel;
            core.plugInit('comment',attrs,comment_list);
        }
    },
    comment_insert_face:{
        click:function(){
            var target = this.parentModel.childModels["mini_editor"][0];
            var _faceDiv = this.parentModel.childModels['faceDiv'][0];
            core.plugInit('face',this,$(target).find('textarea'),_faceDiv);
        }
    },
    showCategory:{
        click:function(){
            var attrs = M.getEventArgs(this);
            //鏄剧ず鍒嗙被
            var obj = this;
            core.plugFunc('category',function(){
                core.category.loadSelect(obj,attrs.model_name,attrs.app_name,attrs.method,attrs.id,attrs.inputname,attrs.callback);
            });
        }
    }
});

//鍒嗕韩
var share=function(sid,stable,initHTML,curid,curtable,appname,cancomment,is_repost){
    if("undefined" == typeof(cancomment)){
        cancomment = 0;
    }
    var url = U('basic/Share/index')+'&sid='+sid+'&stable='+stable+'&curid='+curid+'&curtable='+curtable+'&appname='+appname+'&initHTML='+initHTML+'&cancomment='+cancomment+'&is_repost='+is_repost;
    if($('#tsbox').length>0){
        return false;
    }
    ui.box.load(url,'杞彂',function(){
        $('#at-view').hide();
        var share_id="feed"+curid;
        window.location.hash=share_id;
    });
    return false;
};

/**
 * 鍏虫敞鎿嶄綔Js绫�
 * @type {Object}
 */
var follow = {
    // 鎸夐挳鏍峰紡
    btnClass: {
        doFollow: "btn-cancel",
        unFollow: "btn-att-white",
        haveFollow: "btn-att-white",
        eachFollow: "btn-att-white"
    },
    // 鎸夐挳鍥炬爣
    flagClass: {
        doFollow: "ico-add-black",
        unFollow: "ico-minus-gray",
        haveFollow: "ico-already",
        eachFollow: "ico-connect"
    },
    // 鎸夐挳鏂囧瓧
    btnText: {
        doFollow: '鍏虫敞',
        unFollow: '鍙栨秷鍏虫敞',
        haveFollow: '宸插叧娉�',
        eachFollow: '鐩镐簰鍏虫敞'
    },
    /**
     * 鍒涘缓鍏虫敞鎸夐挳
     * @param object node 鎸夐挳鑺傜偣瀵硅薄
     * @param string btnType 鎸夐挳绫诲瀷锛�4绉�
     * @return void
     */
    createBtn: function(node, btnType) {
        var args = M.getEventArgs(node);
        var btnType = (0 == args.following) ? "doFollow" : ((0 == args.follower) ? "haveFollow" : "eachFollow");
        var btnClass = this.btnClass[btnType];
        var flagClass = this.flagClass[btnType];
        var btnText = this.btnText[btnType];
        var btnHTML = ['<span><b class="', flagClass, '"></b>', btnText, '</span>'].join( "" );
        // 鎸夐挳鑺傜偣娣诲姞HTML涓庢牱寮�
        node.innerHTML = btnHTML;
        node.className = btnClass;
        // 閫夋嫨鎸夐挳绫诲瀷
        switch(btnType) {
            case "haveFollow":
            case "eachFollow":
                $(node).bind({
                    mouseover: function() {
                        var b = this.getElementsByTagName( "b" )[0];
                        var text = b.nextSibling;
                        this.className = follow.btnClass.unFollow;
                        b.className = follow.flagClass.unFollow;
                        text.nodeValue = follow.btnText.unFollow;
                    },
                    mouseout: function() {
                        var b = this.getElementsByTagName( "b" )[0];
                        var text = b.nextSibling;
                        this.className = btnClass;
                        b.className = flagClass;
                        text.nodeValue = btnText;
                    }
                });
                break;
            default:
                $(node).unbind('mouseover');
                $(node).unbind('mouseout');
        }
    },
    /**
     * 娣诲姞鍏虫敞鎿嶄綔
     * @param object node 鍏虫敞鎸夐挳鐨凞OM瀵硅薄
     * @return void
     */
    doFollow: function(node) {
        var _this = this;
        var args = M.getEventArgs(node);
        var url = node.getAttribute("href") || U('basic/Follow/doFollow');
        $.post(url, {fid:args.uid}, function(txt) {
            if(1 == txt.status ) {
                node.setAttribute("event-node", "unFollow");
                node.setAttribute("href", [U('basic/Follow/unFollow'), '&fid=', args.uid].join(""));
                M.setEventArgs(node, ["uid=", args.uid, "&uname=", args.uname, "&following=", txt.data.following, "&follower=", txt.data.follower].join(""));
                M.removeListener(node);
                M(node);
                _this.updateFollowCount(1);
                updateUserData('follower_count', 1, args.uid);
                if("following_right" == args.refer) {
                    var item = node.parentModel;
                    // item.parentNode.removeChild(item);
                    $(item).slideUp('normal', function() {
                        $(this).remove();
                    });
                    $.post(U('widget/RelatedUser/changeRelate'), {uid:args.uid, limit:1}, function(msg) {
                        var _model = M.getModels("related_list");
                        $(_model[0]).append(msg);
                        M(_model[0]);
                    }, 'json');
                    ui.success("鍏虫敞鎴愬姛");
                } else {
                    //followGroupSelectorBox(args.uid, args.isrefresh);
                }
            } else {
                ui.error(txt.info);
            }
        }, 'json');
    },
    /**
     * 閫夋嫨鍏虫敞鍒嗙粍涓嬫媺绐�
     * @param object node 鍏虫敞鎸夐挳鐨凞OM瀵硅薄
     * @param integer fid 鍏虫敞浜篒D
     * @return void
     */
    setFollowGroup: function(node, fid) {
        var url = U('basic/FollowGroup/selectorBox')+'&fid='+fid;
        ui.box.load(url, '璁剧疆鍒嗙粍');
    },
    /**
     * 鍙栨秷鍏虫敞鎿嶄綔
     * @param object node 鍏虫敞鎸夐挳鐨凞OM瀵硅薄
     * @return void
     */
    unFollow: function(node) {
        var _this = this;
        var args = M.getEventArgs(node);
        var url = node.getAttribute( "href" ) || U('basic/Follow/unFollow');
        // 鍙栨秷鍏虫敞鎿嶄綔
        $.post(url, {fid:args.uid}, function(txt) {
            txt = eval( "(" + txt + ")" );
            if ( 1 == txt.status ) {
                ui.success( txt.info );
                if ( "following_list" == args.refer ) {
                    var item = node.parentModel;
                    // 绉婚櫎
                    item.parentNode.removeChild( item );
                } else {
                    node.setAttribute( "event-node", "doFollow" );
                    node.setAttribute( "href", [U('basic/Follow/doFollow'), '&fid=', args.uid].join( "" ) );
                    M.setEventArgs( node, ["uid=", args.uid, "&uname=", args.uname, "&following=", txt.data.following, "&follower=", txt.data.follower].join( "" ) );
                    M.removeListener( node );
                    M( node );
                }
                _this.updateFollowCount( - 1 );
                updateUserData('follower_count', -1, args.uid);
                if(args.isrefresh==1) location.reload();
            } else {
                ui.error( txt.info );
            }
        });
    },
    /**
     * 鏇存柊鍏虫敞鏁扮洰
     * @param integer num 娣诲姞鐨勬暟鍊�
     * @return void
     */
    updateFollowCount: function(num) {
        var l;
        var following_count = M.getEvents("following_count");
        if(following_count) {
            l = following_count.length;
            while(l-- > 0) {
                following_count[l].innerHTML = parseInt(following_count[l].innerHTML) + num;
            }
        }
    }
};
/**
 * 濂藉弸鍒嗙粍閫夋嫨锛屼笅鎷夋
 * @param object obj 鐐瑰嚮鎸夐挳DOM瀵硅薄
 * @param integer fid 鍏虫敞浜篒D
 * @return void
 */
var followGroupSelectorList = function(obj, fid)
{
    var x = obj.offset();
    // 鑾峰彇鏁版嵁鍒楄〃
    $.post(U('basic/FollowGroup/selectorList'), {fid:fid}, function(res) {
        if($('#followGroupList').length > 0) {
            if($('#followGroupList').attr('rel') == fid) {
                $('#followGroupList').remove();
            } else {
                $('#followGroupList').attr('rel', fid);
                $('#followGroupList').html(res);
            }
        } else {
            $('body').append('<div id="followGroupList" rel="' + fid + '" class="layer-follow-list">'+res+'</div>');
        }
        // 涓嬫媺瀹氫綅
        $('#followGroupList').css({'left':x.left + 'px', 'top':x.top + obj.height() + 8 +'px', 'display':'block'});
        $('#followGroupSelector').find('label').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });

        $('body').bind('click',function(event){
            var obj = "undefined" != typeof(event.srcElement) ? event.srcElement : event.target;
            var isBox = $('#followGroupList').find(obj).length;
            if (isBox === 0) {
                $('#followGroupList').remove();
            }
        });
    });
};
/**
 * 濂藉弸鍒嗙粍閫夋嫨锛屽脊鍑烘
 * @param integer fid 鍏虫敞浜篒D
 * @param integer isrefresh 纭畾鍚庢槸鍚﹀埛鏂伴〉闈�
 * @return void
 */
var followGroupSelectorBox = function(fid, isrefresh)
{
    if(isrefresh==1){
        var r = 'location.reload();';
    }else{
        var r = '';
    }
    ui.box.load(U('basic/FollowGroup/selectorBox')+'&fid='+fid+'&isrefresh='+isrefresh, '鍏虫敞鎴愬姛', r);
};
/**
 * 濂藉弸璁剧疆鍒嗙粍锛屽脊鍑烘
 * @param integer fid 鍏虫敞浜篒D
 * @param integer isrefresh 纭畾鍚庢槸鍚﹀埛鏂伴〉闈�
 */
var setFollowGroup = function(fid, isrefresh)
{
    if(isrefresh==1){
        var r = 'location.reload();';
    }else{
        var r = '';
    }
    ui.box.load(U('basic/FollowGroup/selectorBox')+'&fid='+fid+'&isrefresh='+isrefresh, '璁剧疆鍒嗙粍', r);
};
/**
 * 鍏抽棴濂藉弸鍒嗙粍閫夋嫨
 * @param integer fid 鍏虫敞浜篒D
 * @return void
 */
var followGroupSelectorClose = function(fid)
{
    $('.followGroupStatus'+fid).hide();
    $('.followGroupStatus'+fid).html('');
};
/**
 * 娣诲姞銆佺紪杈戝叧娉ㄥ垎缁勶紝寮瑰嚭妗�
 * @return void
 */
var setFollowGroupTab = function(gid)
{
    var title = gid ? '淇敼鍒嗙粍' : '鍒涘缓鍒嗙粍';
    gid = gid ? '&gid='+gid : '';
    ui.box.load(U('basic/FollowGroup/setGroupTab') + gid, title);
};