webpackJsonp([0],{"17Z1":function(t,e){},"9Jke":function(t,e){},Cd8D:function(t,e){},IZh8:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),n={render:function(){var t=this.$createElement;return(this._self._c||t)("span",{attrs:{title:this.user.username}},[this._v(this._s(this.slug))])},staticRenderFns:[]};var r={components:{Avatar:s("VU/8")({data:function(){return{user:{username:"hunger"},slug:"H"}}},n,!1,function(t){s("Cd8D")},"data-v-f79b4008",null).exports},data:function(){return{}},methods:{onLogout:function(){}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"sidebar"}},[e("Avatar"),this._v(" "),e("div",{staticClass:"icons"},[e("router-link",{attrs:{to:"/note/1",title:"笔记"}},[e("i",{staticClass:"iconfont icon-note"})]),this._v(" "),e("router-link",{attrs:{to:"/notebookslist"}},[e("i",{staticClass:"iconfont icon-notebook"})]),this._v(" "),e("router-link",{attrs:{to:"/trash/2",title:"回收站"}},[e("i",{staticClass:"iconfont icon-trash"})])],1),this._v(" "),e("div",{staticClass:"logout",on:{click:this.onLogout}},[e("i",{staticClass:"iconfont icon-logout"})])],1)},staticRenderFns:[]};var a={name:"App",components:{NavBar:s("VU/8")(r,o,!1,function(t){s("9Jke")},"data-v-59b6b056",null).exports}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("NavBar"),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var u=s("VU/8")(a,l,!1,function(t){s("IZh8")},null,null).exports,c=s("/ocq"),d={name:"Login",data:function(){return{isShowLogin:!0,isShowRegister:!1,login:{username:"",password:"",notice:"输入用户名和密码",isError:!1},register:{username:"",password:"",notice:"创建账号后，请记住用户名和密码",isError:!1}}},methods:{showLogin:function(){this.isShowLogin=!0,this.isShowRegister=!1},showRegister:function(){this.isShowLogin=!1,this.isShowRegister=!0},onRegister:function(){return/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)?/^.{6,16}$/.test(this.register.password)?(this.register.isError=!1,this.register.notice="",void console.log("start register..., username: "+this.register.username+" , password: "+this.register.password)):(this.register.isError=!0,void(this.register.notice="密码长度为6~16个字符")):(this.register.isError=!0,void(this.register.notice="用户名3~15个字符，仅限于字母数字下划线中文"))},onLogin:function(){return/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)?/^.{6,16}$/.test(this.login.password)?(this.login.isError=!1,this.login.notice="",void console.log("start login..., username: "+this.login.username+" , password: "+this.login.password)):(this.login.isError=!0,void(this.login.notice="密码长度为6~16个字符")):(this.login.isError=!0,void(this.login.notice="用户名3~15个字符，仅限于字母数字下划线中文"))}}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"login"}},[s("div",{staticClass:"modal-mask"}),t._v(" "),s("div",{staticClass:"modal-wrapper"},[s("div",{staticClass:"modal-container"},[s("div",{staticClass:"main"}),t._v(" "),s("div",{staticClass:"form"},[s("h3",{on:{click:t.showRegister}},[t._v("创建账户")]),t._v(" "),s("transition",{attrs:{name:"slide"}},[s("div",{staticClass:"register",class:{show:t.isShowRegister}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.register.username,expression:"register.username"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:t.register.username},on:{input:function(e){e.target.composing||t.$set(t.register,"username",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.register.password,expression:"register.password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.register.password},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onRegister(e):null},input:function(e){e.target.composing||t.$set(t.register,"password",e.target.value)}}}),t._v(" "),s("p",{class:{error:t.register.isError}},[t._v(" "+t._s(t.register.notice))]),t._v(" "),s("div",{staticClass:"button",on:{click:t.onRegister}},[t._v("创建账号")])])]),t._v(" "),s("h3",{on:{click:t.showLogin}},[t._v("登录")]),t._v(" "),s("transition",{attrs:{name:"slide"}},[s("div",{staticClass:"login",class:{show:t.isShowLogin}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login.username,expression:"login.username"}],attrs:{type:"text",placeholder:"输入用户名"},domProps:{value:t.login.username},on:{input:function(e){e.target.composing||t.$set(t.login,"username",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.login.password,expression:"login.password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.login.password},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onLogin(e):null},input:function(e){e.target.composing||t.$set(t.login,"password",e.target.value)}}}),t._v(" "),s("p",{class:{error:t.login.isError}},[t._v(" "+t._s(t.login.notice))]),t._v(" "),s("div",{staticClass:"button",on:{click:t.onLogin}},[t._v(" 登录")])])])],1)])])])},staticRenderFns:[]};var v=s("VU/8")(d,h,!1,function(t){s("xBOx")},null,null).exports,g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"notebook-list"}},[e("h1",[this._v(this._s(this.msg))]),this._v(" "),e("ul",[e("li",[e("router-link",{attrs:{to:"/note/1"}},[this._v("笔记本1")])],1),this._v(" "),e("li",[e("router-link",{attrs:{to:"/note/2"}},[this._v("笔记本2")])],1)])])},staticRenderFns:[]};var p=s("VU/8")({data:function(){return{msg:"笔记本列表"}}},g,!1,function(t){s("dN8J")},"data-v-64dfe348",null).exports,m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"note-detail"}},[e("h1",[this._v(this._s(this.msg))]),this._v(" "),e("p",[this._v("当前为笔记本"+this._s(this.$route.params.note_id))])])},staticRenderFns:[]};var _=s("VU/8")({data:function(){return{msg:"笔记详情页"}}},m,!1,function(t){s("d+bU")},"data-v-15e2e414",null).exports,f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"trash-detail"}},[e("h1",[this._v(this._s(this.msg))]),this._v(" "),e("p",[this._v("当前为笔记本"+this._s(this.$route.params.note_id))])])},staticRenderFns:[]};var w=s("VU/8")({data:function(){return{msg:"回收站笔记详情页"}}},f,!1,function(t){s("17Z1")},"data-v-19e04892",null).exports;i.a.use(c.a);var k=new c.a({mode:"history",routes:[{path:"/login",component:v},{path:"/notebookslist",component:p},{path:"/note/:note_id",component:_},{path:"/trash/:note_id",component:w}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:k,components:{App:u},template:"<App/>"})},"d+bU":function(t,e){},dN8J:function(t,e){},xBOx:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c6a0c722a63e9e0cbfb7.js.map