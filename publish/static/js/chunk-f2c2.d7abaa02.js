(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f2c2"],{"0X3U":function(e,t,i){"use strict";var a=i("DcJB");i.n(a).a},"6aa/":function(e,t,i){"use strict";var a=i("m4Ag");i.n(a).a},CyKq:function(e,t,i){},DcJB:function(e,t,i){},HKPr:function(e,t,i){"use strict";var a=i("YPLS");i.n(a).a},IMgO:function(e,t,i){"use strict";i.r(t);var a={name:"VersionList",props:{applist:{type:Array,default:function(){return[]}},showlink:{type:Boolean,default:function(){return!0}}},data:function(){return{hasNum:!1}},watch:{applist:function(){this.hasNum=!1}},created:function(){},methods:{countNum:function(e){return this.hasNum=!0,e}}},n=(i("6aa/"),i("tDSW"),i("KHd+")),s=Object(n.a)(a,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",{staticClass:"listarea"},[e._l(e.applist,function(t,a){return[i("li",{key:a},[i("div",{staticClass:"versiontap"},[e._v("版本号"),i("br"),i("em",[e._v(e._s(e.countNum(t.version)))])]),e._v(" "),i("div",{staticClass:"versionauthor"},[i("label",[e._v("开发者")]),e._v(e._s(t.username?t.username:"暂无")),i("br"),e._v(" "),i("label",[e._v("提交审核时间")]),e._v(e._s(e._f("parseTime")(t.created_at,"{y}-{m}-{d} {h}:{i}"))),i("br"),e._v(" "),i("label",[e._v("内容摘要")]),e._v(e._s(t.content)),i("br")]),e._v(" "),e._t("default",null,{data:t})],2)]}),e._v(" "),e.hasNum?e._e():i("li",{staticStyle:{"text-align":"center"}},[e._v("暂无版本")])],2)},[],!1,null,"7a2066e4",null);s.options.__file="versionList.vue";var o=s.exports,l=i("Mz3J"),r={name:"InlineEditTable",filters:{statusFilter:function(e){return{published:"success",draft:"info",deleted:"danger"}[e]}},directives:{elDragDialog:i("XINx").a},components:{Pagination:l.a,VesionList:o},data:function(){var e=function(e,t,i){0===t.length?i(new Error("不得为空")):i()};return{listQuery:{page:1,limit:10},total:0,hasRelease:[],hasReleaseWait:[],historyRelease:[],waitRelease:[],backupModel:{switch:!1,title:"",backupDesc:"",backup:"",versionId:"",origindata:null},validateRule:{backupDesc:[{required:!0,trigger:"blur",validator:e}]},backupRules:{backupDesc:[{required:!0,trigger:"blur",validator:e}]},cofirmModel:{switch:!1,versionId:"",content:"",version:""},validateVesion:{title:"版本验证",switch:!1,notValidateReason:"",versionId:"",origindata:null,hasRelease:2,backupDesc:""},deleteVersion:{switch:!1,origindata:null},defaultVersion:{switch:!1,origindata:null}}},mounted:function(){this.getList(0),this.getList(1),this.getList(2),this.getList(4)},methods:{vesionBackUp:function(){var e=this;this.$refs.waitVesion.validate(function(t){t&&e.$http.post(e.$api.abandonPackage,{backupDesc:e.backupModel.backupDesc,versionId:Number(e.backupModel.versionId)},function(t){"000000"===t.retCode?(e.resetbackUpPackage(),e.getList(0)):t.retMsg&&e.$message.error(t.retMsg)})})},resetbackUpPackage:function(){this.backupModel={switch:!1,title:"",backupDesc:"",backup:"",versionId:"",origindata:null}},backUpPackage:function(e,t,i,a){this.backupModel.switch=!0,this.backupModel.title=i,this.backupModel.backup=t,this.backupModel.versionId=e,this.backupModel.origindata=a},getList:function(e){var t=this;this.$http.post(this.$api.getVesionList,{hasRelease:e},function(i){"000000"===i.retCode?0===e?t.waitRelease=i.data:1===e||2===e?t.hasRelease=t.hasRelease.concat(i.data.map(function(t){return t.hasRelease=e,t})):t.historyRelease=i.data:i.retMsg&&t.$message.error(i.retMsg)})},getWaitList:function(){var e=this;this.$http.post(this.$api.getVesionList,{},function(t){"000000"===t.retCode?e.waitRelease.applist=t.data:t.retMsg&&e.$message.error(t.retMsg)})},cancelEdit:function(e){e.title=e.originalTitle,e.edit=!1,this.$message({message:"The title has been restored to the original value",type:"warning"})},confirmEdit:function(e){e.edit=!1,e.originalTitle=e.title,this.$message({message:"The title has been edited",type:"success"})},publishVesion:function(e){var t=this;this.cofirmModel.switch?this.$http.post(this.$api.publishPackage,{versionId:this.cofirmModel.versionId},function(e){"000000"===e.retCode?(t.getList(0),t.hasRelease=[],t.getList(1),t.getList(2),t.cofirmModel={switch:!1,versionId:"",content:"",version:""}):e.retMsg&&t.$message.error(e.retMsg)}):(this.cofirmModel.version=e.version,this.cofirmModel.versionId=e.version_id,this.cofirmModel.content=e.content,this.cofirmModel.switch=!0)},onlineDelete:function(){var e=this;this.$http.post(this.$api.onlineDelete,{versionId:this.deleteVersion.origindata.version_id},function(t){"000000"===t.retCode?(e.hasRelease=[],e.getList(1),e.getList(2),e.deleteVersion.switch=!1):t.retMsg&&e.$message.error(t.retMsg)})},openDialog:function(e,t){this[e].origindata=t,this[e].switch=!0},setDefault:function(){var e=this;this.$http.post(this.$api.setDefaultPackage,{versionId:this.defaultVersion.origindata.version_id},function(t){"000000"===t.retCode?(e.hasRelease=[],e.getList(1),e.getList(2),e.defaultVersion.switch=!1):t.retMsg&&e.$message.error(t.retMsg)})},validateDialog:function(e){this.validateVesion.origindata=e,this.validateVesion.switch=!0,this.validateVesion.backupDesc="",this.validateVesion.hasRelease=2},versionValidate:function(){var e=this;this.$refs.validateVesion.validate(function(t){if(t){var i={versionId:e.validateVesion.origindata.version_id,hasRelease:e.validateVesion.hasRelease};3===i.hasRelease&&(i.backupDesc=e.validateVesion.backupDesc),e.$http.post(e.$api.validateVesion,i,function(t){"000000"===t.retCode?(e.hasRelease=[],e.getList(1),e.getList(2),e.validateVesion.switch=!1):t.retMsg&&e.$message.error(t.retMsg)})}})}}},c=(i("0X3U"),i("uWnC"),Object(n.a)(r,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"auditVersion"},[i("title",[e._v("线上版本")]),e._v(" "),i("VesionList",{attrs:{applist:e.hasRelease,releasetype:0},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"versionbtn"},[0===t.data.default_flag?i("a",{staticClass:"defaultsign"},[e._v("默认")]):e._e(),e._v(" "),0!==t.data.default_flag&&2===t.data.hasRelease?i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){e.openDialog("defaultVersion",t.data)}}},[e._v("设为默认")]):e._e(),e._v(" "),1===t.data.hasRelease?i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){e.validateDialog(t.data)}}},[e._v("待验证")]):e._e(),e._v(" "),2===t.data.hasRelease&&0!==t.data.default_flag?i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(i){e.openDialog("deleteVersion",t.data)}}},[e._v("删除")]):e._e()],1)]}}])})],1),e._v(" "),i("div",{staticClass:"auditVersion"},[i("title",[e._v("历史版本")]),e._v(" "),i("VesionList",{attrs:{applist:e.historyRelease,showlink:!1},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"versionbtn"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){e.backUpPackage(t.data.version_id,2,"回退到当前版本",t.data)}}},[e._v("回退到此版本")])],1)]}}])})],1),e._v(" "),i("div",{staticClass:"auditVersion"},[i("title",[e._v("待发布版本")]),e._v(" "),i("VesionList",{attrs:{applist:e.waitRelease},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"versionbtn"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){e.publishVesion(t.data)}}},[e._v("发布")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){e.backUpPackage(t.data.version_id,1,"待发布版本撤回",t.data)}}},[e._v("撤回")])],1)]}}])})],1),e._v(" "),i("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:e.backupModel.switch,title:e.backupModel.title},on:{"update:visible":function(t){e.$set(e.backupModel,"switch",t)}}},[i("el-form",{ref:"waitVesion",attrs:{model:e.backupModel,rules:e.backupRules,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"版本号"}},[e.backupModel.origindata?i("el-input",{attrs:{disabled:""},model:{value:e.backupModel.origindata.version,callback:function(t){e.$set(e.backupModel.origindata,"version","string"==typeof t?t.trim():t)},expression:"backupModel.origindata.version"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"版本内容"}},[e.backupModel.origindata?i("el-input",{attrs:{rows:3,type:"textarea",name:"content",autosize:"",placeholder:"请输入内容"},model:{value:e.backupModel.origindata.content,callback:function(t){e.$set(e.backupModel.origindata,"content",t)},expression:"backupModel.origindata.content"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"回退原因",prop:"backupDesc"}},[i("el-input",{attrs:{rows:3,type:"textarea",name:"backupDesc",autosize:"",placeholder:"请输入内容"},model:{value:e.backupModel.backupDesc,callback:function(t){e.$set(e.backupModel,"backupDesc",t)},expression:"backupModel.backupDesc"}})],1)],1),e._v(" "),i("p",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.vesionBackUp}},[e._v("确定")])],1)],1),e._v(" "),i("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:e.cofirmModel.switch,title:e.backupModel.title},on:{"update:visible":function(t){e.$set(e.cofirmModel,"switch",t)}}},[i("el-form",{ref:"waitVesion",attrs:{model:e.cofirmModel,rules:e.backupRules,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"版本号"}},[e.cofirmModel.version?i("el-input",{attrs:{disabled:""},model:{value:e.cofirmModel.version,callback:function(t){e.$set(e.cofirmModel,"version","string"==typeof t?t.trim():t)},expression:"cofirmModel.version"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"版本内容"}},[e.cofirmModel.content?i("el-input",{attrs:{disabled:""},model:{value:e.cofirmModel.content,callback:function(t){e.$set(e.cofirmModel,"content",t)},expression:"cofirmModel.content"}}):e._e()],1)],1),e._v(" "),i("p",{staticStyle:{"text-align":"center"}},[i("el-button",{staticStyle:{width:"80%"},attrs:{type:"danger",size:"small"},on:{click:e.publishVesion}},[e._v("确定发布")])],1)],1),e._v(" "),i("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:e.validateVesion.switch,title:e.validateVesion.title},on:{"update:visible":function(t){e.$set(e.validateVesion,"switch",t)}}},[i("el-form",{ref:"validateVesion",attrs:{model:e.validateVesion,rules:e.validateRule,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"版本号"}},[e.validateVesion.origindata?i("el-input",{attrs:{disabled:""},model:{value:e.validateVesion.origindata.version,callback:function(t){e.$set(e.validateVesion.origindata,"version","string"==typeof t?t.trim():t)},expression:"validateVesion.origindata.version"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"版本内容"}},[e.validateVesion.origindata?i("el-input",{attrs:{rows:3,type:"textarea",name:"content",autosize:"",placeholder:"请输入内容"},model:{value:e.validateVesion.origindata.content,callback:function(t){e.$set(e.validateVesion.origindata,"content",t)},expression:"validateVesion.origindata.content"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"验证结果"}},[i("el-radio-group",{staticStyle:{padding:"10px",float:"left"},model:{value:e.validateVesion.hasRelease,callback:function(t){e.$set(e.validateVesion,"hasRelease",t)},expression:"validateVesion.hasRelease"}},[i("el-radio",{attrs:{label:2}},[e._v("验证通过")]),e._v(" "),i("el-radio",{attrs:{label:3}},[e._v("验证失败")])],1)],1),e._v(" "),3===e.validateVesion.hasRelease?i("el-form-item",{attrs:{label:"失败原因",prop:"backupDesc"}},[i("el-input",{attrs:{rows:3,type:"textarea",name:"backupDesc",autosize:"",placeholder:"请输入内容"},model:{value:e.validateVesion.backupDesc,callback:function(t){e.$set(e.validateVesion,"backupDesc",t)},expression:"validateVesion.backupDesc"}})],1):e._e()],1),e._v(" "),i("p",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.versionValidate}},[e._v("确定")])],1)],1),e._v(" "),i("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:e.deleteVersion.switch,title:"确定删除当前版本"},on:{"update:visible":function(t){e.$set(e.deleteVersion,"switch",t)}}},[i("el-form",{ref:"validateVesion",attrs:{model:e.deleteVersion,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"版本号"}},[e.deleteVersion.origindata?i("el-input",{attrs:{disabled:""},model:{value:e.deleteVersion.origindata.version,callback:function(t){e.$set(e.deleteVersion.origindata,"version","string"==typeof t?t.trim():t)},expression:"deleteVersion.origindata.version"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"版本内容"}},[e.deleteVersion.origindata?i("el-input",{attrs:{rows:3,type:"textarea",name:"content",autosize:"",placeholder:"请输入内容",disabled:""},model:{value:e.deleteVersion.origindata.content,callback:function(t){e.$set(e.deleteVersion.origindata,"content",t)},expression:"deleteVersion.origindata.content"}}):e._e()],1)],1),e._v(" "),i("p",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.onlineDelete}},[e._v("确定删除")])],1)],1),e._v(" "),i("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:e.defaultVersion.switch,title:"确定设置为默认版本"},on:{"update:visible":function(t){e.$set(e.defaultVersion,"switch",t)}}},[i("el-form",{ref:"validateVesion",attrs:{model:e.defaultVersion,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"版本号"}},[e.defaultVersion.origindata?i("el-input",{attrs:{disabled:""},model:{value:e.defaultVersion.origindata.version,callback:function(t){e.$set(e.defaultVersion.origindata,"version","string"==typeof t?t.trim():t)},expression:"defaultVersion.origindata.version"}}):e._e()],1),e._v(" "),i("el-form-item",{attrs:{label:"版本内容"}},[e.defaultVersion.origindata?i("el-input",{attrs:{rows:3,type:"textarea",name:"content",autosize:"",placeholder:"请输入内容",disabled:""},model:{value:e.defaultVersion.origindata.content,callback:function(t){e.$set(e.defaultVersion.origindata,"content",t)},expression:"defaultVersion.origindata.content"}}):e._e()],1)],1),e._v(" "),i("p",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.setDefault}},[e._v("确认")])],1)],1)],1)},[],!1,null,"933ce462",null));c.options.__file="index.vue";t.default=c.exports},Mz3J:function(e,t,i){"use strict";Math.easeInOutQuad=function(e,t,i,a){return(e/=a/2)<1?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function n(e,t,i){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=e-n,o=0;t=void 0===t?500:t;!function e(){o+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(o,n,s,t)),o<t?a(e):i&&"function"==typeof i&&i()}()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&n(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},o=(i("HKPr"),i("KHd+")),l=Object(o.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[i("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"cebf2f0c",null);l.options.__file="index.vue";t.a=l.exports},XINx:function(e,t,i){"use strict";var a={bind:function(e,t,i){var a=e.querySelector(".el-dialog__header"),n=e.querySelector(".el-dialog");a.style.cssText+=";cursor:move;",n.style.cssText+=";top:0px;";var s=window.document.currentStyle?function(e,t){return e.currentStyle[t]}:function(e,t){return getComputedStyle(e,!1)[t]};a.onmousedown=function(e){var t=e.clientX-a.offsetLeft,o=e.clientY-a.offsetTop,l=n.offsetWidth,r=n.offsetHeight,c=document.body.clientWidth,d=document.body.clientHeight,u=n.offsetLeft,p=c-n.offsetLeft-l,v=n.offsetTop,f=d-n.offsetTop-r,g=s(n,"left"),m=s(n,"top");g.includes("%")?(g=+document.body.clientWidth*(+g.replace(/\%/g,"")/100),m=+document.body.clientHeight*(+m.replace(/\%/g,"")/100)):(g=+g.replace(/\px/g,""),m=+m.replace(/\px/g,"")),document.onmousemove=function(e){var a=e.clientX-t,s=e.clientY-o;-a>u?a=-u:a>p&&(a=p),-s>v?s=-v:s>f&&(s=f),n.style.cssText+=";left:"+(a+g)+"px;top:"+(s+m)+"px;",i.child.$emit("dragDialog")},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}},n=function(e){e.directive("el-drag-dialog",a)};window.Vue&&(window["el-drag-dialog"]=a,Vue.use(n)),a.install=n;t.a=a},YPLS:function(e,t,i){},m4Ag:function(e,t,i){},tDSW:function(e,t,i){"use strict";var a=i("CyKq");i.n(a).a},uWnC:function(e,t,i){"use strict";var a=i("uZRt");i.n(a).a},uZRt:function(e,t,i){}}]);