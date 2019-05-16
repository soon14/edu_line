requireJS(THEME_URL + '/js/layer/layer.js');
// 鎿嶄綔鎴愬姛
// ui.success('鎿嶄綔鎴愬姛');
// ui.error('鎿嶄綔澶辫触');
// 鎿嶄綔鎴愬姛骞惰烦杞埌鎸囧畾鍦板潃;
// ui.success('鎿嶄綔鎴愬姛',{
//     end:function(){
//         window.location.href = '璺宠浆鐨勫湴鍧€'
//     }
// });
// 榛樿鎻愮ず淇℃伅鍦�1.8s鍚庢秷澶�,鍙互鎸囧畾鏃堕棿,鍗曚綅绉�,涓�0鏃朵笉娑堝け
// 鎿嶄綔鎴愬姛,涓斿湪5s鍚庢秷澶�
// ui.success('鎿嶄綔鎴愬姛',{
//     time:5
// });
// 榛樿鐨勬彁绀烘涓嶅叿鏈夋寜閽�,鍙互浣跨敤btn鍙傛暟璁剧疆鎸夐挳
// ui.success('鎿嶄綔鎴愬姛',{
//     btn:['濂界殑鐭ラ亾浜�']
// });
// 璇㈤棶寮瑰嚭灞�,榛樿瀛樺湪涓や釜鎸夐挳,['纭畾','鍙栨秷'],鍙互浣跨敤btn鍙傛暟鑷鎸囧畾
// ui.confirm('鏄惁纭畾鍒犻櫎?',{
//     yes:function(){
//         ui.success('浣犵‘瀹氫簡');
//     },
//     btn2:function(){
//         ui.error('浣犲彇娑堜簡');
//     }
// });
/**
 * PC绐椾綋瀵硅薄锛屽叏绔欎娇鐢紝缁熶竴绐椾綋鎺ュ彛
 */
var ui = {
    open: function(config) {
        layer.open(config);
    },
    /**
     *  鎿嶄綔鎴愬姛鏄剧ずAPI
     * @param string message 淇℃伅鍐呭
     * @param integer time 灞曠ず鏃堕棿
     * @return void
     */
    success: function(message, config) {
        var _config = {
            offset:'300px',
            icon: 1,
            time: 1.8,
            btn: false,
            title: '',
            closeBtn: 0,
            content: typeof(message) == 'null' ? '鏈嶅姟鍣ㄨ蛋绁炰簡' : message
        };
        var config = config ? $.extend(_config, config) : _config;
        config.time = config.time * 1000;
        layer.open(config);
    },
    /**
     * 鎿嶄綔鍑洪敊鏄剧ずAPI
     * @param string message 淇℃伅鍐呭
     * @param integer time 灞曠ず鏃堕棿
     * @return void
     */
    error: function(message, config) {
        var _config = {
            offset:'300px',
            icon: 2,
            time: 1.8,
            btn: false,
            title: '',
            closeBtn: 0,
            content: typeof(message) == 'null' ? '鏈嶅姟鍣ㄨ蛋绁炰簡' : message
        };
        var config = config ? $.extend(_config, config) : _config;
        config.time = config.time * 1000;
        layer.open(config);
    },
    /**
     * 纭寮规鏄剧ずAPI - 娴獥鍨�
     * @example
     * 鍙互鍔犲叆callback锛屽洖璋冨嚱鏁�
     * @param object o 瀹氫綅瀵硅薄
     * @param string text 鎻愮ず璇█
     * @param string|function _callback 鍥炶皟鍑芥暟鍚嶇О
     * @return void
     */
    confirm: function(message, config) {
        var _config = {
            icon: 3,
            btn: ['纭畾', '鍙栨秷'],
            offset:'300px',
            title: '',
            closeBtn: 0,
            content: message,
            yes:function(index){
                layer.close(index);
            }
        };
        var config = config ? $.extend(_config, config) : _config;
        var callback = $.isFunction(config.yes) ? config.yes : function(){};
        config.yes = function(index){
            callback(index);
            layer.close(index);
        }
        layer.open(config);
    },
    /**
     * 绉佷俊寮圭獥API
     * @param string touid 鏀朵欢浜篒D
     * @return void
     */
    sendmessage: function(touid, editable) {
        if (MID == '0') {
            reg_login();
            return;
        }
        if (typeof(editable) == "undefined") {
            editable = 1;
        }
        touid = touid || '';
        this.box.load(U('basic/Message/post') + '&touid=' + touid + '&editable=' + editable, '鍙戠淇�');
    },
    /**
     * @Me寮圭獥API
     * @param string touid @浜篒D
     * @return void
     */
    sendat: function(touid) {
        touid = touid || '';
        this.box.load(U('basic/Mention/at') + '&touid=' + touid, '@TA');
    },
    /**
     * 寮圭獥鍙戝竷寰崥
     * @param string title 寮圭獥鏍囬
     * @param string initHTML 鎻掑叆鍐呭
     * @return void
     */
    sendbox: function(title, initHtml, channelID) {
        if ($.browser.msie) {
            initHtml = encodeURI(initHtml);
        }
        initHtml = initHtml.replace(/\#/g, "%23");
        this.box.load(U('basic/Index/sendFeedBox') + '&initHtml=' + initHtml + '&channelID=' + channelID, title, function() {
            $('#at-view').hide();
        });
    },
    /**
     * 鍥炲寮圭獥API
     * @param integer comment_id 璇勮ID
     * @return void
     */
    reply: function(comment_id) {
        this.box.load(U('basic/Comment/reply') + '&comment_id=' + comment_id, '鍥炲', function() {
            $('#at-view').hide();
        });
    },
    groupreply: function(comment_id, gid) {
        this.box.load(U('group/Group/reply') + '&gid=' + gid + '&comment_id=' + comment_id, "鍥炲", function() {
            $('#at-view').hide();
        });
    },
    /**
     * 閫夋嫨閮ㄩ棬寮圭獥API - 鏆備笉浣跨敤
     */
    changeDepartment: function(hid, showname, sid, nosid, notop) {
        this.box.load(U('widget/Department/change') + '&hid=' + hid + '&showName=' + showname + '&sid=' + sid + '&nosid=' + nosid + '&notop=' + notop, '閮ㄩ棬閫夋嫨');
    },
    /**
     * 鑷畾寮圭獥API鎺ュ彛
     */
    box: {
        /**
         * 鍏抽棴绐楀彛
         * @param function fn 鍥炶皟鍑芥暟鍚嶇О
         * @return void
         */
        close: function() {
            layer.closeAll();
        },
        /**
         * 杞藉叆寮圭獥API
         * @param string requestUrl 璇锋眰鍦板潃
         * @param string title 寮圭獥鏍囬
         * @param string callback 绐楀彛鍏抽棴鍚庣殑鍥炶皟浜嬩欢
         * @param object requestData requestData
         * @param string type Ajax璇锋眰鍗忚锛岄粯璁や负GET
         * @return void
         */
        load: function(requestUrl, title, callback, requestData, type,config) {
            var ajaxType = "undefined" != typeof(type) ? type : 'GET';
            var requestData = "undefined" != typeof(requestData) ? requestData : {};
            var callback = $.isFunction(callback) ? callback : null;
            window.config = config;
            $.ajax({
                url: requestUrl,
                type: ajaxType,
                data: requestData,
                cache: false,
                dataType: 'html',
                async:false,
                success: function(html) {
                    var _config = {
                        type: 1,
                        content: html,
                        title: title,
                        end: callback,
                        btn: false,
                        time: 0,
                        area:['auto','auto'],
                        scrollbar:false
                    };
                    if(!title){
                        _config.closeBtn = 0;
                    }
                    var config = window.config ? $.extend(_config, window.config) : _config;
                    layer.open(config);
                }
            });
        }
    }
};