/*
* @Author: wlyer
* @Date:   2017-10-26 22:31:13
* @Last Modified by:   wlyer
* @Last Modified time: 2017-10-26 23:20:19
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
//右侧导航
var navSide = {
    option : {
        name : '',
        navList :[
            {
                name : 'user-center',
                desc : '个人心中',
                href : './user-center.html'
            },
            {
                name : 'order-list',
                desc : '我的订单',
                href : './order-list.html'
            },
            {
                name : 'pass-update',
                desc : '修改密码',
                href : './pass-update.html'
            },
            {
                name : 'about',
                desc : '关于MMall',
                href : './about.html'
            }
        ],
    },
    init(option){
        //合并选项
        //将传进来的option与默认的option合并
        //$.entend({},this.option,option);
        //会改变this.option的值，加一个{}则不会改变this.option的值
        //$.extend 只对对象的第一层生效，如只对name 和navList生效，不能改变navList里面的数据
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav(){
       //1 计算active数据
       //缓存下长度，避免一直调用option去拿长度iLength = this.option.navList.length
       for(var i = 0 , iLength = this.option.navList.length; i < iLength; i++){
            //判断，传进来的option是否和循环中的option的name相等，若相等，加active，表示选中
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
       };
       //2 渲染list数据
       var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
       //把html放入容器
       $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;