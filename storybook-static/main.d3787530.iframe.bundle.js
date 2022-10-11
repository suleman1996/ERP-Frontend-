(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    './.storybook/preview.js-generated-config-entry.js': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      var preview_namespaceObject = {};
      __webpack_require__.r(preview_namespaceObject),
        __webpack_require__.d(preview_namespaceObject, 'parameters', function () {
          return parameters;
        });
      var ClientApi = __webpack_require__(
          './node_modules/@storybook/client-api/dist/esm/ClientApi.js',
        ),
        parameters = {
          actions: { argTypesRegex: '^on[A-Z].*' },
          controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
        };
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })),
            keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _defineProperty(obj, key, value) {
        return (
          key in obj
            ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (obj[key] = value),
          obj
        );
      }
      Object.keys(preview_namespaceObject).forEach(function (key) {
        var value = preview_namespaceObject[key];
        switch (key) {
          case 'args':
            return Object(ClientApi.d)(value);
          case 'argTypes':
            return Object(ClientApi.b)(value);
          case 'decorators':
            return value.forEach(function (decorator) {
              return Object(ClientApi.f)(decorator, !1);
            });
          case 'loaders':
            return value.forEach(function (loader) {
              return Object(ClientApi.g)(loader, !1);
            });
          case 'parameters':
            return Object(ClientApi.h)(
              (function _objectSpread(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = null != arguments[i] ? arguments[i] : {};
                  i % 2
                    ? ownKeys(Object(source), !0).forEach(function (key) {
                        _defineProperty(target, key, source[key]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
                    : ownKeys(Object(source)).forEach(function (key) {
                        Object.defineProperty(
                          target,
                          key,
                          Object.getOwnPropertyDescriptor(source, key),
                        );
                      });
                }
                return target;
              })({}, value),
              !1,
            );
          case 'argTypesEnhancers':
            return value.forEach(function (enhancer) {
              return Object(ClientApi.c)(enhancer);
            });
          case 'argsEnhancers':
            return value.forEach(function (enhancer) {
              return Object(ClientApi.e)(enhancer);
            });
          case 'render':
            return Object(ClientApi.i)(value);
          case 'globals':
          case 'globalTypes':
            var v = {};
            return (v[key] = value), Object(ClientApi.h)(v, !1);
          case '__namedExportsOrder':
          case 'decorateStory':
          case 'renderToDOM':
            return null;
          default:
            return console.log(key + ' was not supported :( !');
        }
      });
    },
    './generated-stories-entry.js': function (module, exports, __webpack_require__) {
      'use strict';
      (function (module) {
        (0,
        __webpack_require__('./node_modules/@storybook/react/dist/esm/client/index.js').configure)(
          [
            __webpack_require__(
              './src sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.mdx)$',
            ),
            __webpack_require__(
              './src sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(js|jsx|ts|tsx))$',
            ),
          ],
          module,
          !1,
        );
      }.call(this, __webpack_require__('./node_modules/webpack/buildin/module.js')(module)));
    },
    './src sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(js|jsx|ts|tsx))$':
      function (module, exports, __webpack_require__) {
        var map = {
          './stories/new-components/app-loader/app-loader.stories.tsx':
            './src/stories/new-components/app-loader/app-loader.stories.tsx',
          './stories/new-components/button/button.stories.tsx':
            './src/stories/new-components/button/button.stories.tsx',
          './stories/new-components/card-container/card-container.stories.tsx':
            './src/stories/new-components/card-container/card-container.stories.tsx',
          './stories/new-components/checkbox/checkbox.stories.tsx':
            './src/stories/new-components/checkbox/checkbox.stories.tsx',
          './stories/new-components/date-picker/date-picker.stories.tsx':
            './src/stories/new-components/date-picker/date-picker.stories.tsx',
          './stories/new-components/delete-modal/delete-modal.stories.tsx':
            './src/stories/new-components/delete-modal/delete-modal.stories.tsx',
          './stories/new-components/employe-profile-card/employee-profile-card.stories.tsx':
            './src/stories/new-components/employe-profile-card/employee-profile-card.stories.tsx',
          './stories/new-components/modal/modal.stories.tsx':
            './src/stories/new-components/modal/modal.stories.tsx',
          './stories/new-components/pagination/pagination.stories.tsx':
            './src/stories/new-components/pagination/pagination.stories.tsx',
          './stories/new-components/profile-upload/profileupload.stories.tsx':
            './src/stories/new-components/profile-upload/profileupload.stories.tsx',
          './stories/new-components/radio/radio.stories.tsx':
            './src/stories/new-components/radio/radio.stories.tsx',
          './stories/new-components/search-select/searchselect.stories.tsx':
            './src/stories/new-components/search-select/searchselect.stories.tsx',
          './stories/new-components/select/select.stories.tsx':
            './src/stories/new-components/select/select.stories.tsx',
          './stories/new-components/skill-level/skilllevel.stories.tsx':
            './src/stories/new-components/skill-level/skilllevel.stories.tsx',
          './stories/new-components/step-bar/stepbar.stories.tsx':
            './src/stories/new-components/step-bar/stepbar.stories.tsx',
          './stories/new-components/tags/tags.stories.tsx':
            './src/stories/new-components/tags/tags.stories.tsx',
          './stories/new-components/textarea/textarea.stories.tsx':
            './src/stories/new-components/textarea/textarea.stories.tsx',
          './stories/new-components/textfield/textfield.stories.tsx':
            './src/stories/new-components/textfield/textfield.stories.tsx',
          './stories/new-components/time-picker/timepicker.stories.tsx':
            './src/stories/new-components/time-picker/timepicker.stories.tsx',
        };
        function webpackContext(req) {
          var id = webpackContextResolve(req);
          return __webpack_require__(id);
        }
        function webpackContextResolve(req) {
          if (!__webpack_require__.o(map, req)) {
            var e = new Error("Cannot find module '" + req + "'");
            throw ((e.code = 'MODULE_NOT_FOUND'), e);
          }
          return map[req];
        }
        (webpackContext.keys = function webpackContextKeys() {
          return Object.keys(map);
        }),
          (webpackContext.resolve = webpackContextResolve),
          (module.exports = webpackContext),
          (webpackContext.id =
            './src sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.(js|jsx|ts|tsx))$');
      },
    './src sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.mdx)$':
      function (module, exports) {
        function webpackEmptyContext(req) {
          var e = new Error("Cannot find module '" + req + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        }
        (webpackEmptyContext.keys = function () {
          return [];
        }),
          (webpackEmptyContext.resolve = webpackEmptyContext),
          (module.exports = webpackEmptyContext),
          (webpackEmptyContext.id =
            './src sync recursive ^\\.(?:(?:^|[\\\\/]|(?:(?:(?!(?:^|[\\\\/])\\.).)*?)[\\\\/])(?!\\.)(?=.)[^\\\\/]*?\\.stories\\.mdx)$');
      },
    './src/components/loading/loading.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = { loader: 'loading_loader__IG2jp', spin: 'loading_spin__3uT8f' };
    },
    './src/components/modal/modal.module.scss': function (module, exports, __webpack_require__) {
      module.exports = {
        modalWrapper: 'modal_modalWrapper__2y4hd',
        modalContentWrapper: 'modal_modalContentWrapper__2wjT4',
        header: 'modal_header__2n6Nk',
        body: 'modal_body__3H1li',
        btnClass: 'modal_btnClass__1hOHp',
      };
    },
    './src/my-components/button/button.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        btn: 'button_btn__vJM9Q',
        img: 'button_img__3T8AU',
        img1: 'button_img1__2COu5',
        btnTitle: 'button_btnTitle__1ulwj',
      };
    },
    './src/my-components/button/index.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      var new_components_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/new-components/loading/index.tsx',
        ),
        _button_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/my-components/button/button.module.scss',
        ),
        _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          _button_module_scss__WEBPACK_IMPORTED_MODULE_1__,
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js',
        );
      __webpack_exports__.a = function Button(_ref) {
        var text = _ref.text,
          iconStart = _ref.iconStart,
          iconEnd = _ref.iconEnd,
          handleClick = _ref.handleClick,
          type = _ref.type,
          className = _ref.className,
          isLoading = _ref.isLoading,
          btnClass = _ref.btnClass,
          disabled = _ref.disabled,
          btnLoaderClass = _ref.btnLoaderClass,
          size = _ref.size,
          textColor = _ref.textColor,
          borderColor = _ref.borderColor,
          backgroundColor = _ref.backgroundColor;
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,
          {
            children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('button', {
              className: ''
                .concat(_button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.btn, ' ')
                .concat(btnClass),
              type: type,
              onClick: handleClick,
              disabled: !(!isLoading && !disabled),
              style: {
                height:
                  'sm' === size
                    ? 22
                    : 'md' === size
                    ? 24
                    : 'lg' === size
                    ? 45
                    : 'xl' === size
                    ? 64
                    : void 0,
                width:
                  'sm' === size
                    ? 92
                    : 'md' === size
                    ? 98
                    : 'lg' === size
                    ? 180
                    : 'xl' === size
                    ? 271
                    : void 0,
                border: borderColor,
                backgroundColor: backgroundColor,
              },
              children: isLoading
                ? Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                    new_components_loading__WEBPACK_IMPORTED_MODULE_0__.a,
                    { loaderClass: btnLoaderClass },
                  )
                : Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,
                    {
                      children: [
                        iconStart &&
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('img', {
                            src: iconStart,
                            alt: '',
                            className:
                              _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.img1,
                          }),
                        text &&
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('span', {
                            className: ''
                              .concat(
                                _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.btnTitle,
                                ' ',
                              )
                              .concat(className),
                            style: {
                              color: textColor,
                              fontSize:
                                'sm' === size
                                  ? 8
                                  : 'md' === size
                                  ? 9
                                  : 'lg' === size
                                  ? 16
                                  : 'xl' === size
                                  ? 22
                                  : void 0,
                            },
                            children: text,
                          }),
                        iconEnd &&
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('img', {
                            src: iconEnd,
                            alt: '',
                            className:
                              _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.img,
                          }),
                      ],
                    },
                  ),
            }),
          },
        );
      };
      try {
        (button.displayName = 'button'),
          (button.__docgenInfo = {
            description: '',
            displayName: 'button',
            props: {
              text: {
                defaultValue: null,
                description: '',
                name: 'text',
                required: !1,
                type: { name: 'string' },
              },
              iconStart: {
                defaultValue: null,
                description: '',
                name: 'iconStart',
                required: !1,
                type: { name: 'string' },
              },
              iconEnd: {
                defaultValue: null,
                description: '',
                name: 'iconEnd',
                required: !1,
                type: { name: 'string' },
              },
              handleClick: {
                defaultValue: null,
                description: '',
                name: 'handleClick',
                required: !1,
                type: { name: 'MouseEventHandler<HTMLButtonElement>' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: {
                  name: 'enum',
                  value: [{ value: '"button"' }, { value: '"submit"' }, { value: '"reset"' }],
                },
              },
              isLoading: {
                defaultValue: null,
                description: '',
                name: 'isLoading',
                required: !1,
                type: { name: 'boolean' },
              },
              btnClass: {
                defaultValue: null,
                description: '',
                name: 'btnClass',
                required: !1,
                type: { name: 'string' },
              },
              disabled: {
                defaultValue: null,
                description: '',
                name: 'disabled',
                required: !1,
                type: { name: 'boolean' },
              },
              btnLoaderClass: {
                defaultValue: null,
                description: '',
                name: 'btnLoaderClass',
                required: !1,
                type: { name: 'string' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              size: {
                defaultValue: null,
                description: '',
                name: 'size',
                required: !1,
                type: { name: 'any' },
              },
              textColor: {
                defaultValue: null,
                description: '',
                name: 'textColor',
                required: !1,
                type: { name: 'string' },
              },
              borderColor: {
                defaultValue: null,
                description: '',
                name: 'borderColor',
                required: !1,
                type: { name: 'string' },
              },
              backgroundColor: {
                defaultValue: null,
                description: '',
                name: 'backgroundColor',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/button/index.tsx#button'] = {
              docgenInfo: button.__docgenInfo,
              name: 'button',
              path: 'src/my-components/button/index.tsx#button',
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/my-components/card-container/card-container.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = { mainContainer: 'card-container_mainContainer__24BQs' };
    },
    './src/my-components/check-box/checkbox.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        container: 'checkbox_container__2oYAK',
        checkMark: 'checkbox_checkMark__1Fh1Q',
      };
    },
    './src/my-components/check-box/index.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      var _checkbox_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/my-components/check-box/checkbox.module.scss',
        ),
        _checkbox_module_scss__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
          _checkbox_module_scss__WEBPACK_IMPORTED_MODULE_0__,
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js',
        );
      __webpack_exports__.a = function Checkbox(_ref) {
        var id = _ref.id,
          label = _ref.label,
          handleChange = _ref.handleChange,
          checked = _ref.checked,
          name = _ref.name,
          register = _ref.register,
          containerClass = _ref.containerClass,
          textColor = _ref.textColor;
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)('div', {
          className: containerClass,
          children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)('label', {
            className: _checkbox_module_scss__WEBPACK_IMPORTED_MODULE_0___default.a.container,
            htmlFor: id,
            children: [
              Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)('span', {
                className: _checkbox_module_scss__WEBPACK_IMPORTED_MODULE_0___default.a.checkMark,
              }),
              Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)('input', {
                name: name,
                ref: register,
                type: 'checkbox',
                id: id,
                onChange: handleChange,
                checked: checked,
              }),
              label &&
                Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)('p', {
                  style: { color: textColor },
                  children: label,
                }),
            ],
          }),
        });
      };
      try {
        (checkbox.displayName = 'checkbox'),
          (checkbox.__docgenInfo = {
            description: '',
            displayName: 'checkbox',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              handleChange: {
                defaultValue: null,
                description: '',
                name: 'handleChange',
                required: !1,
                type: { name: '((event: ChangeEvent<HTMLInputElement>) => void)' },
              },
              id: {
                defaultValue: null,
                description: '',
                name: 'id',
                required: !1,
                type: { name: 'string' },
              },
              checked: {
                defaultValue: null,
                description: '',
                name: 'checked',
                required: !1,
                type: { name: 'boolean' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              containerClass: {
                defaultValue: null,
                description: '',
                name: 'containerClass',
                required: !1,
                type: { name: 'string' },
              },
              textColor: {
                defaultValue: null,
                description: '',
                name: 'textColor',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/check-box/index.tsx#checkbox'] = {
              docgenInfo: checkbox.__docgenInfo,
              name: 'checkbox',
              path: 'src/my-components/check-box/index.tsx#checkbox',
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/my-components/date-picker/date.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        main: 'date_main__3n4wp',
        label: 'date_label__1O_tM',
        borderClass: 'date_borderClass__31swO',
        inpDiv: 'date_inpDiv__2c579',
        icon: 'date_icon__2snNx',
        errorMessage: 'date_errorMessage__1fZxO',
        iconsDiv: 'date_iconsDiv__1bdEb',
        month: 'date_month__bMbmG',
      };
    },
    './src/my-components/date-picker/index.css': function (module, exports, __webpack_require__) {},
    './src/my-components/employe-profile-card/employee-card.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        mainDiv: 'employee-card_mainDiv__33g1E',
        leftGrid: 'employee-card_leftGrid__rmoiH',
        rightGrid: 'employee-card_rightGrid__J39Nj',
        innerPara: 'employee-card_innerPara__3JXqe',
        form: 'employee-card_form__Y6n1Q',
      };
    },
    './src/my-components/modal/modal.module.scss': function (module, exports, __webpack_require__) {
      module.exports = {
        modalWrapper: 'modal_modalWrapper__2NbHw',
        modalContentWrapper: 'modal_modalContentWrapper__2bdcR',
        header: 'modal_header__3pscj',
        body: 'modal_body__2GOBD',
        btnClass: 'modal_btnClass__1QQD5',
      };
    },
    './src/my-components/search-select/search-select.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        searchSelect: 'search-select_searchSelect__daRzC',
        field: 'search-select_field__LcyLu',
        searchDropdown: 'search-select_searchDropdown__2ZRhS',
        innerDiv: 'search-select_innerDiv__26rze',
        icons: 'search-select_icons__2k0Dt',
      };
    },
    './src/my-components/select/select.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        select: 'select_select__1VnIm',
        errorMessage: 'select_errorMessage__2OCZ0',
        inputClass: 'select_inputClass__3xCuG',
      };
    },
    './src/my-components/skill-level/skill-level.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        label: 'skill-level_label__2EDJh',
        skillLevel: 'skill-level_skillLevel__2dQ8-',
        innerDiv: 'skill-level_innerDiv__1suOy',
        borderDiv: 'skill-level_borderDiv__2O6Ye',
        errorMessage: 'skill-level_errorMessage__17sOe',
        activeBorder: 'skill-level_activeBorder__3VKlj',
      };
    },
    './src/my-components/step-bar/stepbar.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        wrapper: 'stepbar_wrapper__2ELlu',
        ul: 'stepbar_ul__JPb-N',
        li: 'stepbar_li__3jfnO',
        round: 'stepbar_round__3hNj0',
        afterDiv: 'stepbar_afterDiv__1BEdT',
      };
    },
    './src/my-components/tags/tags.module.scss': function (module, exports, __webpack_require__) {
      module.exports = { tags: 'tags_tags__TS2fb', tagsText: 'tags_tagsText__2Ey4h' };
    },
    './src/my-components/textarea/textarea.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        note: 'textarea_note__2z9nm',
        errorMessage: 'textarea_errorMessage__1VNtT',
      };
    },
    './src/my-components/textfield/input.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        inputContainer: 'input_inputContainer__ey2Oc',
        icon: 'input_icon__q1_95',
        errorMessage: 'input_errorMessage__2ptCK',
      };
    },
    './src/new-assets/arrow-left.svg': function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_exports__.a = __webpack_require__.p + 'static/media/arrow-left.9ac61a62.svg';
    },
    './src/new-assets/cross.svg': function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_exports__.a = __webpack_require__.p + 'static/media/cross.0607ec0c.svg';
    },
    './src/new-assets/edit.svg': function (module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_exports__.a = __webpack_require__.p + 'static/media/edit.00be8b31.svg';
    },
    './src/new-components/app-loader/app-loader.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        container: 'app-loader_container__3oB-H',
        loaderClass: 'app-loader_loaderClass__3E3XC',
      };
    },
    './src/new-components/button/button.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        btn: 'button_btn__2VQiL',
        img: 'button_img__3WBW-',
        img1: 'button_img1__1wKd_',
        btnTitle: 'button_btnTitle__U6Una',
      };
    },
    './src/new-components/button/index.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      var new_components_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/new-components/loading/index.tsx',
        ),
        _button_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/new-components/button/button.module.scss',
        ),
        _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          _button_module_scss__WEBPACK_IMPORTED_MODULE_1__,
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js',
        );
      __webpack_exports__.a = function Button(_ref) {
        var text = _ref.text,
          iconStart = _ref.iconStart,
          iconEnd = _ref.iconEnd,
          handleClick = _ref.handleClick,
          type = _ref.type,
          className = _ref.className,
          isLoading = _ref.isLoading,
          btnClass = _ref.btnClass,
          disabled = _ref.disabled,
          btnLoaderClass = _ref.btnLoaderClass;
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,
          {
            children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('button', {
              className: ''
                .concat(_button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.btn, ' ')
                .concat(btnClass),
              type: type,
              onClick: handleClick,
              disabled: !(!isLoading && !disabled),
              style: { pointerEvents: isLoading || disabled ? 'none' : 'auto' },
              children: isLoading
                ? Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                    new_components_loading__WEBPACK_IMPORTED_MODULE_0__.a,
                    { loaderClass: btnLoaderClass },
                  )
                : Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,
                    {
                      children: [
                        iconStart &&
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('img', {
                            src: iconStart,
                            alt: '',
                            className:
                              _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.img1,
                          }),
                        text &&
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('span', {
                            className: ''
                              .concat(
                                _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.btnTitle,
                                ' ',
                              )
                              .concat(className),
                            children: text,
                          }),
                        iconEnd &&
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('img', {
                            src: iconEnd,
                            alt: '',
                            className:
                              _button_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.img,
                          }),
                      ],
                    },
                  ),
            }),
          },
        );
      };
      try {
        (button.displayName = 'button'),
          (button.__docgenInfo = {
            description: '',
            displayName: 'button',
            props: {
              text: {
                defaultValue: null,
                description: '',
                name: 'text',
                required: !1,
                type: { name: 'string' },
              },
              iconStart: {
                defaultValue: null,
                description: '',
                name: 'iconStart',
                required: !1,
                type: { name: 'string' },
              },
              iconEnd: {
                defaultValue: null,
                description: '',
                name: 'iconEnd',
                required: !1,
                type: { name: 'string' },
              },
              handleClick: {
                defaultValue: null,
                description: '',
                name: 'handleClick',
                required: !1,
                type: { name: 'MouseEventHandler<HTMLButtonElement>' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: {
                  name: 'enum',
                  value: [{ value: '"button"' }, { value: '"submit"' }, { value: '"reset"' }],
                },
              },
              isLoading: {
                defaultValue: null,
                description: '',
                name: 'isLoading',
                required: !1,
                type: { name: 'boolean' },
              },
              btnClass: {
                defaultValue: null,
                description: '',
                name: 'btnClass',
                required: !1,
                type: { name: 'string' },
              },
              disabled: {
                defaultValue: null,
                description: '',
                name: 'disabled',
                required: !1,
                type: { name: 'boolean' },
              },
              btnLoaderClass: {
                defaultValue: null,
                description: '',
                name: 'btnLoaderClass',
                required: !1,
                type: { name: 'string' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/button/index.tsx#button'] = {
              docgenInfo: button.__docgenInfo,
              name: 'button',
              path: 'src/new-components/button/index.tsx#button',
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/new-components/delete-modal/delete-modal.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        emailPopupContentDiv: 'delete-modal_emailPopupContentDiv__LvdXb',
        headerDiv: 'delete-modal_headerDiv__1SJ_R',
        flex: 'delete-modal_flex__3Uoed',
        btn1: 'delete-modal_btn1__1RZy3',
        button: 'delete-modal_button__18Krq',
        wrapperModal: 'delete-modal_wrapperModal__2BDWI',
      };
    },
    './src/new-components/loading/index.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      var _loading_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/new-components/loading/loading.module.scss',
        ),
        _loading_module_scss__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
          _loading_module_scss__WEBPACK_IMPORTED_MODULE_0__,
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js',
        );
      __webpack_exports__.a = function Loading(_ref) {
        var loaderClass = _ref.loaderClass;
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,
          {
            children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)('div', {
              className: ''
                .concat(_loading_module_scss__WEBPACK_IMPORTED_MODULE_0___default.a.loader, ' ')
                .concat(loaderClass),
            }),
          },
        );
      };
      try {
        (loading.displayName = 'loading'),
          (loading.__docgenInfo = {
            description: '',
            displayName: 'loading',
            props: {
              loaderClass: {
                defaultValue: null,
                description: '',
                name: 'loaderClass',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/loading/index.tsx#loading'] = {
              docgenInfo: loading.__docgenInfo,
              name: 'loading',
              path: 'src/new-components/loading/index.tsx#loading',
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/new-components/loading/loading.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = { loader: 'loading_loader__34Q4m', spin: 'loading_spin__1Lvdg' };
    },
    './src/new-components/pagination/pagination.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        pagination: 'pagination_pagination__1viMd',
        leftFlex: 'pagination_leftFlex__2EnWh',
        rightFlex: 'pagination_rightFlex__rsRio',
        p: 'pagination_p__2dBne',
      };
    },
    './src/new-components/profile-upload/profile-upload.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        wraper: 'profile-upload_wraper__1iz98',
        labelTag: 'profile-upload_labelTag__2sgcJ',
        fileIcon: 'profile-upload_fileIcon__2Uw-_',
        errorMessage: 'profile-upload_errorMessage__yF48O',
      };
    },
    './src/new-components/select/select.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        select: 'select_select__2cpCs',
        errorMessage: 'select_errorMessage__2fV4J',
        inputClass: 'select_inputClass__1WwO8',
      };
    },
    './src/new-components/textfield/index.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      var C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__('./node_modules/@babel/runtime/helpers/esm/objectSpread2.js'),
        C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            './node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js',
          ),
        _input_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/new-components/textfield/input.module.scss',
        ),
        _input_module_scss__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          _input_module_scss__WEBPACK_IMPORTED_MODULE_2__,
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js',
        ),
        _excluded = [
          'label',
          'onChange',
          'value',
          'name',
          'register',
          'onClick',
          'type',
          'id',
          'className',
          'placeholder',
          'errorMessage',
          'icon',
          'readOnly',
          'isDisable',
          'star',
        ];
      __webpack_exports__.a = function TextField(_ref) {
        var label = _ref.label,
          onChange = _ref.onChange,
          value = _ref.value,
          name = _ref.name,
          register = _ref.register,
          onClick = _ref.onClick,
          type = _ref.type,
          id = _ref.id,
          className = _ref.className,
          placeholder = _ref.placeholder,
          errorMessage = _ref.errorMessage,
          icon = _ref.icon,
          readOnly = _ref.readOnly,
          isDisable = _ref.isDisable,
          star = _ref.star,
          restOfProps = Object(
            C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.a,
          )(_ref, _excluded);
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,
          {
            children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('div', {
              className: _input_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.inputContainer,
              children: [
                label &&
                  Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('label', {
                    style: { color: errorMessage ? '#ff5050' : '#2d2d32' },
                    children: [
                      label,
                      Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('b', {
                        style: { color: 'red' },
                        children: star,
                      }),
                    ],
                  }),
                Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('div', {
                  style: { position: 'relative' },
                  className: className,
                  children: [
                    Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
                      'input',
                      Object(
                        C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a,
                      )(
                        {
                          style: {
                            border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
                            backgroundColor: readOnly || isDisable ? '#ddd' : '#fff',
                          },
                          id: id,
                          name: name,
                          value: value,
                          onChange: onChange,
                          type: type,
                          placeholder: placeholder,
                          ref: register,
                          readOnly: readOnly || !1,
                          disabled: isDisable || !1,
                        },
                        restOfProps,
                      ),
                    ),
                    icon &&
                      Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('img', {
                        className: _input_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.icon,
                        style: { cursor: 'pointer' },
                        src: icon,
                        alt: '',
                        onClick: onClick,
                      }),
                  ],
                }),
                errorMessage &&
                  Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('span', {
                    className:
                      _input_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.errorMessage,
                    children: errorMessage,
                  }),
              ],
            }),
          },
        );
      };
      try {
        (textfield.displayName = 'textfield'),
          (textfield.__docgenInfo = {
            description: '',
            displayName: 'textfield',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !1,
                type: { name: '((event: ChangeEvent<HTMLInputElement>) => void)' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: { name: 'HTMLInputTypeAttribute' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              icon: {
                defaultValue: null,
                description: '',
                name: 'icon',
                required: !1,
                type: { name: 'string' },
              },
              onClick: {
                defaultValue: null,
                description: '',
                name: 'onClick',
                required: !1,
                type: { name: '(() => void)' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              readOnly: {
                defaultValue: null,
                description: '',
                name: 'readOnly',
                required: !1,
                type: { name: 'boolean' },
              },
              isDisable: {
                defaultValue: null,
                description: '',
                name: 'isDisable',
                required: !1,
                type: { name: 'boolean' },
              },
              id: {
                defaultValue: null,
                description: '',
                name: 'id',
                required: !1,
                type: { name: 'string' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/textfield/index.tsx#textfield'] = {
              docgenInfo: textfield.__docgenInfo,
              name: 'textfield',
              path: 'src/new-components/textfield/index.tsx#textfield',
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/new-components/textfield/input.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        inputContainer: 'input_inputContainer__1Jjhx',
        icon: 'input_icon__2MSgp',
        errorMessage: 'input_errorMessage__39bvm',
      };
    },
    './src/new-components/time-picker/time.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = {
        main: 'time_main__1X3dQ',
        inpDiv: 'time_inpDiv__1DCF0',
        datePicker: 'time_datePicker__1zd4W',
        icon: 'time_icon__3_V-H',
      };
    },
    './src/stories/new-components/app-loader/app-loader.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Apploader', function () {
          return Apploader;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        loading_module =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./src/components/loading/loading.module.scss')),
        loading_module_default = __webpack_require__.n(loading_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        components_loading = function Loading(_ref) {
          var loaderClass = _ref.loaderClass;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsx)('div', {
              className: ''.concat(loading_module_default.a.loader, ' ').concat(loaderClass),
            }),
          });
        };
      try {
        (loading.displayName = 'loading'),
          (loading.__docgenInfo = {
            description: '',
            displayName: 'loading',
            props: {
              loaderClass: {
                defaultValue: null,
                description: '',
                name: 'loaderClass',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/loading/index.tsx#loading'] = {
              docgenInfo: loading.__docgenInfo,
              name: 'loading',
              path: 'src/components/loading/index.tsx#loading',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var app_loader_module = __webpack_require__(
          './src/new-components/app-loader/app-loader.module.scss',
        ),
        app_loader_module_default = __webpack_require__.n(app_loader_module),
        sprintXLogo = __webpack_require__.p + 'static/media/sprintXLogo.f4ff1940.png',
        app_loader = function AppLoader() {
          return Object(jsx_runtime.jsxs)('div', {
            className: app_loader_module_default.a.container,
            children: [
              Object(jsx_runtime.jsx)(components_loading, {
                loaderClass: app_loader_module_default.a.loaderClass,
              }),
              Object(jsx_runtime.jsx)('img', {
                src: sprintXLogo,
                alt: 'logo',
                style: { width: '100px  ' },
              }),
            ],
          });
        },
        Apploader =
          ((__webpack_exports__.default = { title: 'AppLoader', component: app_loader }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(app_loader, Object(objectSpread2.a)({}, args));
          }.bind({}));
      Apploader.parameters = Object(objectSpread2.a)(
        { storySource: { source: '(args: any) => <AppLoader {...args} />' } },
        Apploader.parameters,
      );
      try {
        (Apploader.displayName = 'Apploader'),
          (Apploader.__docgenInfo = { description: '', displayName: 'Apploader', props: {} }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              'src/stories/new-components/app-loader/app-loader.stories.tsx#Apploader'
            ] = {
              docgenInfo: Apploader.__docgenInfo,
              name: 'Apploader',
              path: 'src/stories/new-components/app-loader/app-loader.stories.tsx#Apploader',
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    './src/stories/new-components/button/button.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'SimpleButton', function () {
          return SimpleButton;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        my_components_button = __webpack_require__('./src/my-components/button/index.tsx'),
        add = __webpack_require__.p + 'static/media/add.c2ad9a1b.svg',
        arrow_left = __webpack_require__('./src/new-assets/arrow-left.svg'),
        edit = __webpack_require__('./src/new-assets/edit.svg'),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        SimpleButton =
          ((__webpack_exports__.default = {
            title: 'Button',
            component: my_components_button.a,
            argTypes: {
              size: { options: ['sm', 'md', 'lg', 'xl'], control: { type: 'select' } },
              iconStart: { options: ['', add, arrow_left.a, edit.a], control: { type: 'select' } },
              iconEnd: { options: ['', add, arrow_left.a, edit.a], control: { type: 'select' } },
              handleClick: { action: 'Please Click Me' },
            },
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(
              my_components_button.a,
              Object(objectSpread2.a)({}, args),
            );
          }.bind({}));
      (SimpleButton.args = {
        text: 'Button',
        type: 'button',
        isLoading: !1,
        backgroundColor: '',
        textColor: 'red',
        borderColor: '',
      }),
        (SimpleButton.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args: any) => <Button {...args} />' } },
          SimpleButton.parameters,
        ));
    },
    './src/stories/new-components/card-container/card-container.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Cardcontainer', function () {
          return Cardcontainer;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        card_container_module = __webpack_require__(
          './src/my-components/card-container/card-container.module.scss',
        ),
        card_container_module_default = __webpack_require__.n(card_container_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        card_container = function CardContainer(_ref) {
          var children = _ref.children,
            className = _ref.className,
            backgroundColor = _ref.backgroundColor;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsx)('div', {
              className: ''
                .concat(card_container_module_default.a.mainContainer, ' ')
                .concat(className),
              style: { backgroundColor: backgroundColor },
              children: children,
            }),
          });
        };
      try {
        (cardcontainer.displayName = 'cardcontainer'),
          (cardcontainer.__docgenInfo = {
            description: '',
            displayName: 'cardcontainer',
            props: {
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              backgroundColor: {
                defaultValue: null,
                description: '',
                name: 'backgroundColor',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/card-container/index.tsx#cardcontainer'] = {
              docgenInfo: cardcontainer.__docgenInfo,
              name: 'cardcontainer',
              path: 'src/my-components/card-container/index.tsx#cardcontainer',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = { title: 'CardContainer', component: card_container };
      var Cardcontainer = function Template(args) {
        return Object(jsx_runtime.jsx)(card_container, Object(objectSpread2.a)({}, args));
      }.bind({});
      (Cardcontainer.args = { backgroundColor: 'red', children: '' }),
        (Cardcontainer.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args: any) => <CardContainer {...args} />' } },
          Cardcontainer.parameters,
        ));
    },
    './src/stories/new-components/checkbox/checkbox.stories.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {
      module.exports = { labelColor: 'checkbox_stories_labelColor__20Mv3' };
    },
    './src/stories/new-components/checkbox/checkbox.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'CheckBox', function () {
          return CheckBox;
        });
      var C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__('./node_modules/@babel/runtime/helpers/esm/objectSpread2.js'),
        my_components_check_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/my-components/check-box/index.tsx',
        ),
        _checkbox_stories_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/stories/new-components/checkbox/checkbox.stories.module.scss',
        ),
        _checkbox_stories_module_scss__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          _checkbox_stories_module_scss__WEBPACK_IMPORTED_MODULE_2__,
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/react/jsx-runtime.js',
        );
      __webpack_exports__.default = {
        title: 'Checkbox',
        component: my_components_check_box__WEBPACK_IMPORTED_MODULE_1__.a,
        argTypes: { handleChange: { action: 'true' } },
      };
      var CheckBox = function Template(args) {
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
          my_components_check_box__WEBPACK_IMPORTED_MODULE_1__.a,
          Object(
            C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a,
          )({}, args),
        );
      }.bind({});
      (CheckBox.args = {
        label: 'check me',
        containerClass:
          _checkbox_stories_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.containerClass,
        textColor: '',
      }),
        (CheckBox.parameters = Object(
          C_Users_Ibrahim_Desktop_ERP_erp_client_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__.a,
        )(
          { storySource: { source: '(args: any) => <Checkbox {...args} />' } },
          CheckBox.parameters,
        ));
    },
    './src/stories/new-components/date-picker/date-picker.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Datepicker', function () {
          return Datepicker;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        react_datepicker_min =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./node_modules/react-datepicker/dist/react-datepicker.min.js')),
        react_datepicker_min_default = __webpack_require__.n(react_datepicker_min),
        index_esm = __webpack_require__('./node_modules/react-hook-form/dist/index.esm.js'),
        _1 = __webpack_require__.p + 'static/media/1.1b34afc2.svg',
        _2 = __webpack_require__.p + 'static/media/2.71eac0b5.svg',
        _3 = __webpack_require__.p + 'static/media/3.6ab818bf.svg',
        _4 = __webpack_require__.p + 'static/media/4.081c0b53.svg',
        date_icon = __webpack_require__.p + 'static/media/date-icon.bce3a189.svg',
        date_module = __webpack_require__('./src/my-components/date-picker/date.module.scss'),
        date_module_default = __webpack_require__.n(date_module),
        jsx_runtime =
          (__webpack_require__('./node_modules/react-datepicker/dist/react-datepicker.css'),
          __webpack_require__('./src/my-components/date-picker/index.css'),
          __webpack_require__('./node_modules/react/jsx-runtime.js')),
        my_components_date_picker = function DatePicker(_ref) {
          var readOnly = _ref.readOnly,
            name = _ref.name,
            control = _ref.control,
            label = _ref.label,
            className = _ref.className,
            id = _ref.id,
            errorMessage = _ref.errorMessage,
            defaultVal = _ref.defaultVal,
            handleChange = _ref.handleChange,
            isDisable = _ref.isDisable,
            handleClick = _ref.handleClick,
            maxDate = _ref.maxDate,
            minDate = _ref.minDate,
            placeholder = _ref.placeholder,
            star = _ref.star;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsxs)('div', {
              className: ''.concat(date_module_default.a.main, ' ').concat(className),
              children: [
                label &&
                  Object(jsx_runtime.jsxs)('label', {
                    style: { color: errorMessage && '#ff5050' },
                    className: date_module_default.a.label,
                    children: [
                      label,
                      Object(jsx_runtime.jsx)('b', { style: { color: 'red' }, children: star }),
                    ],
                  }),
                Object(jsx_runtime.jsx)('div', {
                  onClick: handleClick,
                  children: Object(jsx_runtime.jsx)(index_esm.a, {
                    name: name,
                    control: control,
                    defaultValue: defaultVal || null,
                    render: function render(_ref2) {
                      var _onChange = _ref2.onChange,
                        value = _ref2.value,
                        name = _ref2.name;
                      return Object(jsx_runtime.jsx)(react_datepicker_min_default.a, {
                        selected: value,
                        maxDate: maxDate && maxDate,
                        minDate: minDate && minDate,
                        readOnly: readOnly,
                        onChange: function onChange(event) {
                          !(function handleChangeDate(event, onChange, name) {
                            null == handleChange || handleChange(event, name), onChange(event);
                          })(event, _onChange, name);
                        },
                        className: errorMessage
                          ? date_module_default.a.borderClass
                          : date_module_default.a.inpDiv,
                        placeholderText: placeholder || '22/03/2022',
                        id: id,
                        disabled: isDisable,
                        renderCustomHeader: function renderCustomHeader(_ref3) {
                          var date = _ref3.date,
                            decreaseMonth = _ref3.decreaseMonth,
                            increaseMonth = _ref3.increaseMonth,
                            prevMonthButtonDisabled = _ref3.prevMonthButtonDisabled,
                            nextMonthButtonDisabled = _ref3.nextMonthButtonDisabled,
                            prevYearButtonDisabled = _ref3.prevYearButtonDisabled,
                            nextYearButtonDisabled = _ref3.nextYearButtonDisabled,
                            increaseYear = _ref3.increaseYear,
                            decreaseYear = _ref3.decreaseYear;
                          return Object(jsx_runtime.jsxs)('div', {
                            className: date_module_default.a.iconsDiv,
                            children: [
                              Object(jsx_runtime.jsxs)('div', {
                                children: [
                                  Object(jsx_runtime.jsx)('button', {
                                    type: 'button',
                                    onClick: decreaseYear,
                                    disabled: prevYearButtonDisabled,
                                    children: Object(jsx_runtime.jsx)('img', { src: _4, alt: '' }),
                                  }),
                                  Object(jsx_runtime.jsx)('button', {
                                    type: 'button',
                                    onClick: decreaseMonth,
                                    disabled: prevMonthButtonDisabled,
                                    children: Object(jsx_runtime.jsx)('img', { src: _3, alt: '' }),
                                  }),
                                ],
                              }),
                              Object(jsx_runtime.jsxs)('p', {
                                className: date_module_default.a.month,
                                children: [months[date.getMonth()], ' ', date.getFullYear()],
                              }),
                              Object(jsx_runtime.jsxs)('div', {
                                children: [
                                  Object(jsx_runtime.jsx)('button', {
                                    type: 'button',
                                    onClick: increaseMonth,
                                    disabled: nextMonthButtonDisabled,
                                    children: Object(jsx_runtime.jsx)('img', { src: _2, alt: '' }),
                                  }),
                                  Object(jsx_runtime.jsx)('button', {
                                    type: 'button',
                                    onClick: increaseYear,
                                    disabled: nextYearButtonDisabled,
                                    style: { marginRight: '8px' },
                                    children: Object(jsx_runtime.jsx)('img', { src: _1, alt: '' }),
                                  }),
                                ],
                              }),
                            ],
                          });
                        },
                      });
                    },
                  }),
                }),
                Object(jsx_runtime.jsx)('label', {
                  htmlFor: id,
                  children: Object(jsx_runtime.jsx)('div', {
                    className: date_module_default.a.icon,
                    children: Object(jsx_runtime.jsx)('img', { src: date_icon, alt: '' }),
                  }),
                }),
                errorMessage
                  ? Object(jsx_runtime.jsx)('span', {
                      className: date_module_default.a.errorMessage,
                      children: 'Date is required',
                    })
                  : '',
              ],
            }),
          });
        },
        months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
      try {
        (datepicker.displayName = 'datepicker'),
          (datepicker.__docgenInfo = {
            description: '',
            displayName: 'datepicker',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              id: {
                defaultValue: null,
                description: '',
                name: 'id',
                required: !1,
                type: { name: 'string' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !0,
                type: { name: 'string' },
              },
              control: {
                defaultValue: null,
                description: '',
                name: 'control',
                required: !1,
                type: { name: 'any' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: { name: 'HTMLInputTypeAttribute' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              setDateVal: {
                defaultValue: null,
                description: '',
                name: 'setDateVal',
                required: !1,
                type: { name: 'boolean' },
              },
              required: {
                defaultValue: null,
                description: '',
                name: 'required',
                required: !1,
                type: { name: 'boolean' },
              },
              handleChange: {
                defaultValue: null,
                description: '',
                name: 'handleChange',
                required: !1,
                type: {
                  name: '((event: Date | [Date | null, Date | null] | null, name: string) => void)',
                },
              },
              defaultVal: {
                defaultValue: null,
                description: '',
                name: 'defaultVal',
                required: !1,
                type: { name: 'string' },
              },
              isDisable: {
                defaultValue: null,
                description: '',
                name: 'isDisable',
                required: !1,
                type: { name: 'boolean' },
              },
              handleClick: {
                defaultValue: null,
                description: '',
                name: 'handleClick',
                required: !1,
                type: { name: '(() => void)' },
              },
              maxDate: {
                defaultValue: null,
                description: '',
                name: 'maxDate',
                required: !1,
                type: { name: 'any' },
              },
              minDate: {
                defaultValue: null,
                description: '',
                name: 'minDate',
                required: !1,
                type: { name: 'any' },
              },
              readOnly: {
                defaultValue: null,
                description: '',
                name: 'readOnly',
                required: !1,
                type: { name: 'boolean' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/date-picker/index.tsx#datepicker'] = {
              docgenInfo: datepicker.__docgenInfo,
              name: 'datepicker',
              path: 'src/my-components/date-picker/index.tsx#datepicker',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = {
        title: 'DatePicker',
        component: my_components_date_picker,
        argTypes: { handleClick: { action: 'Please Check Me' } },
      };
      var Datepicker = function Template(args) {
        var control = Object(index_esm.c)().control;
        return Object(jsx_runtime.jsx)(
          my_components_date_picker,
          Object(objectSpread2.a)(Object(objectSpread2.a)({}, args), {}, { control: control }),
        );
      }.bind({});
      (Datepicker.args = {
        label: 'Date Picker',
        name: 'Select',
        errorMessage: '',
        placeholder: 'Please Date Picker',
        id: 'hello',
      }),
        (Datepicker.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  const { control } = useForm();\n\n  return <DatePicker {...args} control={control} />;\n}',
            },
          },
          Datepicker.parameters,
        ));
    },
    './src/stories/new-components/delete-modal/delete-modal.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Deletepopup', function () {
          return Deletepopup;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        new_components_button = __webpack_require__('./src/new-components/button/index.tsx'),
        cross = __webpack_require__('./src/new-assets/cross.svg'),
        modal_module = __webpack_require__('./src/components/modal/modal.module.scss'),
        modal_module_default = __webpack_require__.n(modal_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        components_modal = function Modal(_ref) {
          var open = _ref.open,
            children = _ref.children,
            className = _ref.className,
            handleClose = _ref.handleClose,
            title = _ref.title,
            text = _ref.text,
            iconStart = _ref.iconStart,
            iconEnd = _ref.iconEnd,
            handleClick = _ref.handleClick,
            type = _ref.type,
            btnClass = _ref.btnClass;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children:
              open &&
              Object(jsx_runtime.jsx)('div', {
                className: modal_module_default.a.modalWrapper,
                onClick: function onClick(e) {
                  return (function handleClickWrapper(event) {
                    event.nativeEvent.stopImmediatePropagation(),
                      null == handleClose || handleClose();
                  })(e);
                },
                children: Object(jsx_runtime.jsxs)('div', {
                  className: ''
                    .concat(modal_module_default.a.modalContentWrapper, ' ')
                    .concat(className),
                  onClick: function onClick(e) {
                    return e.stopPropagation();
                  },
                  children: [
                    Object(jsx_runtime.jsxs)('div', {
                      className: modal_module_default.a.header,
                      children: [
                        Object(jsx_runtime.jsx)('p', { children: title }),
                        Object(jsx_runtime.jsx)('img', {
                          src: cross.a,
                          alt: 'close icon',
                          onClick: handleClose,
                        }),
                      ],
                    }),
                    Object(jsx_runtime.jsxs)('div', {
                      className: modal_module_default.a.body,
                      children: [
                        children,
                        Object(jsx_runtime.jsx)('div', {
                          className: ''
                            .concat(modal_module_default.a.btnClass, '  ')
                            .concat(btnClass, '  '),
                          children: Object(jsx_runtime.jsx)(new_components_button.a, {
                            text: text,
                            iconStart: iconStart,
                            iconEnd: iconEnd,
                            type: type,
                            handleClick: handleClick,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          });
        };
      try {
        (modal.displayName = 'modal'),
          (modal.__docgenInfo = {
            description: '',
            displayName: 'modal',
            props: {
              open: {
                defaultValue: null,
                description: '',
                name: 'open',
                required: !1,
                type: { name: 'boolean' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              title: {
                defaultValue: null,
                description: '',
                name: 'title',
                required: !1,
                type: { name: 'string' },
              },
              btnClass: {
                defaultValue: null,
                description: '',
                name: 'btnClass',
                required: !1,
                type: { name: 'string' },
              },
              handleClose: {
                defaultValue: null,
                description: '',
                name: 'handleClose',
                required: !0,
                type: { name: '() => void' },
              },
              text: {
                defaultValue: null,
                description: '',
                name: 'text',
                required: !1,
                type: { name: 'string' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: {
                  name: 'enum',
                  value: [{ value: '"button"' }, { value: '"submit"' }, { value: '"reset"' }],
                },
              },
              iconStart: {
                defaultValue: null,
                description: '',
                name: 'iconStart',
                required: !1,
                type: { name: 'string' },
              },
              iconEnd: {
                defaultValue: null,
                description: '',
                name: 'iconEnd',
                required: !1,
                type: { name: 'string' },
              },
              handleClick: {
                defaultValue: null,
                description: '',
                name: 'handleClick',
                required: !1,
                type: { name: '(() => void)' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/components/modal/index.tsx#modal'] = {
              docgenInfo: modal.__docgenInfo,
              name: 'modal',
              path: 'src/components/modal/index.tsx#modal',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var delete_cross = __webpack_require__.p + 'static/media/delete-cross.00ec888e.svg',
        delete_modal_module = __webpack_require__(
          './src/new-components/delete-modal/delete-modal.module.scss',
        ),
        delete_modal_module_default = __webpack_require__.n(delete_modal_module),
        delete_modal_DeletePopup = function DeletePopup(_ref) {
          var open = _ref.open,
            setOpen = _ref.setOpen,
            handleDelete = _ref.handleDelete;
          _ref.btnLoader;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsx)(components_modal, {
              open: open,
              handleClose: function handleClose() {
                return setOpen(!1);
              },
              className: delete_modal_module_default.a.wrapperModal,
              children: Object(jsx_runtime.jsxs)('div', {
                className: delete_modal_module_default.a.emailPopupContentDiv,
                children: [
                  Object(jsx_runtime.jsxs)('div', {
                    className: delete_modal_module_default.a.headerDiv,
                    children: [
                      Object(jsx_runtime.jsx)('img', { src: delete_cross, alt: '' }),
                      Object(jsx_runtime.jsx)('h1', {
                        children: 'Are you sure you want to delete this?',
                      }),
                      Object(jsx_runtime.jsx)('p', {
                        children: 'If you delete this you can’t recover it',
                      }),
                    ],
                  }),
                  Object(jsx_runtime.jsxs)('div', {
                    className: delete_modal_module_default.a.flex,
                    children: [
                      Object(jsx_runtime.jsx)(new_components_button.a, {
                        text: 'Cancel',
                        handleClick: function handleClick() {
                          return setOpen(!1);
                        },
                        btnClass: delete_modal_module_default.a.btn1,
                      }),
                      Object(jsx_runtime.jsx)(new_components_button.a, {
                        text: 'Delete',
                        handleClick: function handleClick() {
                          handleDelete && handleDelete();
                        },
                        btnClass: delete_modal_module_default.a.button,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        delete_modal = Object(react.memo)(delete_modal_DeletePopup);
      try {
        (delete_modal_DeletePopup.displayName = 'DeletePopup'),
          (delete_modal_DeletePopup.__docgenInfo = {
            description: '',
            displayName: 'DeletePopup',
            props: {
              open: {
                defaultValue: null,
                description: '',
                name: 'open',
                required: !0,
                type: { name: 'boolean' },
              },
              setOpen: {
                defaultValue: null,
                description: '',
                name: 'setOpen',
                required: !0,
                type: { name: 'Dispatch<SetStateAction<boolean>>' },
              },
              handleDelete: {
                defaultValue: null,
                description: '',
                name: 'handleDelete',
                required: !1,
                type: { name: '(() => void)' },
              },
              btnLoader: {
                defaultValue: null,
                description: '',
                name: 'btnLoader',
                required: !1,
                type: { name: 'boolean' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/delete-modal/index.tsx#DeletePopup'] = {
              docgenInfo: delete_modal_DeletePopup.__docgenInfo,
              name: 'DeletePopup',
              path: 'src/new-components/delete-modal/index.tsx#DeletePopup',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = {
        title: 'DeletePopup',
        component: delete_modal,
        Button: new_components_button.a,
        argTypes: { handleDelete: { action: 'Please Click Me' } },
      };
      var Deletepopup = function Template(args) {
        return Object(jsx_runtime.jsx)(delete_modal, Object(objectSpread2.a)({}, args));
      }.bind({});
      (Deletepopup.args = { open: !1, btnLoader: !1, h1color: 'red', h2color: 'blue' }),
        (Deletepopup.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args: any) => <DeletePopup {...args} />' } },
          Deletepopup.parameters,
        ));
    },
    './src/stories/new-components/employe-profile-card/employee-profile-card.stories.tsx':
      function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        __webpack_require__.r(__webpack_exports__),
          __webpack_require__.d(__webpack_exports__, 'Employeeprofilecard', function () {
            return Employeeprofilecard;
          });
        var objectSpread2 = __webpack_require__(
            './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
          ),
          my_components_button = __webpack_require__('./src/my-components/button/index.tsx'),
          employee_card_module = __webpack_require__(
            './src/my-components/employe-profile-card/employee-card.module.scss',
          ),
          employee_card_module_default = __webpack_require__.n(employee_card_module),
          jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
          employe_profile_card = function EmployeeProfileCard(_ref) {
            var _handleClick = _ref.handleClick,
              img = _ref.img,
              name = _ref.name,
              designation = _ref.designation,
              department = _ref.department,
              phone = _ref.phone,
              id = _ref.id,
              fontSize = _ref.fontSize,
              fontWeight = _ref.fontWeight,
              designationColor = _ref.designationColor,
              desigFont = _ref.desigFont,
              fontSizeForm = _ref.fontSizeForm,
              fontWeightForm = _ref.fontWeightForm;
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsxs)('div', {
                className: employee_card_module_default.a.mainDiv,
                children: [
                  Object(jsx_runtime.jsxs)('div', {
                    className: employee_card_module_default.a.leftGrid,
                    children: [
                      Object(jsx_runtime.jsx)('img', { src: img, alt: '' }),
                      Object(jsx_runtime.jsx)(my_components_button.a, {
                        text: 'More',
                        handleClick: function handleClick() {
                          return _handleClick();
                        },
                      }),
                    ],
                  }),
                  Object(jsx_runtime.jsxs)('div', {
                    className: employee_card_module_default.a.rightGrid,
                    children: [
                      Object(jsx_runtime.jsx)('h1', {
                        style: { fontSize: fontSize, fontWeight: fontWeight, margin: 0 },
                        children: name,
                      }),
                      Object(jsx_runtime.jsx)('p', {
                        style: { margin: 2, color: designationColor, fontSize: desigFont },
                        children: designation,
                      }),
                      Object(jsx_runtime.jsxs)('div', {
                        className: employee_card_module_default.a.innerPara,
                        children: [
                          Object(jsx_runtime.jsxs)('p', {
                            className: employee_card_module_default.a.form,
                            children: [
                              'Department:',
                              Object(jsx_runtime.jsx)('span', {
                                style: { fontSize: fontSizeForm, fontWeight: fontWeightForm },
                                children: department,
                              }),
                            ],
                          }),
                          Object(jsx_runtime.jsxs)('p', {
                            className: employee_card_module_default.a.form,
                            children: [
                              'Phone No:',
                              Object(jsx_runtime.jsx)('span', { children: phone }),
                            ],
                          }),
                          Object(jsx_runtime.jsxs)('p', {
                            className: employee_card_module_default.a.form,
                            children: [
                              'Employee ID:',
                              Object(jsx_runtime.jsx)('span', { children: id }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            });
          };
        try {
          (employeprofilecard.displayName = 'employeprofilecard'),
            (employeprofilecard.__docgenInfo = {
              description: '',
              displayName: 'employeprofilecard',
              props: {
                handleClick: {
                  defaultValue: null,
                  description: '',
                  name: 'handleClick',
                  required: !1,
                  type: { name: 'any' },
                },
                img: {
                  defaultValue: null,
                  description: '',
                  name: 'img',
                  required: !0,
                  type: { name: 'string' },
                },
                name: {
                  defaultValue: null,
                  description: '',
                  name: 'name',
                  required: !0,
                  type: { name: 'string' },
                },
                designation: {
                  defaultValue: null,
                  description: '',
                  name: 'designation',
                  required: !0,
                  type: { name: 'string' },
                },
                department: {
                  defaultValue: null,
                  description: '',
                  name: 'department',
                  required: !0,
                  type: { name: 'string' },
                },
                phone: {
                  defaultValue: null,
                  description: '',
                  name: 'phone',
                  required: !0,
                  type: { name: 'string' },
                },
                id: {
                  defaultValue: null,
                  description: '',
                  name: 'id',
                  required: !0,
                  type: { name: 'string | undefined' },
                },
                fontSize: {
                  defaultValue: null,
                  description: '',
                  name: 'fontSize',
                  required: !0,
                  type: { name: 'string' },
                },
                fontWeight: {
                  defaultValue: null,
                  description: '',
                  name: 'fontWeight',
                  required: !0,
                  type: { name: 'number' },
                },
                designationColor: {
                  defaultValue: null,
                  description: '',
                  name: 'designationColor',
                  required: !0,
                  type: { name: 'string' },
                },
                desigFont: {
                  defaultValue: null,
                  description: '',
                  name: 'desigFont',
                  required: !0,
                  type: { name: 'number' },
                },
                fontSizeForm: {
                  defaultValue: null,
                  description: '',
                  name: 'fontSizeForm',
                  required: !0,
                  type: { name: 'number' },
                },
                fontWeightForm: {
                  defaultValue: null,
                  description: '',
                  name: 'fontWeightForm',
                  required: !0,
                  type: { name: 'number' },
                },
              },
            }),
            'undefined' != typeof STORYBOOK_REACT_CLASSES &&
              (STORYBOOK_REACT_CLASSES[
                'src/my-components/employe-profile-card/index.tsx#employeprofilecard'
              ] = {
                docgenInfo: employeprofilecard.__docgenInfo,
                name: 'employeprofilecard',
                path: 'src/my-components/employe-profile-card/index.tsx#employeprofilecard',
              });
        } catch (__react_docgen_typescript_loader_error) {}
        var img2 = __webpack_require__.p + 'static/media/img2.5f108805.svg',
          img1 = __webpack_require__.p + 'static/media/img1.8d1c896b.svg',
          logo10 = __webpack_require__.p + 'static/media/logo10.24e05572.svg',
          Employeeprofilecard =
            ((__webpack_exports__.default = {
              title: 'EmployeeProfileCard',
              component: employe_profile_card,
              argTypes: {
                handleClick: { action: 'Please Click Me' },
                img: { options: [img2, img1, logo10], control: { type: 'select' } },
              },
            }),
            function Template(args) {
              return Object(jsx_runtime.jsx)(
                employe_profile_card,
                Object(objectSpread2.a)({}, args),
              );
            }.bind({}));
        (Employeeprofilecard.args = {
          img: img2,
          name: 'Anya',
          designation: 'modal',
          department: 'fashion',
          phone: '0322-0001010',
          id: '1',
          fontSize: 26,
          designationColor: '',
          desigFont: 20,
          fontSizeForm: 12,
          fontWeightForm: 233,
        }),
          (Employeeprofilecard.parameters = Object(objectSpread2.a)(
            { storySource: { source: '(args: any) => <EmployeeProfileCard {...args} />' } },
            Employeeprofilecard.parameters,
          ));
      },
    './src/stories/new-components/modal/modal.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Modall', function () {
          return Modall;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        new_components_button = __webpack_require__('./src/new-components/button/index.tsx'),
        cross = __webpack_require__('./src/new-assets/cross.svg'),
        modal_module = __webpack_require__('./src/my-components/modal/modal.module.scss'),
        modal_module_default = __webpack_require__.n(modal_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        my_components_modal = function Modal(_ref) {
          var open = _ref.open,
            children = _ref.children,
            className = _ref.className,
            handleClose = _ref.handleClose,
            title = _ref.title,
            text = _ref.text,
            iconStart = _ref.iconStart,
            iconEnd = _ref.iconEnd,
            handleClick = _ref.handleClick,
            type = _ref.type,
            btnClass = _ref.btnClass,
            modalButtonText = _ref.modalButtonText,
            openModal = _ref.openModal;
          return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              open &&
                Object(jsx_runtime.jsx)('div', {
                  className: modal_module_default.a.modalWrapper,
                  onClick: function onClick(e) {
                    return (function handleClickWrapper(event) {
                      event.nativeEvent.stopImmediatePropagation(),
                        null == handleClose || handleClose();
                    })(e);
                  },
                  children: Object(jsx_runtime.jsxs)('div', {
                    className: ''
                      .concat(modal_module_default.a.modalContentWrapper, ' ')
                      .concat(className),
                    onClick: function onClick(e) {
                      return e.stopPropagation();
                    },
                    children: [
                      Object(jsx_runtime.jsxs)('div', {
                        className: modal_module_default.a.header,
                        children: [
                          Object(jsx_runtime.jsx)('p', { children: title }),
                          Object(jsx_runtime.jsx)('img', {
                            src: cross.a,
                            alt: 'close icon',
                            onClick: handleClose,
                          }),
                        ],
                      }),
                      Object(jsx_runtime.jsxs)('div', {
                        className: modal_module_default.a.body,
                        children: [
                          children,
                          Object(jsx_runtime.jsx)('div', {
                            className: ''
                              .concat(modal_module_default.a.btnClass, '  ')
                              .concat(btnClass, '  '),
                            children: Object(jsx_runtime.jsx)(new_components_button.a, {
                              text: text,
                              iconStart: iconStart,
                              iconEnd: iconEnd,
                              type: type,
                              handleClick: handleClick,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              Object(jsx_runtime.jsx)('div', {
                className: ''.concat(modal_module_default.a.btnClass, '  ').concat(btnClass, '  '),
                children: Object(jsx_runtime.jsx)(new_components_button.a, {
                  text: modalButtonText,
                  iconStart: iconStart,
                  iconEnd: iconEnd,
                  type: type,
                  handleClick: openModal,
                }),
              }),
            ],
          });
        };
      try {
        (modal.displayName = 'modal'),
          (modal.__docgenInfo = {
            description: '',
            displayName: 'modal',
            props: {
              open: {
                defaultValue: null,
                description: '',
                name: 'open',
                required: !0,
                type: { name: 'boolean' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              title: {
                defaultValue: null,
                description: '',
                name: 'title',
                required: !1,
                type: { name: 'string' },
              },
              btnClass: {
                defaultValue: null,
                description: '',
                name: 'btnClass',
                required: !1,
                type: { name: 'string' },
              },
              handleClose: {
                defaultValue: null,
                description: '',
                name: 'handleClose',
                required: !0,
                type: { name: '() => void' },
              },
              text: {
                defaultValue: null,
                description: '',
                name: 'text',
                required: !0,
                type: { name: 'string' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: {
                  name: 'enum',
                  value: [{ value: '"button"' }, { value: '"submit"' }, { value: '"reset"' }],
                },
              },
              iconStart: {
                defaultValue: null,
                description: '',
                name: 'iconStart',
                required: !1,
                type: { name: 'string' },
              },
              iconEnd: {
                defaultValue: null,
                description: '',
                name: 'iconEnd',
                required: !1,
                type: { name: 'string' },
              },
              handleClick: {
                defaultValue: null,
                description: '',
                name: 'handleClick',
                required: !0,
                type: { name: '() => void' },
              },
              modalButtonText: {
                defaultValue: null,
                description: '',
                name: 'modalButtonText',
                required: !1,
                type: { name: 'string' },
              },
              openModal: {
                defaultValue: null,
                description: '',
                name: 'openModal',
                required: !1,
                type: { name: '(() => void)' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/modal/index.tsx#modal'] = {
              docgenInfo: modal.__docgenInfo,
              name: 'modal',
              path: 'src/my-components/modal/index.tsx#modal',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var react = __webpack_require__('./node_modules/react/index.js'),
        Modall =
          ((__webpack_exports__.default = {
            title: 'Modal',
            component: my_components_modal,
            argTypes: { handleClick: { action: 'Please Click Me' } },
          }),
          function Template(args) {
            var _useState = Object(react.useState)(!1),
              _useState2 = Object(slicedToArray.a)(_useState, 2),
              open = _useState2[0],
              setOpen = _useState2[1];
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(
                my_components_modal,
                Object(objectSpread2.a)(
                  Object(objectSpread2.a)({}, args),
                  {},
                  {
                    handleClose: function handleClose() {
                      return setOpen(!open);
                    },
                    open: open,
                    openModal: function openModal() {
                      return setOpen(!0);
                    },
                  },
                ),
              ),
            });
          }.bind({}));
      (Modall.args = {
        title: 'Hey Man',
        text: 'Next',
        type: 'button',
        children: 'Hey are you okay?',
        modalButtonText: 'Open',
      }),
        (Modall.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <Modal\n        {...args}\n        handleClose={() => setOpen(!open)}\n        open={open}\n        openModal={() => setOpen(true)}\n      />\n    </>\n  );\n}',
            },
          },
          Modall.parameters,
        ));
    },
    './src/stories/new-components/pagination/pagination.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Paginationn', function () {
          return Paginationn;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        textfield = __webpack_require__('./src/new-components/textfield/index.tsx'),
        select_module = __webpack_require__('./src/new-components/select/select.module.scss'),
        select_module_default = __webpack_require__.n(select_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        new_components_select = function Select(_ref) {
          var label = _ref.label,
            value = _ref.value,
            name = _ref.name,
            name1 = _ref.name1,
            onChange = _ref.onChange,
            register = _ref.register,
            errorMessage = _ref.errorMessage,
            disable = _ref.disable,
            children = _ref.children,
            placeholder = _ref.placeholder,
            star = _ref.star,
            selectContainer = _ref.selectContainer,
            wraperSelect = _ref.wraperSelect,
            newSelect = _ref.newSelect,
            userId = _ref.userId,
            withInput = _ref.withInput,
            marksType = _ref.marksType,
            marksVal = _ref.marksVal,
            setMarkVal = _ref.setMarkVal,
            _useState = Object(react.useState)(),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            customErr = _useState2[0],
            setCustomErr = _useState2[1];
          return (
            Object(react.useEffect)(
              function () {
                'percentage' === marksType
                  ? setCustomErr(marksVal > 100 ? 'Percentage should be less than 100%' : '')
                  : 'cgpa' === marksType &&
                    setCustomErr(marksVal > 4 ? 'CGPA should be less than or equal to 4' : '');
              },
              [marksType, marksVal],
            ),
            Object(jsx_runtime.jsxs)('div', {
              style: { position: 'relative' },
              children: [
                label &&
                  Object(jsx_runtime.jsxs)('label', {
                    style: { color: errorMessage ? '#ff5050' : '#2d2d32' },
                    children: [
                      label,
                      ' ',
                      Object(jsx_runtime.jsx)('b', { style: { color: 'red' }, children: star }),
                      ' ',
                    ],
                  }),
                Object(jsx_runtime.jsxs)('div', {
                  className: wraperSelect,
                  children: [
                    Object(jsx_runtime.jsx)('select', {
                      value: marksType || value,
                      name: name,
                      className: ''
                        .concat(select_module_default.a.select, '  ')
                        .concat(selectContainer, '  '),
                      placeholder: placeholder,
                      style: {
                        border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
                      },
                      disabled: disable || !1,
                      ref: register,
                      onChange: onChange,
                      children: children,
                    }),
                    newSelect && Object(jsx_runtime.jsx)('p', { children: userId }),
                    withInput &&
                      Object(jsx_runtime.jsx)(textfield.a, {
                        star: ' *',
                        type: 'text',
                        name: name1,
                        register: register,
                        className: select_module_default.a.inputClass,
                        placeholder: 'Marks',
                        onChange: function onChange(e) {
                          return setMarkVal(parseFloat(e.target.value));
                        },
                      }),
                  ],
                }),
                errorMessage &&
                  Object(jsx_runtime.jsx)('span', {
                    className: select_module_default.a.errorMessage,
                    children: errorMessage,
                  }),
                customErr &&
                  Object(jsx_runtime.jsx)('span', {
                    className: select_module_default.a.errorMessage,
                    children: customErr,
                  }),
              ],
            })
          );
        };
      try {
        (select.displayName = 'select'),
          (select.__docgenInfo = {
            description: '',
            displayName: 'select',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              name1: {
                defaultValue: null,
                description: '',
                name: 'name1',
                required: !1,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !1,
                type: { name: '((event: ChangeEvent<HTMLSelectElement>) => void)' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              disable: {
                defaultValue: null,
                description: '',
                name: 'disable',
                required: !1,
                type: { name: 'boolean' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
              selectContainer: {
                defaultValue: null,
                description: '',
                name: 'selectContainer',
                required: !1,
                type: { name: 'string' },
              },
              wraperSelect: {
                defaultValue: null,
                description: '',
                name: 'wraperSelect',
                required: !1,
                type: { name: 'string' },
              },
              newSelect: {
                defaultValue: null,
                description: '',
                name: 'newSelect',
                required: !1,
                type: { name: 'boolean' },
              },
              withInput: {
                defaultValue: null,
                description: '',
                name: 'withInput',
                required: !1,
                type: { name: 'boolean' },
              },
              userId: {
                defaultValue: null,
                description: '',
                name: 'userId',
                required: !1,
                type: { name: 'any' },
              },
              marksType: {
                defaultValue: null,
                description: '',
                name: 'marksType',
                required: !1,
                type: { name: 'string' },
              },
              setMarkVal: {
                defaultValue: null,
                description: '',
                name: 'setMarkVal',
                required: !1,
                type: { name: 'any' },
              },
              marksVal: {
                defaultValue: null,
                description: '',
                name: 'marksVal',
                required: !1,
                type: { name: 'any' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/select/index.tsx#select'] = {
              docgenInfo: select.__docgenInfo,
              name: 'select',
              path: 'src/new-components/select/index.tsx#select',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var double_arrow_left = __webpack_require__.p + 'static/media/double-arrow-left.8f52f633.svg',
        double_arrow_right = __webpack_require__.p + 'static/media/double-arrow-right.4b8f3bd0.svg',
        single_arrow_left = __webpack_require__.p + 'static/media/single-arrow-left.a2c322b3.svg',
        single_arrow_right = __webpack_require__.p + 'static/media/single-arrow-right.ba759d3b.svg',
        pagination_module = __webpack_require__(
          './src/new-components/pagination/pagination.module.scss',
        ),
        pagination_module_default = __webpack_require__.n(pagination_module),
        pagination = function Pagination() {
          var _useState = Object(react.useState)(1),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            count = _useState2[0],
            setCount = _useState2[1];
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsxs)('div', {
              className: pagination_module_default.a.pagination,
              children: [
                Object(jsx_runtime.jsxs)('div', {
                  className: pagination_module_default.a.leftFlex,
                  children: [
                    Object(jsx_runtime.jsx)('p', { children: 'View' }),
                    Object(jsx_runtime.jsx)('div', {
                      style: { maxWidth: '80px' },
                      children: Object(jsx_runtime.jsx)(new_components_select, {
                        children:
                          null == selectOptions
                            ? void 0
                            : selectOptions.map(function (_ref) {
                                var value = _ref.value,
                                  label = _ref.label;
                                return Object(jsx_runtime.jsx)(
                                  'option',
                                  { value: value, children: label },
                                  value,
                                );
                              }),
                      }),
                    }),
                    Object(jsx_runtime.jsx)('p', { children: 'user per page' }),
                  ],
                }),
                Object(jsx_runtime.jsxs)('div', {
                  className: pagination_module_default.a.rightFlex,
                  children: [
                    Object(jsx_runtime.jsx)('p', {
                      className: pagination_module_default.a.p,
                      children: ' Showing 1 to 20 of 3,129 entries',
                    }),
                    Object(jsx_runtime.jsx)('img', { src: double_arrow_left, alt: '' }),
                    Object(jsx_runtime.jsx)('img', {
                      src: single_arrow_left,
                      alt: '',
                      onClick: function onClick() {
                        return setCount(function (prev) {
                          return 1 === count ? prev : --prev;
                        });
                      },
                    }),
                    Object(jsx_runtime.jsxs)('p', {
                      onClick: function onClick() {
                        return setCount(count);
                      },
                      children: [' ', count],
                    }),
                    Object(jsx_runtime.jsxs)('p', {
                      onClick: function onClick() {
                        return setCount(count + 1);
                      },
                      children: [' ', count + 1],
                    }),
                    Object(jsx_runtime.jsxs)('p', {
                      onClick: function onClick() {
                        return setCount(count + 2);
                      },
                      children: [' ', count + 2],
                    }),
                    Object(jsx_runtime.jsx)('img', {
                      src: single_arrow_right,
                      alt: '',
                      onClick: function onClick() {
                        return setCount(function (prev) {
                          return ++prev;
                        });
                      },
                    }),
                    Object(jsx_runtime.jsx)('img', { src: double_arrow_right, alt: '' }),
                  ],
                }),
              ],
            }),
          });
        },
        selectOptions = [
          { value: '20', label: '20' },
          { value: '30', label: '30' },
          { value: '40', label: '40' },
        ],
        Paginationn =
          ((__webpack_exports__.default = {
            title: 'Pagination',
            component: pagination,
            argTypes: {},
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(pagination, Object(objectSpread2.a)({}, args)),
            });
          }.bind({}));
      (Paginationn.args = {}),
        (Paginationn.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <Pagination {...args} />\n    </>\n  );\n}',
            },
          },
          Paginationn.parameters,
        ));
    },
    './src/stories/new-components/profile-upload/profileupload.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Profile_Upload', function () {
          return Profile_Upload;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        profileUploadImg = __webpack_require__.p + 'static/media/profileUploadImg.e0743fd3.svg',
        profile_upload_module = __webpack_require__(
          './src/new-components/profile-upload/profile-upload.module.scss',
        ),
        profile_upload_module_default = __webpack_require__.n(profile_upload_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        profile_upload = function ProfileUpload(_ref) {
          var name = _ref.name,
            errorMessage = _ref.errorMessage,
            register = _ref.register,
            id = _ref.id,
            type = _ref.type,
            defaultFileName = _ref.defaultFileName,
            setFileName = _ref.setFileName,
            _useState = Object(react.useState)(defaultFileName || ''),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            selectedFileName = _useState2[0],
            setSelectedFileName = _useState2[1];
          return (
            Object(react.useEffect)(
              function () {
                selectedFileName && setFileName && setFileName(selectedFileName);
              },
              [selectedFileName],
            ),
            Object(react.useEffect)(
              function () {
                setSelectedFileName(defaultFileName);
              },
              [defaultFileName],
            ),
            Object(jsx_runtime.jsxs)('div', {
              children: [
                Object(jsx_runtime.jsxs)('div', {
                  className: profile_upload_module_default.a.wraper,
                  style: { border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea' },
                  children: [
                    Object(jsx_runtime.jsx)('input', {
                      type: 'file',
                      name: name,
                      onChange: function onChange(e) {
                        return setSelectedFileName(
                          e.target.value.split('').splice(12, 100).join(''),
                        );
                      },
                      accept: type || 'image/png ',
                      ref: register,
                      hidden: !0,
                      id: id,
                      'data-testid': id,
                    }),
                    Object(jsx_runtime.jsxs)('label', {
                      htmlFor: id,
                      className: profile_upload_module_default.a.labelTag,
                      children: [
                        selectedFileName ? ''.concat(selectedFileName) : 'Attach Transcript',
                        Object(jsx_runtime.jsx)('img', {
                          src: profileUploadImg,
                          alt: '',
                          className: profile_upload_module_default.a.fileIcon,
                        }),
                      ],
                    }),
                  ],
                }),
                errorMessage &&
                  Object(jsx_runtime.jsx)('span', {
                    style: { color: ' rgb(255, 80, 80)' },
                    className: profile_upload_module_default.a.errorMessage,
                    children: errorMessage,
                  }),
              ],
            })
          );
        };
      try {
        (profileupload.displayName = 'profileupload'),
          (profileupload.__docgenInfo = {
            description: '',
            displayName: 'profileupload',
            props: {
              id: {
                defaultValue: null,
                description: '',
                name: 'id',
                required: !1,
                type: { name: 'string' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              defaultFileName: {
                defaultValue: null,
                description: '',
                name: 'defaultFileName',
                required: !1,
                type: { name: 'any' },
              },
              setFileName: {
                defaultValue: null,
                description: '',
                name: 'setFileName',
                required: !1,
                type: { name: '((value: string) => any)' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/profile-upload/index.tsx#profileupload'] =
              {
                docgenInfo: profileupload.__docgenInfo,
                name: 'profileupload',
                path: 'src/new-components/profile-upload/index.tsx#profileupload',
              });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = {
        title: 'ProfileUpload',
        component: profile_upload,
        argTypes: {},
      };
      var Profile_Upload = function Template(args) {
        return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
          children: Object(jsx_runtime.jsx)(profile_upload, Object(objectSpread2.a)({}, args)),
        });
      }.bind({});
      (Profile_Upload.args = {
        errorMessage: '',
        onClick: function onClick() {
          return alert('Please Attach');
        },
        id: '',
      }),
        (Profile_Upload.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <ProfileUpload {...args} />\n    </>\n  );\n}',
            },
          },
          Profile_Upload.parameters,
        ));
    },
    './src/stories/new-components/radio/radio.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Radioo', function () {
          return Radioo;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        react_default = __webpack_require__.n(react),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        my_components_radio = function Radio(_ref) {
          var name = _ref.name,
            handleChange = _ref.handleChange,
            radioValue = _ref.radioValue,
            Firstname = _ref.Firstname,
            Secondname = _ref.Secondname,
            radioValue2 = _ref.radioValue2;
          return Object(jsx_runtime.jsx)('div', {
            children: Object(jsx_runtime.jsxs)('label', {
              children: [
                Object(jsx_runtime.jsx)('input', {
                  type: 'radio',
                  name: name,
                  value: radioValue,
                  onChange: handleChange,
                }),
                Object(jsx_runtime.jsx)('span', { children: Firstname }),
                Object(jsx_runtime.jsx)('input', {
                  type: 'radio',
                  name: name,
                  value: radioValue2,
                  onChange: handleChange,
                }),
                Object(jsx_runtime.jsx)('span', { children: Secondname }),
              ],
            }),
          });
        };
      try {
        (radio.displayName = 'radio'),
          (radio.__docgenInfo = {
            description: '',
            displayName: 'radio',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              id: {
                defaultValue: null,
                description: '',
                name: 'id',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              handleClick: {
                defaultValue: null,
                description: '',
                name: 'handleClick',
                required: !1,
                type: { name: '(() => void)' },
              },
              handleChange: {
                defaultValue: null,
                description: '',
                name: 'handleChange',
                required: !1,
                type: { name: '(() => void)' },
              },
              checked: {
                defaultValue: null,
                description: '',
                name: 'checked',
                required: !1,
                type: { name: 'boolean' },
              },
              radioRef: {
                defaultValue: null,
                description: '',
                name: 'radioRef',
                required: !1,
                type: { name: 'any' },
              },
              radioValue: {
                defaultValue: null,
                description: '',
                name: 'radioValue',
                required: !1,
                type: { name: 'string | number' },
              },
              radioValue2: {
                defaultValue: null,
                description: '',
                name: 'radioValue2',
                required: !1,
                type: { name: 'string | number' },
              },
              error: {
                defaultValue: null,
                description: '',
                name: 'error',
                required: !1,
                type: { name: 'boolean' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              defaultChecked: {
                defaultValue: null,
                description: '',
                name: 'defaultChecked',
                required: !1,
                type: { name: 'boolean' },
              },
              Firstname: {
                defaultValue: null,
                description: '',
                name: 'Firstname',
                required: !1,
                type: { name: 'string' },
              },
              Secondname: {
                defaultValue: null,
                description: '',
                name: 'Secondname',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/radio/index.tsx#radio'] = {
              docgenInfo: radio.__docgenInfo,
              name: 'radio',
              path: 'src/my-components/radio/index.tsx#radio',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = {
        title: 'Radio',
        component: my_components_radio,
        argTypes: { handleClick: { action: 'Please Click Me' } },
      };
      var Radioo = function Template(args) {
        var _React$useState = react_default.a.useState(),
          _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
          setGender = (_React$useState2[0], _React$useState2[1]);
        return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
          children: Object(jsx_runtime.jsx)(
            my_components_radio,
            Object(objectSpread2.a)(
              Object(objectSpread2.a)({}, args),
              {},
              {
                handleChange: function handleChange(e) {
                  return setGender(e.target.value);
                },
              },
            ),
          ),
        });
      }.bind({});
      (Radioo.args = {
        Firstname: 'Male',
        Secondname: 'Female',
        name: 'gender',
        radioValue: 'Male',
        radioValue2: 'Female',
      }),
        (Radioo.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  const [gender, setGender] = React.useState();\n  return (\n    <>\n      <Radio\n        {...args}\n        handleChange={(e: { target: { value: React.SetStateAction<undefined> } }) =>\n          setGender(e.target.value)\n        }\n      />\n    </>\n  );\n}',
            },
          },
          Radioo.parameters,
        ));
    },
    './src/stories/new-components/search-select/searchselect.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Search_Select', function () {
          return Search_Select;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        index_esm = __webpack_require__('./node_modules/react-hook-form/dist/index.esm.js'),
        textfield = __webpack_require__('./src/new-components/textfield/index.tsx'),
        check_box = __webpack_require__('./src/my-components/check-box/index.tsx'),
        edit = __webpack_require__('./src/new-assets/edit.svg'),
        new_assets_delete = __webpack_require__.p + 'static/media/delete.0b4701bd.svg',
        search_select_module = __webpack_require__(
          './src/my-components/search-select/search-select.module.scss',
        ),
        search_select_module_default = __webpack_require__.n(search_select_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        search_select = function SearchSelect(_ref) {
          var label = _ref.label,
            placeholder = _ref.placeholder,
            className = _ref.className,
            handleDelete = _ref.handleDelete,
            handleEdit = _ref.handleEdit,
            icons = _ref.icons,
            options = _ref.options,
            value = _ref.value,
            name = _ref.name,
            errorMessage = _ref.errorMessage,
            control = _ref.control,
            star = (_ref.register, _ref.star),
            changeHandler = _ref.onChange,
            onChange = Object(index_esm.b)({ control: control, name: name || '' }).field.onChange,
            _useState = Object(react.useState)(!1),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            open = _useState2[0],
            setOpen = _useState2[1],
            _useState3 = Object(react.useState)(options),
            _useState4 = Object(slicedToArray.a)(_useState3, 2),
            list = _useState4[0],
            setList = _useState4[1],
            _useState5 = Object(react.useState)(''),
            _useState6 = Object(slicedToArray.a)(_useState5, 2),
            selectValue = _useState6[0],
            setSelectValue = _useState6[1],
            _useState7 = Object(react.useState)(!1),
            _useState8 = Object(slicedToArray.a)(_useState7, 2),
            isHovering = _useState8[0],
            setIsHovering = _useState8[1],
            handleMouseLeave = function handleMouseLeave() {
              setIsHovering(!1);
            },
            timerRef = Object(react.useRef)();
          Object(react.useEffect)(
            function () {
              value && setSelectValue(value);
            },
            [value],
          ),
            Object(react.useEffect)(
              function () {
                changeHandler && changeHandler(selectValue), onChange(selectValue);
              },
              [selectValue],
            );
          return Object(jsx_runtime.jsxs)('div', {
            className: ''
              .concat(search_select_module_default.a.searchSelect, ' ')
              .concat(className),
            children: [
              Object(jsx_runtime.jsx)(textfield.a, {
                label: label,
                star: star,
                name: name,
                errorMessage: errorMessage,
                placeholder: placeholder,
                value: selectValue,
                type: 'text',
                onChange: function onChange(e) {
                  return (function handleSearch(e) {
                    setSelectValue(e.target.value),
                      timerRef.current && clearTimeout(timerRef.current),
                      (timerRef.current = setTimeout(function () {
                        '' === e.target.value
                          ? setOpen(!1)
                          : (setOpen(!0),
                            setList(
                              null == options
                                ? void 0
                                : options.filter(function (ele) {
                                    return ele.toLowerCase().includes(e.target.value.toLowerCase());
                                  }),
                            ));
                      }, 100));
                  })(e);
                },
                onClick: function onClick() {
                  return setOpen(!open);
                },
                className: search_select_module_default.a.field,
              }),
              open &&
                Object(jsx_runtime.jsx)('div', {
                  className: search_select_module_default.a.searchDropdown,
                  children:
                    null == list
                      ? void 0
                      : list.map(function (ele, index) {
                          return Object(jsx_runtime.jsxs)(
                            'div',
                            {
                              className: search_select_module_default.a.innerDiv,
                              style: {
                                backgroundColor: isHovering === index ? '#57B894' : '',
                                color: isHovering ? 'white' : '',
                              },
                              onMouseEnter: function onMouseEnter() {
                                return (function handleMouseEnter(index) {
                                  setIsHovering(index);
                                })(index);
                              },
                              onMouseLeave: handleMouseLeave,
                              children: [
                                Object(jsx_runtime.jsx)('p', {
                                  onClick: function onClick(e) {
                                    setOpen(!1), setSelectValue(ele);
                                  },
                                  children: ele,
                                }),
                                icons &&
                                  Object(jsx_runtime.jsxs)('div', {
                                    className: search_select_module_default.a.icons,
                                    children: [
                                      Object(jsx_runtime.jsx)('div', {
                                        style: { marginRight: 10 },
                                        children: Object(jsx_runtime.jsx)(check_box.a, {}),
                                      }),
                                      Object(jsx_runtime.jsx)('img', {
                                        src: edit.a,
                                        alt: '',
                                        onClick: handleEdit && handleEdit,
                                        style: { marginRight: 10 },
                                      }),
                                      Object(jsx_runtime.jsx)('img', {
                                        src: new_assets_delete,
                                        alt: '',
                                        onClick: handleDelete && handleDelete,
                                      }),
                                    ],
                                  }),
                              ],
                            },
                            index,
                          );
                        }),
                }),
            ],
          });
        };
      try {
        (searchselect.displayName = 'searchselect'),
          (searchselect.__docgenInfo = {
            description: '',
            displayName: 'searchselect',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              icons: {
                defaultValue: null,
                description: '',
                name: 'icons',
                required: !1,
                type: { name: 'string' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              handleEdit: {
                defaultValue: null,
                description: '',
                name: 'handleEdit',
                required: !1,
                type: { name: 'MouseEventHandler<HTMLImageElement>' },
              },
              handleDelete: {
                defaultValue: null,
                description: '',
                name: 'handleDelete',
                required: !1,
                type: { name: 'MouseEventHandler<HTMLImageElement>' },
              },
              options: {
                defaultValue: null,
                description: '',
                name: 'options',
                required: !1,
                type: { name: 'string[]' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              control: {
                defaultValue: null,
                description: '',
                name: 'control',
                required: !1,
                type: { name: 'any' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'string' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !1,
                type: { name: '((value: any) => void)' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/search-select/index.tsx#searchselect'] = {
              docgenInfo: searchselect.__docgenInfo,
              name: 'searchselect',
              path: 'src/my-components/search-select/index.tsx#searchselect',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var arrow_left = __webpack_require__('./src/new-assets/arrow-left.svg'),
        Search_Select =
          ((__webpack_exports__.default = {
            title: 'SearchSelect',
            component: search_select,
            argTypes: {
              handleDelete: { action: 'Handle Delete' },
              handleEdit: { action: 'Handle Edit' },
            },
          }),
          function Template(args) {
            var control = Object(index_esm.c)().control;
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(
                search_select,
                Object(objectSpread2.a)(
                  Object(objectSpread2.a)({}, args),
                  {},
                  { control: control },
                ),
              ),
            });
          }.bind({}));
      (Search_Select.args = {
        label: 'Seacrh Select',
        placeholder: 'Please Select',
        errorMessage: '',
        name: '',
        icons: arrow_left.a,
        options: ['search 1', 'search 2', 'search 3'],
      }),
        (Search_Select.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  const { control } = useForm();\n\n  return (\n    <>\n      <SearchSelect {...args} control={control} />\n    </>\n  );\n}',
            },
          },
          Search_Select.parameters,
        ));
    },
    './src/stories/new-components/select/select.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Select_Option', function () {
          return Select_Option;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        react_default = __webpack_require__.n(react),
        react_select_esm = __webpack_require__(
          './node_modules/react-select/dist/react-select.esm.js',
        ),
        SelectionStyle = {
          control: function control(styles) {
            return Object(objectSpread2.a)(
              Object(objectSpread2.a)({}, styles),
              {},
              {
                backgroundColor: 'bg-dark-gray',
                borderRadius: 5,
                boxShadow: 'none',
                border: '1px solid grey',
                fontSize: '12px',
                fontFamily: 'SF-regular',
                height: 45,
              },
            );
          },
          option: function option(styles, _ref) {
            var data = _ref.data,
              isDisabled = _ref.isDisabled,
              isFocused = _ref.isFocused,
              isSelected = _ref.isSelected;
            return Object(objectSpread2.a)(
              Object(objectSpread2.a)({}, styles),
              {},
              {
                backgroundColor: isDisabled
                  ? 'black'
                  : isSelected
                  ? '#57B894'
                  : isFocused
                  ? 'white'
                  : null,
                color: isDisabled ? '#ccc' : isSelected ? 'white' : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
              },
            );
          },
          placeholder: function placeholder(styles) {
            return Object(objectSpread2.a)(
              Object(objectSpread2.a)({}, styles),
              {},
              { fontSize: 19, fontFamily: 'SF-regular', color: '#fffff' },
            );
          },
        },
        select_module = __webpack_require__('./src/my-components/select/select.module.scss'),
        select_module_default = __webpack_require__.n(select_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        my_components_select = function Selection(_ref) {
          var label = _ref.label,
            options = _ref.options,
            errorMessage = _ref.errorMessage,
            star = _ref.star,
            wraperSelect = _ref.wraperSelect,
            value = _ref.value,
            onChange = _ref.onChange,
            _useState = Object(react.useState)(),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            customErr = _useState2[0],
            CustomStyle = (_useState2[1], SelectionStyle);
          return Object(jsx_runtime.jsxs)('div', {
            style: { position: 'relative' },
            children: [
              label &&
                Object(jsx_runtime.jsxs)('label', {
                  style: { color: errorMessage ? '#ff5050' : '#2d2d32' },
                  children: [
                    label,
                    ' ',
                    Object(jsx_runtime.jsx)('b', { style: { color: 'red' }, children: star }),
                    ' ',
                  ],
                }),
              Object(jsx_runtime.jsx)('div', {
                className: wraperSelect,
                children: Object(jsx_runtime.jsx)(react_select_esm.a, {
                  value: value,
                  onChange: onChange,
                  options: options,
                  styles: CustomStyle,
                }),
              }),
              errorMessage &&
                Object(jsx_runtime.jsx)('span', {
                  className: select_module_default.a.errorMessage,
                  children: errorMessage,
                }),
              customErr &&
                Object(jsx_runtime.jsx)('span', {
                  className: select_module_default.a.errorMessage,
                  children: customErr,
                }),
            ],
          });
        };
      try {
        (select.displayName = 'select'),
          (select.__docgenInfo = {
            description: '',
            displayName: 'select',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              name1: {
                defaultValue: null,
                description: '',
                name: 'name1',
                required: !1,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !1,
                type: { name: '((event: ChangeEvent<HTMLSelectElement>) => void)' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              disable: {
                defaultValue: null,
                description: '',
                name: 'disable',
                required: !1,
                type: { name: 'boolean' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
              selectContainer: {
                defaultValue: null,
                description: '',
                name: 'selectContainer',
                required: !1,
                type: { name: 'string' },
              },
              wraperSelect: {
                defaultValue: null,
                description: '',
                name: 'wraperSelect',
                required: !1,
                type: { name: 'string' },
              },
              newSelect: {
                defaultValue: null,
                description: '',
                name: 'newSelect',
                required: !1,
                type: { name: 'boolean' },
              },
              withInput: {
                defaultValue: null,
                description: '',
                name: 'withInput',
                required: !1,
                type: { name: 'boolean' },
              },
              userId: {
                defaultValue: null,
                description: '',
                name: 'userId',
                required: !1,
                type: { name: 'any' },
              },
              marksType: {
                defaultValue: null,
                description: '',
                name: 'marksType',
                required: !1,
                type: { name: 'string' },
              },
              setMarkVal: {
                defaultValue: null,
                description: '',
                name: 'setMarkVal',
                required: !1,
                type: { name: 'any' },
              },
              marksVal: {
                defaultValue: null,
                description: '',
                name: 'marksVal',
                required: !1,
                type: { name: 'any' },
              },
              options: {
                defaultValue: null,
                description: '',
                name: 'options',
                required: !1,
                type: { name: '[]' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'any' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/select/index.tsx#select'] = {
              docgenInfo: select.__docgenInfo,
              name: 'select',
              path: 'src/my-components/select/index.tsx#select',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = {
        title: 'Select',
        component: my_components_select,
        argTypes: { onChange: { action: 'Please Click Me' } },
      };
      var Select_Option = function Template(args) {
        var _React$useState = react_default.a.useState(null),
          _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
          selectedOption = _React$useState2[0],
          setSelectedOption = _React$useState2[1];
        return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
          children: Object(jsx_runtime.jsx)(
            my_components_select,
            Object(objectSpread2.a)(
              Object(objectSpread2.a)({}, args),
              {},
              {
                options: [
                  { value: 'chocolate', label: 'Chocolate' },
                  { value: 'strawberry', label: 'Strawberry' },
                  { value: 'vanilla', label: 'Vanilla' },
                  { value: 'Smoke', label: 'Smoke' },
                  { value: 'Dazy', label: 'Dazy' },
                ],
                value: selectedOption,
                onChange: setSelectedOption,
              },
            ),
          ),
        });
      }.bind({});
      (Select_Option.args = { label: 'Please Select', disable: !1, errorMessage: '' }),
        (Select_Option.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                "(args: any) => {\n  const [selectedOption, setSelectedOption] = React.useState(null);\n\n  const options = [\n    { value: 'chocolate', label: 'Chocolate' },\n    { value: 'strawberry', label: 'Strawberry' },\n    { value: 'vanilla', label: 'Vanilla' },\n    { value: 'Smoke', label: 'Smoke' },\n    { value: 'Dazy', label: 'Dazy' },\n  ];\n  return (\n    <>\n      <Selection {...args} options={options} value={selectedOption} onChange={setSelectedOption} />\n    </>\n  );\n}",
            },
          },
          Select_Option.parameters,
        ));
    },
    './src/stories/new-components/skill-level/skilllevel.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Skill_Level', function () {
          return Skill_Level;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        slicedToArray = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/slicedToArray.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        index_esm = __webpack_require__('./node_modules/react-hook-form/dist/index.esm.js'),
        skill_level_module = __webpack_require__(
          './src/my-components/skill-level/skill-level.module.scss',
        ),
        skill_level_module_default = __webpack_require__.n(skill_level_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        skill_level = function SkillLevel(_ref) {
          var errors = _ref.errors,
            control = _ref.control,
            name = _ref.name,
            activeEdit = _ref.activeEdit,
            star = _ref.star,
            _useState = Object(react.useState)(),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            toggle = _useState2[0],
            setToggle = _useState2[1],
            field = Object(index_esm.b)({ control: control, name: name }).field;
          return Object(jsx_runtime.jsxs)('div', {
            className: skill_level_module_default.a.skillLevel,
            children: [
              Object(jsx_runtime.jsxs)('label', {
                className: skill_level_module_default.a.label,
                style: { color: errors ? '#ff5050' : '#2d2d32' },
                children: [
                  'Skill Level',
                  Object(jsx_runtime.jsx)('b', { style: { color: 'red' }, children: star }),
                ],
              }),
              Object(jsx_runtime.jsx)('div', {
                className: skill_level_module_default.a.innerDiv,
                children: skills.map(function (ele, index) {
                  return Object(jsx_runtime.jsx)(
                    'div',
                    {
                      className:
                        toggle === index || index === activeEdit
                          ? skill_level_module_default.a.activeBorder
                          : skill_level_module_default.a.borderDiv,
                      onClick: function onClick() {
                        field.onChange(ele), setToggle(index);
                      },
                      children: Object(jsx_runtime.jsx)('p', {
                        style: { margin: 0 },
                        children: ele,
                      }),
                    },
                    index,
                  );
                }),
              }),
              errors &&
                Object(jsx_runtime.jsx)('span', {
                  className: skill_level_module_default.a.errorMessage,
                  children: errors,
                }),
            ],
          });
        },
        skills = ['Novice', 'Intermediate', 'Proficient', 'Expert'];
      try {
        (skilllevel.displayName = 'skilllevel'),
          (skilllevel.__docgenInfo = {
            description: '',
            displayName: 'skilllevel',
            props: {
              errors: {
                defaultValue: null,
                description: '',
                name: 'errors',
                required: !1,
                type: { name: 'string' },
              },
              control: {
                defaultValue: null,
                description: '',
                name: 'control',
                required: !1,
                type: { name: 'any' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !0,
                type: { name: 'string' },
              },
              activeEdit: {
                defaultValue: null,
                description: '',
                name: 'activeEdit',
                required: !1,
                type: { name: 'string | number' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/skill-level/index.tsx#skilllevel'] = {
              docgenInfo: skilllevel.__docgenInfo,
              name: 'skilllevel',
              path: 'src/my-components/skill-level/index.tsx#skilllevel',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = {
        title: 'SkillLevel',
        component: skill_level,
        argTypes: { onChange: { action: 'Please Click Me' } },
      };
      var Skill_Level = function Template(args) {
        var control = Object(index_esm.c)().control;
        return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
          children: Object(jsx_runtime.jsx)(
            skill_level,
            Object(objectSpread2.a)(Object(objectSpread2.a)({}, args), {}, { control: control }),
          ),
        });
      }.bind({});
      (Skill_Level.args = { name: 'Select', errors: '', activeEdit: '' }),
        (Skill_Level.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  const { control } = useForm();\n  return (\n    <>\n      <SkillLevel {...args} control={control} />\n    </>\n  );\n}',
            },
          },
          Skill_Level.parameters,
        ));
    },
    './src/stories/new-components/step-bar/stepbar.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'StepBarr', function () {
          return StepBarr;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        employeeStepBar = [
          'Personal',
          'Address',
          'Company',
          'Education',
          'Experience',
          'Expertise',
          'Payroll',
        ],
        stepbar_module = __webpack_require__('./src/my-components/step-bar/stepbar.module.scss'),
        stepbar_module_default = __webpack_require__.n(stepbar_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        step_bar = function StepBar(_ref) {
          var activeTab = _ref.activeTab,
            controlWidth = _ref.controlWidth,
            setActive = (_ref.setStepBarActive, _ref.setActive);
          return Object(jsx_runtime.jsx)('div', {
            className: stepbar_module_default.a.wrapper,
            children: Object(jsx_runtime.jsx)('ul', {
              className: stepbar_module_default.a.ul,
              children:
                null == employeeStepBar
                  ? void 0
                  : employeeStepBar.map(function (ele, index) {
                      return Object(jsx_runtime.jsxs)(
                        react.Fragment,
                        {
                          children: [
                            Object(jsx_runtime.jsx)('div', {
                              style: { width: ''.concat(controlWidth, '%') },
                              className: stepbar_module_default.a.afterDiv,
                            }),
                            Object(jsx_runtime.jsxs)('li', {
                              className: stepbar_module_default.a.li,
                              children: [
                                Object(jsx_runtime.jsx)('div', {
                                  className: stepbar_module_default.a.round,
                                  style: {
                                    background: activeTab.includes(ele) ? '#57B894' : '#EBEBEB',
                                    cursor: 'pointer',
                                  },
                                  onClick: function onClick() {
                                    activeTab.includes(ele) && setActive(ele);
                                  },
                                  children: Object(jsx_runtime.jsx)('span', {
                                    style: {
                                      color: activeTab.includes(ele) ? '#ffffff' : '#CACACA',
                                    },
                                    children: index + 1,
                                  }),
                                }),
                                Object(jsx_runtime.jsx)('p', {
                                  style: {
                                    color: activeTab.includes(ele) ? '#57B894' : '#CACACA',
                                    fontWeight: activeTab.includes(ele) ? 600 : 500,
                                  },
                                  children: ele,
                                }),
                              ],
                            }),
                          ],
                        },
                        index,
                      );
                    }),
            }),
          });
        };
      try {
        (stepbar.displayName = 'stepbar'),
          (stepbar.__docgenInfo = {
            description: '',
            displayName: 'stepbar',
            props: {
              activeTab: {
                defaultValue: null,
                description: '',
                name: 'activeTab',
                required: !0,
                type: { name: 'any' },
              },
              setStepBarActive: {
                defaultValue: null,
                description: '',
                name: 'setStepBarActive',
                required: !0,
                type: { name: 'Dispatch<SetStateAction<string[]>>' },
              },
              setActive: {
                defaultValue: null,
                description: '',
                name: 'setActive',
                required: !0,
                type: { name: 'any' },
              },
              controlWidth: {
                defaultValue: null,
                description: '',
                name: 'controlWidth',
                required: !0,
                type: { name: 'number' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/step-bar/index.tsx#stepbar'] = {
              docgenInfo: stepbar.__docgenInfo,
              name: 'stepbar',
              path: 'src/my-components/step-bar/index.tsx#stepbar',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_exports__.default = { title: 'StepBar', component: step_bar, argTypes: {} };
      var StepBarr = function Template(args) {
        return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
          children: Object(jsx_runtime.jsx)(step_bar, Object(objectSpread2.a)({}, args)),
        });
      }.bind({});
      (StepBarr.args = {
        controlWidth: '10',
        activeTab: 'Personal,Address',
        setActive: function setActive() {
          return alert('activeTab');
        },
      }),
        (StepBarr.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <StepBar {...args} />\n    </>\n  );\n}',
            },
          },
          StepBarr.parameters,
        ));
    },
    './src/stories/new-components/tags/tags.stories.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {},
    './src/stories/new-components/tags/tags.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Tagss', function () {
          return Tagss;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        tags_module = __webpack_require__('./src/my-components/tags/tags.module.scss'),
        tags_module_default = __webpack_require__.n(tags_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        my_components_tags = function Tags(_ref) {
          var tagsTextArr = _ref.tagsTextArr;
          return Object(jsx_runtime.jsx)('div', {
            className: tags_module_default.a.tags,
            children: tagsTextArr.map(function (ele, index) {
              return Object(jsx_runtime.jsx)(
                'div',
                {
                  className: tags_module_default.a.tagsText,
                  children: Object(jsx_runtime.jsx)('p', { children: ele }),
                },
                index,
              );
            }),
          });
        };
      try {
        (tags.displayName = 'tags'),
          (tags.__docgenInfo = {
            description: '',
            displayName: 'tags',
            props: {
              tagsTextArr: {
                defaultValue: null,
                description: '',
                name: 'tagsTextArr',
                required: !0,
                type: { name: 'string[]' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/tags/index.tsx#tags'] = {
              docgenInfo: tags.__docgenInfo,
              name: 'tags',
              path: 'src/my-components/tags/index.tsx#tags',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var tags_stories_module = __webpack_require__(
          './src/stories/new-components/tags/tags.stories.module.scss',
        ),
        tags_stories_module_default = __webpack_require__.n(tags_stories_module),
        Tagss =
          ((__webpack_exports__.default = {
            title: 'Tags',
            component: my_components_tags,
            argTypes: { onChange: { action: 'Please Click Me' } },
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(
                my_components_tags,
                Object(objectSpread2.a)({}, args),
              ),
            });
          }.bind({}));
      (Tagss.args = {
        tagsTextArr: ['tag1', 'tag2', 'tag3', 'tag4'],
        textStyle: tags_stories_module_default.a.text,
      }),
        (Tagss.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <Tags {...args} />\n    </>\n  );\n}',
            },
          },
          Tagss.parameters,
        ));
    },
    './src/stories/new-components/textarea/textarea.stories.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {},
    './src/stories/new-components/textarea/textarea.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'TextAreaa', function () {
          return TextAreaa;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        textarea_module =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./src/my-components/textarea/textarea.module.scss')),
        textarea_module_default = __webpack_require__.n(textarea_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        my_components_textarea = function TextArea(_ref) {
          var label = _ref.label,
            name = _ref.name,
            register = _ref.register,
            placeholder = _ref.placeholder,
            errorMessage = _ref.errorMessage,
            isDisable = _ref.isDisable,
            className = _ref.className,
            star = _ref.star;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsxs)('div', {
              className: ''.concat(textarea_module_default.a.note, ' ').concat(className),
              children: [
                label &&
                  Object(jsx_runtime.jsxs)('label', {
                    style: { color: errorMessage ? '#ff5050' : '#2d2d32' },
                    children: [
                      label,
                      ' ',
                      Object(jsx_runtime.jsx)('b', { style: { color: 'red' }, children: star }),
                      ' ',
                    ],
                  }),
                Object(jsx_runtime.jsx)('textarea', {
                  style: { border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea' },
                  placeholder: placeholder,
                  name: name,
                  rows: 6,
                  ref: register,
                  disabled: isDisable || !1,
                  children: errorMessage
                    ? Object(jsx_runtime.jsx)('span', {
                        className: textarea_module_default.a.errorMessage,
                        children: errorMessage,
                      })
                    : '',
                }),
              ],
            }),
          });
        };
      try {
        (textarea.displayName = 'textarea'),
          (textarea.__docgenInfo = {
            description: '',
            displayName: 'textarea',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !1,
                type: { name: '((event: ChangeEvent<HTMLInputElement>) => void)' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: { name: 'HTMLInputTypeAttribute' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              icon: {
                defaultValue: null,
                description: '',
                name: 'icon',
                required: !1,
                type: { name: 'string' },
              },
              onClick: {
                defaultValue: null,
                description: '',
                name: 'onClick',
                required: !1,
                type: { name: '(() => void)' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              readOnly: {
                defaultValue: null,
                description: '',
                name: 'readOnly',
                required: !1,
                type: { name: 'boolean' },
              },
              isDisable: {
                defaultValue: null,
                description: '',
                name: 'isDisable',
                required: !1,
                type: { name: 'boolean' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/textarea/index.tsx#textarea'] = {
              docgenInfo: textarea.__docgenInfo,
              name: 'textarea',
              path: 'src/my-components/textarea/index.tsx#textarea',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var textarea_stories_module = __webpack_require__(
          './src/stories/new-components/textarea/textarea.stories.module.scss',
        ),
        textarea_stories_module_default = __webpack_require__.n(textarea_stories_module),
        TextAreaa =
          ((__webpack_exports__.default = {
            title: 'TextArea',
            component: my_components_textarea,
            argTypes: { onChange: { action: 'Please Click Me' } },
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(
                my_components_textarea,
                Object(objectSpread2.a)({}, args),
              ),
            });
          }.bind({}));
      (TextAreaa.args = {
        label: 'Please Enter',
        placeholder: 'Type Something...',
        name: 'hello',
        isDisable: !1,
        className: textarea_stories_module_default.a.mainView,
      }),
        (TextAreaa.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <TextArea {...args} />\n    </>\n  );\n}',
            },
          },
          TextAreaa.parameters,
        ));
    },
    './src/stories/new-components/textfield/textfield.stories.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {},
    './src/stories/new-components/textfield/textfield.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'TextFieldd', function () {
          return TextFieldd;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        objectWithoutProperties = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js',
        ),
        input_module = __webpack_require__('./src/my-components/textfield/input.module.scss'),
        input_module_default = __webpack_require__.n(input_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        _excluded = [
          'label',
          'onChange',
          'value',
          'name',
          'register',
          'onClick',
          'type',
          'id',
          'className',
          'placeholder',
          'errorMessage',
          'icon',
          'readOnly',
          'isDisable',
          'star',
        ],
        my_components_textfield = function TextField(_ref) {
          var label = _ref.label,
            onChange = _ref.onChange,
            value = _ref.value,
            name = _ref.name,
            register = _ref.register,
            onClick = _ref.onClick,
            type = _ref.type,
            id = _ref.id,
            className = _ref.className,
            placeholder = _ref.placeholder,
            errorMessage = _ref.errorMessage,
            icon = _ref.icon,
            readOnly = _ref.readOnly,
            isDisable = _ref.isDisable,
            star = _ref.star,
            restOfProps = Object(objectWithoutProperties.a)(_ref, _excluded);
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsxs)('div', {
              className: input_module_default.a.inputContainer,
              children: [
                label &&
                  Object(jsx_runtime.jsxs)('label', {
                    style: { color: errorMessage ? '#ff5050' : '#2d2d32' },
                    children: [
                      label,
                      Object(jsx_runtime.jsx)('b', { style: { color: 'red' }, children: star }),
                    ],
                  }),
                Object(jsx_runtime.jsxs)('div', {
                  style: { position: 'relative' },
                  className: className,
                  children: [
                    Object(jsx_runtime.jsx)(
                      'input',
                      Object(objectSpread2.a)(
                        {
                          style: {
                            border: errorMessage ? '1.2px solid #ff5050' : ' 1.2px solid #e2e2ea',
                            backgroundColor: readOnly || isDisable ? '#ddd' : '#fff',
                          },
                          id: id,
                          name: name,
                          value: value,
                          onChange: onChange,
                          type: type,
                          placeholder: placeholder,
                          ref: register,
                          readOnly: readOnly || !1,
                          disabled: isDisable || !1,
                        },
                        restOfProps,
                      ),
                    ),
                    icon &&
                      Object(jsx_runtime.jsx)('img', {
                        className: input_module_default.a.icon,
                        style: { cursor: 'pointer' },
                        src: icon,
                        alt: '',
                        onClick: onClick,
                      }),
                  ],
                }),
                errorMessage &&
                  Object(jsx_runtime.jsx)('span', {
                    className: input_module_default.a.errorMessage,
                    children: errorMessage,
                  }),
              ],
            }),
          });
        };
      try {
        (textfield.displayName = 'textfield'),
          (textfield.__docgenInfo = {
            description: '',
            displayName: 'textfield',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              onChange: {
                defaultValue: null,
                description: '',
                name: 'onChange',
                required: !1,
                type: { name: '((event: ChangeEvent<HTMLInputElement>) => void)' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: { name: 'HTMLInputTypeAttribute' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              icon: {
                defaultValue: null,
                description: '',
                name: 'icon',
                required: !1,
                type: { name: 'string' },
              },
              onClick: {
                defaultValue: null,
                description: '',
                name: 'onClick',
                required: !1,
                type: { name: '(() => void)' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              readOnly: {
                defaultValue: null,
                description: '',
                name: 'readOnly',
                required: !1,
                type: { name: 'boolean' },
              },
              isDisable: {
                defaultValue: null,
                description: '',
                name: 'isDisable',
                required: !1,
                type: { name: 'boolean' },
              },
              id: {
                defaultValue: null,
                description: '',
                name: 'id',
                required: !1,
                type: { name: 'string' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/my-components/textfield/index.tsx#textfield'] = {
              docgenInfo: textfield.__docgenInfo,
              name: 'textfield',
              path: 'src/my-components/textfield/index.tsx#textfield',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var textfield_stories_module = __webpack_require__(
          './src/stories/new-components/textfield/textfield.stories.module.scss',
        ),
        textfield_stories_module_default = __webpack_require__.n(textfield_stories_module),
        TextFieldd =
          ((__webpack_exports__.default = {
            title: 'TextField',
            component: my_components_textfield,
            argTypes: { onChange: { action: 'yes I am Changing' } },
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(
                my_components_textfield,
                Object(objectSpread2.a)({}, args),
              ),
            });
          }.bind({}));
      (TextFieldd.args = {
        label: 'TextField',
        placeholder: 'Write something',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAABHNCSVQICAgIfAhkiAAAEAFJREFUaEPdmQtwHPV9x7/7uKfuqTudXifJr/glbHBDAtSFQsvEoQ2QNkAHjJMpgSmkpJTSQEudNpAUJoOHUDKZTJhJ05A2TNNpZnBKbNwSzMsNGBPH2I7BliXZki1Zj7uT7r23u/39/ncrr9Z3ehg3meGknd2728f/8//+nv+T8CF+SR9iNvw64axnmb+uCf3/gDvfe15w6PMdiHPynfeZ7z1fb4dxgl0Q0A8KZ7/eOnbuGaTecyyARnvnBCzams8XzgllB5Je/dO/jayPd1zl87hukCW5h0YVkWX5YsgSyWUOGgYGTQnpim48P1JMv7b8iQcHakraQedSdkGg5wNXTyH+TBq9b9vVYZ/3XlVSboAk0z99zEPkb/lYkR2Dos/o3wB+Wajo3ww9etcPbJB8pbWdl4qLhZulUG3Y0ukvPH5JNBDcpkryVRDjd/AzA4OpCkyXIr6WKjRuk3SUzg7BMI3BUln76+DX7t5ONyHmGTin6V5w5ZxgjCFN3//kl30u91ahDA+UNxr0rHDBn3ld0NtDMOMB+k6HXJYhj07RDYozkFLtuoppbN/dd+SuTT/Ylqqj5IJVXIhyTjMUUC/+0d3RK3tWbHOp7i1CFTJDoZqAo3+DVKFNDFiVoK1sg7G+C1JzEHp2Ai5PM+QTk5APnoQ8VTirhAA0QX75y2MTZ25Z862H2R/PS8XFwvHwZQKLXN3zkV3VIEG+pZCp0V68+I4EZdAGncZE7/VECPmPd0Ptaa9+nU9BDTRD0gyo+09AeX+EjvXq9TOqC/XTp6YnN3V946H95wM4H5xdNaELbUr2i19/xkOKWYFCYjC56ksMZtK0s2rCp9wqCpd0obCyhUQ1YIwOwB0IkppuSKEYPFMVePYOQJ7M0/msOk3ITJyUaH6MAzv6Dn3ixuf+iU3UqeCc+XAhcCISsmIMNn7no18OeL0PyxQcZPYzAUbqkTmK0EZqmbpehaOX3hrA1IY2lONhGMUsjOE+SJ4ApifHEOzoQqhzOZreHYGrfxKoMFjNX3lfU5IAX3U/ds+mGhwDWpDijOqJ577mgrOgLDD58OYHNywNNf8vh3j2M1ZMru0ZUIxLr8Ao62SWZGZuBaXVUUx1e2GEIsjnihjZ+wZCzS0YOX0aS9auRqxnKYJnyvAenKQIStfMBP+a8jxJtGX10kORr9/3NM+XQ8GGgI3gnOYoVMv82VdfdCuuKyVSjZXi7ax61UBiaATHyvHYAgpyq7woJMNkgi3IpzPIHn8PLV3LUcpPw+P3QG5qQqCkkHoZyFmtrg6mLsRJP/erfWu3/PgZklgoVy/IzJJvLrhZ5njk9i9dnQyEdygSmSOrRUFEKCiiZPU2Jkc5hmPVeIqDFBG6K9CX9cDwRZA6ehhTg4NQ6ditmvAG3fAnWhFDCIGTBuQJSgs1cz6bK9mH6WY0kdlS8fHItvu+alNvTvOsB+dUjSIFlMnPP/Ijj6r+IUVIAiPFGI7Vq/kceyX7m65pQjlWUY8AmR76rCeJ9HQWR19/HdpUHooSQrwjDLffQLQjiVgwCW8xCs9oDq5Mtmqe9nJUmKrIL2nl8S8k6V1lIeo1gpul2rd/7+bYlmXrh9jPqqpVAwinNJmjpEjgNOkUEPSyJiBBH2vtLmSXu1AJBzDc34d9r+6Fm8B7upfCH/WhoJcRW7IUvpYeqLE1COgyQn3D8B0bhkQRt1q6UaCy8iVJOJbN3Nr2rb97vo565wSWueBETqNNff/WB27s8Id/yKYo4NQaHD+bTZODCU8lmSTDiSTcpKCw2o9SmxslQ8N7x4Zw/Mgg3FOjaG1LQPW4RCrwLVkF0xdFoGMFQpFmRDN5RF7+BZRcQWhnpRQBS0/Ja9q3g0898CWHevzlOYHFCWe9t8CESY5u2fqMX1VvE3AEJlN9yL5W87RaGpCqcGSWPIhKVMVUrwrNqyNTqGD/8TQU8jVztB9hF5mdLwQ93oNgawfBS/AEY2hp70BUcaFlz0F4T45WlWOoGT/kusA44X7yL3tryrH98uYssgVpPTjLJAUYKzf22a07vIq6UURHVo7h2PdqVb9oZGgAepkjJbkDfV5c7kaqs4xUZhJFOYCRggcleISZ6VoJTZE4XP4AfBQtDTLt1GQay1b3Ih6JIHp0GOG3DlPVwhNVG3ptzwWC+o37wzXl6vleTcTGcDMmyXATW7a+7lKUdQwjMyD7G6cDe/KmCFkpkb9VKjC9MlJrZQxKefSPFzCeN9GZ7ISXYDo62yigyCjrEnIVGYo3IHJ3/3tHcNnllyJK6UE91I/4gWEoVklmDZcrHprEbXt/1vM3b/zXRA2wXt6bUzmR12qbK7Nla7oa9tm/aKO/atQ8q55OgaJSKlcjpVvG5BI3jsdVDE/k8P6JUbR3d2MVdQRt7VG6swKdWp4CKVoJJlAmcz729h5ct/EixMjv8M4APIfGa2bFYZighHJVuCPp0evXPfvEbgfcOX5nN0u7v/GxasGlb9+aslQTXY1QjL7lCkV012T4NECGY7MBpYry0ibkLo5gcCSNt6jyjyYSWBM04KXIyedIviAUTxBqoguZkoGB/W/jSuoaEsllUA4NQdl36qyv1TxKIFIkPpIau37dv50Dd47fNYKzlGNAdWLzwwcUWe5iEOGQtd5NHAtaSjwEpxEczy5HU3NDC/RL2jFwKoV3Dw+gmdytzaWhUMhDK5YQaE0i0plEuCWBourH2NBptFHSb+1ZBvnoGJS9Q6JrqAk2U6sy3I7+wxffuPPZfptydYPKguBGb33oBY+i/na1F62ap/Wq9qYUHRmOAoAQ1EMWvbEd+oo4zoxPIT2RhplNQy7lUKD6UiN/C4UCiLTE4acAooZjdI0XLlmH3++Hcpxaon3UBpWpCBfN4dmUwGbp+c7DMXoMRxsOKA0j5oLgTv/Jgz/0qsp1lkr2CMY3MMjMKgRWIX/T3W6oLgmVjweRi3owNV0Q4Nl8Gfmihix81JUHqKZmk+ZxG2TFBjpDboQj1MjS4MspBcYZFbFSCYmpLFSKwDyBDEbPmvI9s3XpBYPb/+l7tvT4w0+LtkZk1mozyg+sOrmBImnWv3oFTvR0Y2oyQ0n4GKiQRNirwkU5LaWEMVXh62V4vD6KKSqB0GRoZeTSk2jzmJC1aRzTyCdXbkQgGkMnOcVlh99HzylSUVQsJqbKpX9v+d6j99hSwXkrxxHT9Z3LP7XspiW9+zhCihqSZ5BU4gJZFMv0/v1EHAev+Cgk2qdJpaHhUUwc3ouW7DBam6MoyR6yIUrWHg8CwSABekUg4geYlTImUxmMlqj0D7Qh0bUE7bQcQa6LZSdP4fePHodH9IjAiWzmL1Y+98S/1uDYNJ2pwNbqznjPrCWrWQGFAU/d9MBut6r0VksiMkMqbkX1L8Qz8SpFwdd6OtHU3oqCoeDUxDTOnBmDSuslbeY0Wqgci4TDVHZ5RCopUw7jfKmRyY4XdQxkiigpXirN2tDVFudsgjFK7L+VyWFzvgCfmFADf79/94on9v3MynGWz1ktkIg/M/HgLJs4sqqTWUmc4d76g7tuXxqIPCW8RMBRNUKAYkmBTjhAvvN9j4oMqSR5mzBBJVe2UEK5XEaTYqLNJ8NFhXK5XISH705KqKoKmVLCIIGVqYxtJvj2WBghvxuZ6RxSo+P4nOzCjR433HRJulz8Uduzj/+5zd+sCsUeLc8GuwZwDDlTftExpwRS7/59tDaZrAYQriO5dyM4spcc7V/SNbwY9GHM5UKacpeuuKFT/8elocftgp/KNi03BbNUgJ+7dBpShc7JFstw0/et0RCaA2SubO6tYwgl04i4DDRXVHzsdAjjLw597O43tnMKcEZKe+M6Jxx/aS+cRa7jbfemz12/Jhj7Z2GWIvRXu24GZIfI0ZS8sX4JXikUcHg4hWnKUybNPKgYllQX7Wj+yb/iHgnt0SCODp1BilJDhaKhn8ouL09AUEbHNROQojnHvFNU1s2DI++MbH7nsTfnzXGWGTpvYjdNu3o0Sqj9n/7i932KuqlCrQ3D6WyeVmChAY7dfA0GyWFe+VUfDg+MYjJdRJGLR4qO1FIIl7hiZRfWJhM40XcU7/WfxBiVYmooiERrM2KXjyHvp46gwYuWHF574abnr2PDrm11/W0+OLtpiu6ATfOOVeub/2H17/6Y3GityG0MKCIZLduRqWX++EqMdbXgYCYFjfwmPUFJPEUF9MgkhiYpMLg92LThI1jX4kOPkqWGlWrFQJwqlk6UXBnszPDPBXO/iqniJ//njp0v01nOtZRZFzpbHgvYGVgsOGGej330mqVbkhftIp8LsYJsVsL3aNNaI+jbuBpvqhqmKxqauB0j+FFa7Ro60IczOROX9q5Gh5LHBlpeTySTyHUvQyLRgT2Zn+Ol1K752MjX9X/ccctPHqnB1e3lGilnB5zVtFq+x/vvXXbDut9p7nhKMYy1OkVNnQCpkRSJuZiMY3zjehRbaSGW/Gg0nUaaVr7ytH5iUL5Tefmdgk+UomJnLAiJ0ogvEMLe8pvYW3pzXjhazvjaT2/ebofjaxa0zGCHnlllpg+d0VPZ3N3bvHXVFd8lZ7xcpAYONFx1UHDR/F7qtGmFKBGDkohgnCrniuRBp9sPV+2nLJ32GaNEDbCEzpyBY9JpfDP2yrxwFU2/c+ctP/mXGpCl3DnX1TNLO1y94GKHFOb6ylW33dmqev6KzDLIymmsHtWFRcpx5I0wKQL2tWgojwFrTD+pRl07938Ed9JDGS7hxkY9Ti2QD1/51FA+5+eT6r+oXsgUT00vf+nel6xfgOqqNpdZOgEt87Q3sZYfCtjPdK+N3JvsvSvm8t5BJhrMUTrIESAvA5oJCaVuGUf3p5HQvAhTpqHf4ZCln7JyPgn+FS4sV1r/c9ehvidfvk3taF4T+4+GcBXjMy/cvJ1Xv+ouCtmva6ScdY6lXL0AYylo34tJeHbdtZuaTOUKRTM/4fGqnWYXVf5xBWfeLWI0VxJLf7JuTGumuQs+9ec7p0/s3H3yZLo2YOOyRzauiffGn6aJuWhmsIZ5oJTTPv/fn/3pL+YzR/vg57JxC94OaQ8ydiWtY8tPrb10bTIZunZtZ295QMfb2dTJ7af6hhwDtEI6761CWN9w74ZA/NK2i3IDmf17vrLH+StPQ3NcKFw9/xP9qGNj9ZyfWec1Mn8rEFilkx3MeSwW+WwTMi/YfD5Xz3wtJe3qOKHOUa52I+taK2Tb85NdOfuxE8p+7VwWJ76bz+ca+afdB53+aClmN2Xns+xgdgXtKtY7Z0GKLcYsnTNUzw+dPjkXmH2ATgDnz1JOpc5J1AsJGPNK7DjBDmipYgE1em+/hdM0LWBnKbUoM2ykwmLhnGZWD7bROfbZb6RMvXMWPcbF+FyjmzvvYX8/3/3ngliUCdYb3HwPX+xszVfOWfdrNPAPDNQoAi4WZCHnzzd5FxTmQvrcQuB+o+fMN7O/0cF90Id/qOH+D9yoV6E2sH6hAAAAAElFTkSuQmCC',
        isDisable: !1,
        readOnly: !1,
        id: '12',
        className: textfield_stories_module_default.a.mainView,
        onClick: function onClick() {
          return alert('Please Dont Touch');
        },
      }),
        (TextFieldd.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <TextField {...args} />\n    </>\n  );\n}',
            },
          },
          TextFieldd.parameters,
        ));
    },
    './src/stories/new-components/time-picker/timepicker.stories.module.scss': function (
      module,
      exports,
      __webpack_require__,
    ) {},
    './src/stories/new-components/time-picker/timepicker.stories.tsx': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'TimePickerr', function () {
          return TimePickerr;
        });
      var objectSpread2 = __webpack_require__(
          './node_modules/@babel/runtime/helpers/esm/objectSpread2.js',
        ),
        textfield =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./src/new-components/textfield/index.tsx')),
        time_module = __webpack_require__('./src/new-components/time-picker/time.module.scss'),
        time_module_default = __webpack_require__.n(time_module),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        time_picker = function TimePicker(_ref) {
          var placeholder = _ref.placeholder,
            label = _ref.label,
            name = _ref.name,
            register = _ref.register,
            errorMessage = _ref.errorMessage,
            star = _ref.star;
          return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
            children: Object(jsx_runtime.jsx)('div', {
              className: time_module_default.a.main,
              children: Object(jsx_runtime.jsx)('div', {
                className: time_module_default.a.inpDiv,
                children: Object(jsx_runtime.jsx)(textfield.a, {
                  label: label,
                  star: star,
                  type: 'time',
                  id: 'time',
                  register: register,
                  placeholder: placeholder,
                  errorMessage: errorMessage,
                  name: name,
                }),
              }),
            }),
          });
        };
      try {
        (timepicker.displayName = 'timepicker'),
          (timepicker.__docgenInfo = {
            description: '',
            displayName: 'timepicker',
            props: {
              label: {
                defaultValue: null,
                description: '',
                name: 'label',
                required: !1,
                type: { name: 'string' },
              },
              value: {
                defaultValue: null,
                description: '',
                name: 'value',
                required: !1,
                type: { name: 'string' },
              },
              name: {
                defaultValue: null,
                description: '',
                name: 'name',
                required: !1,
                type: { name: 'string' },
              },
              placeholder: {
                defaultValue: null,
                description: '',
                name: 'placeholder',
                required: !1,
                type: { name: 'string' },
              },
              inputRef: {
                defaultValue: null,
                description: '',
                name: 'inputRef',
                required: !1,
                type: { name: 'string' },
              },
              register: {
                defaultValue: null,
                description: '',
                name: 'register',
                required: !1,
                type: { name: 'any' },
              },
              errorMessage: {
                defaultValue: null,
                description: '',
                name: 'errorMessage',
                required: !1,
                type: { name: 'string' },
              },
              star: {
                defaultValue: null,
                description: '',
                name: 'star',
                required: !1,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['src/new-components/time-picker/index.tsx#timepicker'] = {
              docgenInfo: timepicker.__docgenInfo,
              name: 'timepicker',
              path: 'src/new-components/time-picker/index.tsx#timepicker',
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var timepicker_stories_module = __webpack_require__(
          './src/stories/new-components/time-picker/timepicker.stories.module.scss',
        ),
        timepicker_stories_module_default = __webpack_require__.n(timepicker_stories_module),
        TimePickerr =
          ((__webpack_exports__.default = {
            title: 'TimePicker',
            component: time_picker,
            argTypes: { onClick: { action: 'Please Click Me' } },
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: Object(jsx_runtime.jsx)(time_picker, Object(objectSpread2.a)({}, args)),
            });
          }.bind({}));
      (TimePickerr.args = {
        label: 'Time Picker',
        placeholder: '00/00/00',
        errorMessage: 'errorMessage',
        mainClass: timepicker_stories_module_default.a.mainClass,
      }),
        (TimePickerr.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                '(args: any) => {\n  return (\n    <>\n      <TimePicker {...args} />\n    </>\n  );\n}',
            },
          },
          TimePickerr.parameters,
        ));
    },
    './storybook-init-framework-entry.js': function (
      module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__('./node_modules/@storybook/react/dist/esm/client/index.js');
    },
    0: function (module, exports, __webpack_require__) {
      __webpack_require__('./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js'),
        __webpack_require__('./node_modules/@storybook/core-client/dist/esm/globals/globals.js'),
        __webpack_require__('./storybook-init-framework-entry.js'),
        __webpack_require__(
          './node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-links/preview.js-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js',
        ),
        __webpack_require__(
          './node_modules/@storybook/addon-interactions/preview.js-generated-config-entry.js',
        ),
        __webpack_require__('./.storybook/preview.js-generated-config-entry.js'),
        (module.exports = __webpack_require__('./generated-stories-entry.js'));
    },
    1: function (module, exports) {},
  },
  [[0, 5, 6]],
]);
