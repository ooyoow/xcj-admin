(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1032:function(e,t,a){var r=a(1033);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,a(2).default)("7cf98748",r,!0,{})},1033:function(e,t,a){},1051:function(e,t,a){"use strict";a.r(t);var r=a(15),n=a(627),i=a(86);a(1032);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s={name:"daily",data:function(){return{prefixCls:"xcj-finance-daily",queryParams:{date:this.initQueryDate(),currentPage:1,size:10},listLoading:!1,list:[],total:0,paytotal:0,onDateChange:null}},created:function(){var e=this;this.getDailySales(this.queryParams),this.onDateChange=Object(i.a)(function(){e.queryParams.currentPage=1,e.getDailySales(e.queryParams)},200)},methods:{handleSizeChange:function(e){this.queryParams.size=e,this.getDailySales()},handleCurrentChange:function(e,t){switch(this.queryParams.currentPage=e,this.getDailySales(),t){case"order":this.queryParams.currentPage=e,this.getDailySales();break;case"washDetail":this.washDetail.currentPage=e}},handleWriteOff:function(e){var t=this;(function(e){return Object(r.a)({url:"/api/v1/statistics/checkOrder",method:"post",params:{id:e}})})(e).then(function(a){var r=!0,n=!1,i=void 0;try{for(var o,l=t.list[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var s=o.value;if(s.id===e){var c=t.list.indexOf(s);t.list[c]=Object.assign(t.list[c],{check:!0}),t.$message.success("核销成功");break}}}catch(e){n=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}})},getDailySales:function(){var e=this,t=this.formatQueryParams();this.listLoading=!0,function(e){return Object(r.a)({method:"get",url:"/api/v1/statistics/queryOrderStaticsList",params:e})}(t).then(function(t){var a=t.resultObj,r=t.totalSize;e.listLoading=!1,e.list=a.orderstaticsList||[],e.total=r,e.paytotal=a.paytotal}).catch(function(t){e.listLoading=!1})},formatQueryParams:function(){var e=this.queryParams,t=e.date,a=l(e,["date"]);return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),r.forEach(function(t){o(e,t,a[t])})}return e}({start:t&&Array.isArray(t)?t[0]:"",end:t&&Array.isArray(t)?t[1]:""},a)},formatTime:function(e,t,a){return n.b.format(a,"YYYY-MM-DD")},initQueryDate:function(){var e=n.b.format(+new Date,"YYYY-MM-DD"),t=+new Date-5184e6;return[n.b.format(t,"YYYY-MM-DD"),e]}},filters:{checkFilter:function(e){return e?"已核销":"未核销"}}},c=a(13),u=Object(c.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.prefixCls},[a("el-form",{staticClass:"filter-container",attrs:{inline:!0},model:{value:e.queryParams,callback:function(t){e.queryParams=t},expression:"queryParams"}},[a("el-form-item",{attrs:{label:"起止时间"}},[a("el-date-picker",{attrs:{clearable:!1,type:"daterange",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.onDateChange},model:{value:e.queryParams.date,callback:function(t){e.$set(e.queryParams,"date",t)},expression:"queryParams.date"}})],1),e._v(" "),a("div",{staticClass:"paytotal"},[a("el-tag",[e._v("合计金额："+e._s(e.paytotal)+" 元")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],class:e.prefixCls+"-table",attrs:{data:e.list}},[a("el-table-column",{attrs:{prop:"day",label:"日期",align:"center",formatter:e.formatTime,"show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderNum",label:"订单总数",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"payAmount",label:"支付金额",align:"center","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"check",label:"核销状态",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:t.row.check?"success":"danger"}},[e._v(e._s(e._f("checkFilter")(t.row.check)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small",disabled:t.row.check},on:{click:function(a){e.handleWriteOff(t.row.id)}}},[e._v("核销")])]}}])})],1),e._v(" "),a("div",{class:e.prefixCls+"-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.queryParams.currentPage,"page-sizes":[10,20,30,50],"page-size":e.queryParams.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,null,null);u.options.__file="index.vue";t.default=u.exports},627:function(e,t,a){"use strict";a.d(t,"b",function(){return i}),a.d(t,"d",function(){return o}),a.d(t,"a",function(){return l}),a.d(t,"c",function(){return s});var r=a(634);function n(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,a,i;return t=e,i=[{key:"format",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD HH:mm:ss";return e&&"number"==typeof e?Object(r.format)(e,t):""}}],(a=null)&&n(t.prototype,a),i&&n(t,i),e}(),o=function(e,t){for(var a=[],n=e;n<=t;)a.push(Object(r.format)(n,"YYYY-MM-DD")),n+=864e5;return a},l=function(e){for(var t=[],a=1;a<13;a++)a<10?t.push("".concat(e,"-0").concat(a)):t.push("".concat(e,"-").concat(a));return t},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD HH:mm:ss";return e&&"number"==typeof e?Object(r.format)(e,t):""}}}]);