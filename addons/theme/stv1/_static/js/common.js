/**
 * 鏍稿績Js鍑芥暟搴撴枃浠讹紝鐩墠宸茬粡鍦╟ore涓嚜鍔ㄥ姞杞�
 * @author jason <yangjs17@yeah.net>
 * @version TS3.0
 */

// 瀛楃涓查暱搴� - 涓枃鍜屽叏瑙掔鍙蜂负1锛涜嫳鏂囥€佹暟瀛楀拰鍗婅涓�0.5
var getLength = function(str, shortUrl) {
    if (true == shortUrl) {
        // 涓€涓猆RL褰撲綔鍗佷釜瀛楅暱搴﹁绠�
        return Math.ceil(str.replace(/((news|telnet|nttp|file|http|ftp|https):\/\/){1}(([-A-Za-z0-9]+(\.[-A-Za-z0-9]+)*(\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\.[0-9]{1,3}){3}))(:[0-9]*)?(\/[-A-Za-z0-9_\$\.\+\!\*\(\),;:@&=\?\/~\#\%]*)*/ig, 'xxxxxxxxxxxxxxxxxxxx')
            .replace(/^\s+|\s+$/ig,'').replace(/[^\x00-\xff]/ig,'xx').length/2);
    } else {
        return Math.ceil(str.replace(/^\s+|\s+$/ig,'').replace(/[^\x00-\xff]/ig,'xx').length/2);
    }
};


// 鎴彇瀛楃涓�
var subStr = function(str, len) {
    if(!str) {
        return '';
    }
    len = len > 0 ? len * 2 : 280;
    var count = 0;			// 璁℃暟锛氫腑鏂�2瀛楄妭锛岃嫳鏂�1瀛楄妭
    var temp = '';  		// 涓存椂瀛楃涓�
    for(var i = 0; i < str.length; i ++) {
        if(str.charCodeAt(i) > 255) {
            count += 2;
        } else {
            count ++;
        }
        // 濡傛灉澧炲姞璁℃暟鍚庨暱搴﹀ぇ浜庨檺瀹氶暱搴︼紝灏辩洿鎺ヨ繑鍥炰复鏃跺瓧绗︿覆
        if(count > len) {
            return temp;
        }
        // 灏嗗綋鍓嶅唴瀹瑰姞鍒颁复鏃跺瓧绗︿覆
        temp += str.charAt(i);
    }

    return str;
};
// 寮傛璇锋眰椤甸潰
var async_page = function(url, target, callback) {
    if(!url) {
        return false;
    } else if(target) {
        var $target = $(target);
        //$target.html('<img src="'+_THEME_+'/images/icon_waiting.gif" width="20" style="margin:10px 50%;" />');
    }
    $.post(url, {}, function(txt) {
        txt = eval("(" + txt + ")");
        if(txt.status) {
            if(target) {
                $target.html(txt.data);
            }
            if(callback) {
                if(callback.match(/[(][^()]*[)]/)) {
                    eval(callback);
                } else {
                    eval(callback)(txt);
                }
            }
            if(txt.info) {
                ui.success(txt.info);
            }
        } else if(txt.info) {
            ui.error(txt.info);
            return false;
        }
    });

    return true;
};
// 寮傛鍔犺浇缈婚〉
var async_turn_page = function(page_number, target) {
    $(page_number).click(function(o) {
        var $a = $(o.target);
        var url = $a.attr("href");
        if(url) {
            async_page(url, target);
        }
        return false;
    });
};

//琛ㄥ崟寮傛澶勭悊
/* 鐢熸晥鏉′欢锛氬寘鍚� jquery.form.js */
//TODO 浼樺寲jquery.form.js鐨勫姞杞芥満鍒�
var async_form = function(form)
{
    var $form = form ? $(form) : $("form[ajax='ajax']");

    //鐩戝惉 form 琛ㄥ崟鎻愪氦
    $form.bind('submit', function() {
        var callback = $(this).attr('callback');
        var options = {
            success: function(txt) {
                txt = eval("("+txt+")");
                if(callback){
                    if (callback.match(/[(][^()]*[)]/)) {
                        eval(callback);
                    } else {
                        eval(callback)(txt);
                    }
                }else{
                    if(txt.status && txt.info){
                        ui.success( txt.info );
                    }else if (txt.info) {
                        ui.error( txt.info );
                    }
                }
            }
        };
        $(this).ajaxSubmit(options);
        return false;
    });
};

// 澶嶅埗鍓创鏉�
var copy_clip = function (copy){
    if (window.clipboardData) {
        window.clipboardData.setData("Text", copy);
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            ui.error( '浣犵殑娴忚鍣ㄤ笉鏀寔鑴氭湰澶嶅埗鎴栦綘鎷掔粷浜嗘祻瑙堝櫒瀹夊叏纭锛岃灏濊瘯鎵嬪姩[Ctrl+C]澶嶅埗銆�' );
            return false;
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) {
            return false;
        }
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) {
            return false;
        }
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = copy;
        str.data = copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) {
            return false;
        }
        clip.setData(trans,null,clipid.kGlobalClipboard);
    }
    ui.success( '澶嶅埗鎴愬姛锛佽Ctrl+V閿矘璐村埌瑕佸姞鍏ョ殑椤甸潰銆�' );
    return true;
};
//鏄惁鍚湁鏌愪釜鏍峰紡

function hasClass(ele,cls) {
    return $(ele).hasClass(cls);
    //return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
//娣诲姞鏌愪釜鏍峰紡
function addClass(ele,cls) {
    $(ele).addClass(cls);
    //if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
//绉婚櫎鏌愪釜鏍峰紡
function removeClass(ele,cls) {
    $(ele).removeClass(cls);
    //if (hasClass(ele,cls)) {
    //	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    //ele.className=ele.className.replace(reg,' ');
    //}
}

var toElement = function(){
    var div = document.createElement('div');
    return function(html){
        div.innerHTML = html;
        var el = div.childNodes[0];
        div.removeChild(el);
        return el;
    }
}();

/**
 *	涓巔hp鐨刬mplode鏂规硶鐢ㄦ硶涓€鏍�
 *	@from php.js
 */

var implode  = function (glue, pieces) {
    var i = '',
        retVal = '',        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }    if (typeof(pieces) === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        }
        for (i in pieces) {            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }    return pieces;
};
/**
 * 涓巔hp鐨別xplode鐢ㄦ硶涓€鑷�
 * @from php.js
 */
var explode = function(delimiter, string, limit){
    var emptyArray = {0:''};

    if (arguments.length < 2 || typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined') {
        return null;
    }

    if (delimiter === '' || delimiter === false || delimiter === null) {
        return false;
    }

    if (typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object') {
        return emptyArray;
    }
    if (delimiter === true) {
        delimiter = '1';
    }
    if (!limit) {
        return string.toString().split(delimiter.toString());
    }
    // support for limit argument
    var splitted = string.toString().split(delimiter.toString());    var partA = splitted.splice(0, limit - 1);
    var partB = splitted.join(delimiter.toString());
    partA.push(partB);
    return partA;
};
/**
 *	涓巔hp鐨剆trlen鏂规硶鐢ㄦ硶涓€鏍�
 *	@from php.js
 */
var strlen = function (string) {
    var str = string + '';
    var i = 0,        chr = '',
        lgth = 0;

    if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
        return string.length;    }

    var getWholeChar = function (str, i) {
        var code = str.charCodeAt(i);
        var next = '',            prev = '';
        if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            if (str.length <= (i + 1)) {
                throw 'High surrogate without following low surrogate';
            }            next = str.charCodeAt(i + 1);
            if (0xDC00 > next || next > 0xDFFF) {
                throw 'High surrogate without following low surrogate';
            }
            return str.charAt(i) + str.charAt(i + 1);        } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            prev = str.charCodeAt(i - 1);            if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                throw 'Low surrogate without preceding high surrogate';
            }
            return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
        }        return str.charAt(i);
    };

    for (i = 0, lgth = 0; i < str.length; i++) {
        if ((chr = getWholeChar(str, i)) === false) {            continue;
        } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
        lgth++;
    }
    return lgth;
};

/**
 * 涓嶱HP鐨剆ubstr涓€鏍风殑鐢ㄦ硶銆�
 * @from php.js
 */
var substr = function(str, start, len) {
    var i = 0,
        allBMP = true,
        es = 0,        el = 0,
        se = 0,
        ret = '';
    str += '';
    var end = str.length;
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
        case 'on':
            // Full-blown Unicode including non-Basic-Multilingual-Plane characters
            // strlen()
            for (i = 0; i < str.length; i++) {            if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                allBMP = false;
                break;
            }
            }
            if (!allBMP) {
                if (start < 0) {
                    for (i = end - 1, es = (start += end); i >= es; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {                        start--;
                            es--;
                        }
                    }
                } else {                var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                    while ((surrogatePairs.exec(str)) != null) {
                        var li = surrogatePairs.lastIndex;
                        if (li - 2 < start) {
                            start++;                    } else {
                            break;
                        }
                    }
                }
                if (start >= end || start < 0) {
                    return false;
                }
                if (len < 0) {                for (i = end - 1, el = (end += len); i >= el; i--) {
                    if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                        end--;
                        el--;
                    }                }
                    if (start > end) {
                        return false;
                    }
                    return str.slice(start, end);            } else {
                    se = start + len;
                    for (i = start; i < se; i++) {
                        ret += str.charAt(i);
                        if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {                        se++; // Go one further, since one of the "characters" is part of a surrogate pair
                        }
                    }
                    return ret;
                }            break;
            }
        // Fall-through
        case 'off':
        // assumes there are no non-BMP characters;        //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
        default:
            if (start < 0) {
                start += end;
            }        end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
    }
    return undefined; // Please Netbeans
};

var trim = function(str,charlist){
    return str;
};
/**
 * 涓巔hp鐨剅trim鍑芥暟鐢ㄦ硶涓€鑷�
 * @from php.js
 */
var rtrim = function(str, charlist) {
    return str;
};

/**
 * 涓嶱HP鐨刲trim鐢ㄦ硶涓€鑷�
 * @from php.js
 */
var ltrim = function(str, charlist) {
    return str;
};

/**
 * 闂姩瀵硅薄鑳屾櫙
 * @param obj
 * @returns
 * @author yangjs
 */
var flashTextarea = function(obj){
    var nums = 0;
    var flash = function(){
        if(nums > 3 ){
            return false;
        }
        if(hasClass(obj,'fb')){
            removeClass(obj,'fb');
        }else{
            addClass(obj,'fb')
        }
        setTimeout(flash, 300);
        nums ++;
    }
    flash();
    return false;
};


/**
 * 鏇存柊椤甸潰涓婄洃鍚殑鐢ㄦ埛缁熻鏁扮洰
 * @example
 * updateUserData('favorite_count', 1); 琛ㄧず褰撳墠鐢ㄦ埛鐨勬敹钘忔暟+1
 * 椤甸潰缁撴瀯渚嬪瓙:<strong event-node ="favorite_count" event-args ="uid={$uid}">{$_userData.favorite_count|default=0}</strong>
 * @param string key 鐩戝惉鐨凨ey鍊�
 * @param integer flag 鏀瑰彉鐨勫箙搴﹀€�
 * @param integer uid 鏀瑰彉鐨勭敤鎴稩D
 * @return boolean false
 */
var updateUserData = function(key, flag, uid)
{
    // 鑾峰彇鎵€鏈塊ey鐩戝惉鐨勫璞�
    var countObj = M.nodes.events[key];
    // 鍒ゆ柇鏁版嵁绫诲瀷
    if("undefined" === typeof countObj) {
        return false;
    }
    if("undefined" === typeof uid) {
        uid = UID;
    }
    // 淇敼鏁板€�
    for(var i in countObj) {
        var _wC = countObj[i];
        var args = M.getEventArgs(_wC);
        if(args.uid == uid) {
            _wC.innerHTML = parseInt(_wC.innerHTML, 10) + parseInt(flag, 10);
        }
    }

    return false;
};

/**
 * 婊氬姩鍒伴《绔�
 */
var scrolltotop={
    //startline: 榧犳爣鍚戜笅婊氬姩浜�100px鍚庡嚭鐜�#topcontrol
    //scrollto: 瀹冪殑鍊煎彲浠ユ槸鏁存暟锛屼篃鍙互鏄竴涓猧d鏍囪銆傝嫢涓烘暣鏁帮紙鍋囪涓簄锛夛紝鍒欐粦鍔ㄥ埌璺濈top鐨刵鍍忕礌澶勶紱鑻ヤ负id鏍囪锛屽垯婊戝姩鍒拌id鏍囪鎵€鍦ㄧ殑鍚岀瓑楂樺
    //scrollduration:婊戝姩鐨勯€熷害
    //fadeduration:#topcontrol杩欎釜div鐨勬贰鍏ユ贰鍑洪€熷害锛岀涓€涓弬鏁颁负娣″叆閫熷害锛岀浜屼釜鍙傛暟涓烘贰鍑洪€熷害
    //controlHTML:鎺у埗鍚戜笂婊戝姩鐨刪tml婧愮爜锛岄粯璁や负<img src="up.png" style="width:48px; height:48px" />锛屽彲浠ヨ嚜琛屾洿鏀广€傝澶勭殑html浠ｇ爜浼氳鍖呭惈鍦ㄤ竴涓猧d鏍囪涓�#topcontrol鐨刣iv涓€�
    //controlattrs:鎺у埗#topcontrol杩欎釜div璺濈鍙充笅瑙掔殑鍍忕礌璺濈
    //anchorkeyword:婊戝姩鍒扮殑id鏍囩
    /*state: isvisible:鏄惁#topcontrol杩欎釜div涓哄彲瑙�
            shouldvisible:鏄惁#topcontrol杩欎釜div璇ュ嚭鐜�
    */

    setting: {startline:100, scrollto: 0, scrollduration:500, fadeduration:[500, 100]},
    controlHTML: '<a href="#top" class="top_stick">&nbsp;</a>',
    controlattrs: {offsetx:20, offsety:30},
    anchorkeyword: '#top',

    state: {isvisible:false, shouldvisible:false},

    scrollup:function(){
        if (!this.cssfixedsupport) {
            this.$control.css({opacity:0})
        };//鐐瑰嚮鍚庨殣钘�#topcontrol杩欎釜div
        var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto);
        if (typeof dest=="string" && jQuery('#'+dest).length==1) { //妫€鏌ヨ嫢scrollto鐨勫€兼槸涓€涓猧d鏍囪鐨勮瘽
            dest=jQuery('#'+dest).offset().top;
        } else { //妫€鏌ヨ嫢scrollto鐨勫€兼槸涓€涓暣鏁�
            dest=this.setting.scrollto;
        };
        this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
    },

    keepfixed:function(){
        //鑾峰緱娴忚鍣ㄧ殑绐楀彛瀵硅薄
        var $window=jQuery(window);
        //鑾峰緱#topcontrol杩欎釜div鐨剎杞村潗鏍�
        var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
        //鑾峰緱#topcontrol杩欎釜div鐨剏杞村潗鏍�
        var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
        //闅忕潃婊戝姩鍧楃殑婊戝姩#topcontrol杩欎釜div璺熼殢鐫€婊戝姩
        this.$control.css({left:controlx+'px', top:controly+'px'});
    },

    togglecontrol:function(){
        //褰撳墠绐楀彛鐨勬粦鍔ㄥ潡鐨勯珮搴�
        var scrolltop=jQuery(window).scrollTop();
        if (!this.cssfixedsupport) {
            this.keepfixed();
        };
        //鑻ヨ缃簡startline杩欎釜鍙傛暟锛屽垯shouldvisible涓簍rue
        this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false;
        //鑻houldvisible涓簍rue锛屼笖!isvisible涓簍rue
        if (this.state.shouldvisible && !this.state.isvisible){
            this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0]);
            this.state.isvisible=true;
        } //鑻houldvisible涓篺alse锛屼笖isvisible涓篺alse
        else if (this.state.shouldvisible==false && this.state.isvisible){
            this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1]);
            this.state.isvisible=false;
        }
    },

    init:function(){
        jQuery(document).ready(function($){
            var mainobj=scrolltotop;
            var iebrws=document.all;
            mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest; //not IE or IE7+ browsers in standards mode
            mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');

            //鍖呭惈#topcontrol杩欎釜div
            mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
                .css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
                .attr({title:"涓婄Щ"})
                .click(function(){mainobj.scrollup(); return false;})
                .appendTo('body');

            if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') {//loose check for IE6 and below, plus whether control contains any text
                mainobj.$control.css({width:mainobj.$control.width()}); //IE6- seems to require an explicit width on a DIV containing text
            };

            mainobj.togglecontrol();

            //鐐瑰嚮鎺у埗
            $('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
                mainobj.scrollup();
                return false;
            });

            $(window).bind('scroll resize', function(e){
                mainobj.togglecontrol();
            });
        });
    }
};
scrolltotop.init();

/**
 * 鏁扮粍鍘婚噸
 * @param array arr 鍘婚噸鏁扮粍
 * @return array 宸插幓閲嶇殑鏁扮粍
 */
var unique = function(arr)
{
    var obj = {};
    for(var i = 0, j = arr.length; i < j; i++) {
        obj[arr[i]] = true;
    }
    var data = [];
    for(var i in obj) {
        data.push[i];
    }

    return data;
};
var shortcut = function (shortcut,callback,opt) {
    //Provide a set of default options
    var default_options = {
        'type':'keydown',
        'propagate':false,
        'target':document
    }
    if(!opt) opt = default_options;
    else {
        for(var dfo in default_options) {
            if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
        }
    }

    var ele = opt.target
    if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
    var ths = this;

    //The function to be called at keypress
    var func = function(e) {
        e = e || window.event;

        //Find Which key is pressed
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code).toLowerCase();

        var keys = shortcut.toLowerCase().split("+");
        //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
        var kp = 0;

        //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
        var shift_nums = {
            "`":"~",
            "1":"!",
            "2":"@",
            "3":"#",
            "4":"$",
            "5":"%",
            "6":"^",
            "7":"&",
            "8":"*",
            "9":"(",
            "0":")",
            "-":"_",
            "=":"+",
            ";":":",
            "'":"\"",
            ",":"<",
            ".":">",
            "/":"?",
            "\\":"|"
        }
        //Special Keys - and their codes
        var special_keys = {
            'esc':27,
            'escape':27,
            'tab':9,
            'space':32,
            'return':13,
            'enter':13,
            'backspace':8,

            'scrolllock':145,
            'scroll_lock':145,
            'scroll':145,
            'capslock':20,
            'caps_lock':20,
            'caps':20,
            'numlock':144,
            'num_lock':144,
            'num':144,

            'pause':19,
            'break':19,

            'insert':45,
            'home':36,
            'delete':46,
            'end':35,

            'pageup':33,
            'page_up':33,
            'pu':33,

            'pagedown':34,
            'page_down':34,
            'pd':34,

            'left':37,
            'up':38,
            'right':39,
            'down':40,

            'f1':112,
            'f2':113,
            'f3':114,
            'f4':115,
            'f5':116,
            'f6':117,
            'f7':118,
            'f8':119,
            'f9':120,
            'f10':121,
            'f11':122,
            'f12':123
        }


        for(var i=0; k=keys[i],i<keys.length; i++) {
            //Modifiers
            if(k == 'ctrl' || k == 'control') {
                if(e.ctrlKey) kp++;

            } else if(k ==  'shift') {
                if(e.shiftKey) kp++;

            } else if(k == 'alt') {
                if(e.altKey) kp++;

            } else if(k.length > 1) { //If it is a special key
                if(special_keys[k] == code) kp++;

            } else { //The special keys did not match
                if(character == k) kp++;
                else {
                    if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                        character = shift_nums[character];
                        if(character == k) kp++;
                    }
                }
            }
        }

        if(kp == keys.length) {
            if (lock == 0) {
                lock = 1;
                setTimeout(function(){
                    lock = 0;
                }, 1500);
            } else {
                return false;
            }
            callback(e);

            if(!opt['propagate']) { //Stop the event
                //e.cancelBubble is supported by IE - this will kill the bubbling process.
                e.cancelBubble = true;
                e.returnValue = false;

                //e.stopPropagation works only in Firefox.
                if (e.stopPropagation) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                return false;
            }
        }
    }

    //Attach the function with the event
    var lock = 0;
    if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
    else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
    else ele['on'+opt['type']] = func;
};
var atWho = function (obj){
    obj.atWho("@",{
        tpl:"<li id='${id}' data-value='${searchkey}' input-value='${name}'><img src='${faceurl}'  height='20' width='20' /> ${name}</li>"
        ,callback:function(query,callback) {
            if ( keyname.text=='' ){
                $.ajax({
                    url:U('widget/SearchUser/searchAt')
                    ,type:'GET'
                    ,dataType: "json"
                    ,success:function(res) {
                        if ( res.data == null ){
                            $('#at-view').hide();
                            return;
                        } else {
                            datas = $.map(res.data,function(value,i){
                                return {'id':value.uid,'key':value.uname+":",'name':value.uname,'faceurl':value.avatar_small,'searchkey':value.search_key}
                            })
                        }
                        callback(datas)
                    }
                })
            } else {
                $.ajax({
                    url:U('widget/SearchUser/search')
                    ,type:'GET'
                    ,data: "type=at&key="+keyname.text
                    ,dataType: "json"
                    ,success:function(res) {
                        if ( res.data == null ){
                            $('#at-view').hide();
                            return;
                        } else {
                            datas = $.map(res.data,function(value,i){
                                return {'id':value.uid,'key':value.uname+":",'name':value.uname,'faceurl':value.avatar_small,'searchkey':value.search_key}
                            })
                        }
                        callback(datas)
                    }
                })
            }
        }
    }).atWho("#",{
        tpl:"<li id='${id}' data-value='${searchkey}' input-value='${name}#'>${name}</li>"
        ,callback:function(query,callback) {
            $.ajax({
                url:U('widget/TopicList/searchTopic')
                ,type:'GET'
                ,data: "key="+keyname.text
                ,dataType: "json"
                ,success:function(res) {
                    if ( res == null ){
                        $('#at-view').hide();
                        return;
                    } else {
                        datas = $.map(res,function(value,i){
                            return {'id':value.topic_id,'name':value.topic_name,'searchkey':value.topic_name}
                        })
                    }
                    callback(datas)
                }
            });
        }
    }).atWho("锛�",{
        tpl:"<li id='${id}' data-value='${searchkey}' input-value='${name}锛�'>${name}</li>"
        ,callback:function(query,callback) {
            $.ajax({
                url:U('widget/TopicList/searchTopic')
                ,type:'GET'
                ,data: "key="+keyname.text
                ,dataType: "json"
                ,success:function(res) {
                    if ( res == null ){
                        $('#at-view').hide();
                        return;
                    } else {
                        datas = $.map(res,function(value,i){
                            return {'id':value.topic_id,'name':value.topic_name,'searchkey':value.topic_name}
                        })
                    }
                    callback(datas)
                }
            });
        }
    });
};
$(function(){
    $.fn.extend({
        inputToEnd: function(myValue){
            var $t=$(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        },
        inputToDIV: function(myValue){

            var obj=$(this)[0];

            obj.focus();

            var selection = window.getSelection ? window.getSelection() : document.selection;

            var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);

            if (!window.getSelection){

                var selection = window.getSelection ? window.getSelection() : document.selection;

                var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);

                range.pasteHTML(myValue);

                range.collapse(false);

                range.select();

            }else{

                range.collapse(false);

                var hasR = range.createContextualFragment(myValue);

                var hasR_lastChild = hasR.lastChild;

                while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {

                    var e = hasR_lastChild;

                    hasR_lastChild = hasR_lastChild.previousSibling;

                    hasR.removeChild(e)

                }

                range.insertNode(hasR);

                if (hasR_lastChild) {

                    range.setEndAfter(hasR_lastChild);

                    range.setStartAfter(hasR_lastChild);

                }

                selection.removeAllRanges();

                selection.addRange(range);

            }

        }
    });
});
/**
 * 鍘绘帀瀛楃涓蹭腑鐨凥TML鏍囩
 * @param string str 闇€瑕佸鐞嗙殑瀛楃涓�
 * @return string 宸插幓鎺塇TML鐨勫瓧绗︿覆
 */
var removeHTMLTag = function(str)
{
    str = str.replace(/<\/?[^>]*>/g,'');
    return str;
};
var quickLogin = function (){
    ui.box.load(U('basic/Passport/quickLogin'),'蹇€熺櫥褰�');
};
/* 鍥剧墖鍒囨崲 */
(function(){
    var fSwitchPic = function( oPicSection, nInterval ) {
        try {
            this.dPicSection = "string" === typeof oPicSection ? document.getElementById( oPicSection ) : oPicSection;
            this.nInterval = nInterval > 0 ? nInterval : 2000;
            this.dPicList  = this.dPicSection.getElementsByTagName( "div" );
            this.nPicNum   = this.dPicList.length;
        } catch( e ) {
            return e;
        }
        this.nCurrentPic = this.nPicNum - 1;
        this.nNextPic = 0;
        this.fInitPicList();

        this.dPicNav = this.dPicSection.getElementsByTagName( "ul" )[0];
        this.fInitPicNav();

        clearTimeout( this.oTimer );
        this.fSwitch();
        this.fStart();
    };

    fSwitchPic.prototype = {
        constructor: fSwitchPic,
        fInitPicList: function() {
            var oSwitchPic = this;
            this.dPicSection.onmouseover = function() {
                oSwitchPic.fPause();
            };
            this.dPicSection.onmouseout  = function() {
                oSwitchPic.fGoon();
            };
        },
        fInitPicNav: function() {
            var oSwitchPic = this,
                sPicNav = '',
                nPicNum = this.nPicNum;

            for ( var i = 0; i < nPicNum; i ++ ) {
                sPicNav += '<li style="list-style-type:none;"><a href="javascript:;" target="_self">' + ( i + 1 ) + '</a></li>';
            }
            this.dPicNav.innerHTML = sPicNav;

            // 杩藉姞灞炴€у拰Event
            var dPicNavMenu = this.dPicNav.getElementsByTagName( "a" ),
                nL = dPicNavMenu.length;

            while ( nL -- > 0 ) {
                dPicNavMenu[nL].nIndex = nL;
                dPicNavMenu[nL].onclick     = function() {
                    oSwitchPic.fGoto( this.nIndex );
                    return false;
                };
            }
            this.dPicNavMenu = dPicNavMenu;
        },
        fSwitch: function() {
            if ( this.nPicNum <= 1 ){
                return;
            }
            var nCurrentPic = this.nCurrentPic,
                nNextPic    = this.nNextPic;
            this.dPicList[nNextPic].style.display = "";
            this.dPicList[nCurrentPic].style.display = "none";

            this.dPicNavMenu[nNextPic].className = "sel";
            this.dPicNavMenu[nCurrentPic].className = "";

            this.nCurrentPic = nNextPic;
            this.nNextPic = ( nNextPic < this.nPicNum - 1 ) ? ( nNextPic + 1 ) : 0;
        },
        fStart: function() {
            var oSwitchPic = this;
            this.oTimer = setTimeout( function() {
                oSwitchPic.fSwitch();
                oSwitchPic.fStart();
            }, this.nInterval );
        },
        fPause: function() {
            clearTimeout( this.oTimer );
        },
        fGoon: function() {
            clearTimeout( this.oTimer );
            this.fStart();
        },
        fGoto: function( nIndex ) {
            var nIndex = parseInt( nIndex );
            if ( nIndex == this.nCurrentPic ) {
                return false;
            }

            clearTimeout( this.oTimer );
            this.nNextPic = nIndex;
            this.fSwitch();
        }
    };

    window.fSwitchPic = fSwitchPic;

})();

var switchVideo = function(id,type,host,flashvar){
    if( type == 'close' ){
        $("#video_mini_show_"+id).show();
        $("#video_content_"+id).html( '' );
        $("#video_show_"+id).hide();
    }else{
        $("#video_mini_show_"+id).hide();
        $("#video_content_"+id).html( showFlash(host,flashvar) );
        $("#video_show_"+id).show();
    }
}

//鏄剧ず瑙嗛
var showFlash = function ( host, flashvar) {
    if(host=='youtube.com'){
        var flashHtml = '<iframe width="560" height="315"  src="http://www.youtube.com/embed/'+flashvar+'" frameborder="0" allowfullscreen></iframe>';
    }else{
        var flashHtml = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="430" height="400">'
            + '<param value="transparent" name="wmode"/>'
            + '<param value="'+flashvar+'" name="movie" />'
            + '<embed src="'+flashvar+'" wmode="transparent" allowfullscreen="true" type="application/x-shockwave-flash" width="525" height="420"></embed>'
            + '</object>';
    }
    return flashHtml;
}

//杩囨护html鏍囩
function strip_tags (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

//鍚屾璇锋眰鏂规硶
function getRequestUrl(field,value,baseUrl,replace_data){
    //鍖归厤鏄惁鏈夎鍙傛暟
    var reg = new RegExp("(^|&)" + field + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    //宸茬粡瀛樺湪鍙傛暟
    var in_params = false;
    if (r != null){
        in_params = true;
    }
    //鑾峰彇鍙傛暟閮ㄥ垎
    var url = window.location.search;
    var replaceReg = new RegExp(field+'=[^&]+','g');
    if(value){
        //鍚堟硶鍙傛暟浼犻€掓柟寮�
        if(in_params){
            url = url.replace(replaceReg,field+'='+value);
        }else{
            if(url.indexOf("?") != -1){
                url += '&'+field+'='+value;
            }else{
                url += '?'+field+'='+value;
            }
        }
    }else{
        //濡傛灉value涓嶅瓨鍦�,绉婚櫎璇ュ弬鏁�
        url = url.replace(replaceReg,'');
    }
    url = url.replace(/&{2,}/,'&').replace(/&$/,'');
    if(typeof(replace_data) == 'object' && $.isEmptyObject(replace_data) == false) {
        $.each(replace_data, function (i, n) {
            var replaceReg = new RegExp(i + '=[^&]+', 'g');
            url = url.replace(replaceReg, i + '=' + n);
        });
    }
    return baseUrl ? baseUrl+url: document.domain + url;
}