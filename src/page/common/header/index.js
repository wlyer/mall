/*
* @Author: wlyer
* @Date:   2017-10-26 21:38:36
* @Last Modified by:   wlyer
* @Last Modified time: 2017-10-26 22:05:33
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
    init(){
        this.bindEvent();
    },
    onload(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            //keyword存在，回显输入框
            $('#search-input').val(keyword);
        }
    },
    bindEvent(){
        //因为this 在jQuery选择器中不起作用，所以先定义变量，方便后面使用
        var _this = this;
        //点击搜索按钮
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，提交搜索
        $('#search-input').keyup(function(e){
            //回车键
            if(e.keyCode ===13){
                _this.searchSubmit();
            }
        });
    },
    //点击搜索按钮提交
    searchSubmit(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{//如果关键字keyword为空，直接返回首页
            _mm.goHome();
        }
    }
};

//自调用
header.init();