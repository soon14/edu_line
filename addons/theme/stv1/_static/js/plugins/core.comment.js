/**
 * 鎵╁睍鏍稿績璇勮瀵硅薄
 * @author jason <yangjs17@yeah.net>
 * @version TS3.0
 */
core.comment = {
    // 缁欏伐鍘傝皟鐢ㄧ殑鎺ュ彛
    _init:function(attrs) {
        if(attrs.length == 3) {
            core.comment.init(attrs[1], attrs[2]);
        } else {
            return false;
        }
    },
    // 鍒濆鍖栬瘎璁哄璞�
    init: function(attrs, commentListObj) {
        // 杩欎簺鍙傛暟蹇呴』浼犲叆
        this.app_uid = attrs.app_uid,
            this.row_id  = attrs.row_id,
            this.to_comment_id = attrs.to_comment_id,
            this.to_uid = attrs.to_uid;
        this.app_row_id = attrs.app_row_id;//鍘熸枃ID
        this.app_row_table = attrs.app_row_table;
        this.addToEnd = "undefined" == typeof(attrs.addToEnd) ? 0 : attrs.addToEnd;
        this.canrepost = "undefined" == typeof(attrs.canrepost) ? 1 : attrs.canrepost;
        this.cancomment = "undefined" == typeof(attrs.cancomment) ?  1 : attrs.cancomment;
        this.cancomment_old = "undefined" == typeof(attrs.cancomment_old) ?  1 : attrs.cancomment_old;
        if("undefined" != typeof(attrs.app_name)) {
            this.app_name = attrs.app_name;
        } else {
            this.app_name = "basic";	//榛樿搴旂敤
        }
        if("undefined" != typeof(attrs.table)) {
            this.table = attrs.table;
        } else {
            this.table = 'feed';	//榛樿琛�
        }
        if("undefined" != typeof(attrs.to_comment_uname)) {
            this.to_comment_uname = attrs.to_comment_uname;
        }
        if("undefined" != typeof(commentListObj)) {
            this.commentListObj = commentListObj;
        }
        if("undefined" != typeof(attrs.app_detail_summary)) {
            this.app_detail_summary = attrs.app_detail_summary;
        }
    },
    // 鏄剧ず鍥炲鍧�
    display: function() {
        var commentListObj = this.commentListObj;
        if("undefined" == typeof this.table) {
            this.table = 'feed';
        }
        if(commentListObj.style.display == 'none') {
            if(commentListObj.innerHTML !=''){
                commentListObj.style.display = 'block';
            }else{
                var rowid = this.row_id;
                var appname = this.app_name;
                var table = this.table;
                var cancomment = this.cancomment;
                commentListObj.style.display = 'block';
                commentListObj.innerHTML = '<img src="'+THEME_URL+'/images/load.gif" style="text-align:center;display:block;margin:0 auto;"/>';
                $.post(U('widget/Comment/render'),{app_uid:this.app_uid,row_id:this.row_id,app_row_id:this.app_row_id,app_row_table:this.app_row_table,isAjax:1,showlist:0,
                    cancomment:this.cancomment,cancomment_old:this.cancomment_old,app_name:this.app_name,table:this.table,
                    canrepost:this.canrepost },function(html){
                    if(html.status =='0'){
                        commentListObj.style.display = 'none';
                        ui.error(html.data)
                    }else{
                        commentListObj.innerHTML = html.data;
                        $('#commentlist_'+rowid).html('<img src="'+THEME_URL+'/images/load.gif" style="text-align:center;display:block;margin:0 auto;"/>');
                        $.post(U('widget/Comment/getCommentList'),{app_name:appname,table:table,row_id:rowid,cancomment:cancomment},function (res){
                            $('#commentlist_'+rowid).html(res);
                            M($('#commentlist_'+rowid).get(0));
                        });
                        M(commentListObj);
                        //@璇勮妗�
                        atWho($(commentListObj).find('textarea'));
                        $(commentListObj).find('textarea').focus();
                    }
                },'json');
            }
        }else{
            commentListObj.style.display = 'none';
        }
    },
    // 鍒濆鍖栧洖澶嶆搷浣�
    initReply: function() {
        this.comment_textarea = this.commentListObj.childModels['comment_textarea'][0];
        var mini_editor = this.comment_textarea.childModels['mini_editor'][0];
        var _textarea = $(mini_editor).find('textarea');
        var html = "鍥炲"+'@'+this.to_comment_uname+' 锛�';
        //_textarea.focus();
        _textarea.inputToEnd(html);
        _textarea.focus();
    },
    // 鍙戣〃璇勮
    addComment:function(afterComment,obj) {
        var commentListObj = this.commentListObj;
        this.comment_textarea = commentListObj.childModels['comment_textarea'][0];
        var mini_editor = this.comment_textarea.childModels['mini_editor'][0];
        var _textarea = $(mini_editor).find('textarea').get(0);
        var strlen = core.getLength(_textarea.value);
        var leftnums = initNums - strlen;
        if(leftnums < 0 || leftnums == initNums) {
            flashTextarea(_textarea);
            return false;
        }

        // 濡傛灉杞彂鍒拌嚜宸辩殑寰崥
        if(this.canrepost == 1){
            var ischecked = $(this.comment_textarea).find("input[name='shareFeed']").get(0).checked;
            if(ischecked == true) {
                var ifShareFeed = 1;
            } else {
                var ifShareFeed = 0;
            }
        }else{
            var ifShareFeed = 0;
        }
        var isold = $(this.comment_textarea).find("input[name='comment']");
        var comment_old = 0;
        if( isold.get(0) != undefined) {
            if ( isold.get(0).checked == true  ){
                var comment_old = 1;
            }
        }
        var content = _textarea.value;
        if(content == '') {
            ui.error('璇勮涓嶈兘涓虹┖');
            return false;
        }
        if("undefined" != typeof(this.addComment) && (this.addComment == true)) {
            ui.error('涓嶈閲嶅璇勮');
            return false;
        }
        var addcomment = this.addComment;
        var addToEnd = this.addToEnd;

        var _this = this;
        obj.innerHTML = '璇勪环涓�..';
        $.post(U('widget/Comment/addComment'),{
            app_name:this.app_name,
            table_name:this.table,
            app_uid:this.app_uid,
            row_id:this.row_id,
            to_comment_id:this.to_comment_id,
            to_uid:this.to_uid,
            app_row_id:this.app_row_id,
            app_row_table:this.app_row_table,
            content:content,
            ifShareFeed:ifShareFeed,
            comment_old:comment_old,
            app_detail_summary:$("#app_detail_summary").val(),
            app_detail_url:document.location.href
        },function(msg){
            if ( obj != undefined ){
                obj.innerHTML = '璇勪环';
            }
            if(msg.status == "0"){
                ui.error(msg.data);
            }else{
                if("undefined" != typeof(commentListObj.childModels['comment_list']) ){
                    if(addToEnd == 1){
                        $(commentListObj).find(' .comment_lists').eq(0).prepend(msg.data);
                    }else{
                        $(msg.data).insertBefore($(commentListObj.childModels['comment_list'][0]));
                    }
                }else{
                    $(commentListObj).find('.comment_lists').eq(0).html(msg.data);
                }
                M(commentListObj);
                //閲嶇疆
                _textarea.value = '';
                _this.to_comment_id = 0;
                _this.to_uid = 0;
                if("function" == typeof(afterComment)){
                    afterComment();
                }
                // 鍔ㄦ€佹坊鍔犲瓧鏁�
                var commentDom = $('#feed'+core.comment.row_id).find('a[event-node="comment"]');
                var oldHtml = commentDom.html();
                if (oldHtml != null) {
                    var commentVal = oldHtml.replace(/\(\d+\)$/, function (num) {
                        num = '(' + (parseInt(num.slice(1, -1)) + 1) + ')';
                        return num;
                    });
                    if (oldHtml === commentVal) {
                        commentVal += '(1)';
                    }
                    commentDom.html(commentVal);
                }
            }
            addComment = false;
            //});
        },'json');
    },
    delComment:function(comment_id){
        $.post(U('widget/Comment/delComment'),{comment_id:comment_id},function(msg){
            // 鍔ㄦ€佹坊鍔犲瓧鏁�
            var commentDom = $('#feed'+core.comment.row_id).find('a[event-node="comment"]');
            var oldHtml = commentDom.html();
            if (oldHtml != null) {
                var commentVal = oldHtml.replace(/\(\d+\)$/, function (num) {
                    var cnum = parseInt(num.slice(1, -1)) - 1;
                    if (cnum <= 0) {
                        return '';
                    }
                    num = '(' + cnum + ')';
                    return num;
                });
                commentDom.html(commentVal);
            }
        });
    }
};