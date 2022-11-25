'use strict';
(() => {
  var exports = {};
  exports.id = 888;
  exports.ids = [888, 417, 817, 153];
  exports.modules = {
    /***/ 1641: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(9114);
      /* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          _apollo_client__WEBPACK_IMPORTED_MODULE_0__
        );

      const client =
        new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({
          uri:
            process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
              ? 'https://api.thegraph.com/subgraphs/name/julibi/moonpage-graphs-dev'
              : 'https://api.thegraph.com/subgraphs/name/julibi/moonpage-graphs-prod',
          cache:
            new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache(),
        });
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = client;

      /***/
    },

    /***/ 1019: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(997);
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__
        );
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(6689);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(6577);
      /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(7518);
      /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default =
        /*#__PURE__*/ __webpack_require__.n(
          styled_components__WEBPACK_IMPORTED_MODULE_3__
        );
      /* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(5468);
      /* harmony import */ var _LinkWrapper__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(1394);

      const Root = styled_components__WEBPACK_IMPORTED_MODULE_3___default().div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_4__ /* .BG_DARK */.aL};
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 2rem 1rem;
  }
`;
      const Content = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .div`
  width: 80%;
  display: flex;

  justify-content: space-evenly;
`;
      const SocialMediaLinkWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_4__ /* .MAIN_TEXT_COLOR */._I};
`;
      const SocialMediaName = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .span`
  font-family: ${
    _themes__WEBPACK_IMPORTED_MODULE_4__ /* .FONT_SERIF_BOLD */.UY
  };
  display: inline-block;
  margin-block-start: 1rem;

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;
      const StyledLink = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .a``;
      const Copyright = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .div`
  width: 80%;
  margin-block-start: 2rem;
  padding-block-start: 2rem;
  text-align: center;
  border-block-start: 1px ${
    _themes__WEBPACK_IMPORTED_MODULE_4__ /* .DISABLED_WHITE */.s0
  } solid;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_4__ /* .DISABLED_WHITE */.s0};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
      const Blockspan = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .span`
  display: inline-block;
`;
      const GreyWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3___default()
        .span`
  margin-block-start: 1rem;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_4__ /* .DISABLED_WHITE */.s0};
  line-break: anywhere;
`;
      const Footer = () => {
        return /*#__PURE__*/ (0,
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
          children: [
            /*#__PURE__*/ (0,
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Content, {
              children: [
                /*#__PURE__*/ (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  SocialMediaLinkWrapper,
                  {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    href: 'https://mobile.twitter.com/moonpage_nft',
                    children: [
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        next_image__WEBPACK_IMPORTED_MODULE_2__['default'],
                        {
                          height: '30px',
                          width: '30px',
                          src: '/Twitter.svg',
                          alt: 'Twitter',
                        }
                      ),
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        SocialMediaName,
                        {
                          children: 'Twitter',
                        }
                      ),
                    ],
                  }
                ),
                /*#__PURE__*/ (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  SocialMediaLinkWrapper,
                  {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    href: 'https://t.me/moonpagedao',
                    children: [
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        next_image__WEBPACK_IMPORTED_MODULE_2__['default'],
                        {
                          height: '30px',
                          width: '30px',
                          src: '/Telegram.svg',
                          alt: 'Twitter',
                          priority: true,
                        }
                      ),
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        SocialMediaName,
                        {
                          children: 'Telegram',
                        }
                      ),
                    ],
                  }
                ),
                /*#__PURE__*/ (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  SocialMediaLinkWrapper,
                  {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    href: 'https://www.instagram.com/moonpage.io/',
                    children: [
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        next_image__WEBPACK_IMPORTED_MODULE_2__['default'],
                        {
                          height: '30px',
                          width: '30px',
                          src: '/Instagram.svg',
                          alt: 'Instagram',
                          priority: true,
                        }
                      ),
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        SocialMediaName,
                        {
                          children: 'Instagram',
                        }
                      ),
                    ],
                  }
                ),
                /*#__PURE__*/ (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  SocialMediaLinkWrapper,
                  {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    href: 'https://docs.moonpage.io',
                    children: [
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        next_image__WEBPACK_IMPORTED_MODULE_2__['default'],
                        {
                          height: '30px',
                          width: '28px',
                          src: '/Docs.svg',
                          alt: 'Twitter',
                          priority: true,
                        }
                      ),
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        SocialMediaName,
                        {
                          children: 'Docs',
                        }
                      ),
                    ],
                  }
                ),
                /*#__PURE__*/ (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  SocialMediaLinkWrapper,
                  {
                    target: '_self',
                    rel: 'noopener noreferrer',
                    href: '/about#founders',
                    children: [
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        next_image__WEBPACK_IMPORTED_MODULE_2__['default'],
                        {
                          height: '30px',
                          width: '28px',
                          src: '/Team.svg',
                          alt: 'Team',
                          priority: true,
                        }
                      ),
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        SocialMediaName,
                        {
                          children: 'Team',
                        }
                      ),
                    ],
                  }
                ),
              ],
            }),
            /*#__PURE__*/ (0,
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Copyright, {
              children: [
                ' ',
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                  next_image__WEBPACK_IMPORTED_MODULE_2__['default'],
                  {
                    height: '130px',
                    width: '130px',
                    src: `/logo/Logo.svg`,
                    alt: 'moonpage',
                    priority: true,
                  }
                ),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                  Blockspan,
                  {
                    children: '\xa9 2022 Moonpage. All rights reserved.',
                  }
                ),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                  GreyWrapper,
                  {
                    children:
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        _LinkWrapper__WEBPACK_IMPORTED_MODULE_5__ /* ["default"] */.Z,
                        {
                          url: 'https://polygonscan.com/address/0x0eC473B1BD821D386cd7209203Ba6826Fd653B96#code',
                          underline: false,
                          children:
                            'Moonpage Collection: 0x0eC473B1BD821D386cd7209203Ba6826Fd653B96',
                        }
                      ),
                  }
                ),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                  GreyWrapper,
                  {
                    children:
                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                        _LinkWrapper__WEBPACK_IMPORTED_MODULE_5__ /* ["default"] */.Z,
                        {
                          url: 'https://moonpage.gitbook.io/moonpage-terms-of-service/',
                          children: 'Terms Of Service',
                        }
                      ),
                  }
                ),
              ],
            }),
          ],
        });
      };
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Footer;

      /***/
    },

    /***/ 6627: /***/ (module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.a(
        module,
        async (
          __webpack_handle_async_dependencies__,
          __webpack_async_result__
        ) => {
          try {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
              /*#__PURE__*/ __webpack_require__.n(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__
              );
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(6689);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
              /*#__PURE__*/ __webpack_require__.n(
                react__WEBPACK_IMPORTED_MODULE_1__
              );
            /* harmony import */ var react_fast_marquee__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(5700);
            /* harmony import */ var react_fast_marquee__WEBPACK_IMPORTED_MODULE_2___default =
              /*#__PURE__*/ __webpack_require__.n(
                react_fast_marquee__WEBPACK_IMPORTED_MODULE_2__
              );
            /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ =
              __webpack_require__(7518);
            /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default =
              /*#__PURE__*/ __webpack_require__.n(
                styled_components__WEBPACK_IMPORTED_MODULE_3__
              );
            /* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ =
              __webpack_require__(5468);
            /* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_5__ =
              __webpack_require__(1019);
            /* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_6__ =
              __webpack_require__(3491);
            var __webpack_async_dependencies__ =
              __webpack_handle_async_dependencies__([
                _Navbar__WEBPACK_IMPORTED_MODULE_6__,
              ]);
            _Navbar__WEBPACK_IMPORTED_MODULE_6__ = (
              __webpack_async_dependencies__.then
                ? (await __webpack_async_dependencies__)()
                : __webpack_async_dependencies__
            )[0];

            const StyledMarquee = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(
              react_fast_marquee__WEBPACK_IMPORTED_MODULE_2___default()
            )`
  height: 100px;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_4__ /* .POP */.hl};
  font-family: ${
    _themes__WEBPACK_IMPORTED_MODULE_4__ /* .FONT_SERIF_BOLD */.UY
  };
  font-size: 20px;

  @media (max-width: 900px) {
    height: 50px;
  }
`;
            const Layout = ({ children }) => {
              return /*#__PURE__*/ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                children: [
                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                    _Navbar__WEBPACK_IMPORTED_MODULE_6__ /* ["default"] */.Z,
                    {}
                  ),
                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                    StyledMarquee,
                    {
                      gradient: false,
                      children:
                        'Call for Writers - Be one of the first 100 creators on Moonpage! This will get you a post on our Twitter and Instagram channels with a snippet from your project and you will be able to claim an exclusive Early Creator Badge soon.',
                    }
                  ),
                  children,
                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                    _Footer__WEBPACK_IMPORTED_MODULE_5__ /* ["default"] */.Z,
                    {}
                  ),
                ],
              });
            };
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Layout;

            __webpack_async_result__();
          } catch (e) {
            __webpack_async_result__(e);
          }
        }
      );

      /***/
    },

    /***/ 1394: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(997);
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__
        );
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(6689);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(7518);
      /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default =
        /*#__PURE__*/ __webpack_require__.n(
          styled_components__WEBPACK_IMPORTED_MODULE_2__
        );

      const Root = styled_components__WEBPACK_IMPORTED_MODULE_2___default().a`
  color: inherit;
  display: ${({ flex }) => (flex ? 'flex' : 'inline-block')};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;
      const LinkWrapper = ({
        children,
        url,
        target = '_blank',
        underline = true,
        flex = false,
      }) => {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
          Root,
          {
            underline: underline,
            flex: flex,
            target: target,
            rel: 'noopener noreferrer',
            href: url,
            children: children,
          }
        );
      };
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
        LinkWrapper;

      /***/
    },

    /***/ 3491: /***/ (module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.a(
        module,
        async (
          __webpack_handle_async_dependencies__,
          __webpack_async_result__
        ) => {
          try {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
              /*#__PURE__*/ __webpack_require__.n(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__
              );
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(6689);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
              /*#__PURE__*/ __webpack_require__.n(
                react__WEBPACK_IMPORTED_MODULE_1__
              );
            /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(8054);
            /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2___default =
              /*#__PURE__*/ __webpack_require__.n(
                _web3_react_core__WEBPACK_IMPORTED_MODULE_2__
              );
            /* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ =
              __webpack_require__(6577);
            /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ =
              __webpack_require__(9097);
            /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ =
              __webpack_require__(7518);
            /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default =
              /*#__PURE__*/ __webpack_require__.n(
                styled_components__WEBPACK_IMPORTED_MODULE_5__
              );
            /* harmony import */ var _components_WalletConnection__WEBPACK_IMPORTED_MODULE_6__ =
              __webpack_require__(3651);
            /* harmony import */ var _hooks_useEagerConnect__WEBPACK_IMPORTED_MODULE_7__ =
              __webpack_require__(2191);
            /* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_8__ =
              __webpack_require__(5468);
            /* harmony import */ var _components_LinkWrapper__WEBPACK_IMPORTED_MODULE_9__ =
              __webpack_require__(1394);
            var __webpack_async_dependencies__ =
              __webpack_handle_async_dependencies__([
                _components_WalletConnection__WEBPACK_IMPORTED_MODULE_6__,
              ]);
            _components_WalletConnection__WEBPACK_IMPORTED_MODULE_6__ = (
              __webpack_async_dependencies__.then
                ? (await __webpack_async_dependencies__)()
                : __webpack_async_dependencies__
            )[0];

            const Root = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .div`
  display: block;

  @media (max-width: 900px) {
    display: none;
  }
  display: flex;
  justify-content: space-between;
`;
            const LogoWrapper = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
`;
            const LogoText = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .p`
  font-family: ${
    _themes__WEBPACK_IMPORTED_MODULE_8__ /* .FONT_SERIF_BLACK */.c7
  };
  font-size: 24px;
  margin-left: 1rem;
`;
            const RootMobile = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(
              Root
            )`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
  align-items: center;
  margin: 1rem;
`;
            const ActionsWrapper = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
            const NavList = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .ul`
  display: flex;
  margin: 2rem;
  align-items: center;
  font-family: ${
    _themes__WEBPACK_IMPORTED_MODULE_8__ /* .FONT_SERIF_BOLD */.UY
  };
`;
            const NavListItem = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .li`
  list-style-type: none;
  margin-inline-end: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
            const BurgerButton = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;
            const BurgerLine = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .button`
  width: 35px;
  height: 4px;
  background: #fff;
  border-radius: 5px;
  border: none;
  padding: 0;
  transition: all 0.5s ease-in-out;
`;
            // TODO fade in out with styled components - find out how to use props with styled components
            const MobileNavMenu = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .div`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_8__ /* .BG_NORMAL */.te};
`;
            const MobileNavList = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .ul`
  margin-block-start: 4rem;
  padding-inline-start: 0;
  font-family: ${
    _themes__WEBPACK_IMPORTED_MODULE_8__ /* .FONT_SERIF_BOLD */.UY
  };
`;
            const MobileNavListItem = styled_components__WEBPACK_IMPORTED_MODULE_5___default()
              .li`
  margin-block-end: 3rem;
  list-style-type: none;
  text-align: center;
`;
            const routes = [
              {
                name: 'Home',
                path: '/',
              },
              {
                name: 'Projects',
                path: '/projects',
              },
              {
                name: 'Create',
                path: '/create',
              },
              {
                name: 'Bookshelf',
                path: '/mybookshelf',
              },
              {
                name: 'About',
                path: '/about',
              },
            ];
            const Navbar = () => {
              const { chainId } = (0,
              _web3_react_core__WEBPACK_IMPORTED_MODULE_2__.useWeb3React)();
              const hasTried = (0,
              _hooks_useEagerConnect__WEBPACK_IMPORTED_MODULE_7__ /* .useEagerConnect */.y)();
              const { 0: isBurgerMenuOpen, 1: setIsBurgerMenuOpen } = (0,
              react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
              // TODO WALLET CONNECTION ON MOBILE!
              return /*#__PURE__*/ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                {
                  children: [
                    /*#__PURE__*/ (0,
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      RootMobile,
                      {
                        children: [
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            _components_LinkWrapper__WEBPACK_IMPORTED_MODULE_9__ /* ["default"] */.Z,
                            {
                              url: '/',
                              target: '_self',
                              flex: true,
                              underline: false,
                              children:
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                  next_image__WEBPACK_IMPORTED_MODULE_3__[
                                    'default'
                                  ],
                                  {
                                    height: '40px',
                                    width: '40px',
                                    src: `/logo/Logo.png`,
                                    alt: 'moonpage',
                                    priority: true,
                                  }
                                ),
                            }
                          ),
                          /*#__PURE__*/ (0,
                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                            ActionsWrapper,
                            {
                              children: [
                                !isBurgerMenuOpen &&
                                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                    _components_WalletConnection__WEBPACK_IMPORTED_MODULE_6__ /* ["default"] */.Z,
                                    {}
                                  ),
                                /*#__PURE__*/ (0,
                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                  BurgerButton,
                                  {
                                    onClick: () =>
                                      setIsBurgerMenuOpen(!isBurgerMenuOpen),
                                    children: [
                                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                        BurgerLine,
                                        {
                                          style: isBurgerMenuOpen
                                            ? {
                                                transform:
                                                  'rotate(45deg) translate(8px, 8px)',
                                              }
                                            : {},
                                        }
                                      ),
                                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                        BurgerLine,
                                        {
                                          style: isBurgerMenuOpen
                                            ? {
                                                transform: 'translateX(-50px)',
                                                background: 'transparent',
                                              }
                                            : {},
                                        }
                                      ),
                                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                        BurgerLine,
                                        {
                                          style: isBurgerMenuOpen
                                            ? {
                                                transform:
                                                  'rotate(-45deg) translate(8px, -8px)',
                                              }
                                            : {},
                                        }
                                      ),
                                    ],
                                  }
                                ),
                              ],
                            }
                          ),
                          isBurgerMenuOpen &&
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                              MobileNavMenu,
                              {
                                children:
                                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                    MobileNavList,
                                    {
                                      children: routes.map((route, idx) =>
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                          MobileNavListItem,
                                          {
                                            onClick: () =>
                                              setIsBurgerMenuOpen(false),
                                            children:
                                              /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                next_link__WEBPACK_IMPORTED_MODULE_4__[
                                                  'default'
                                                ],
                                                {
                                                  href: route.path,
                                                  passHref: true,
                                                  children:
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                      _themes__WEBPACK_IMPORTED_MODULE_8__ /* .StyledLink */.Fg,
                                                      {
                                                        children: route.name,
                                                      }
                                                    ),
                                                }
                                              ),
                                          },
                                          idx
                                        )
                                      ),
                                    }
                                  ),
                              }
                            ),
                        ],
                      }
                    ),
                    /*#__PURE__*/ (0,
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
                      children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                          _components_LinkWrapper__WEBPACK_IMPORTED_MODULE_9__ /* ["default"] */.Z,
                          {
                            url: '/',
                            target: '_self',
                            flex: true,
                            underline: false,
                            children: /*#__PURE__*/ (0,
                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              LogoWrapper,
                              {
                                children: [
                                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                    next_image__WEBPACK_IMPORTED_MODULE_3__[
                                      'default'
                                    ],
                                    {
                                      height: '80px',
                                      width: '80px',
                                      src: `/logo/Logo.png`,
                                      alt: 'moonpage',
                                      priority: true,
                                    }
                                  ),
                                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                    LogoText,
                                    {
                                      children: 'moonpage',
                                    }
                                  ),
                                ],
                              }
                            ),
                          }
                        ),
                        /*#__PURE__*/ (0,
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                          NavList,
                          {
                            children: [
                              routes.map((route, idx) =>
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                  NavListItem,
                                  {
                                    children:
                                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                        next_link__WEBPACK_IMPORTED_MODULE_4__[
                                          'default'
                                        ],
                                        {
                                          href: route.path,
                                          passHref: true,
                                          children:
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                              _themes__WEBPACK_IMPORTED_MODULE_8__ /* .StyledLink */.Fg,
                                              {
                                                children: route.name,
                                              }
                                            ),
                                        }
                                      ),
                                  },
                                  idx
                                )
                              ),
                              /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                _components_WalletConnection__WEBPACK_IMPORTED_MODULE_6__ /* ["default"] */.Z,
                                {}
                              ),
                            ],
                          }
                        ),
                      ],
                    }),
                  ],
                }
              );
            };
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              Navbar;

            __webpack_async_result__();
          } catch (e) {
            __webpack_async_result__(e);
          }
        }
      );

      /***/
    },

    /***/ 8955: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(1187);
      /* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          react_toastify__WEBPACK_IMPORTED_MODULE_0__
        );
      /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(7518);
      /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(
          styled_components__WEBPACK_IMPORTED_MODULE_1__
        );

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(
        react_toastify__WEBPACK_IMPORTED_MODULE_0__.ToastContainer
      )`
  z-index: 9999;
  -webkit-transform: translate3d(0, 0, 9999px);
  position: fixed;
  padding: 4px;
  width: 320px;
  box-sizing: border-box;
  color: #ebe8e2;
  top: 1em;
  right: 1em;
  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
    }
    .Toastify__toast-container--top-left,
    .Toastify__toast-container--top-center,
    .Toastify__toast-container--top-right {
      top: 0;
      transform: translateX(0);
    }
  }
  .Toastify__toast {
    position: relative;
    min-height: 64px;
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
      0 2px 15px 0 rgba(0, 0, 0, 0.05);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    max-height: 800px;
    overflow: hidden;

    cursor: pointer;
    direction: ltr;
  }
  .Toastify__toast--dark {
    background-color: white;
    color: #1b1e28;
  }
  .Toastify__toast--default {
    background-color: white;
    color: #1b1e28;
  }
  .Toastify__toast--info {
    background-color: white;
    color: #1b1e28;
  }
  .Toastify__toast--success {
    background-color: white;
    color: #1b1e28;
  }
  .Toastify__toast--warning {
    background-color: white;
    color: #1b1e28;
  }
  .Toastify__toast--error {
    background-color: white;
    color: #1b1e28;
  }
  .Toastify__toast-body {
    margin: auto 0;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 6px;
    display: flex;
    align-items: center;
  }
  .Toastify--animate-icon {
    margin-inline-end: 1rem;
    height: 36px;
  }

  .Toastify--animate {
    animation-fill-mode: both;
    animation-duration: 0.7s;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0;
    }
  }
  .Toastify__close-button {
    color: #1b1e28;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    -ms-flex-item-align: start;
    align-self: flex-start;
  }
  .Toastify__close-button--default {
    color: #1b1e28;
    opacity: 0.3;
  }
  .Toastify__close-button > svg {
    fill: currentColor;
    height: 16px;
    width: 14px;
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
  .Toastify__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 9999;
    opacity: 0.7;
    background-color: pink;
    transform-origin: left;
  }
  .Toastify__progress-bar--animated {
    animation: Toastify__trackProgress linear 1 forwards;
  }
  .Toastify__progress-bar--controlled {
    transition: transform 0.2s;
  }
  .Toastify__progress-bar--default {
    background: linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    );
  }
  .Toastify__progress-bar--dark {
    background: #e74c3c;
  }
  .Toastify__progress-bar--error {
    background: #fa9896;
  }
  .Toastify__progress-bar--info {
    background: #bee7ed;
  }
  .Toastify__progress-bar--success {
    background: #85f9e2;
  }
  @keyframes Toastify__bounceInRight {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes Toastify__bounceOutRight {
    20% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }
  }
  @keyframes Toastify__bounceInLeft {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }
    75% {
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      transform: translate3d(5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes Toastify__bounceOutLeft {
    20% {
      opacity: 1;
      transform: translate3d(20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
  }
  @keyframes Toastify__bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }
    75% {
      transform: translate3d(0, 10px, 0);
    }
    90% {
      transform: translate3d(0, -5px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__bounceOutUp {
    20% {
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }
  }
  @keyframes Toastify__bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0);
    }
    75% {
      transform: translate3d(0, -10px, 0);
    }
    90% {
      transform: translate3d(0, 5px, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes Toastify__bounceOutDown {
    20% {
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }
  }
  .Toastify__bounce-enter--top-right,
  .Toastify__bounce-enter--bottom-right {
    animation-name: Toastify__bounceInRight;
  }

  .Toastify__bounce-exit--top-right,
  .Toastify__bounce-exit--bottom-right {
    animation-name: Toastify__bounceOutRight;
  }

  @keyframes Toastify__zoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes Toastify__zoomOut {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    to {
      opacity: 0;
    }
  }
  .Toastify__zoom-enter {
    animation-name: Toastify__zoomIn;
  }

  .Toastify__zoom-exit {
    animation-name: Toastify__zoomOut;
  }

  @keyframes Toastify__flipIn {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }
    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }
    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
      transform: perspective(400px);
    }
  }
  @keyframes Toastify__flipOut {
    from {
      transform: perspective(400px);
    }
    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }
    to {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }
  .Toastify__flip-enter {
    animation-name: Toastify__flipIn;
  }

  .Toastify__flip-exit {
    animation-name: Toastify__flipOut;
  }

  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideInLeft {
    from {
      transform: translate3d(-110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideInUp {
    from {
      transform: translate3d(0, 110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideInDown {
    from {
      transform: translate3d(0, -110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0);
    }
  }
  @keyframes Toastify__slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(-110%, 0, 0);
    }
  }
  @keyframes Toastify__slideOutDown {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(0, 500px, 0);
    }
  }
  @keyframes Toastify__slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(0, -500px, 0);
    }
  }
  .Toastify__slide-enter--top-right,
  .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight;
  }

  .Toastify__slide-exit--top-right,
  .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight;
  }

  /*# sourceMappingURL=ReactToastify.css.map */
`;

      /***/
    },

    /***/ 3651: /***/ (module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.a(
        module,
        async (
          __webpack_handle_async_dependencies__,
          __webpack_async_result__
        ) => {
          try {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ Z: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
              /*#__PURE__*/ __webpack_require__.n(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__
              );
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(6689);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
              /*#__PURE__*/ __webpack_require__.n(
                react__WEBPACK_IMPORTED_MODULE_1__
              );
            /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(8054);
            /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2___default =
              /*#__PURE__*/ __webpack_require__.n(
                _web3_react_core__WEBPACK_IMPORTED_MODULE_2__
              );
            /* harmony import */ var _WalletIndicator__WEBPACK_IMPORTED_MODULE_3__ =
              __webpack_require__(3092);
            /* harmony import */ var _WalletConnectionModal__WEBPACK_IMPORTED_MODULE_4__ =
              __webpack_require__(9285);
            var __webpack_async_dependencies__ =
              __webpack_handle_async_dependencies__([
                _WalletConnectionModal__WEBPACK_IMPORTED_MODULE_4__,
              ]);
            _WalletConnectionModal__WEBPACK_IMPORTED_MODULE_4__ = (
              __webpack_async_dependencies__.then
                ? (await __webpack_async_dependencies__)()
                : __webpack_async_dependencies__
            )[0];

            const WalletConnection = () => {
              const { account, chainId } = (0,
              _web3_react_core__WEBPACK_IMPORTED_MODULE_2__.useWeb3React)();
              const { 0: showConnectModal, 1: setShowConnectModal } = (0,
              react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
              return /*#__PURE__*/ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                children: [
                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                    _WalletIndicator__WEBPACK_IMPORTED_MODULE_3__ /* ["default"] */.Z,
                    {
                      address: account,
                      chain: chainId,
                      handleClick: () => setShowConnectModal(true),
                      showLoading: false,
                    }
                  ),
                  showConnectModal &&
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                      _WalletConnectionModal__WEBPACK_IMPORTED_MODULE_4__ /* ["default"] */.Z,
                      {
                        onClose: () => setShowConnectModal(false),
                      }
                    ),
                ],
              });
            };
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              WalletConnection;

            __webpack_async_result__();
          } catch (e) {
            __webpack_async_result__(e);
          }
        }
      );

      /***/
    },

    /***/ 2191: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ y: () => /* binding */ useEagerConnect,
        /* harmony export */
      });
      /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(8054);
      /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          _web3_react_core__WEBPACK_IMPORTED_MODULE_0__
        );
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(6689);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(5680);

      function useEagerConnect() {
        const { activate, active } = (0,
        _web3_react_core__WEBPACK_IMPORTED_MODULE_0__.useWeb3React)();
        const { 0: tried, 1: setTried } = (0,
        react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          _connectors__WEBPACK_IMPORTED_MODULE_2__ /* .injected.isAuthorized */.Lj.isAuthorized()
            .then((isAuthorized) => {
              if (isAuthorized) {
                activate(
                  _connectors__WEBPACK_IMPORTED_MODULE_2__ /* .injected */.Lj,
                  undefined,
                  true
                ).catch(() => {
                  setTried(true);
                });
              } else {
                setTried(true);
              }
            });
        }, []); // intentionally only running on mount (make sure it's only mounted once :))
        // if the connection worked, wait until we get confirmation of that to flip the flag
        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          if (!tried && active) {
            setTried(true);
          }
        }, [tried, active]);
        return tried;
      }

      /***/
    },

    /***/ 5118: /***/ (module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.a(
        module,
        async (
          __webpack_handle_async_dependencies__,
          __webpack_async_result__
        ) => {
          try {
            __webpack_require__.r(__webpack_exports__);
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
              /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
              /* harmony export */
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
              __webpack_require__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
              /*#__PURE__*/ __webpack_require__.n(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__
              );
            /* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ =
              __webpack_require__(968);
            /* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default =
              /*#__PURE__*/ __webpack_require__.n(
                next_head__WEBPACK_IMPORTED_MODULE_1__
              );
            /* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2__ =
              __webpack_require__(9114);
            /* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2___default =
              /*#__PURE__*/ __webpack_require__.n(
                _apollo_client__WEBPACK_IMPORTED_MODULE_2__
              );
            /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3__ =
              __webpack_require__(8054);
            /* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3___default =
              /*#__PURE__*/ __webpack_require__.n(
                _web3_react_core__WEBPACK_IMPORTED_MODULE_3__
              );
            /* harmony import */ var _ethersproject_providers__WEBPACK_IMPORTED_MODULE_4__ =
              __webpack_require__(399);
            /* harmony import */ var _ethersproject_providers__WEBPACK_IMPORTED_MODULE_4___default =
              /*#__PURE__*/ __webpack_require__.n(
                _ethersproject_providers__WEBPACK_IMPORTED_MODULE_4__
              );
            /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ =
              __webpack_require__(7518);
            /* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default =
              /*#__PURE__*/ __webpack_require__.n(
                styled_components__WEBPACK_IMPORTED_MODULE_5__
              );
            /* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ =
              __webpack_require__(6627);
            /* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ =
              __webpack_require__(5468);
            /* harmony import */ var _components_ToastContainer__WEBPACK_IMPORTED_MODULE_8__ =
              __webpack_require__(8955);
            /* harmony import */ var _apolloclient__WEBPACK_IMPORTED_MODULE_9__ =
              __webpack_require__(1641);
            /* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_10__ =
              __webpack_require__(7000);
            var __webpack_async_dependencies__ =
              __webpack_handle_async_dependencies__([
                _components_Layout__WEBPACK_IMPORTED_MODULE_6__,
              ]);
            _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = (
              __webpack_async_dependencies__.then
                ? (await __webpack_async_dependencies__)()
                : __webpack_async_dependencies__
            )[0];

            const GlobalStyle = styled_components__WEBPACK_IMPORTED_MODULE_5__.createGlobalStyle`
html{
  box-sizing: border-box;
  display:block;
  height: 100%;
  margin:0 auto;
  padding: 0;
}

  body{
    background-color: ${
      _themes__WEBPACK_IMPORTED_MODULE_7__ /* .BG_NORMAL */.te
    };
    color: ${_themes__WEBPACK_IMPORTED_MODULE_7__ /* .MAIN_TEXT_COLOR */._I};
    font-family: 'Inter';

    @font-face {
      font-family: "Inter Light";
      src: url("/fonts/Inter/Inter-ExtraLight.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Inter";
      src: url("/fonts/Inter/Inter-Regular.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Inter Bold";
      src: url("/fonts/Inter/Inter-Bold.ttf");
      font-style: variable;
      font-display: swap;
    }

    @font-face {
      font-family: "Inter Black";
      src: url("/fonts/Inter/Inter-Black.ttf");
      font-style: variable;
      font-display: swap;
    }
  }
`;
            function getLibrary(provider) {
              const library =
                new _ethersproject_providers__WEBPACK_IMPORTED_MODULE_4__.Web3Provider(
                  provider
                );
              library.pollingInterval = 12000;
              return library;
            }
            function CustomApp({ Component, pageProps }) {
              return /*#__PURE__*/ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                {
                  children: [
                    /*#__PURE__*/ (0,
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      next_head__WEBPACK_IMPORTED_MODULE_1___default(),
                      {
                        children: [
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'title',
                            {
                              children:
                                'Moonpage. The future of text. Create and collect text NFTs.',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              charSet: 'utf-8',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:locale',
                              content: 'en_US',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              name: 'viewport',
                              content:
                                'width=device-width, initial-scale=1, shrink-to-fit=no',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              name: 'theme-color',
                              content: '#1B1E28',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              name: 'description',
                              content:
                                'Enter the future of text. Create and collect text NFTs. Moonpage is a launchpad where creators and writers can turn their projects into text NFTs.',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:site_name',
                              content: 'Moonpage',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:title',
                              content: 'Text NFTs',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:description',
                              content:
                                'Enter the future of text. Create and collect text NFTs. Moonpage is a launchpad where creators and writers can turn their projects into text NFTs.',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:image',
                              itemProp: 'image',
                              content: 'https://www.moonpage.io/website.png',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:url',
                              content: 'http://www.moonpage.io',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:type',
                              content: 'website',
                            }
                          ),
                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                            'meta',
                            {
                              property: 'og:locale',
                              content: 'en_US',
                            }
                          ),
                        ],
                      }
                    ),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                      GlobalStyle,
                      {}
                    ),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                      _web3_react_core__WEBPACK_IMPORTED_MODULE_3__.Web3ReactProvider,
                      {
                        getLibrary: getLibrary,
                        children: /*#__PURE__*/ (0,
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                          _apollo_client__WEBPACK_IMPORTED_MODULE_2__.ApolloProvider,
                          {
                            client:
                              _apolloclient__WEBPACK_IMPORTED_MODULE_9__ /* ["default"] */.Z,
                            children: [
                              /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                _components_ToastContainer__WEBPACK_IMPORTED_MODULE_8__ /* ["default"] */.Z,
                                {}
                              ),
                              /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                _providers__WEBPACK_IMPORTED_MODULE_10__ /* .ProjectsProvider */.V3,
                                {
                                  children:
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                      _providers__WEBPACK_IMPORTED_MODULE_10__ /* .UserProvider */.dr,
                                      {
                                        children:
                                          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                            _providers__WEBPACK_IMPORTED_MODULE_10__ /* .ManagerProvider */.eC,
                                            {
                                              children:
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                  _providers__WEBPACK_IMPORTED_MODULE_10__ /* .AuctionsProvider */.W$,
                                                  {
                                                    children:
                                                      /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                        _providers__WEBPACK_IMPORTED_MODULE_10__ /* .CollectionProvider */.YQ,
                                                        {
                                                          children:
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                              _providers__WEBPACK_IMPORTED_MODULE_10__ /* .FactoryProvider */.LI,
                                                              {
                                                                children:
                                                                  /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                                    'main',
                                                                    {
                                                                      className:
                                                                        'app',
                                                                      children:
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                                          _components_Layout__WEBPACK_IMPORTED_MODULE_6__ /* ["default"] */.Z,
                                                                          {
                                                                            children:
                                                                              /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                                                                                Component,
                                                                                {
                                                                                  ...pageProps,
                                                                                }
                                                                              ),
                                                                          }
                                                                        ),
                                                                    }
                                                                  ),
                                                              }
                                                            ),
                                                        }
                                                      ),
                                                  }
                                                ),
                                            }
                                          ),
                                      }
                                    ),
                                }
                              ),
                            ],
                          }
                        ),
                      }
                    ),
                  ],
                }
              );
            }
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
              CustomApp;

            __webpack_async_result__();
          } catch (e) {
            __webpack_async_result__(e);
          }
        }
      );

      /***/
    },

    /***/ 9114: /***/ (module) => {
      module.exports = require('@apollo/client');

      /***/
    },

    /***/ 399: /***/ (module) => {
      module.exports = require('@ethersproject/providers');

      /***/
    },

    /***/ 3138: /***/ (module) => {
      module.exports = require('@ethersproject/units');

      /***/
    },

    /***/ 7501: /***/ (module) => {
      module.exports = require('@material-ui/icons/Close');

      /***/
    },

    /***/ 3365: /***/ (module) => {
      module.exports = require('@material-ui/icons/Edit');

      /***/
    },

    /***/ 3623: /***/ (module) => {
      module.exports = require('@metamask/jazzicon');

      /***/
    },

    /***/ 8054: /***/ (module) => {
      module.exports = require('@web3-react/core');

      /***/
    },

    /***/ 6590: /***/ (module) => {
      module.exports = require('@web3-react/injected-connector');

      /***/
    },

    /***/ 9795: /***/ (module) => {
      module.exports = require('@web3-react/walletconnect-connector');

      /***/
    },

    /***/ 2167: /***/ (module) => {
      module.exports = require('axios');

      /***/
    },

    /***/ 1982: /***/ (module) => {
      module.exports = require('ethers');

      /***/
    },

    /***/ 2522: /***/ (module) => {
      module.exports = require('ethers/lib/utils');

      /***/
    },

    /***/ 9822: /***/ (module) => {
      module.exports = require('languagedetect');

      /***/
    },

    /***/ 562: /***/ (module) => {
      module.exports = require('next/dist/server/denormalize-page-path.js');

      /***/
    },

    /***/ 8028: /***/ (module) => {
      module.exports = require('next/dist/server/image-config.js');

      /***/
    },

    /***/ 4957: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/head.js');

      /***/
    },

    /***/ 4014: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/i18n/normalize-locale-path.js');

      /***/
    },

    /***/ 744: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/image-config-context.js');

      /***/
    },

    /***/ 8524: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/is-plain-object.js');

      /***/
    },

    /***/ 8020: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/mitt.js');

      /***/
    },

    /***/ 4964: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router-context.js');

      /***/
    },

    /***/ 9565: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/get-asset-path-from-route.js');

      /***/
    },

    /***/ 4365: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/get-middleware-regex.js');

      /***/
    },

    /***/ 1428: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/is-dynamic.js');

      /***/
    },

    /***/ 1292: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/parse-relative-url.js');

      /***/
    },

    /***/ 979: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/querystring.js');

      /***/
    },

    /***/ 6052: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/resolve-rewrites.js');

      /***/
    },

    /***/ 4226: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/route-matcher.js');

      /***/
    },

    /***/ 5052: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/router/utils/route-regex.js');

      /***/
    },

    /***/ 9232: /***/ (module) => {
      module.exports = require('next/dist/shared/lib/utils.js');

      /***/
    },

    /***/ 968: /***/ (module) => {
      module.exports = require('next/head');

      /***/
    },

    /***/ 1853: /***/ (module) => {
      module.exports = require('next/router');

      /***/
    },

    /***/ 6689: /***/ (module) => {
      module.exports = require('react');

      /***/
    },

    /***/ 7369: /***/ (module) => {
      module.exports = require('react-dom-confetti');

      /***/
    },

    /***/ 5700: /***/ (module) => {
      module.exports = require('react-fast-marquee');

      /***/
    },

    /***/ 4401: /***/ (module) => {
      module.exports = require('react-focus-on');

      /***/
    },

    /***/ 1187: /***/ (module) => {
      module.exports = require('react-toastify');

      /***/
    },

    /***/ 997: /***/ (module) => {
      module.exports = require('react/jsx-runtime');

      /***/
    },

    /***/ 370: /***/ (module) => {
      module.exports = require('slate');

      /***/
    },

    /***/ 9116: /***/ (module) => {
      module.exports = require('slate-history');

      /***/
    },

    /***/ 9811: /***/ (module) => {
      module.exports = require('slate-react');

      /***/
    },

    /***/ 7518: /***/ (module) => {
      module.exports = require('styled-components');

      /***/
    },

    /***/ 2962: /***/ (module) => {
      module.exports = import('ipfs-http-client');

      /***/
    },
  };
  // load runtime
  var __webpack_require__ = require('../webpack-runtime.js');
  __webpack_require__.C(exports);
  var __webpack_exec__ = (moduleId) =>
    __webpack_require__((__webpack_require__.s = moduleId));
  var __webpack_exports__ = __webpack_require__.X(
    0,
    [577, 274, 97, 217, 368, 639],
    () => __webpack_exec__(5118)
  );
  module.exports = __webpack_exports__;
})();
