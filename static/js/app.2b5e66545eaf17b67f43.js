webpackJsonp([1],{"3yUm":function(t,e){},EfDh:function(t,e){},FNpM:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=i("VU/8")({name:"App"},a,!1,function(t){i("FNpM")},null,null).exports,o=i("/ocq"),r="#6ABF8B",c={name:"HelloWorld",data:function(){return{bool:!1,marginLeft:0,msg:"Welcome to Your Vue.js App",width:250,height:250,downtime:5,wztip:"请正视手机<br>保持禁止不动",eventtype:"init",pass:!1,stopcircle:!1,iswarn:!1,successstatus:0}},mounted:function(){window.startFaceinit(this.render)},methods:{successback:function(t){2===this.successstatus?(console.log("第二次通过啦"),this.pass=!0,this.stopcircle=!0,window.brfv4Example.stopCheckImg=!0,this.wztip="",setTimeout(function(){window.brfv4Example.imageData.webcam.stopStream(),window.brfv4Example.stop()},1e3)):(r="#6ABF8B",this.successstatus+=1,this.setwztip(t),window.brfv4Example.stopCheckImg=!1,this.setTimeout&&clearTimeout(this.setTimeout),this.downtime=5,1===t&&(this.downtime=5),this.countdown())},errorcallback:function(){this.successstatus>=2||(r="#DC2F3E",this.wztip="未通过验证，请重试",this.stopcircle=!0,this.iswarn=!0,window.brfv4Example.imageData.webcam.stopStream(),window.brfv4Example.stop())},setwztip:function(t){1===t?this.wztip="请正视手机<br>左右摇头":2===t?this.wztip="请正视手机<br>张开嘴":3===t&&(this.wztip="请正视手机<br>眨一眨眼")},countdown:function(){var t=this;this.setTimeout=setTimeout(function(){0===t.downtime?window.brfv4Example.stopCheckImg=!0:(t.downtime-=1,t.downtime<3&&(window.brfv4Example.stopCheckImg="passtime"),t.countdown())},1e3)},drawCanvas:function(){var t=this,e=0,i=document.getElementById("process").getContext("2d");!function s(){requestAnimationFrame(function(){(function(e,i){e.beginPath(),e.moveTo(t.width/2,t.height/2),e.arc(t.width/2,t.height/2,t.width/2,1.5*Math.PI,Math.PI*(1.5+2*i/100)),e.closePath(),e.fillStyle=r,e.fill(),e.beginPath(),e.arc(t.width/2,t.height/2,t.width/2-5,0,2*Math.PI),e.closePath(),e.fillStyle="#fff",e.fill()})(i,e+=1),100!==e||t.stopcircle||(i.fillStyle="#fff",i.beginPath(),i.fillRect(0,0,t.width,t.height),i.closePath(),i.beginPath(),i.arc(t.width/2,t.height/2,t.width/2,0,2*Math.PI),i.closePath(),i.fillStyle="#f6f6f6",i.fill(),e=1),s()})}()},startVideo:function(){this.bool?window.stopVideo():window.startVideo(),this.bool=!this.bool},render:function(t,e){var i=document.getElementById("container");t>e?(this.marginLeft=-(t-e)/2,window.container=i,i.style.marginLeft="-144px"):(i.style.width=t+"px",i.style.marginLeft=-t/2+"px",this.marginLeft=0,this.$refs.videobox.style.paddingTop=(e-t)/2+"px",document.getElementById("overlay").height=e)}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"_wrapper"}},[i("div",{staticStyle:{"“margin-top":"30%”"}},[i("div",{staticClass:"cirqueBox"},[i("div",{staticClass:"cirqueRed",class:{warn:t.iswarn}}),t._v(" "),t.stopcircle?t._e():i("div",{staticClass:"cirqueGrey"})]),t._v(" "),i("div",{ref:"videocontainer",staticClass:"nohide",attrs:{id:"container"}},[i("div",{ref:"videobox",staticStyle:{position:"relative",width:"100%",height:"100%"},style:{marginLeft:t.marginLeft+"px"}},[i("video",{ref:"video",attrs:{id:"videoel",width:"288",height:"288",preload:"auto",playsinline:"",autoplay:""}}),t._v(" "),i("canvas",{attrs:{id:"overlay",width:"288",height:"288"}})])])]),t._v(" "),i("br"),t._v(" "),i("p",{staticClass:"wz-tip",class:{warn:t.iswarn},domProps:{innerHTML:t._s(t.wztip)}}),t._v(" "),t.iswarn||t.stopcircle?t._e():i("p",{staticClass:"time-return"},[t._v(t._s(t.downtime))]),t._v(" "),t.pass?i("p",[t._v("检验通过")]):t._e()])},staticRenderFns:[]};var d=i("VU/8")(c,l,!1,function(t){i("3yUm")},"data-v-f656cf20",null).exports,h=i("DWsy"),u=i.n(h),p={name:"HelloWorld",data:function(){return{Authorization:"",formdata:null,status:{ok:"真人",hack:"假造人脸",short_time:"视频时长不足2s",no_face_detected:"视频中未检测到人脸",loss_tracking:"人脸中途出框",face_changed:"视频中途人脸被替换"},liveness_status:"",passed:{true:"通过",false:"不通过"},result:"",waiting:"开始识别人脸",isstart:!1}},mounted:function(){window.$=u.a,this.getAuth()},methods:{start:function(){this.isstart||(this.$refs.camera.value="",this.$refs.camera.click(),this.isstart=!0)},getAuth:function(){var t=this;u.a.ajax({url:"http://13.231.214.207/encry.php",type:"get",success:function(e){t.Authorization=JSON.parse(e).result}})},setwaitingwz:function(){var t=this;this.waiting="正在等待上传",this.result="";var e=0;this.setInterval=setInterval(function(){3===e?(e=0,t.waiting="正在等待上传"):(t.waiting+="..",e++)},1e3)},upload:function(){var t=this,e=this;""!==this.Authorization&&null!==this.formdata&&(this.setwaitingwz(),u.a.ajax({url:"http://13.231.214.207:9000/postdata",type:"post",data:this.formdata,beforeSend:function(t){t.setRequestHeader("Authorization",e.Authorization)},xhrFields:{withCredentials:!1},crossDomain:!0,processData:!1,contentType:!1,success:function(i){clearInterval(t.setInterval),e.waiting="重新开始识别",t.isstart=!1,e.result=i.passed,e.liveness_status=i.liveness_status}}))},handlerUpload:function(t){var e=t.target.files;if(e.length>0){var i=new FormData;i.append("video_file",e[0]),i.append("return_image",!0),i.append("return_status",!0),this.formdata=i,this.upload()}}}},f={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"circle",on:{click:t.start}},[t._v(t._s(t.waiting))]),t._v(" "),i("input",{ref:"camera",staticStyle:{display:"none"},attrs:{type:"file",accept:"video/*",capture:"camcorder"},on:{change:function(e){return t.handlerUpload(e)}}}),t._v(" "),""!==t.result?i("p",[t._v("上传结果显示"),i("br"),t._v(t._s(t.passed[t.result]+"："+t.status[t.liveness_status]))]):t._e()])},staticRenderFns:[]};var w=i("VU/8")(p,f,!1,function(t){i("EfDh")},"data-v-0899737a",null).exports;s.a.use(o.a);var m=new o.a({routes:[{path:"/upload",name:"upload",component:w},{path:"/",name:"HelloWorld",component:d}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:m,components:{App:n},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.2b5e66545eaf17b67f43.js.map