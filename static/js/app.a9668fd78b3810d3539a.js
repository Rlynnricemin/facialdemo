webpackJsonp([1],{G1wj:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},o,!1,function(t){n("gsu9")},null,null).exports,i=n("/ocq"),u=n("DWsy"),s=n.n(u),c={name:"HelloWorld",data:function(){return{Authorization:"",formdata:null}},mounted:function(){window.$=s.a,this.getAuth()},methods:{getAuth:function(){var t=this;s.a.ajax({url:"http://13.231.214.207/encry.php",type:"get",success:function(e){t.Authorization=e}})},upload:function(){var t=this;""!==this.Authorization&&null!==this.formdata&&s.a.ajax({url:"https://v2-auth-api.visioncloudapi.com/liveness/silent_detection/stateless",type:"post",data:this.formdata,beforeSend:function(e){e.setRequestHeader("Authorization",t.Authorization)},processData:!1,contentType:!1,success:function(t){console.log(t)}})},handlerUpload:function(t){var e=t.target.files;if(e.length>0){var n=new FormData;n.append("file",e[0]),n.append("return_image",!0),n.append("return_status",!0),this.formdata=n}}}},p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{attrs:{type:"file",accept:"video/*",capture:"camcorder"},on:{change:function(e){return t.handlerUpload(e)}}}),t._v(">\n  "),n("button",{on:{click:t.upload}},[t._v("上传识别")])])},staticRenderFns:[]};var l=n("VU/8")(c,p,!1,function(t){n("G1wj")},"data-v-f1c2ebd0",null).exports;a.a.use(i.a);var d=new i.a({routes:[{path:"/upload",name:"upload",component:l},{path:"/",name:"HelloWorld",component:l}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:d,components:{App:r},template:"<App/>"})},gsu9:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.a9668fd78b3810d3539a.js.map