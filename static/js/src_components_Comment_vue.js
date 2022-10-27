(self["webpackChunkaurora"] = self["webpackChunkaurora"] || []).push([["src_components_Comment_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=script&lang=ts":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=script&lang=ts ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stores_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/stores/app */ "./src/stores/app.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _components_Title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Title */ "./src/components/Title/index.ts");
/* harmony import */ var _stores_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/stores/post */ "./src/stores/post.ts");




/* harmony default export */ __webpack_exports__["default"] = ((0,vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  name: 'ObComment',
  props: {
    /** Used for create issue title by Gitalk */
    title: {
      type: String,
      default: ''
    },
    /** Used for create issue body content by Gitalk */
    body: {
      type: String,
      default: ''
    },
    /** Unique ID used by Gitalk and Valine */
    uid: {
      type: String,
      default: ''
    }
  },
  components: {
    SubTitle: _components_Title__WEBPACK_IMPORTED_MODULE_2__.SubTitle
  },
  setup(props) {
    const postTitle = (0,vue__WEBPACK_IMPORTED_MODULE_1__.toRefs)(props).title;
    const postBody = (0,vue__WEBPACK_IMPORTED_MODULE_1__.toRefs)(props).body;
    const postUid = (0,vue__WEBPACK_IMPORTED_MODULE_1__.toRefs)(props).uid;
    const appStore = (0,_stores_app__WEBPACK_IMPORTED_MODULE_0__.useAppStore)();
    const postStore = (0,_stores_post__WEBPACK_IMPORTED_MODULE_3__.usePostStore)();
    const enabledComment = (postTitle, postBody, postUid) => {
      /**
       * Generate the data needed for Gitalk to generate the issue.
       */
      const title = !postTitle || postTitle === '' ? '' : postTitle;
      const body = !postBody || postBody === '' ? window.location.href : `${window.location.href} \n ${postBody}`;
      const uid = appStore.themeConfig.plugins.gitalk.id === 'pathname' ? window.location.pathname : postUid;
      /**
       * Caching the current post data, used
       * when config changes on render updates.
       */
      postStore.setCache({
        title: postTitle,
        body: postBody,
        uid: postUid
      });
      if (!appStore.configReady) return;
      if (appStore.themeConfig.plugins.gitalk.enable) {
        const proxy = appStore.themeConfig.plugins.gitalk.proxy === '' ? 'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token' : appStore.themeConfig.plugins.gitalk.proxy;
        const gitalk = new Gitalk({
          clientID: appStore.themeConfig.plugins.gitalk.clientID,
          clientSecret: appStore.themeConfig.plugins.gitalk.clientSecret,
          repo: appStore.themeConfig.plugins.gitalk.repo,
          owner: appStore.themeConfig.plugins.gitalk.owner,
          admin: appStore.themeConfig.plugins.gitalk.admin,
          id: uid,
          language: appStore.themeConfig.plugins.gitalk.language,
          distractionFreeMode: true,
          title: title,
          body: body,
          proxy: proxy
        });
        gitalk.render('gitalk-container');
      } else if (appStore.themeConfig.plugins.valine.enable) {
        new Valine({
          el: '#vcomments',
          appId: appStore.themeConfig.plugins.valine.app_id,
          appKey: appStore.themeConfig.plugins.valine.app_key,
          avatar: appStore.themeConfig.plugins.valine.avatar,
          placeholder: appStore.themeConfig.plugins.valine.placeholder,
          visitor: appStore.themeConfig.plugins.valine.visitor,
          lang: appStore.themeConfig.plugins.valine.lang,
          meta: appStore.themeConfig.plugins.valine.meta,
          requiredFields: appStore.themeConfig.plugins.valine.requiredFields,
          avatarForce: appStore.themeConfig.plugins.valine.avatarForce,
          path: window.location.pathname // Make sure updating pathname
        });
      }
    };
    /** Wait for config is ready */
    (0,vue__WEBPACK_IMPORTED_MODULE_1__.watch)(() => appStore.configReady, (newValue, oldValue) => {
      if (!oldValue && newValue) {
        const cachePost = postStore.cachePost;
        enabledComment(cachePost.title, cachePost.body, cachePost.uid);
      }
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_1__.onMounted)(() => {
      enabledComment(postTitle.value, postBody.value, postUid.value);
    });
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=template&id=133ed8df&ts=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=template&id=133ed8df&ts=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const _hoisted_1 = {
  class: "bg-ob-deep-800 p-4 mt-8 lg:px-14 lg:py-10 rounded-2xl shadow-xl mb-8 lg:mb-0"
};
const _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  id: "gitalk-container"
}, null, -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  id: "vcomments"
}, null, -1 /* HOISTED */);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SubTitle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SubTitle");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SubTitle, {
    title: 'titles.comment'
  }, null, 8 /* PROPS */, ["title"]), _hoisted_2, _hoisted_3]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#vcomments .vwrap {\n  border-radius: 0.75rem;\n  background-color: var(--background-primary);\n  border: none;\n  border-color: transparent;\n}\n#vcomments .vwrap .vheader {\n  display: grid;\n  gap: 0.5rem;\n}\n#vcomments .vwrap .vheader.item2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n#vcomments .vwrap .vheader.item3 {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n#vcomments .vwrap .vheader .vinput {\n  width: 100%;\n  border-radius: 0.5rem;\n  border-style: none;\n  background-color: var(--background-secondary);\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n#vcomments .vcards > .vcard {\n  margin-bottom: 1.5rem;\n  border-radius: 0.5rem;\n  background-color: var(--background-primary);\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 1.5rem;\n  padding-bottom: 0.5rem;\n  transition: var(--trans-ease);\n}\n#vcomments .vcards > .vcard:hover {\n  box-shadow: var(--accent-shadow);\n}\n#vcomments .vcards .vcard .vimg {\n  border: 2px solid var(--text-accent);\n}\n#vcomments .vcards .vcard .vh {\n  border: none;\n}\n#vcomments .vcards .vcard .vh .vmeta .vat {\n  color: var(--text-accent);\n  opacity: 0.6;\n  transition: var(--trans-ease);\n}\n#vcomments .vcards .vcard .vh .vmeta .vat:hover {\n  opacity: 0.3;\n}\n#vcomments .vcards .vcard .vquote {\n  border: none;\n}\n#vcomments .vcards .vcard .vhead .vnick {\n  color: var(--text-accent);\n  font-weight: 700;\n}\n#vcomments .vbtn {\n  background: var(--main-gradient);\n  border: none;\n  color: #fff;\n}\n#vcomments .vbtn:hover {\n  color: #fff;\n  opacity: 0.5;\n}\n#vcomments .vcount .vnum {\n  color: var(--text-accent);\n}\n#vcomments .veditor,\n#vcomments .vinput {\n  color: var(--text-normal);\n}\n#vcomments .vicon {\n  transition: var(--trans-ease);\n}\n#vcomments .vicon:hover {\n  opacity: 0.5;\n}\n#vcomments a {\n  color: var(--text-sub-accent);\n  transition: var(--trans-ease);\n}\n#vcomments a:hover {\n  opacity: 0.5;\n}\n#vcomments blockquote {\n  border-left: 0.25rem solid var(--bg-accent-55);\n}\n#vcomments p {\n  color: var(--text-normal);\n}\n#gitalk-container .gt-container .gt-meta {\n  border-bottom: 1px solid var(--background-primary);\n}\n#gitalk-container .gt-container .gt-header-textarea {\n  background-color: var(--background-primary);\n}\n#gitalk-container .gt-container .gt-btn {\n  border: none;\n  background: var(--main-gradient);\n  transition: var(--trans-ease);\n}\n#gitalk-container .gt-container .gt-btn:hover {\n  opacity: 0.5;\n}\n#gitalk-container .gt-container .gt-btn-preview {\n  background: var(--background-secondary);\n  color: var(--text-bright);\n  opacity: 0.7;\n}\n#gitalk-container .gt-container .gt-header-controls-tip {\n  color: var(--text-bright);\n  opacity: 0.7;\n  transition: var(--trans-ease);\n}\n#gitalk-container .gt-container .gt-header-controls-tip:hover {\n  opacity: 0.5;\n}\n#gitalk-container .gt-container .gt-svg svg {\n  fill: var(--text-bright);\n}\n#gitalk-container .gt-container .gt-popup {\n  background: var(--background-secondary);\n  border: 1px solid var(--background-primary);\n  border-radius: 0.25rem;\n}\n#gitalk-container .gt-container .gt-copyright {\n  border-top: 1px solid var(--background-primary);\n}\n#gitalk-container .gt-container .gt-link {\n  border-bottom: 2px solid var(--text-accent);\n}\n#gitalk-container .gt-container a {\n  color: var(--text-accent);\n  transition: var(--trans-ease);\n}\n#gitalk-container .gt-container a.is--active {\n  color: var(--text-bright);\n}\n#gitalk-container .gt-container a.is--active:before {\n  background: var(--text-accent);\n}\n#gitalk-container .gt-container a:hover {\n  opacity: 0.5;\n}\n#gitalk-container .gt-container .gt-comment-admin .gt-comment-content {\n  background-color: var(--background-primary);\n  box-shadow: var(--accent-shadow);\n}\n#gitalk-container .gt-container .gt-comment-admin .gt-comment-content:hover {\n  box-shadow: var(--accent-shadow);\n}\n#gitalk-container .gt-container .gt-comment-admin .gt-comment-content a {\n  color: var(--text-accent);\n}\n#gitalk-container .gt-container .gt-comment-admin .gt-comment-content .gt-comment-body.markdown-body blockquote {\n  border-left: 0.25em solid var(--bg-accent-55);\n}\n#gitalk-container .gt-container .gt-comment-admin .gt-comment-content .gt-comment-body.markdown-body pre {\n  background-color: var(--background-secondary);\n}\n#gitalk-container .gt-container .gt-comment-content {\n  background-color: var(--background-primary);\n  border-radius: 5px;\n}\n#gitalk-container .gt-container .gt-comment-content:hover {\n  box-shadow: var(--sub-accent-shadow);\n}\n#gitalk-container .gt-container .gt-comment-content a {\n  color: var(--text-sub-accent);\n}\n#gitalk-container .gt-container .gt-comment-body {\n  color: var(--text-normal) !important;\n}\n#gitalk-container .gt-container .gt-comment-body.markdown-body blockquote {\n  border-left: 0.25em solid var(--bg-sub-accent-55);\n}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/components/Comment.vue":
/*!************************************!*\
  !*** ./src/components/Comment.vue ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Comment_vue_vue_type_template_id_133ed8df_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment.vue?vue&type=template&id=133ed8df&ts=true */ "./src/components/Comment.vue?vue&type=template&id=133ed8df&ts=true");
/* harmony import */ var _Comment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.vue?vue&type=script&lang=ts */ "./src/components/Comment.vue?vue&type=script&lang=ts");
/* harmony import */ var _Comment_vue_vue_type_style_index_0_id_133ed8df_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss */ "./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss");
/* harmony import */ var _Users_adminy_Desktop_OSS_adminy_github_io_themes_aurora_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_adminy_Desktop_OSS_adminy_github_io_themes_aurora_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Comment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Comment_vue_vue_type_template_id_133ed8df_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/components/Comment.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/components/Comment.vue?vue&type=script&lang=ts":
/*!************************************************************!*\
  !*** ./src/components/Comment.vue?vue&type=script&lang=ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_use_1_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_use_1_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Comment.vue?vue&type=script&lang=ts */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=script&lang=ts");
 

/***/ }),

/***/ "./src/components/Comment.vue?vue&type=template&id=133ed8df&ts=true":
/*!**************************************************************************!*\
  !*** ./src/components/Comment.vue?vue&type=template&id=133ed8df&ts=true ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_use_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_template_id_133ed8df_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_41_use_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_template_id_133ed8df_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Comment.vue?vue&type=template&id=133ed8df&ts=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-41.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=template&id=133ed8df&ts=true");


/***/ }),

/***/ "./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss":
/*!*********************************************************************************!*\
  !*** ./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_style_index_0_id_133ed8df_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss */ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss");
/* harmony import */ var _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_style_index_0_id_133ed8df_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_style_index_0_id_133ed8df_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_style_index_0_id_133ed8df_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _node_modules_vue_style_loader_index_js_clonedRuleSet_22_use_0_node_modules_css_loader_dist_cjs_js_clonedRuleSet_22_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_22_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_22_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Comment_vue_vue_type_style_index_0_id_133ed8df_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Comment.vue?vue&type=style&index=0&id=133ed8df&lang=scss");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js")["default"])
var update = add("c58c08de", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ })

}]);
//# sourceMappingURL=src_components_Comment_vue.js.map