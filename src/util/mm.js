/*
   通用工具
* @Author: wlyer
* @Date:   2017-10-25 20:14:16
* @Last Modified by:   wlyer
* @Last Modified time: 2017-10-25 22:20:27
*/

'use strict';
var Hogan = require('hogan.js');//先编译后渲染
var conf = {
    serverHost : ''
};
var _mm = {
    //请求封装
    request : function(param){
        var _this = this;//作用：在ajax里面取不到外面的_mm对象，所以，在这里缓存进来
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.type ||'json',
            data : param.data || '',
            success : function(res){
                if(res.status === 0){//请求状态成功
                    //若是function ，才返回数据和信息
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if(res.status === 10 ){//没有登入状态，需要强制登入
                   _this.doLogin();
                }else if(res.status === 1){//请求数据出错，返回的数据有问题，比如，服务器查询数据报错了500
                    typeof param.error === 'function' && param.error(res.data,res.msg);
                }
                
            },
            error : function(err){//404  之类的请求错误
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam(name){
        //http://119.23.227.141:10001/user/getByPage?keyWord=1&pageNum=1&pageSize=15
        //  ^|&  以name开头或者以&开头（截取）   name（关键字）   ([^&]*)(&|$)')参数字符串  -（^&  表示只要不是&就不结束    *匹配多个    （&|$）匹配多个后，一直到以&结束或者以$结束为止）
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');//截取参数
        //window.location.search  获取查询参数 （？后面的参数）
        //.substr(1)  去掉问号
        //match  匹配正则
        var result = window.location.search.substr(1).match(reg);
        //result[2]  当前name匹配到的值  
        //decodeURIComponent  解码，因为传参数的时候会容易乱码
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模版(//把编译和渲染封装在此方法中，简化过程)
    renderHtml(htmlTemplate,data){
        //template  编译  result  渲染输出
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },
    //成功提示
    successTips(msg){
        alert(msg || '操作成功!');
    },
    //失败提示
    errorTips(msg){
        alert(msg || '操作失败!');
    },
    //字段检验，支持  是否为空、手机邮箱
    validate(value,type){
        var value = $.trim(value);//作用：去除前后空格；无论value是否是字符串都改成字符串
        //非空验证
        if('require' === type){//如果是必填项
            return !!value;//!!value 吧value强转成boolean值
        }
        //手机验证
        if('phone' === type){
            //^1 以1开头；d 表示数字 ；{10} 剩下10位 ； d{10} 10位数字 ；d{10}$  以d{10}结尾
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }

    },
    //统一登入处理
    doLogin : function(){//  (redirect 作用 ： 登入过后进入强制跳进登入之前的那个页面，encodeURLComponent 作用：转码，避免出错)
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳回主页
    goHome(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;
