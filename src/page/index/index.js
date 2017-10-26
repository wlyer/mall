/*
* @Author: wlyer
* @Date:   2017-10-23 22:27:58
* @Last Modified by:   wlyer
* @Last Modified time: 2017-10-26 23:23:22
*/
'use strict'
// import _mm from 'util/mm.js';
var _mm = require('util/mm.js');
//require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var html = '<div>{{data}}</div>'
var data = {
    data : 'qwe'
}
console.log(_mm.renderHtml(html,data));
_mm.request({
    url: 'http://119.23.227.141:10001/user/getByPage?keyWord=1&pageNum=1&pageSize=15',
    success : function(res){
        console.log(res);
    },
    error : function(err){
        console.log(err);
    }
});
navSide.init({
    name:'user-center'
});