/**
 * ThinkSNS鏍稿績Js瀵硅薄
 * @author jason <yangjs17@yeah.net>
 * @version TS3.0
 */
var _core = function() {
    // 鏍稿績閫氱敤鐨勫姞杞芥簮鍑芥暟
    var obj = this;
    // 鍔犺浇鏂囦欢鏂规硶
    this._coreLoadFile = function() {
        var temp = new Array();
        var tempMethod = function(url, callback) {
            // 绗簩娆¤皟鐢ㄧ殑鏃跺€欏氨涓�=0浜�
            var flag = 0;
            for(i in temp) {
                if(temp[i] == url) {
                    flag = 1;
                }
            }
            if(flag == 0) {
                // 鏈浇鍏ヨ繃
                temp[temp.length] = url;
                // JQuery鐨刟jax杞藉叆鏂囦欢鏂瑰紡锛屽鏋滄湁鏍峰紡鏂囦欢锛屽悓鐞嗗湪姝ゅ紩鍏ョ浉鍏虫牱寮忔枃浠�
                $.getScript(url, function() {
                    if("undefined" != typeof(callback)) {
                        if("function" == typeof(callback)) {
                            callback();
                        } else {
                            eval(callback);
                        }
                    }
                });
            } else {
                if("undefined" != typeof(callback)) {
                    // 鍒╃敤setTimeout 閬垮厤鏈畾涔夐敊璇�
                    setTimeout(callback, 200);
                }
            }
        };
        // 杩斿洖鍐呴儴鍖呭嚱鏁帮紝渚涘閮ㄨ皟鐢ㄥ苟鍙互鏇存敼temp鐨勫€�
        return tempMethod;
    };
    // 鍔犺浇CSS鏂囦欢
    this._loadCss = function() {
        var temp = new Array();
        var tempMethod = function(url) {
            // 绗簩娆¤皟鐢ㄧ殑鏃跺€欏氨涓�=0浜�
            var flag = 0;
            for(i in temp) {
                if(temp[i] == url) {
                    flag = 1;
                }
            }
            if(flag == 0) {
                // 鏈浇鍏ヨ繃
                temp[temp.length] = url;
                var css = '<link href="'+THEME_URL+'/js/tbox/box.css" rel="stylesheet" type="text/css">';
                $('head').append(css);
            }
        };
        // 杩斿洖鍐呴儴鍖呭嚱鏁�,渚涘閮ㄨ皟鐢ㄥ苟鍙互鏇存敼temp鐨勫€�
        return tempMethod;
    };
    /**
     * 鏃堕棿鎻掍欢婧愬嚱鏁�
     * 鍒╃敤蹇呭寘鍘熺悊鍙浇鍏ヤ竴娆s鏂囦欢,鍏朵粬绫讳技鍔熻兘閮藉彲浠ュ弬鐓ф鏂规硶
     * 闇€瑕佹彁鍓嶅紩鍏query.js鏂囦欢
     * @author yangjs
     */
    this._rcalendar = function(text, mode, refunc) {
        // 鏍囪鍊�
        var temp = 0;
        var tempMethod = function(t, m, r) {
            // 绗簩娆¤皟鐢ㄧ殑鏃跺€欏氨涓�=0浜�
            if(temp == 0) {
                // JQuery鐨刟jax杞藉叆鏂囦欢鏂瑰紡锛屽鏋滄湁鏍峰紡鏂囦欢锛屽悓鐞嗗湪姝ゅ紩鍏ョ浉鍏虫牱寮忔枃浠�
                $.getScript(THEME_URL+'/js/rcalendar.js', function() {
                    rcalendar(t, m, r);
                });
            } else {
                rcalendar(t, m, r);
            }
            temp++;
        };
        // 杩斿洖鍐呴儴鍖呭嚱鏁帮紝渚涘閮ㄨ皟鐢ㄥ苟鍙互鏇存敼temp鐨勫€�
        return tempMethod;
    };
    /**
     * 鐢熸垚IMG鐨刪tml鍧�
     */
    this._createImageHtml = function() {
        var _imgHtml = '';
        var _c = function() {
            if(_imgHtml == '') {
                $.post(U('basic/Public/getSmile'), {}, function(data) {
                    for(var k in data) {
                        _imgHtml += '<a href="javascript:void(0)" title="'+data[k].title+'" onclick="core.face.face_chose(this)";><img src="'+ THEME_URL +'/images/expression/'+data[k].type+'/'+ data[k].filename +'" width="24" height="24" /></a>';
                    }
                    _imgHtml += '<div class="c"></div>';
                    $('#emot_content').html(_imgHtml);
                }, 'json');
            } else {
                $('#emot_content').html(_imgHtml);
            }
        };
        return _c;
    };
}

// 鏍稿績瀵硅薄
var core = new _core();

/**
 * 鏍稿績鐨勬彃浠跺垪琛�
 */

//寰崥鍔犺浇鏂囦欢锛屾敮鎸佸洖璋冨嚱鏁� 璋冪敤鏂瑰紡core.loadFile(url,callback)
core.loadFile = core._coreLoadFile();
core.loadCss = core._loadCss();

/**
 * 鏍稿績鎻掍欢鑷姩鐢熸垚鐨勫伐鍘傚嚱鏁�
 * 杩欓噷鐢ㄥ埌浜唈s鐨勫伐鍘傛ā寮忕瓑璁捐妯″紡
 *
 * 浣跨敤鏂规硶锛氬皢锝婏綋鎻掍欢鍐欏埌plugins/涓嬬殑瀵瑰簲鏂囦欢涓嬶紝鏂囦欢鍚嶅繀椤讳笌鎻掍欢瀵硅薄鍚屽悕锛屽core.at.js
 * JS 鎻掍欢閲岄潰闇€瑕佹湁涓€涓猒init 鍑芥暟锛屾牴鎹紶鍏ュ弬鏁扮湡姝ｈ皟鐢� init鍑芥暟
 *
 * 濡傦細core.plugInit('searchUser',$(this))锛�
 * 鍏朵腑searchUser琛ㄧず鎻掍欢鐨勫悕绉版槸core.searchUser.js
 * $(this) 涓� init鐨勭涓€涓弬鏁�
 *
 * @author yangjs
 */
core.plugInit = function() {
    if(arguments.length > 0) {
        var arg = arguments;
        var back = function() {
            eval("var func = core." + arg[0] + ";");
            if("undefined" != typeof(func)) {
                func._init(arg);
            }
        };
        var file = THEME_URL + '/js/plugins/core.' + arguments[0] + '.js';
        core.loadFile(file, back);
    }
};
//涓庝笂闈㈡柟娉曠被浼� 鍙笉杩囧彲浠ヨ嚜宸卞啓鍥炶皟鍑芥暟锛堜笉涓诲姩鎵цinit锛�
core.plugFunc = function(plugName,callback){
    var file = THEME_URL+'/js/plugins/core.'+plugName+'.js';
    core.loadFile(file,callback);
};

/**
 * 浼樺寲setTimeout鍑芥暟
 * @param func
 * @param time
 */
core.setTimeout = function(func,time){
//	var type = typeof(func);
//	if("undefined" == type){
    setTimeout(func, time);
//	}else{
//		if("string" == type){
//			eval(func);
//		}else{
//			func();
//		}
//	}

};
// 鑾峰彇瀵硅薄缂栬緫妗嗗唴鐨勫彲杈撳叆鏁板瓧
core.getLeftNums = function(obj) {
    var str = obj.innerHTML;
    // 鏇挎崲br鏍囩
    var imgNums = $(obj).find('img').size();
    // 鍒ゆ柇鏄惁涓虹┖
    var _str = str.replace(new RegExp("<br>","gm"),"");
    _str = _str.replace(/[ ]|(&nbsp;)*/g, "");
    // 鍒ゆ柇瀛楁暟鏄惁瓒呰繃锛屼竴涓┖鏍肩畻涓€涓瓧
    _str = str.replace(/<[^>]*>/g, "");		// 鍘绘帀鎵€鏈塇TML鏍囩
    _str = trim(_str,' ');

    if(imgNums <1 ) {
        var emptyStr = _str.replace(/&nbsp;/g,"").replace(/\s+/g,"");
        if(emptyStr.length == 0) {
            return initNums;
        }
    }
    _str = _str.replace(/&nbsp;/g,"a"); 	// 鐢变簬鍙紪杈慏IV鐨勭┖鏍奸兘鏄痭bsp 鎵€浠ヨ繖涔堢畻

    return initNums - getLength(_str) - imgNums;
};
core.getLength = function(str, shortUrl) {
    str = str + '';
    if (true == shortUrl) {
        // 涓€涓猆RL褰撲綔鍗佷釜瀛楅暱搴﹁绠�
        return Math.ceil(str.replace(/((news|telnet|nttp|file|http|ftp|https):\/\/){1}(([-A-Za-z0-9]+(\.[-A-Za-z0-9]+)*(\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\.[0-9]{1,3}){3}))(:[0-9]*)?(\/[-A-Za-z0-9_\$\.\+\!\*\(\),;:@&=\?\/~\#\%]*)*/ig, 'xxxxxxxxxxxxxxxxxxxx')
            .replace(/^\s+|\s+$/ig,'').replace(/[^\x00-\xff]/ig,'xx').length/2);
    } else {
        return Math.ceil(str.replace(/^\s+|\s+$/ig,'').replace(/[^\x00-\xff]/ig,'xx').length/2);
    }
};
// 涓€浜涜嚜瀹氫箟鐨勬柟娉�
// 鐢熸垚琛ㄦ儏鍥剧墖
core.createImageHtml = core._createImageHtml();
//鏃ユ湡鎺т欢,璋冪敤鏂瑰紡 core.rcalendar(this,'full')
//this 涔熷彲浠ユ浛鎹负鍏蜂綋ID,full琛ㄧず鏃堕棿鏄剧ず妯″紡,涔熷彲浠ュ弬鑰價calendar.js鍐呯殑鍏朵粬妯″紡
core.rcalendar = core._rcalendar();


//涓存椂瀛樺偍鏈哄埗 閫傜敤浜庡垎鍓插紑瀛樺偍鐨勫唴瀹�

core.stringDb = function(obj,inputname,tags){
    this.inputname = inputname;
    this.obj  = obj;
    if(tags != ''){
        this.tags = tags.split(',');
    }else{
        this.tags = new Array();
    }
    this.taglist = $(obj).find('ul');
    this.inputhide = $(obj).find("input[name='"+inputname+"']");
};

core.stringDb.prototype = {
    init:function(){
        if(this.tags.length > 0){
            var html = '';
            for(var i in this.tags){
                if(this.tags[i] != ''){
                    html +='<li><label>'+this.tags[i]+'</label><em>X</em></li>';
                }
            }
            this.taglist.html(html);
            this.bindUl();
        }
    },
    bindUl:function(){
        var _this = this;
        this.taglist.find('li').click(function(){
            _this.remove($(this).find('label').html());
        });
    },
    add:function(tag){
        var _tag = tag.split(',');
        var _this = this;
        var add = function(t){
            for(var i in _this.tags){
                if(_this.tags[i] == t){
                    return false;
                }
            }
            var html = '<li><label>'+t+'</label><em>X</em></li>';
            _this.tags[_this.tags.length] = t;
            _this.taglist.append(html);
        };

        for(var ii in _tag){
            if(_tag[ii] != ''){
                add(_tag[ii]);
            }
        }

        this.inputhide.val(this.tags.join(','));
        this.bindUl();
    },
    remove:function(tag){
        var del = function(arr,n){
            if(n<0){
                return arr;
            }else{
                return arr.slice(0,n).concat(arr.slice(n+1,arr.length))
            }
        }

        for(var i in this.tags){
            if(this.tags[i] == tag){
                this.tags = del(this.tags,parseInt(i));
                this.taglist.find('li').eq(i).remove();
                this.inputhide.val(this.tags.join(','));
            }
        }
    }
};

/*** 鏍稿績Js鍑芥暟搴� ***/
/**
 * 妯℃嫙TS鐨刄鍑芥暟锛岄渶瑕侀鍏堝畾涔塉S鍏ㄥ眬鍙橀噺SITE_URL鍜孉PPNAME
 * @param string url 閾炬帴鍦板潃
 * @param array params 閾炬帴鍙傛暟
 * @return string 缁勮鍚庣殑閾炬帴鍦板潃
 */
var U = function(url, params) {
    var website = SITE_URL+'/index.php';
    url = url.split('/');
    if(url[0]=='' || url[0]=='@')
        url[0] = APPNAME;
    if (!url[1])
        url[1] = 'Index';
    if (!url[2])
        url[2] = 'index';
    website = website+'?app='+url[0]+'&mod='+url[1]+'&act='+url[2];
    if(params) {
        params = params.join('&');
        website = website + '&' + params;
    }
    return website;
};


//浣跨敤娌欑妯″紡闃叉姹℃煋澶栭潰鐨勫彉閲�
; (function () {
    //璁╁闈㈠彲浠ュ彧鑳借闂埌require鍙橀噺
    window.requireJS = require;
    //瀹氫箟涓€涓姞杞芥ā鍧楃殑鏂规硶
    function require(moduleName, callback) {
        var callback = $.isFunction(callback) ? callback : function(){};
        //鍒涘缓鍔犺浇妯″潡鐨勫叿浣撳疄鐜扮被
        var requireHelper = new RequireHelper(moduleName, callback);
        //璋冪敤鍔犺浇妯″潡绫荤殑load鏂规硶鍔犺浇妯″潡
        requireHelper.load();
    }
    //瀛樺偍宸插姞杞芥ā鍧楃殑淇℃伅
    moduleList = [];

    //鍒涘缓涓€涓疄浣撶被,缁欎紶杩涙潵鐨勫睘鎬ц祴鍊�
    function RequireHelper(moduleName, callback) {
        this.moduleName = moduleName;
        this.callback = callback;
    }

    //缁欐ā鍧楀姞杞藉疄鐜扮被鐨勫師鍨嬫坊鍔犳柟娉�
    RequireHelper.prototype = {
        //鍔犺浇妯″潡
        load: function () {
            var that = this;
            var moduleName = that.moduleName;
            if (that.isLoad()) {//妯″潡宸茶鍔犺浇(璧勬簮浼樺寲:宸茬粡璇锋眰鐨勬ā鍧椾笉瑕佸啀娆″姞杞�)
                var moduleInfo = that.getModuleInfo();//鑾峰彇妯″潡鐨勬弿杩颁俊鎭�
                if (moduleList.isLoad) {//濡傛灉妯″潡璧勬簮宸插姞杞藉畬鎴�
                    that.callback();//鍙互鏀惧績鐨勮皟鐢ㄦā鍧楀搴旂殑鍥炶皟鍑芥暟
                } else {//妯″潡璧勬簮娌″姞杞藉畬
                    var oldCallback = moduleInfo.callback;//鍙栧嚭涔嬪墠鐨勫洖璋冨嚱鏁�
                    moduleInfo.callback = function () {//杩藉姞鍥炶皟鍑芥暟
                        oldCallback();
                        that.callback();
                    };
                }
            } else {//妯″潡娌℃湁鍔犺浇
                var script = document.createElement("script");
                script.src = that.moduleName;
                document.getElementsByTagName("head")[0].appendChild(script);//鍔犺浇妯″潡
                var moduleInfo = {
                    moduleName: that.moduleName, isLoad: false, callback: function () {
                        that.callback();
                    }
                };//娣诲姞妯″潡鐨勬弿杩颁俊鎭�
                script.onload = function () {
                    moduleInfo.callback();//鎵ц妯″潡瀵瑰簲鐨勫洖璋冨嚱鏁�
                    moduleInfo.isLoad = true;//鏍囪瘑妯″潡璧勬簮琚姞杞藉畬鎴�
                }
            }
        },
        //鍒ゆ柇鎸囧畾妯″潡鏄惁鍔犺浇
        isLoad: function () {
            return this.getModuleInfo() == null ? false : true;
        },
        //鏍规嵁妯″潡鍚嶇О鑾峰彇妯″潡淇℃伅
        getModuleInfo: function () {
            for (var i = 0; i < moduleList.length; i++) {
                if (that.moduleName == moduleList[i].name) {
                    return moduleList;
                }
            }
            return null;
        }
    };

})(window);

/*澶勭悊杩斿洖json锛岃浆涓簅bject*/
function getResponseData(response){
    if(typeof(response) != 'object'){
        try{
            var response = JSON.parse(response);
        }catch(e){
            var response = {status:0,data:'鎿嶄綔澶辫触,璇烽噸鏂板皾璇�'};
        }
    }
    return response;
}