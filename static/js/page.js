(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["page"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/views/Page.vue?vue&type=script&lang=ts":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/views/Page.vue?vue&type=script&lang=ts ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _stores_article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/stores/article */ "./src/stores/article.ts");
/* harmony import */ var _models_Article_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/Article.class */ "./src/models/Article.class.ts");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm-bundler.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.mjs");
/* harmony import */ var _stores_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/stores/app */ "./src/stores/app.ts");
/* harmony import */ var _stores_meta__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/stores/meta */ "./src/stores/meta.ts");
/* harmony import */ var _components_PageContainer_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/PageContainer.vue */ "./src/components/PageContainer.vue");
/* harmony import */ var _components_Breadcrumbs_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/Breadcrumbs.vue */ "./src/components/Breadcrumbs.vue");
/* harmony import */ var _components_Comment_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/Comment.vue */ "./src/components/Comment.vue");










/* harmony default export */ __webpack_exports__["default"] = (Object(vue__WEBPACK_IMPORTED_MODULE_0__["defineComponent"])({
  name: 'Page',
  components: {
    PageContainer: _components_PageContainer_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    Breadcrumbs: _components_Breadcrumbs_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    Comment: _components_Comment_vue__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  setup() {
    const articleStore = Object(_stores_article__WEBPACK_IMPORTED_MODULE_1__["useArticleStore"])();
    const appStore = Object(_stores_app__WEBPACK_IMPORTED_MODULE_5__["useAppStore"])();
    const metaStore = Object(_stores_meta__WEBPACK_IMPORTED_MODULE_6__["useMetaStore"])();
    const pageData = Object(vue__WEBPACK_IMPORTED_MODULE_0__["ref"])(new _models_Article_class__WEBPACK_IMPORTED_MODULE_2__["Page"]());
    const route = Object(vue_router__WEBPACK_IMPORTED_MODULE_4__["useRoute"])();
    const {
      t
    } = Object(vue_i18n__WEBPACK_IMPORTED_MODULE_3__["useI18n"])();
    const pageTitle = Object(vue__WEBPACK_IMPORTED_MODULE_0__["ref"])();
    const fetchArticle = () => {
      articleStore.fetchArticle(String(route.params.slug)).then(response => {
        pageData.value = response;
        pageTitle.value = pageData.value.title;
        updateTitle(appStore.locale);
      });
    };
    const updateTitle = locale => {
      const currentLocale = locale === 'cn' ? 'cn' : 'en';
      const routeInfo = appStore.themeConfig.menu.menus[String(route.params.slug)];
      pageTitle.value = routeInfo.i18n && routeInfo.i18n[currentLocale] || routeInfo.name;
      metaStore.setTitle(pageTitle.value);
    };
    Object(vue__WEBPACK_IMPORTED_MODULE_0__["watch"])(() => appStore.locale, value => {
      if (value) {
        updateTitle(value);
      }
    });
    Object(vue__WEBPACK_IMPORTED_MODULE_0__["onBeforeMount"])(fetchArticle);
    return {
      pageTitle: Object(vue__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => pageTitle.value),
      pageData,
      t
    };
  }
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/views/Page.vue?vue&type=template&id=5a7b936e&ts=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/views/Page.vue?vue&type=template&id=5a7b936e&ts=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

const _hoisted_1 = {
  id: "comments"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Breadcrumbs = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("Breadcrumbs");
  const _component_Comment = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("Comment");
  const _component_PageContainer = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("PageContainer");
  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createElementBlock"])("div", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(_component_Breadcrumbs, {
    current: _ctx.pageTitle
  }, null, 8 /* PROPS */, ["current"]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(_component_PageContainer, {
    post: _ctx.pageData,
    title: _ctx.pageTitle
  }, {
    default: Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(() => [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createElementVNode"])("div", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(_component_Comment, {
      title: _ctx.pageData.title,
      body: _ctx.pageData.text,
      uid: _ctx.pageData.uid
    }, null, 8 /* PROPS */, ["title", "body", "uid"])])]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["post", "title"])]);
}

/***/ }),

/***/ "./src/views/Page.vue":
/*!****************************!*\
  !*** ./src/views/Page.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Page_vue_vue_type_template_id_5a7b936e_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page.vue?vue&type=template&id=5a7b936e&ts=true */ "./src/views/Page.vue?vue&type=template&id=5a7b936e&ts=true");
/* harmony import */ var _Page_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.vue?vue&type=script&lang=ts */ "./src/views/Page.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _Users_adminy_Desktop_OSS_adminy_github_io_themes_aurora_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader-v16/dist/exportHelper.js */ "./node_modules/vue-loader-v16/dist/exportHelper.js");
/* harmony import */ var _Users_adminy_Desktop_OSS_adminy_github_io_themes_aurora_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_adminy_Desktop_OSS_adminy_github_io_themes_aurora_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__);





const __exports__ = /*#__PURE__*/_Users_adminy_Desktop_OSS_adminy_github_io_themes_aurora_node_modules_vue_loader_v16_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2___default()(_Page_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Page_vue_vue_type_template_id_5a7b936e_ts_true__WEBPACK_IMPORTED_MODULE_0__["render"]],['__file',"src/views/Page.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./src/views/Page.vue?vue&type=script&lang=ts":
/*!****************************************************!*\
  !*** ./src/views/Page.vue?vue&type=script&lang=ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Page_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--15-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader-v16/dist??ref--1-1!./Page.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/views/Page.vue?vue&type=script&lang=ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Page_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./src/views/Page.vue?vue&type=template&id=5a7b936e&ts=true":
/*!******************************************************************!*\
  !*** ./src/views/Page.vue?vue&type=template&id=5a7b936e&ts=true ***!
  \******************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_vue_loader_v16_dist_templateLoader_js_ref_7_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Page_vue_vue_type_template_id_5a7b936e_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--15-2!../../node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader-v16/dist??ref--1-1!./Page.vue?vue&type=template&id=5a7b936e&ts=true */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/views/Page.vue?vue&type=template&id=5a7b936e&ts=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_vue_loader_v16_dist_templateLoader_js_ref_7_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_Page_vue_vue_type_template_id_5a7b936e_ts_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });



/***/ })

}]);
//# sourceMappingURL=page.js.map