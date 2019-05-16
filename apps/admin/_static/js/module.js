/****************************************************
 * 												    *
 * 			Sociax HTML 鏍囩鍏宠仈妯″瀷  			*
 *                                                  *
 ****************************************************/

/**
 * HTML 鏍囩鍏宠仈妯″瀷
 * @model-node 妯″瀷鑺傜偣鐨勬爣绛惧睘鎬ф爣璁�
 * @event-node 妯″瀷涓嬩簨浠惰妭鐐圭殑鏍囩灞炴€ф爣璁�
 * @author _鎱㈣妭濂�
 */
(function(window) {

    var document = window.document;

    /**
     * 婵€娲绘ā鍨�
     *
     * @param node 鍏冪礌鑺傜偣
     * @param node 鐖舵ā鍨嬭妭鐐癸紝鑻ヤ负绌哄垯灏唍ode 浣滀负鐖舵ā鍨嬭妭鐐�
     * @param fns  鎸傝浇鍒版爣绛句笂鐨勪簨浠舵柟娉曪紝鏍煎紡璇存槑濡備笅锛�
     * {
     *     model: {
     *         method1 : {
     *         	   click     : function(){},
     *         	   mouseover : function(){},
     *        	   mouseout  : function(){},
     *         	   load      : function(){}
     *     	   },
     *     	   method2 : {
     *             blur   : function(){},
     *             focus  : function(){},
     *             submit : function(){}
     *     	   }
     *     },
     *     event: {
     *         method1 : {
     *         	   click     : function(){},
     *         	   mouseover : function(){},
     *        	   mouseout  : function(){},
     *         	   load      : function(){}
     *     	   },
     *     	   method2 : {
     *             blur   : function(){},
     *             focus  : function(){},
     *             submit : function(){}
     *     	   }
     *     }
     * }
     */
    var module = function( node, fns ) {
        module.addFns(fns);
        if ( node ) {
            // 棰勬竻闄わ紝闃叉閲嶅妯″瀷鍖栧紩璧风殑鍙岄噸缂撳瓨
            module.nodes.init( node );
        }
    };

    /**
     * 淇濆瓨浜嬩欢鐨勬柟娉�
     *
     * @param fns  鎸傝浇鍒版爣绛句笂鐨勪簨浠舵柟娉曪紝鏍煎紡璇存槑鍚宮odule 鍑芥暟鐨刦ns 鍙傛暟
     */
    module.addFns = function( fns ) {
        if ( !fns ) return module;
        if ( fns.model ) {
            module.addModelFns( fns.model );
        }
        if ( fns.event ) {
            module.addEventFns( fns.event );
        }
        return module;
    };

    /**
     * 淇濆瓨妯″瀷浜嬩欢鐨勬柟娉�
     *
     * @param fns  鎸傝浇鍒版ā鍨嬩笂鐨勪簨浠舵柟娉曪紝鏍煎紡璇存槑濡備笅锛�
     * {
     *     method1 : {
     *         click     : function(){},
     *         mouseover : function(){},
     *         mouseout  : function(){},
     *         load      : function(){}
     *     },
     *     method2 : {
     *         blur   : function(){},
     *         focus  : function(){},
     *         submit : function(){}
     *     }
     * }
     */
    module.addModelFns = function( fns ) {
        if ( "object" != typeof fns ) return module;
        var name;
        for ( name in fns ) {
            module.nodes.models.fns[name] = fns[name];
        }
        return module;
    };

    /**
     * 淇濆瓨妯″瀷涓嬩簨浠惰妭鐐圭殑鏂规硶
     *
     * @param fns  鎸傝浇鍒版ā鍨嬩笂鐨勪簨浠舵柟娉曪紝灞炴€ц鏄庡悓module.addModelFns 鐨刦ns 鍙傛暟
     */
    module.addEventFns = function( fns ) {
        if ( "object" != typeof fns ) return module;
        var name;
        for ( name in fns ) {
            module.nodes.events.fns[name] = fns[name];
        }
        return module;
    };

    /**
     * 鑾峰彇鑺傜偣鐨勫弬鏁�
     *
     * @param node 妯″瀷/浜嬩欢鑺傜偣
     */
    module.getArgs = function( node ) {
        return node.getAttribute( "model-node" ) ? module.getModelArgs( node ) : module.getEventArgs( node );
    };

    /**
     * 璁剧疆鑺傜偣鐨勫弬鏁�
     *
     * @param node 妯″瀷/浜嬩欢鑺傜偣
     * @param uri URI 鏍煎紡鐨勫弬鏁�
     */
    module.setArgs = function( node, uri ) {
        return node.getAttribute( "model-node" ) ? module.setModelArgs( node, uri ) : module.setEventArgs( node, uri );
    };

    /**
     * 鑾峰彇妯″瀷鑺傜偣鐨勫弬鏁�
     *
     * @param node 妯″瀷鑺傜偣
     */
    module.getModelArgs = function( node, uri ) {
        node.args || ( node.args = module.URI2Obj( node.getAttribute( "model-args" ) ) );
        return node.args;
    };

    /**
     * 璁剧疆妯″瀷鑺傜偣鐨勫弬鏁�
     *
     * @param node 妯″瀷鑺傜偣
     */
    module.setModelArgs = function( node, uri ) {
        node.args = undefined;
        node.setAttribute( "model-args", uri );
        return module;
    };

    /**
     * 鑾峰彇浜嬩欢鑺傜偣鐨勫弬鏁�
     *
     * @param node 浜嬩欢鑺傜偣
     */
    module.getEventArgs = function( node ) {
        node.args || ( node.args = module.URI2Obj( node.getAttribute( "event-args" ) ) );
        return node.args;
    };

    /**
     * 璁剧疆浜嬩欢鑺傜偣鐨勫弬鏁�
     *
     * @param node 浜嬩欢鑺傜偣
     */
    module.setEventArgs = function( node, uri ) {
        node.args = undefined;
        node.setAttribute( "event-args", uri );
        return module;
    };

    /**
     * 灏唘ri杞崲涓哄璞℃牸寮�
     *
     * @param uri URI 鏍煎紡鐨勬暟鎹�
     */
    module.URI2Obj = function( uri ) {
        if ( ! uri ) return {};
        var obj = {},
            args = uri.split( "&" ),
            l, arg;
        l = args.length;
        while ( l -- > 0 ) {
            arg = args[l];
            if ( ! arg ) {
                continue;
            }
            arg = arg.split( "=" );
            obj[arg[0]] = arg[1];
        }
        return obj;
    };

    /**
     * 鑾峰彇鍏ㄥ眬鍐呮寚瀹氱殑妯″瀷鑺傜偣
     *
     * @param name 妯″瀷鑺傜偣鐨勫懡鍚�
     */
    module.getModels = function( name ) {
        return module.nodes.models[name];
    };

    /**
     * 鑾峰彇鍏ㄥ眬鍐呮寚瀹氱殑浜嬩欢鑺傜偣
     *
     * @param name 浜嬩欢鑺傜偣鐨勫懡鍚�
     */
    module.getEvents = function( name ) {
        return module.nodes.events[name];
    }

    /**
     * 鍒犻櫎鑺傜偣涓婄殑鐩戝惉
     *
     * @param object node 鑺傜偣瀵硅薄
     */
    module.removeListener = function( node ) {
        module.nodes.removeListener( node );
        return module;
    };

    /**
     * 涓鸿妭鐐规坊鍔犵洃鍚�
     *
     * @param object node 鑺傜偣瀵硅薄
     * @param object events 鐩戝惉鐨勪簨浠�
     * {
     *     click     : function(){},
     *     mouseover : function(){},
     *     mouseout  : function(){}
     * }
     */
    module.addListener = function( node, events ) {
        module.nodes.addListener( node, events );
        return module;
    };

    module.getPreviousModel = function( node, siblingName ) {
        return module.nodes.getPreviousModel( node, siblingName );
    };

    module.getNextModel = function( node, siblingName ) {
        return module.nodes.getNextModel( node, siblingName );
    };

    module.getPreviousEvent = function( node, siblingName ) {
        return module.nodes.getPreviousEvent( node, siblingName );
    };

    module.getNextEvent = function( node, siblingName ) {
        return module.nodes.getNextEvent( node, siblingName );
    };

    /**
     * 妯″瀷鍖栬妭鐐瑰璞�
     *
     * @property function init 鍒濆鍖栨ā鍨�
     * @property function _init 閫愮骇鎵弿鎸囧畾鑺傜偣涓嬬殑鍚勭骇瀛愬厓绱犵殑妯″瀷缁撴瀯锛屽苟缂撳瓨妯″瀷鍜屼簨浠剁殑DOM瀵硅薄
     * @property function clear 娓呮鍏冪礌鑺傜偣鐨勫瓙妯″瀷鑺傜偣鍜屽瓙浜嬩欢鑺傜偣鍚堥泦瀵硅薄
     * @property function getParentModel
     * @property function addListener 涓烘ā鍨嬪拰浜嬩欢鑺傜偣闄勫姞浜嬩欢鏂规硶
     * @property object _onload 鑷畾涔塷nload 浜嬩欢
     * @property object _onload.execute 鎵цonload 浜嬩欢闃熷垪
     * @property object _onload.queue onload 浜嬩欢闃熷垪
     * @property object models 缃楀垪骞剁紦瀛樻ā鍨嬭妭鐐�
     * @property object events 缃楀垪骞剁紦瀛樹簨浠惰妭鐐�
     * @property object models.fns 瀛樻斁妯″瀷鑺傜偣鐨勪簨浠舵柟娉�
     * @property object events.fns 瀛樻斁浜嬩欢鑺傜偣鐨勪簨浠舵柟娉�
     */
    module.nodes = {
        init: function( node ) {
            // 鍒濆鍖栨ā鍨�
            this._init( node );
            // 鎵цonload 浜嬩欢
            this._onload.execute();
            return this;
        },
        _init: function( node, parentModel ) {
            var childNode = node.firstChild,
                childParentModel,
                model_name,
                event_name;

            ! parentModel && ( parentModel = this.getParentModel( node ) );

            switch ( node.nodeName ) {
                case "DIV": case "UL":case "DL":
                case "FORM":case "LI":case "DD":
                    model_name = node.getAttribute( "model-node" );
                    if ( model_name ) {
                        this._clearModel( node );

                        node.modelName = model_name;

                        this.addListener( node, this.models.fns[model_name] );

                        node.parentModel = parentModel;

                        ( parentModel.childModels[model_name] = parentModel.childModels[model_name] || [] ).push( node );

                        ( this.models[model_name] = this.models[model_name] || [] ).push( node );

                        childParentModel = node;
                    }
                    break;
                case "A": case "SPAN": case "LABEL":
                case "STRONG": case "INPUT": case "SELECT":
                case "BUTTON": case "IMG": case "TEXTAREA":
                case "H1": case "H2": case "H3": case "H4":case "I":
                    event_name = node.getAttribute( "event-node" );
                    if ( event_name ) {
                        this._clearEvent(node);

                        node.eventName = event_name;

                        this.addListener( node, this.events.fns[event_name] );

                        node.parentModel = parentModel;
                        ( parentModel.childEvents[event_name] = parentModel.childEvents[event_name] || [] ).push( node );

                        ( this.events[event_name] = this.events[event_name] || [] ).push( node );
                    }
                    break;
                case "HEAD": case "BODY":
                    this[node.nodeName.toLowerCase()] = node;
                    break;
                case "#document":
                    this._clearModel(node);
                    break;
            }

            ! childParentModel && ( childParentModel = parentModel );
            while ( childNode ) {
                (1 == childNode.nodeType ) && this._init( childNode, childParentModel );
                childNode = childNode.nextSibling;
            }
        },
        _clearModel: function( node ) {
            node.modelName   = undefined;
            node.parentModel = undefined;
            node.childModels = {};
            node.childEvents = {};
            node.args = undefined;
            return this;
        },
        _clearEvent: function( node ) {
            node.eventName   = undefined;
            node.parentModel = undefined;
            node.args = undefined;
            return this;
        },
        getParentModel: function( node ) {
            var parentNode = node.parentNode,
                parentModel;
            if ( parentNode && 1 === parentNode.nodeType ) {
                parentModel = parentNode.getAttribute('model-node') ? parentNode : this.getParentModel( parentNode );
            }
            return parentModel || document;
        },
        getPreviousModel: function( node, siblingName ) {
            return this._getSiblingNode( node, { siblingType: "model", siblingName: siblingName }, "previous" );
        },
        getNextModel: function( node, siblingName ) {
            return this._getSiblingNode( node, { siblingType: "model", siblingName: siblingName }, "next" );
        },
        getPreviousEvent: function( node, siblingName ) {
            return this._getSiblingNode( node, { siblingType: "event", siblingName: siblingName }, "previous" );
        },
        getNextEvent: function( node, siblingName ) {
            return this._getSiblingNode( node, { siblingType: "event", siblingName: siblingName }, "next" );
        },
        _getSiblingNode: function( node, siblingArgs, direction ) {
            var sibling;
            if ( !node ) return null;
            sibling = node[ [ direction, "Sibling" ].join("") ];
            return ( sibling && ( siblingArgs.siblingName === sibling[ [ siblingArgs.siblingType, "Name" ].join("") ] ) ) ? sibling : this._getSiblingNode( sibling, siblingArgs, direction );
        },
        addListener: function( node, events ) {
            if ( "object" == typeof events ) {
                var event;
                for ( event in events ) {
                    switch ( event ) {
                        case "load":
                            node[event] = events[event];
                            // 娣诲姞鍒伴槦鍒�
                            this._onload.queue.push( node );
                            break;
                        case "callback":
                            node[event] = events[event];
                            break;
                        case "mouseenter": case "mouseleave":
                            // 鍏煎闈濱E
                            if ( document.addEventListener ) {
                                var refer = {mouseenter: "mouseover", mouseleave: "mouseout"};
                                node["on" + refer[event]] = (function( event, fn ){
                                    return function( e ) {
                                        // 涓婁竴鍝嶅簲mouseover/mouseout 浜嬩欢鐨勫厓绱�
                                        var parent = e.relatedTarget;
                                        // 鍋囧瀛樺湪杩欎釜鍏冪礌骞朵笖杩欎釜鍏冪礌涓嶇瓑浜庣洰鏍囧厓绱�
                                        while( parent && parent != this ){
                                            try {
                                                //涓婁竴鍝嶅簲鐨勫厓绱犲紑濮嬪線涓婂鎵剧洰鏍囧厓绱�
                                                parent = parent.parentNode;
                                            } catch( e ) {
                                                break;
                                            }

                                        }
                                        // 鍋囧鎵句笉鍒帮紝琛ㄦ槑褰撳墠浜嬩欢瑙﹀彂鐐逛笉鍦ㄧ洰鏍囧厓绱犲唴
                                        if ( parent != this ) {
                                            //杩愯鐩爣鏂规硶锛屽惁鍒欎笉杩愯
                                            node[event] = fn;
                                            node[event]();
                                        }
                                    };
                                })( event, events[event] );
                            } else {
                                node["on" + event] = events[event];
                            }
                            break;
                        default :
                            node["on" + event] = events[event];
                    }
                }
            }
        },
        removeListener: function( node ) {
            node.onclick = node.onfocus = node.onblur = node.onmouseout
                = node.onmouseover = node.onmouseenter = node.onmouserleave
                = node.onchange = null;
            return this;
        },
        _onload: {
            execute: function() {
                var l = this.queue.length,
                    i;
                for ( i = 0; i < l; i ++ ) {

                    this.queue[i]["load"]();
                    this.queue[i]["load"] = undefined;

                }
                // 閲嶇疆闃熷垪
                this.queue = [];
            },
            queue: []
        },
        models: {
            fns: {

            }
        },
        events: {
            fns: {
            }
        },
        getHead: function() {
            this.head || (this.head = document.getElementsByTagName("head")[0]);
            return this.head;
        },
        getBody: function() {
            this.body || (this.body = document.getElementsByTagName("body")[0]);
            return this.body;
        }
    };

    /**
     * 鍔犺浇CSS 鏂囦欢
     *
     * @param string url CSS 鏂囦欢URL
     */
    module.getCSS = (function() {
        var temp = [];
        //杩斿洖鍐呴儴鍖呭嚱鏁�,渚涘閮ㄨ皟鐢ㄥ苟鍙互鏇存敼temp鐨勫€�
        return function( url ){
            var	head = module.nodes.getHead(),
                flag = 0,
                link,
                i = temp.length - 1;
            // 绗簩娆¤皟鐢ㄧ殑鏃跺€欏氨涓�=0浜�
            for ( ; i >= 0; i -- ) {
                flag = ( temp[i] == url ) ? 1 : 0;
            }

            if ( flag == 0 ) {
                // 鏈浇鍏ヨ繃
                link  = document.createElement( "link" );
                link.setAttribute( "rel", "stylesheet" );
                link.setAttribute( "type", "text/css" );
                link.setAttribute( "href", url );
                head.appendChild( link );
                temp.push( url );
            }
        };
    })();

    /**
     * 鍔犺浇js 鏂囦欢
     *
     * @param string url js 鏂囦欢URL
     * @param function fn 鎵ц鍑芥暟
     */
    module.getJS = (function() {
        var temp = [];
        //杩斿洖鍐呴儴鍖呭嚱鏁�,渚涘閮ㄨ皟鐢ㄥ苟鍙互鏇存敼temp鐨勫€�
        return function( url, fn ){
            // 绗簩娆¤皟鐢ㄧ殑鏃跺€欏氨涓�=0浜�
            var	head,
                script,
                onload,
                flag = 0,
                i = temp.length - 1;
            // 绗簩娆¤皟鐢ㄧ殑鏃跺€欏氨涓�=0浜�
            for ( ; i >= 0; i -- ) {
                flag = ( temp[i] == url ) ? 1 : 0;
            }

            if ( flag == 0 ) {
                // 鏈浇鍏ヨ繃
                // 璁板綍url
                temp.push( url );
                // 杞藉叆
                head = module.nodes.getHead();
                script = document.createElement( "script" );
                script.setAttribute( "src", url );

                if ( "function" == typeof fn ) {
                    script.onload = script.onreadystatechange = function() {
                        // FF 涓嬫病鏈塺eadyState 鍊硷紝IE 鏈塺eadyState 鍊硷紝闇€鍔犱互鍒ゆ柇
                        if( ! this.readyState || "loaded" == this.readyState || "complete" == this.readyState ) {
                            this.onload = this.onreadystatechange = null;

                            fn();

                            fn = undefined;

                            script = undefined;
                        }
                    };
                }

                head.appendChild( script );
            } else {
                if("function" == typeof fn){
                    fn();
                    fn = undefined;
                }
            }
        };
    })();

    /**
     * Execute functions when the DOM is ready
     *
     * @param function fn 鏍煎紡鐨勬暟鎹�
     */
    module.ready = function( fn ) {
        if ( "function" !== typeof fn ) {
            return;
        }

        if ( document.addEventListener ) {
            // Use the handy event callback
            document.addEventListener( "DOMContentLoaded", fn, false );
            // If IE event model is used
        } else if ( document.attachEvent ) {
            // maybe late but safe also for iframes
            document.attachEvent( "onreadystatechange", fn );
        }
    };

    window.M = module;

    M.ready(function() {
        M(document);
    });

})(window);