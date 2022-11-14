"use strict";
exports.id = 639;
exports.ids = [639];
exports.modules = {

/***/ 8639:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5680);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5468);
/* harmony import */ var _utils_isProd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3968);
/* harmony import */ var _utils_switchNetwork__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6957);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8965);
/* harmony import */ var _WalletConnectionModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9285);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_WalletConnectionModal__WEBPACK_IMPORTED_MODULE_9__]);
_WalletConnectionModal__WEBPACK_IMPORTED_MODULE_9__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











const RootButton = styled_components__WEBPACK_IMPORTED_MODULE_4___default()(_themes__WEBPACK_IMPORTED_MODULE_6__/* .BaseButton */ .Yd)`
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_6__/* .BG_NORMAL */ .te};
  color: ${({ color , disabled  })=>disabled ? _themes__WEBPACK_IMPORTED_MODULE_6__/* .DISABLED_WHITE */ .s0 : color !== null && color !== void 0 ? color : _themes__WEBPACK_IMPORTED_MODULE_6__/* .PINK */ .hl
};
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_6__/* .INTER_BOLD */ .UY};
  width: ${({ width  })=>width !== null && width !== void 0 ? width : '230px'
};
  margin: ${({ margin  })=>margin !== null && margin !== void 0 ? margin : '1rem 1rem 0 0'
};
  padding: 1rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const ActionButton = ({ disabled =false , onClick , loading =false , text , margin , width , color , web3Connectable  })=>{
    const { activate , account , chainId  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_1__.useWeb3React)();
    const { 0: showConnectModal , 1: setShowConnectModal  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    if (web3Connectable && !account) {
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RootButton, {
                    color: color,
                    onClick: ()=>setShowConnectModal(true)
                    ,
                    disabled: false,
                    margin: margin,
                    width: width,
                    children: `Connect to ${text}`
                }),
                showConnectModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_WalletConnectionModal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    onClose: ()=>setShowConnectModal(false)
                })
            ]
        }));
    } else if (web3Connectable && account && (window === null || window === void 0 ? void 0 : window.ethereum) && !_connectors__WEBPACK_IMPORTED_MODULE_5__/* .supportedChainIds.includes */ .KC.includes(chainId)) {
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RootButton, {
            color: color,
            onClick: ()=>(0,_utils_switchNetwork__WEBPACK_IMPORTED_MODULE_7__/* .switchNetwork */ .I)((0,_utils_isProd__WEBPACK_IMPORTED_MODULE_10__/* .isProd */ .B)() ? 137 : 80001, ()=>react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error('Switching Network failed.')
                , async ()=>{
                    // onSuccess reattempt connect and close modal
                    await activate(_connectors__WEBPACK_IMPORTED_MODULE_5__/* .injected */ .Lj, undefined, true);
                })
            ,
            disabled: disabled,
            margin: margin,
            width: width,
            children: 'Switch network'
        }));
    } else {
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RootButton, {
            color: color,
            onClick: onClick,
            disabled: disabled,
            margin: margin,
            width: width,
            children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loading__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                height: 20,
                dotHeight: 20
            }) : text
        }));
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionButton);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_focus_on__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4401);
/* harmony import */ var react_focus_on__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_focus_on__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.8s;
  -webkit-animation: fadeIn 0.8s;
  -moz-animation: fadeIn 0.8s;
  -o-animation: fadeIn 0.8s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @keyframes fadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }
`;
const Content = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  position: relative;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BORDER_RADIUS */ .B};
  overflow-y: auto;
  max-width: 600px;
  max-height: 800px;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BG_NORMAL */ .te};
  padding: 1em;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BOX_SHADOW */ .S0};

  @media (max-width: 900px) {
    border-radius: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    justify-content: center;
  }
`;
const CloseButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .BaseButton */ .Yd)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;
const CloseCross = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .Cross */ .X1)`
  opacity: 1;
  margin-left: 0;

  :before,
  :after {
    left: 10px;
  }
`;
// TODO: on outside click
const BaseModal = ({ children , onClose  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_focus_on__WEBPACK_IMPORTED_MODULE_1__.FocusOn, {
        onEscapeKey: onClose,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Root, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Content, {
                children: [
                    onClose && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CloseButton, {
                        onClick: onClose,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CloseCross, {})
                    }),
                    children
                ]
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseModal);


/***/ }),

/***/ 6293:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




const Wrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  margin: 1rem;
`;
const RadioInput = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().input)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1e-5;
  pointer-events: none;
`;
const Label = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().label)`
  display: inline-flex;
  align-items: center;
  cursor: ${({ readonly  })=>readonly ? 'default' : 'pointer'
};
`;
const Indicator = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  position: relative;
  border-radius: 50%;
  min-height: 40px;
  min-width: 40px;
  box-shadow: -4px -2px 4px 0px rgba(125, 125, 125, 0.1),
    4px 2px 8px 0px rgba(0, 0, 0, 0.7);
  overflow: hidden;

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 9%;
    left: 10%;
    height: 80%;
    width: 80%;
    border-radius: 50%;
  }

  ::after {
    // with next line and the same in before or without? unsure
    display: ${({ checked  })=>checked ? 'block' : 'none'
};
    background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BG_NORMAL */ .te};
    box-shadow: -4px -2px 4px 0px rgba(125, 125, 125, 0.1),
      4px 2px 8px 0px rgba(0, 0, 0, 0.7);
    transform: ${({ checked  })=>checked ? 'scale3d(1, 1, 1)' : 'scale3d(.975, .975, 1) translate3d(0, 5%, 0)'
};
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
    opacity: ${({ checked  })=>checked ? '0' : '1'
};
  }

  ::before {
    display: ${({ checked  })=>checked ? 'block' : 'none'
};
    box-shadow: -4px -2px 4px 0px rgba(0, 0, 0, 0.7),
      4px 2px 8px 0px rgba(125, 125, 125, 0.1);
  }
`;
const BlockSpan = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  display: inline-block;
  margin-inline-start: 1.5rem;
  color: gray;
  font-size: 14px;

  @media (max-width: 900px) {
    font-size: 10px;
  }
`;
const Checkbox = ({ readonly =false , check , children , onChange  })=>{
    const { 0: checked , 1: setChecked  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(check);
    const toggleChecked = ()=>{
        setChecked(!checked);
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Wrapper, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Label, {
            readonly: readonly,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RadioInput, {
                    disabled: readonly,
                    type: "checkbox",
                    onChange: ()=>{
                        !readonly && toggleChecked();
                        onChange();
                    },
                    checked: checked
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Indicator, {
                    checked: checked
                }),
                children && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BlockSpan, {
                    children: children
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkbox);


/***/ }),

/***/ 1037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 22px;
  height: 22px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
`;
const Stem = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  position: absolute;
  width: 3px;
  height: 9px;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .VALID_GREEN */ .Zv};
  left: 11px;
  top: 6px;
`;
const Kick = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .VALID_GREEN */ .Zv};
  left: 8.5px;
  top: 12px;
`;
const Checkmark = ()=>{
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Stem, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Kick, {})
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkmark);


/***/ }),

/***/ 7346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_confetti__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7369);
/* harmony import */ var react_dom_confetti__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_confetti__WEBPACK_IMPORTED_MODULE_2__);



const ConfettiCanon = ({ show =false  })=>{
    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: '10px',
        height: '10px',
        perspective: '370px',
        colors: [
            '#a864fd',
            '#29cdff',
            '#78ff44',
            '#ff718d',
            '#fdff6a'
        ]
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_dom_confetti__WEBPACK_IMPORTED_MODULE_2___default()), {
        active: show,
        config: config
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfettiCanon);


/***/ }),

/***/ 1392:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Countdown)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./utils/toHHMMSS.ts
const toHHMMSS = (secs)=>{
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor(secs / 60) % 60;
    const seconds = secs % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    // const days = Math.floor(hours / 24);
    // if (days > 1 ) {
    //   return `${days} days`;
    // }
    return `${hours}h ${minutes}m ${formattedSeconds}s`;
};
/* harmony default export */ const utils_toHHMMSS = (toHHMMSS);

;// CONCATENATED MODULE: ./components/Countdown.tsx



const Countdown = ({ end  })=>{
    // get current time
    const { 0: time , 1: setTime  } = (0,external_react_.useState)(()=>Math.floor(Date.now() / 1000)
    );
    (0,external_react_.useEffect)(()=>{
        // we only need to tick if rewards haven't ended yet
        if (time <= end) {
            const timeout = setTimeout(()=>setTime(Math.floor(Date.now() / 1000))
            , 1000);
            return ()=>{
                clearTimeout(timeout);
            };
        }
    }, [
        time,
        end
    ]);
    const timeUntilEnd = end - time;
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: utils_toHHMMSS(timeUntilEnd)
    }));
};
/* harmony default export */ const components_Countdown = (Countdown);


/***/ }),

/***/ 7024:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8639);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7289);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5468);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const InputWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 230px;
`;
const AmountForm = ({ onChange , onSubmit , firstEdMaxAmount  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Genesis Edition Total Amount"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.InputDescription, {
                    children: "The first edition of a work is called Genesis Edition. Holders of a Genesis Edition will have special benefits. The Genesis Edition will be sold over a Dutch Auction. Determine its total amount. Keep in mind that you can only trigger the sale of a subsequent edition after the Genesis Edition has sold out."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    size: "xs",
                    color: _themes__WEBPACK_IMPORTED_MODULE_6__/* .PINK */ .hl,
                    margin: "0 0 2rem 0",
                    width: "75%",
                    children: "Caution: The matic your project earns by selling the NFTs are only distributed after an edition sells out. Make sure you choose an amount you are confident of selling. Otherwise the matic earned stays locked inside the contract."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InputWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                        value: firstEdMaxAmount,
                        onChange: onChange,
                        placeholder: 100,
                        error: (firstEdMaxAmount > 1000 || firstEdMaxAmount < 10) && 'Min 10, max 1000.',
                        type: "number"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    onClick: onSubmit,
                    disabled: firstEdMaxAmount > 1000 || firstEdMaxAmount < 10,
                    text: "Continue",
                    loading: false,
                    margin: "1rem 0 0 0"
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AmountForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7155:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8639);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8217);
/* harmony import */ var _RichText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5937);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const RichTextWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().section)`
  margin-block-end: 3rem;
  width: 90%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const BlurbForm = ({ blurb , onKeyDown , onNextStep , onSubmit , pending , reset  })=>{
    var ref;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Blurb"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.InputDescription, {
                    children: "E.G. short introduction to your project, a summary, the first few lines or description of the utility of your NFT."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RichTextWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_RichText__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        onKeyDown: onKeyDown
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ButtonsWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            onClick: ()=>{
                                reset();
                                onNextStep();
                            },
                            text: "Skip",
                            disabled: pending,
                            loading: false,
                            margin: "2rem 0 0 0",
                            color: "#fff"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            onClick: onSubmit,
                            // @ts-expect-error type does not exist on Node or Descendant
                            disabled: !blurb || !((ref = blurb[0]) === null || ref === void 0 ? void 0 : ref.children[0].text.length) || pending,
                            loading: pending,
                            margin: "2rem 0 0 1rem",
                            text: "Set Blurb"
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlurbForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6653:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6577);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8639);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
/* harmony import */ var _RichTextRead__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4930);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const FlexContainer = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const ReviewItems = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const CoverImageReview = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  flex: 1;
  margin-block-end: 2rem;
  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
    }
  }

  @media (max-width: 900px) {
    span {
      height: 300px !important;
    }
  }
`;
const ConfigReviewForm = ({ blurb , blurbIPFS , genre , imgFile , loading , onSubmit , subtitle  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Your Project Details"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.InputDescription, {
                    children: `Review this data closely before submitting it.`
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexContainer, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CoverImageReview, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
                                src: imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png',
                                height: '100%',
                                width: '100%',
                                alt: 'Cover'
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ReviewItems, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItemWrapper, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.BlockSpan, {
                                            children: "Subtitle"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItem, {
                                            children: subtitle.length ? subtitle : 'None specified'
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItemWrapper, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.BlockSpan, {
                                            children: "Genre"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItem, {
                                            children: genre.length ? genre : 'None specified'
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItemWrapper, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.BlockSpan, {
                                            children: "Blurb"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItem, {
                                            children: blurbIPFS ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_RichTextRead__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                                text: blurb
                                            }) : 'None specified'
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    disabled: loading,
                    onClick: onSubmit,
                    margin: "1rem 0 0 0",
                    text: "Looks Good",
                    loading: loading,
                    web3Connectable: true
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigReviewForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8105:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8639);
/* harmony import */ var _ConfettiCanon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7346);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_2__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_2__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const Congrats = ({ onSubmit  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_2__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_2__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ConfettiCanon__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    show: true
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Congratulations!"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_2__.InputDescription, {
                    children: "Now, your work exists on the blockchain!"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_2__.InputDescription, {
                    style: {
                        textAlign: 'center',
                        maxWidth: 500
                    },
                    children: `Let's configure a few more things. It's optional, so you can skip them if you like.`
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    disabled: false,
                    loading: false,
                    onClick: onSubmit,
                    text: "Continue",
                    margin: "1rem 0 0 0"
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Congrats);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9275:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7289);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3082);
/* harmony import */ var _utils_validateAddress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3480);
/* harmony import */ var _WalletIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3092);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8639);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5468);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_6__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const ContribList = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().ul)`
  padding: 0;
  list-style-type: none;
  width: 100%;
`;
const ContribItem = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().li)`
  display: flex;
  justify-content: space-between;
`;
const SpecialShare = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-block-end: 1rem;
`;
const ContribsError = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_7__/* .PINK */ .hl};
  margin-block-end: 2rem;
  text-align: center;
`;
const CTAContainer = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  padding: 1rem;
`;
const ContribInputContainer = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 325px;
  margin-block-end: 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 270px;
  }
`;
const FlexContainer = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
`;
const ContribButtonContainer = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(FlexContainer)`
  justify-content: space-between;
`;
const ContributorsForm = ({ contributors , contributorsList , loading , onChange , onNextStep , onSubmit  })=>{
    const { 0: formsAmount , 1: setFormsAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const shareSelf = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let initShareSelf = 85;
        if ((contributorsList === null || contributorsList === void 0 ? void 0 : contributorsList.length) > 0) {
            for(let i = 0; i < contributorsList.length; i++){
                initShareSelf = initShareSelf - Number(contributorsList[i].share);
            }
        }
        return initShareSelf;
    }, [
        contributorsList
    ]);
    const renderForm = (idx)=>{
        var ref;
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContribInputContainer, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
                    label: 'Address:',
                    disabled: loading,
                    onChange: (e)=>{
                        onChange(idx, 'address', e.target.value);
                    },
                    placeholder: '0x123',
                    value: (ref = contributors[idx]) === null || ref === void 0 ? void 0 : ref.address,
                    error: contributors[idx].address.length > 0 && !(0,_utils_validateAddress__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(contributors[idx].address) && 'Address not valid.'
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
                    label: 'Share in %:',
                    disabled: loading,
                    onChange: (e)=>{
                        const inputVal = Number(e.target.value.replace(/[^0-9]/g, ''));
                        onChange(idx, 'share', inputVal);
                    },
                    placeholder: '10%',
                    value: contributors[idx].share
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
                    label: 'Role:',
                    disabled: loading,
                    onChange: (e)=>{
                        onChange(idx, 'role', e.target.value);
                    },
                    placeholder: 'e.g. Editor, Translator, Marketing',
                    value: contributors[idx].role
                })
            ]
        }));
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Contributors"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.InputDescription, {
                    children: `You can specify up to 3 contributors, like Co-Authors, Editors, Translators, Cover Artists etc.
          Shares will be distributed after an edition sells out.  
          Keep in mind that the total of shares will be deducted from your own share.
          15% are always going to the Moonpage project.`
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CTAContainer, {
                    children: [
                        contributorsList.length ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ContribList, {
                            children: contributorsList.map((item, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContribItem, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        "Contributor ",
                                                        idx + 1,
                                                        ":"
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: (0,_WalletIndicator__WEBPACK_IMPORTED_MODULE_5__/* .truncateAddress */ .F)(item.address)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContribItem, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: "Share:"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    children: [
                                                        item.share,
                                                        " %"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContribItem, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: "Role:"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: item.role.length > 0 ? item.role : 'Unknown'
                                                })
                                            ]
                                        })
                                    ]
                                }, idx)
                            )
                        }) : null,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SpecialShare, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "Moonpage share:"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "15 %"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(SpecialShare, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "Your share:"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        shareSelf,
                                        " %"
                                    ]
                                })
                            ]
                        }),
                        renderForm(1),
                        formsAmount >= 2 && renderForm(2),
                        formsAmount === 3 && renderForm(3),
                        shareSelf < 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContribsError, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: 'Too many shares for contributor(s).'
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: 'Total cannot be higher than 100.'
                                })
                            ]
                        }) : '',
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            disabled: loading || contributorsList.length < 1 || contributorsList.length === 3 || contributorsList.length < formsAmount || shareSelf < 1,
                            loading: false,
                            onClick: ()=>setFormsAmount(formsAmount + 1)
                            ,
                            text: "+ Add More",
                            color: "#fff",
                            margin: "1rem 0 0 0",
                            width: "325px"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContribButtonContainer, {
                            children: [
                                onNextStep && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    onClick: onNextStep,
                                    disabled: loading,
                                    loading: false,
                                    text: "Skip",
                                    color: "#fff",
                                    margin: "2rem 1rem 0 0",
                                    width: "30%"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    onClick: onSubmit,
                                    disabled: loading || contributorsList.length > 3 || contributorsList.length < 1 || shareSelf < 1,
                                    loading: loading,
                                    text: "Set Contributors",
                                    margin: onNextStep ? '2rem 0 0 1rem' : '2rem 0 0 0',
                                    width: onNextStep ? '70%' : '100%',
                                    web3Connectable: true
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContributorsForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9019:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j9": () => (/* binding */ StyledImageForm),
/* harmony export */   "EZ": () => (/* binding */ DragNDrop),
/* harmony export */   "hw": () => (/* binding */ StyledFileInput),
/* harmony export */   "dJ": () => (/* binding */ FileName),
/* harmony export */   "sr": () => (/* binding */ shortenImageName),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export UploadCTAWrapper */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6577);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3082);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5468);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8639);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_6__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const StyledImageForm = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().form)`
  display: flex;
  flex-direction: column;
`;
const DragNDrop = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  width: 100%;
  height: 300px;
  align-items: center;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .INSET_BASE_BOX_SHADOW */ .ux};
  margin: 0 0 2rem 0;

  > span {
    height: 100% !important;
  }
  img {
    object-fit: contain;
  }
`;
const UploadCTAWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  flex-direction: column;
  margin-block-end: 2rem;
`;
const StyledFileInput = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().input)`
  color: transparent;
  margin-block: 1rem;

  ::-webkit-file-upload-button {
    width: 100%;
    border-width: 0;
    text-align: center;
    color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BG_NORMAL */ .te};
    background-color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .PLAIN_WHITE */ ._I};
    border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BORDER_RADIUS */ .B} !important;
    padding: 1rem;

    :hover {
      cursor: pointer;
    }

    :disabled {
      color: grey;

      :hover {
        cursor: default;
      }
    }
  }
`;
const FileName = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().span)`
  display: inline-block;
  height: 24px;
`;
const shortenImageName = (filename)=>{
    const filenameStart = filename.substring(0, 6);
    const filenameLength = filename.length;
    const cut = filenameLength - 6;
    const filenameEnd = filename.substring(filenameLength, cut);
    return `${filenameStart}...${filenameEnd}`;
};
const CoverImageForm = ({ captureFile , imgBuffer , imgFile , onNextStep , onSubmit , pending , reset  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Cover Image"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledImageForm, {
                    onSubmit: onSubmit,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DragNDrop, {
                            onDragOver: (e)=>{
                                e.preventDefault();
                            },
                            onDrop: (e)=>{
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                captureFile(file);
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                                src: imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png',
                                height: '100%',
                                width: '100%',
                                alt: 'Cover',
                                quality: 65,
                                layout: "responsive"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(UploadCTAWrapper, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FileName, {
                                    children: imgFile ? shortenImageName(imgFile.name) : ''
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledFileInput, {
                                    disabled: pending,
                                    type: "file",
                                    onChange: (e)=>{
                                        e.preventDefault();
                                        const file = e.target.files[0];
                                        captureFile(file);
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ButtonsWrapper, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                            disabled: pending,
                                            loading: false,
                                            onClick: ()=>{
                                                reset();
                                                onNextStep();
                                            },
                                            text: "Skip",
                                            color: "#fff"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                            // @ts-expect-error name does not exist on Blob or Mediasource
                                            disabled: !(imgFile === null || imgFile === void 0 ? void 0 : imgFile.name) || pending,
                                            loading: pending,
                                            onClick: onSubmit,
                                            text: "Set Image"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoverImageForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5641:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8639);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5468);
/* harmony import */ var _hooks_collection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7268);
/* harmony import */ var _ProjectDetails_StartAuctionsModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6499);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__, _ProjectDetails_StartAuctionsModal__WEBPACK_IMPORTED_MODULE_9__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__, _ProjectDetails_StartAuctionsModal__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const OptionsWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  margin-block-end: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const Option = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_7__/* .INSET_BASE_BOX_SHADOW */ .ux};
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_7__/* .BASE_BORDER_RADIUS */ .B};
`;
const OptionRight = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(Option)`
  margin: 0 0 0 2rem;

  @media (max-width: 900px) {
    margin: 2rem 0 0 0;
  }
`;
const Text = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().p)`
  display: inline-block;
  margin-block-end: 1rem;
`;
const TextPink = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(Text)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_7__/* .PINK */ .hl};
`;
const Finished = ({ projectId , onStartAuctions  })=>{
    const { startAuctionsStatus  } = (0,_hooks_collection__WEBPACK_IMPORTED_MODULE_8__/* .useCollection */ .K)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { 0: showStartAuctionsModal , 1: setShowStartAuctionsModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const pending = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting'
    , [
        startAuctionsStatus
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (startAuctionsStatus === 'success') {
            setShowStartAuctionsModal(false);
        }
    }, [
        projectId,
        router,
        startAuctionsStatus
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Done"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.InputDescription, {
                    children: `You have completed configuring your Project.`
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(OptionsWrapper, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Option, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Text, {
                                    children: `Wait with starting the auctions. Check the project first, and do some more marketing.`
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    onClick: ()=>router.push(`projects/${projectId}`)
                                    ,
                                    disabled: false,
                                    loading: false,
                                    color: "#fff",
                                    margin: "1rem 0 0 0",
                                    text: "See Project"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(OptionRight, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TextPink, {
                                    children: `Start the auctions now!`
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    onClick: ()=>{
                                        setShowStartAuctionsModal(true);
                                    },
                                    disabled: pending,
                                    loading: pending,
                                    margin: "1rem 0 0 0",
                                    text: "Start Auctions",
                                    web3Connectable: true
                                })
                            ]
                        })
                    ]
                }),
                showStartAuctionsModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProjectDetails_StartAuctionsModal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    onClose: ()=>setShowStartAuctionsModal(false)
                    ,
                    onStartAuctions: onStartAuctions,
                    pending: pending
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Finished);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8529:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7603);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9826);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8639);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _Dropdown__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _Dropdown__WEBPACK_IMPORTED_MODULE_4__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const DropdownWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  margin-block-end: 2rem;
`;
const GenreForm = ({ genre , onGenreSet , onNextStep , reset  })=>{
    const genreOptions = _constants__WEBPACK_IMPORTED_MODULE_7__/* .GENRES */ .xG === null || _constants__WEBPACK_IMPORTED_MODULE_7__/* .GENRES */ .xG === void 0 ? void 0 : _constants__WEBPACK_IMPORTED_MODULE_7__/* .GENRES.map */ .xG.map((item)=>({
            id: item,
            value: item,
            onSelect: ()=>onGenreSet(item)
        })
    );
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Genre"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.InputDescription, {
                    children: "If you specify the Genre, it makes it easier for people to find your project. Also, you are giving more information for possible readers and supporters."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DropdownWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Dropdown__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        options: genreOptions,
                        placeholder: "Genre"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FlexContainer, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            disabled: false,
                            loading: false,
                            margin: "0 1rem 0 0",
                            onClick: ()=>{
                                reset();
                                onNextStep();
                            },
                            text: "Skip",
                            color: "#fff"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            onClick: onNextStep,
                            disabled: genre.length < 3,
                            loading: false,
                            margin: "0",
                            text: "Set Genre"
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GenreForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_capitalizestring__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9921);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _utils_detectLanguage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8604);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8639);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7603);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__, _Dropdown__WEBPACK_IMPORTED_MODULE_6__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__, _Dropdown__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const Wrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().section)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-items: center;
  min-height: 300px;
`;
const Text = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().p)`
  display: inline-block;
  margin-block-end: 2rem;
`;
const FlexColumn = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FlexRow = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LanguageSelection = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-end: 1rem;
`;
const LanguageForm = ({ onSubmit , onLanguageSet , language , text  })=>{
    var ref3, ref1;
    const { 0: showTranslationUpload , 1: setShowTranslationUpload  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showLanguageSelection , 1: setShowLanguageSelection  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const plainText = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!text) return;
        let wholeString = '';
        for(let i = 0; i < text.length; i++){
            var ref, ref2;
            wholeString += ((ref2 = (ref = text[i]) === null || ref === void 0 ? void 0 : ref.children[0]) === null || ref2 === void 0 ? void 0 : ref2.text) + '\n\n';
        }
        return wholeString;
    }, [
        text
    ]);
    const languageOptions = (ref1 = (ref3 = [
        'other',
        ...(0,_utils_detectLanguage__WEBPACK_IMPORTED_MODULE_4__/* .getDetectableLanguages */ .u)()
    ]) === null || ref3 === void 0 ? void 0 : ref3.map((item)=>(0,_utils_capitalizestring__WEBPACK_IMPORTED_MODULE_8__/* .capitalizeFirstLetter */ .f)(item)
    )) === null || ref1 === void 0 ? void 0 : ref1.map((item)=>({
            id: item,
            value: item,
            onSelect: ()=>{
                onLanguageSet(item);
                setShowTranslationUpload(true);
            }
        })
    );
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Language"
                }),
                !showLanguageSelection && !showTranslationUpload && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexColumn, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.InputDescription, {
                            children: `The original language of your text seems to be ${(0,_utils_detectLanguage__WEBPACK_IMPORTED_MODULE_4__/* .detectLanguage */ .e)(plainText) ? (0,_utils_capitalizestring__WEBPACK_IMPORTED_MODULE_8__/* .capitalizeFirstLetter */ .f)((0,_utils_detectLanguage__WEBPACK_IMPORTED_MODULE_4__/* .detectLanguage */ .e)(plainText)[0].toString()) : 'English'}. Is that correct?`
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexRow, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    onClick: ()=>setShowLanguageSelection(true)
                                    ,
                                    text: "No",
                                    disabled: false,
                                    loading: false,
                                    margin: "1rem 1rem 0 0",
                                    color: "#fff"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    onClick: ()=>{
                                        onLanguageSet((0,_utils_detectLanguage__WEBPACK_IMPORTED_MODULE_4__/* .detectLanguage */ .e)(plainText) ? (0,_utils_capitalizestring__WEBPACK_IMPORTED_MODULE_8__/* .capitalizeFirstLetter */ .f)((0,_utils_detectLanguage__WEBPACK_IMPORTED_MODULE_4__/* .detectLanguage */ .e)(plainText)[0].toString()) : 'English');
                                        onSubmit();
                                    },
                                    text: "Correct",
                                    disabled: false,
                                    loading: false,
                                    margin: "1rem 0 0 0"
                                })
                            ]
                        })
                    ]
                }),
                showLanguageSelection && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexColumn, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(LanguageSelection, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Text, {
                                    children: "Please choose the language."
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Dropdown__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    options: languageOptions,
                                    placeholder: "Language",
                                    width: "230px"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            onClick: onSubmit,
                            text: "Next",
                            disabled: !language.length,
                            loading: false,
                            margin: "1rem 0 0 0 "
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5181:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8639);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7289);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const InputWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 230px;
`;
// TODO validation - does the title exist already from the same author?
const NameForm = ({ onChange , onSubmit , title  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Title"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InputWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                        error: title.length < 1 && 'At least 1 character.',
                        onChange: onChange,
                        value: title
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    onClick: onSubmit,
                    disabled: title.length < 1,
                    loading: false,
                    text: "Continue",
                    margin: "1rem 0 0 0"
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NameForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8909:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8639);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7289);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5468);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const InputWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 230px;
`;
const PriceForm = ({ onChange , onSubmit , firstEdMintPrice  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Starting Price (Matic)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.InputDescription, {
                    children: "The Genesis Edition is sold in a dutch auction. In a dutch auction the price keeps going down during a given time – in our case: 24 hours – until someone buys. Then the next dutch auction starts, until all copies are sold out. Determine the starting price for all your Genesis Edition copies in Matic. You will be able to determine the price for each new edition that you unlock."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    size: "xs",
                    color: _themes__WEBPACK_IMPORTED_MODULE_6__/* .PINK */ .hl,
                    margin: "0 0 2rem 0",
                    width: "75%",
                    children: "Caution: The matic your project earns by selling the NFTs are only distributed after an edition sells out. Make sure you choose an appropriate price. If an edition does not sell out, the matic earned stays locked inside the contract."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InputWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                        error: Number(firstEdMintPrice) < 0.1 && 'At least 0.1 Matic.',
                        onChange: onChange,
                        placeholder: '50',
                        value: firstEdMintPrice,
                        type: "number"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    onClick: onSubmit,
                    disabled: Number(firstEdMintPrice) < 0.1,
                    loading: false,
                    text: "Continue",
                    margin: "1rem 0 0 0"
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6568:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_capitalizestring__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9921);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3082);
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6293);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8639);
/* harmony import */ var _utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7887);
/* harmony import */ var _Waiting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7319);
/* harmony import */ var _hooks_factory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7757);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__, _Waiting__WEBPACK_IMPORTED_MODULE_7__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_3__, _ActionButton__WEBPACK_IMPORTED_MODULE_5__, _Waiting__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const CheckboxWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  margin: 0 0 2.5rem -1rem;
`;
const ReviewForm = ({ agreed , createDao , language , title , text , firstEdMaxAmount , firstEdMintPrice , isPinPending , onCheck  })=>{
    const { createProjectStatus  } = (0,_hooks_factory__WEBPACK_IMPORTED_MODULE_8__/* .useFactory */ .r)();
    const creatingDao = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return createProjectStatus === 'confirming' || createProjectStatus === 'waiting';
    }, [
        createProjectStatus
    ]);
    if (creatingDao) {
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Waiting__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {}));
    }
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItemWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.BlockSpan, {
                            children: "Title"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItem, {
                            children: title
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItemWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.BlockSpan, {
                            children: "Text"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItem, {
                            children: `${(0,_utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_6__/* .serialize */ .q)(text).substring(0, 100)}...`
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItemWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.BlockSpan, {
                            children: "Language"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItem, {
                            children: (0,_utils_capitalizestring__WEBPACK_IMPORTED_MODULE_9__/* .capitalizeFirstLetter */ .f)(language)
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItemWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.BlockSpan, {
                            children: "Max Amount Genesis Edition"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItem, {
                            children: firstEdMaxAmount
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItemWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.BlockSpan, {
                            children: "Dutch Auction Starting Price (MATIC)"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_3__.ReviewItem, {
                            children: firstEdMintPrice
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CheckboxWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Checkbox__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        onChange: onCheck,
                        check: agreed,
                        children: "By checking this box, I confirm that this work to be published (including the cover image) does not contain any hateful content, potential copyright issue, plagiarism, illegal or illegitimate content (hereafter defined as \"harmful content\"). Moonpage can freeze the project if it detects any harmful content, which will disable the distribution of any funds and will also disable further minting of the infringing project. In the event of doubt, Moonpage may at its discretion denylist any involved wallet address. Being denylisted prevents this wallet address from any further action on this platform. Neither Moonpage, nor the NFT owners of a project hold any copyright. The copyright remains with the author."
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    disabled: !agreed || isPinPending,
                    onClick: createDao,
                    loading: isPinPending,
                    text: "Create Project",
                    web3Connectable: true
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReviewForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Create_RichText)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: external "slate-react"
var external_slate_react_ = __webpack_require__(9811);
// EXTERNAL MODULE: external "slate"
var external_slate_ = __webpack_require__(370);
// EXTERNAL MODULE: external "slate-history"
var external_slate_history_ = __webpack_require__(9116);
// EXTERNAL MODULE: ./themes.ts
var themes = __webpack_require__(5468);
;// CONCATENATED MODULE: ./components/EditorToolButton.tsx




const Root = (external_styled_components_default()).button`
  color: ${themes/* PLAIN_WHITE */._I};
  background-color: ${themes/* BG_NORMAL */.te} !important;
  font-family: ${themes/* INTER_BOLD */.UY} !important;
  border-radius: ${themes/* BASE_BORDER_RADIUS */.B} !important;
  padding: 10px;
  margin: 5px;
  box-shadow: ${({ active  })=>active ? themes/* INSET_BASE_BOX_SHADOW */.ux : themes/* BASE_BOX_SHADOW */.S0
} !important;

  :hover {
    cursor: pointer;
  }
`;
const EditorToolButton = ({ active , children , onMouseDown  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(Root, {
        active: active,
        onMouseDown: onMouseDown,
        children: children
    }));
};
/* harmony default export */ const components_EditorToolButton = (EditorToolButton);

;// CONCATENATED MODULE: ./components/Create/RichText.tsx








const StyledEditable = external_styled_components_default()(external_slate_react_.Editable)`
  box-shadow: ${themes/* INSET_BASE_BOX_SHADOW */.ux};
  // otherwise it shrinks to 24px height somehow
  min-height: 500px !important;
  max-height: 1000px !important;
  margin-block-start: 1rem;
  padding: 1rem;
  border-radius: ${themes/* BASE_BORDER_RADIUS */.B};
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-family: monospace;
  font-size: 16px;
  width: 100%;
`;
const LIST_TYPES = [
    'numbered-list',
    'bulleted-list'
];
const TEXT_ALIGN_TYPES = [
    'left',
    'center',
    'right',
    'justify'
];
const Toolbar = (external_styled_components_default()).div`
  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
const RichText = ({ onKeyDown , text , isDisabled =false  })=>{
    const renderElement = (0,external_react_.useCallback)((props)=>/*#__PURE__*/ jsx_runtime_.jsx(Element, {
            ...props
        })
    , []);
    const renderLeaf = (0,external_react_.useCallback)((props)=>/*#__PURE__*/ jsx_runtime_.jsx(Leaf, {
            ...props
        })
    , []);
    const editor = (0,external_react_.useMemo)(()=>(0,external_slate_history_.withHistory)((0,external_slate_react_.withReact)((0,external_slate_.createEditor)()))
    , []);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_slate_react_.Slate, {
        editor: editor,
        value: text || initialValue,
        onChange: onKeyDown,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Toolbar, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(MarkButton, {
                        format: "bold",
                        icon: "format_bold"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(MarkButton, {
                        format: "italic",
                        icon: "format_italic"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(MarkButton, {
                        format: "underline",
                        icon: "format_underlined"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "heading-one",
                        icon: "looks_one"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "heading-two",
                        icon: "looks_two"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "block-quote",
                        icon: "format_quote"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "numbered-list",
                        icon: "format_list_numbered"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "bulleted-list",
                        icon: "format_list_bulleted"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "left",
                        icon: "format_align_left"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "center",
                        icon: "format_align_center"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "right",
                        icon: "format_align_right"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(BlockButton, {
                        format: "justify",
                        icon: "format_align_justify"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(StyledEditable, {
                readOnly: isDisabled,
                renderElement: renderElement,
                renderLeaf: renderLeaf,
                placeholder: "Enter some text…",
                spellCheck: true,
                autoFocus: true,
                onKeyDown: (e)=>{
                    if (e.key === 'Enter' && e.shiftKey) {
                        const selectedElement = external_slate_.Node.descendant(editor, editor.selection.anchor.path.slice(0, -1));
                        if (// @ts-expect-error type does not exist on Node or Descendant
                        selectedElement.type === 'list-item' || // @ts-expect-error type does not exist on Node or Descendant
                        selectedElement.type === 'title') {
                            e.preventDefault();
                            const selectedLeaf = external_slate_.Node.descendant(editor, editor.selection.anchor.path);
                            // @ts-expect-error type does not exist on Descendant
                            if (selectedLeaf.text.length === editor.selection.anchor.offset) {
                                external_slate_.Transforms.insertNodes(editor, {
                                    type: 'paragraph',
                                    // @ts-expect-error marks, text not assignable to Descendant
                                    children: [
                                        {
                                            text: '',
                                            marks: []
                                        }
                                    ]
                                });
                            } else {
                                external_slate_.Transforms.splitNodes(editor, {
                                    always: true
                                });
                                external_slate_.Transforms.setNodes(editor, {
                                    type: 'paragraph'
                                });
                            }
                        }
                    }
                }
            })
        ]
    }));
};
const toggleBlock = (editor, format)=>{
    const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
    const isList = LIST_TYPES.includes(format);
    external_slate_.Transforms.unwrapNodes(editor, {
        match: (n)=>!external_slate_.Editor.isEditor(n) && external_slate_.Element.isElement(n) && LIST_TYPES.includes(n.type) && !TEXT_ALIGN_TYPES.includes(format)
        ,
        split: true
    });
    let newProperties;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format
        };
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format
        };
    }
    external_slate_.Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
        const block = {
            type: format,
            children: []
        };
        external_slate_.Transforms.wrapNodes(editor, block);
    }
};
const toggleMark = (editor, format)=>{
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        external_slate_.Editor.removeMark(editor, format);
    } else {
        external_slate_.Editor.addMark(editor, format, true);
    }
};
const isBlockActive = (editor, format, blockType = 'type')=>{
    const { selection  } = editor;
    if (!selection) return false;
    const [match] = Array.from(external_slate_.Editor.nodes(editor, {
        at: external_slate_.Editor.unhangRange(editor, selection),
        match: (n)=>!external_slate_.Editor.isEditor(n) && external_slate_.Element.isElement(n) && n[blockType] === format
    }));
    return !!match;
};
const isMarkActive = (editor, format)=>{
    const marks = external_slate_.Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
const Element = ({ attributes , children , element  })=>{
    const style = {
        textAlign: element.align
    };
    switch(element.type){
        case 'block-quote':
            return(/*#__PURE__*/ jsx_runtime_.jsx("blockquote", {
                style: style,
                ...attributes,
                children: children
            }));
        case 'bulleted-list':
            return(/*#__PURE__*/ jsx_runtime_.jsx("ul", {
                style: style,
                ...attributes,
                children: children
            }));
        case 'heading-one':
            return(/*#__PURE__*/ jsx_runtime_.jsx("h1", {
                style: {
                    fontSize: '36px'
                },
                ...attributes,
                children: children
            }));
        case 'heading-two':
            return(/*#__PURE__*/ jsx_runtime_.jsx("h2", {
                style: {
                    fontSize: '24px'
                },
                ...attributes,
                children: children
            }));
        case 'list-item':
            return(/*#__PURE__*/ jsx_runtime_.jsx("li", {
                style: style,
                ...attributes,
                children: children
            }));
        case 'numbered-list':
            return(/*#__PURE__*/ jsx_runtime_.jsx("ol", {
                style: style,
                ...attributes,
                children: children
            }));
        default:
            return(/*#__PURE__*/ jsx_runtime_.jsx("p", {
                style: style,
                ...attributes,
                children: children
            }));
    }
};
const Leaf = ({ attributes , children , leaf  })=>{
    if (leaf.bold) {
        children = /*#__PURE__*/ jsx_runtime_.jsx("strong", {
            children: children
        });
    }
    // if (leaf.code) {
    //   children = <code>{children}</code>;
    // }
    if (leaf.italic) {
        children = /*#__PURE__*/ jsx_runtime_.jsx("em", {
            children: children
        });
    }
    if (leaf.underline) {
        children = /*#__PURE__*/ jsx_runtime_.jsx("u", {
            children: children
        });
    }
    return(/*#__PURE__*/ jsx_runtime_.jsx("span", {
        ...attributes,
        children: children
    }));
};
const BlockButton = ({ format , icon  })=>{
    const editor = (0,external_slate_react_.useSlate)();
    return(/*#__PURE__*/ jsx_runtime_.jsx(components_EditorToolButton, {
        active: isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'),
        onMouseDown: (event)=>{
            event.preventDefault();
            toggleBlock(editor, format);
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "material-icons",
            children: icon
        })
    }));
};
const MarkButton = ({ format , icon  })=>{
    const editor = (0,external_slate_react_.useSlate)();
    return(/*#__PURE__*/ jsx_runtime_.jsx(components_EditorToolButton, {
        active: isMarkActive(editor, format),
        onMouseDown: (event)=>{
            event.preventDefault();
            toggleMark(editor, format);
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "material-icons",
            children: icon
        })
    }));
};
const initialValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: ''
            }
        ]
    }, 
];
/* harmony default export */ const Create_RichText = (RichText);


/***/ }),

/***/ 4594:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3082);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8639);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7289);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_2__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_2__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const SubtitleForm = ({ onChange , onNextStep , subtitle , reset  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_2__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_2__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Subtitle"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP, {
                    error: subtitle.length < 1 && 'At least 1 character.',
                    // @ts-ignore
                    onChange: onChange,
                    value: subtitle
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_2__.FlexContainer, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            color: "#fff",
                            onClick: ()=>{
                                reset();
                                onNextStep();
                            },
                            disabled: false,
                            loading: false,
                            margin: "0 1rem 0 0",
                            text: "Skip"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            onClick: onNextStep,
                            disabled: subtitle.length < 1,
                            loading: false,
                            margin: "0 1rem 0 0",
                            text: "Set Subtitle"
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubtitleForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4744:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8639);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3082);
/* harmony import */ var _utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7887);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7289);
/* harmony import */ var _RichText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5937);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ActionButton__WEBPACK_IMPORTED_MODULE_3__, _pages_create__WEBPACK_IMPORTED_MODULE_4__]);
([_ActionButton__WEBPACK_IMPORTED_MODULE_3__, _pages_create__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const RichTextWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().section)`
  margin-block-end: 3rem;
  width: 90%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const TextForm = ({ onSubmit , onKeyDown , text  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_4__.Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Text"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RichTextWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_RichText__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                        onKeyDown: onKeyDown
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_InputField__WEBPACK_IMPORTED_MODULE_6__/* .StyledInputError */ .qZ, {
                    children: [
                        text && (0,_utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_5__/* .serialize */ .q)(text).trim().length < 1 ? 'At least 1 character.' : ' ',
                        (text === null || text === void 0 ? void 0 : text.length) < 1 ? 'At least 1 character.' : ' '
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    onClick: onSubmit,
                    disabled: text && (0,_utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_5__/* .serialize */ .q)(text).trim().length < 1,
                    loading: false,
                    text: "Continue",
                    margin: "1rem 0 0 0 "
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4652:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3082);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8639);
/* harmony import */ var _RichText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5937);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
/* harmony import */ var _utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7887);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_2__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__]);
([_pages_create__WEBPACK_IMPORTED_MODULE_2__, _ActionButton__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const Text = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().p)`
  display: inline-block;
`;
const FlexColumn = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const FlexRow = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RichTextWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().section)`
  margin-block-start: 3rem;
  width: 90%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const TranslationForm = ({ onKeyDown , onSubmit , onNextStep , reset , pending , translation  })=>{
    var ref;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_2__.FadeIn, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_2__.Wrapper, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexColumn, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        size: "m",
                        children: "Translation"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Text, {
                        children: "If available, provide an English translation for your original text."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RichTextWrapper, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_RichText__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            onKeyDown: (val)=>onKeyDown(val)
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexRow, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                onClick: ()=>{
                                    reset();
                                    onNextStep();
                                },
                                text: "Later",
                                disabled: pending,
                                loading: false,
                                margin: "3rem 1rem 0 0",
                                color: "#fff"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                onClick: onSubmit,
                                text: "Use this translation",
                                disabled: translation && ((ref = (0,_utils_serializeMarkdown__WEBPACK_IMPORTED_MODULE_7__/* .serialize */ .q)(translation)) === null || ref === void 0 ? void 0 : ref.trim().length) < 1 || pending,
                                loading: pending,
                                margin: "3rem 0 0 0"
                            })
                        ]
                    })
                ]
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TranslationForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7319:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8965);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3082);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_4__]);
_pages_create__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const LoadingWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
const Waiting = ()=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.FadeIn, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(LoadingWrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    height: 200
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_create__WEBPACK_IMPORTED_MODULE_4__.ReviewItem, {
                    children: `We're creating the project for you.
          This takes a minute. Be patient and don't refresh the page plz :)`
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Waiting);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7603:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6577);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5468);
/* harmony import */ var _pages_create__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3082);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_create__WEBPACK_IMPORTED_MODULE_5__]);
_pages_create__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const Root = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(_themes__WEBPACK_IMPORTED_MODULE_4__/* .BaseButton */ .Yd)`
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INTER_BOLD */ .UY};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  width: ${({ width  })=>width ? width : '150px'
};
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
`;
const ArrowDown = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)``;
const ImageWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  margin-inline-end: 1rem;
`;
const Options = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 1;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BG_NORMAL */ .te};
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BASE_BOX_SHADOW */ .S0};
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;
const Option = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(_themes__WEBPACK_IMPORTED_MODULE_4__/* .BaseButton */ .Yd)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .PLAIN_WHITE */ ._I};
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INTER_BOLD */ .UY};
  margin-block-end: 1rem;
  padding: 1rem;

  display: flex;

  :hover {
    cursor: pointer;
    border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BASE_BORDER_RADIUS */ .B};
    box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INSET_BASE_BOX_SHADOW */ .ux};
  }

  :active {
    box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INSET_BASE_BOX_SHADOW */ .ux};
  }
`;
const Dropdown = ({ isDisabled , options , preselected , placeholder , width  })=>{
    const { 0: showDropdown , 1: setShowDropdown  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: selected , 1: setSelected  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(preselected !== null && preselected !== void 0 ? preselected : null);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const toggleDropdown = ()=>{
        setShowDropdown(!showDropdown);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (ref.current && !ref.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return ()=>{
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        disabled: isDisabled,
        onClick: toggleDropdown,
        ref: ref,
        width: width,
        children: [
            selected ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_create__WEBPACK_IMPORTED_MODULE_5__.FlexContainer, {
                children: [
                    selected.img && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ImageWrapper, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                            height: '16px',
                            width: '20px',
                            src: `/${selected.img}`,
                            alt: selected.value
                        })
                    }),
                    selected.value
                ]
            }) : placeholder !== null && placeholder !== void 0 ? placeholder : 'Filter',
            !isDisabled && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ArrowDown, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    height: '12px',
                    width: '16px',
                    src: '/ArrowDown.svg',
                    alt: 'ArrowDown'
                })
            }),
            showDropdown && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Options, {
                children: options.map((opt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Option, {
                        onClick: ()=>{
                            opt.onSelect(opt.id);
                            setSelected(opt);
                        },
                        children: [
                            opt.img && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ImageWrapper, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                                    height: '16px',
                                    width: '20px',
                                    src: `/${opt.img}`,
                                    alt: opt.value
                                })
                            }),
                            opt.value
                        ]
                    }, opt.id)
                )
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3365);
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7501);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5468);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);






const RootButton = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(_themes__WEBPACK_IMPORTED_MODULE_4__/* .BaseButton */ .Yd)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BG_NORMAL */ .te};
  color: ${({ color , disabled  })=>disabled ? _themes__WEBPACK_IMPORTED_MODULE_4__/* .DISABLED_WHITE */ .s0 : color ? color : _themes__WEBPACK_IMPORTED_MODULE_4__/* .PLAIN_WHITE */ ._I
};
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INTER_BOLD */ .UY};
  width: ${({ width  })=>width !== null && width !== void 0 ? width : '60px'
};
  margin: ${({ margin  })=>margin !== null && margin !== void 0 ? margin : '1rem 1rem 0 0'
};
  padding: 1rem;

  @media (max-width: 900px) {
    width: 60px;
    margin: 0;
  }
`;
const EditButton = ({ isEditing , disabled =false , onClick , margin , width , color  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RootButton, {
        color: color,
        onClick: onClick,
        disabled: disabled,
        margin: margin,
        width: width,
        children: isEditing ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default()), {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_2___default()), {})
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditButton);


/***/ }),

/***/ 4627:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Emoji = ({ label , symbol  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: "emoji",
        role: "img",
        "aria-label": label !== null && label !== void 0 ? label : "",
        "aria-hidden": label ? "false" : "true",
        children: symbol
    })
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Emoji);


/***/ }),

/***/ 7289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "qZ": () => (/* binding */ StyledInputError),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export StyledInput */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
`;
const StyledLabel = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().label)`
  display: inline-block;
  margin-block-end: 0.5rem;
`;
const StyledInput = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .BaseInput */ .Qc)`
  display: inline-block;
  margin-block-end: 1rem;
  font-family: monospace;
`;
const StyledInputError = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .PINK */ .hl};
  margin-block-end: 1rem;
  text-align: center;
  height: 24px;
`;
const InputField = ({ disabled =false , value , onChange , error , placeholder ='' , label , style , type ='text'  })=>{
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledLabel, {
                children: label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledInput, {
                type: type,
                disabled: disabled,
                value: value,
                onChange: onChange,
                placeholder: placeholder.toString(),
                style: style
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledInputError, {
                children: error !== null && error !== void 0 ? error : ' '
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputField);


/***/ }),

/***/ 9970:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Arrow */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BOX_SHADOW */ .S0};
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BORDER_RADIUS */ .B};

  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    padding: 1rem;
  }
`;
const Header = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
`;
const Title = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().h3)`
  display: inline-block;
  font-size: 16px;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .PLAIN_WHITE */ ._I};
`;
const Content = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  margin-block-start: 1rem;
  animation: fadein 1s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ArrowWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().button)`
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BG_NORMAL */ .te};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BOX_SHADOW */ .S0};
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  :disabled {
    :hover {
      cursor: default;
    }
  }

  :active {
    box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .INSET_BASE_BOX_SHADOW */ .ux};
  }
`;
const Arrow = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().i)`
  border: solid ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .PLAIN_WHITE */ ._I};
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;

  transform: ${({ up  })=>up ? 'rotateZ(225deg)' : 'rotate(45deg)'
};
  transition: all 0.4s ease-in-out;
`;
const MoreDetails = ({ children , styles , title , open  })=>{
    const { 0: up , 1: setUp  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(open ? false : true);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        style: styles,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Header, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Title, {
                        children: title
                    }),
                    !up && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Content, {
                        children: children
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ArrowWrapper, {
                    onClick: ()=>setUp(!up)
                    ,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Arrow, {
                        className: "arrow",
                        up: !up
                    })
                })
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoreDetails);


/***/ }),

/***/ 5369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9097);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().a)`
  color: ${({ color  })=>color !== null && color !== void 0 ? color : '#fff'
};
  text-decoration: ${({ underline  })=>underline ? 'underline' : 'none'
};
`;
const NextLink = ({ href , name , underline =true  })=>{
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        children: [
            ' ',
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                href: href,
                passHref: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Root, {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    underline: true,
                    children: name
                })
            }),
            ' '
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NextLink);


/***/ }),

/***/ 5785:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_PieChart)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./themes.ts
var themes = __webpack_require__(5468);
;// CONCATENATED MODULE: ./components/Circle.tsx




const StyledSVG = (external_styled_components_default()).svg`
  position: absolute;
  bottom: 0;
  left: 0;
`;
const MyCircle = (external_styled_components_default()).circle`
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 90px;
  stroke-dasharray: 560px;
  stroke-dashoffset: 560px;
  animation: anim 1s ease-in forwards;
  animation-delay: 0.5s;

  @keyframes anim {
    100% {
      stroke-dashoffset: ${({ percentage  })=>560 / 100 * (100 - percentage)
}px;
    }
  }
`;
const Circle = ({ percentage  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(StyledSVG, {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        width: "280px",
        height: "280px",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("defs", {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("linearGradient", {
                    id: "GradientColor",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                            offset: "0%",
                            stopColor: "#673ab7"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("stop", {
                            offset: "100%",
                            stopColor: themes/* PINK */.hl
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MyCircle, {
                cx: "140",
                cy: "140",
                r: "85",
                percentage: percentage
            })
        ]
    }));
};
/* harmony default export */ const components_Circle = (Circle);

;// CONCATENATED MODULE: ./components/PieChart.tsx





const Pie = (external_styled_components_default()).div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  padding: 70px;
  box-shadow: ${themes/* BASE_BOX_SHADOW */.S0};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PieHole = (external_styled_components_default()).div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: ${themes/* INSET_BASE_BOX_SHADOW */.ux};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PieHoleData = (external_styled_components_default()).div`
  text-align: center;
`;
const StyledCircle = external_styled_components_default()(components_Circle)`
  box-shadow: 0px 0px 50px 4px ${themes/* PINK */.hl};
`;
const PieChart = ({ part , whole  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(Pie, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(StyledCircle, {
                percentage: parseInt((part / whole * 100).toString())
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(PieHole, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(PieHoleData, {
                    children: `${part}/${whole} Minted`
                })
            })
        ]
    }));
};
/* harmony default export */ const components_PieChart = (PieChart);


/***/ }),

/***/ 3998:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  height: 40px;
  width: 100%;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BG_NORMAL */ .te};
  box-shadow:
    inset -4px -2px 4px 0px rgb(125 125 125 / 10%),
    inset 4px 2px 8px 0px rgb(0 0 0 / 70%);
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding-inline: .5rem;
  position: relative;
`;
const Progress = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  height: 75%;
  width: ${({ completed  })=>completed
}%;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .PINK */ .hl};
  transition: width 1s ease-in-out;
  border-radius: inherit;
  text-align: right;
  display: flex;
  justify-content: center;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProgressTopLayer = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  height: 88%;
  width: 98%;
  background-color: #f51651;
  margin: 0 auto;
  border-radius: inherit;
  box-shadow:
    -4px -2px 4px 0px rgb(125 125 125 / 10%),
    4px 2px 8px 0px rgb(0 0 0 / 30%);
`;
const ProgressBar = ({ completed  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Root, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Progress, {
            completed: completed,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProgressTopLayer, {})
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBar);


/***/ }),

/***/ 861:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3138);
/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ethersproject_units__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5468);
/* harmony import */ var _Countdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1392);
/* harmony import */ var _PieChart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5785);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8217);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8639);
/* harmony import */ var _StartAuctionsModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6499);
/* harmony import */ var _hooks_collection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7268);
/* harmony import */ var _hooks_auctions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1529);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ActionButton__WEBPACK_IMPORTED_MODULE_9__, _StartAuctionsModal__WEBPACK_IMPORTED_MODULE_10__]);
([_ActionButton__WEBPACK_IMPORTED_MODULE_9__, _StartAuctionsModal__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const InfoBlock = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INSET_BASE_BOX_SHADOW */ .ux};

  @media (max-width: 900px) {
    width: 100%;
    margin-block: 2rem;
  }
`;
const FlexWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: space-between;
  margin-block-end: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-block-end: 0;
    margin-block-start: 2rem;
  }
`;
const PieChartWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: inline-block;
  margin: 0 auto;
  margin-block: 2rem;
`;
const AuctionSection = ({ project , isAuthor , isGettingCurrentPrice , onFetchCurrentPrice , onRetriggerAuction , onStartAuctions  })=>{
    const { startAuctionsStatus  } = (0,_hooks_collection__WEBPACK_IMPORTED_MODULE_11__/* .useCollection */ .K)();
    const { retriggerAuctionStatus  } = (0,_hooks_auctions__WEBPACK_IMPORTED_MODULE_12__/* .useAuctions */ .x)();
    const { 0: showStartAuctionsModal , 1: setShowStartAuctionsModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const totalSupply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (project) {
            return project.mintCount;
        } else {
            return ethers__WEBPACK_IMPORTED_MODULE_7__.BigNumber.from('0');
        }
    }, [
        project
    ]);
    const startAuctionsPending = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting'
    , [
        startAuctionsStatus
    ]);
    const retriggerPending = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>isGettingCurrentPrice || retriggerAuctionStatus === 'confirming' || retriggerAuctionStatus === 'waiting'
    , [
        isGettingCurrentPrice,
        retriggerAuctionStatus
    ]);
    const maxSupply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (project && project.editions) {
            const edition = project.editions ? project.editions[0] : undefined;
            return edition === null || edition === void 0 ? void 0 : edition.endId.sub(edition === null || edition === void 0 ? void 0 : edition.startId).add(ethers__WEBPACK_IMPORTED_MODULE_7__.BigNumber.from('1'));
        }
        return undefined;
    }, [
        project
    ]);
    const showsAuctionText = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const now = Math.round(new Date().getTime() / 1000);
        const { auctionsStarted , auctionsEnded , currentAuctionExpiresAt  } = project;
        if (!project) return;
        if (auctionsEnded) {
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InfoBlock, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    size: "xs",
                    children: 'Auctions finished'
                })
            }));
        }
        if (auctionsStarted) {
            if (Number(currentAuctionExpiresAt) > now) {
                return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoBlock, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                            size: "xs",
                            children: 'Auction ends in'
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                            size: "xs",
                            color: _themes__WEBPACK_IMPORTED_MODULE_4__/* .PINK */ .hl,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Countdown__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                end: Number(currentAuctionExpiresAt)
                            })
                        })
                    ]
                }));
            } else {
                return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InfoBlock, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                        size: "xs",
                        children: 'Auction expired'
                    })
                }));
            }
        }
        return isAuthor ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
            disabled: startAuctionsPending,
            loading: startAuctionsPending,
            margin: "0",
            onClick: ()=>setShowStartAuctionsModal(true)
            ,
            text: "Start Auctions"
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InfoBlock, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                size: "xs",
                children: 'Auction Has Not Started Yet'
            })
        });
    }, [
        isAuthor,
        startAuctionsPending,
        project
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (startAuctionsStatus === 'success') {
            setShowStartAuctionsModal(false);
        }
    }, [
        startAuctionsStatus
    ]);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                size: "m",
                children: "Auction"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexWrapper, {
                children: [
                    showsAuctionText(),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InfoBlock, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                            size: "xs",
                            children: `Starting Price ${(0,_ethersproject_units__WEBPACK_IMPORTED_MODULE_3__.formatEther)(parseInt(project.editions[0].mintPrice._hex, 16).toString())} MATIC`
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PieChartWrapper, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_PieChart__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    part: Number(project.mintCount),
                    whole: Number(maxSupply)
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexWrapper, {
                style: {
                    marginBlockEnd: '0'
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(InfoBlock, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                            size: "xs",
                            children: `Minted: ${Number(totalSupply)}`
                        })
                    }),
                    project.auctionsStarted && !project.auctionsEnded && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: Math.floor(Date.now() / 1000) > Number(project.currentAuctionExpiresAt) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                            disabled: retriggerPending,
                            loading: retriggerPending,
                            margin: "0",
                            onClick: onRetriggerAuction,
                            text: "Retrigger Auction"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                            disabled: retriggerPending,
                            loading: retriggerPending,
                            margin: "0",
                            onClick: onFetchCurrentPrice,
                            text: "Get Current Price",
                            web3Connectable: true
                        })
                    }),
                    (!project.auctionsStarted || project.auctionsEnded) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        disabled: true,
                        loading: false,
                        margin: "0",
                        text: "Get Current Price"
                    })
                ]
            }),
            showStartAuctionsModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_StartAuctionsModal__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                onClose: ()=>setShowStartAuctionsModal(false)
                ,
                onStartAuctions: onStartAuctions,
                pending: startAuctionsPending
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuctionSection);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1797:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);
/* harmony import */ var _Emojis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4627);
/* harmony import */ var _Checkmark__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1037);
/* harmony import */ var _components_MoreDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9970);
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3998);
/* harmony import */ var _ConfigureModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6206);
/* harmony import */ var _ContributorsModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9723);
/* harmony import */ var _hooks_manager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7563);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8639);
/* harmony import */ var _StartAuctionsModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6499);
/* harmony import */ var _hooks_collection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7268);
/* harmony import */ var _EnableNextEditionModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4493);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ConfigureModal__WEBPACK_IMPORTED_MODULE_8__, _ContributorsModal__WEBPACK_IMPORTED_MODULE_9__, _ActionButton__WEBPACK_IMPORTED_MODULE_11__, _StartAuctionsModal__WEBPACK_IMPORTED_MODULE_12__, _EnableNextEditionModal__WEBPACK_IMPORTED_MODULE_14__]);
([_ConfigureModal__WEBPACK_IMPORTED_MODULE_8__, _ContributorsModal__WEBPACK_IMPORTED_MODULE_9__, _ActionButton__WEBPACK_IMPORTED_MODULE_11__, _StartAuctionsModal__WEBPACK_IMPORTED_MODULE_12__, _EnableNextEditionModal__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .PLAIN_WHITE */ ._I};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BOX_SHADOW */ .S0};
`;
const ProgressBarWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 100%;
  margin-block-end: 2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
`;
const ProgressBarIndicator = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  display: inline-block;
  margin-inline-end: 1rem;
  margin-block-start: 0.5rem;
`;
const ActionItems = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const Flex = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const AuthorSection = ({ currentEdition , project , projectId , refetch  })=>{
    const { configureProject , configureStatus , setContributors , setContributorsStatus , enableNextEdition , enableNextEditionStatus ,  } = (0,_hooks_manager__WEBPACK_IMPORTED_MODULE_10__/* .useManager */ .v)();
    const { startAuctions , startAuctionsStatus  } = (0,_hooks_collection__WEBPACK_IMPORTED_MODULE_13__/* .useCollection */ .K)();
    const { 0: showConfigureModal , 1: setShowConfigureModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showContributorsModal , 1: setShowContributorsModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showAuthorMintModal , 1: setShowAuthorMintModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showEnableNextEditionModal , 1: setShowEnableNextEditionModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const configured = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let hasConfigured = false;
        if (project) {
            if (project.blurbIpfsHash || project.imgIpfsHash || project.genre || project.subtitle) {
                hasConfigured = true;
            }
        }
        return hasConfigured;
    }, [
        project
    ]);
    const currentEndId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>currentEdition ? Number(currentEdition.endId) : 0
    , [
        currentEdition
    ]);
    const canTriggerNextEdition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return Number(project === null || project === void 0 ? void 0 : project.currentId) > currentEndId;
    }, [
        currentEndId,
        project === null || project === void 0 ? void 0 : project.currentId
    ]);
    const calculatedProgress = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let percentage = 0;
        if (!project) return percentage;
        if (configured) {
            percentage = 50;
        }
        if (project.auctionsStarted) {
            percentage = 100;
        }
        return percentage;
    }, [
        project,
        configured
    ]);
    const calculatedProgressIndicationText = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let text = 'Next: Configure';
        switch(calculatedProgress){
            case 50:
                text = 'Next: Start Auctions';
                break;
            case 100:
                text = 'Done!';
                break;
            default:
                break;
        }
        return text;
    }, [
        calculatedProgress
    ]);
    const handleConfigure = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (args)=>await configureProject({
            projectId,
            imgHash: args.imgHash,
            animationHash: args.animationHash,
            blurbHash: args.blurbHash,
            genre: args.genre,
            subtitle: args.subtitle,
            onError: undefined,
            onSuccess: ()=>{
                setShowConfigureModal(false);
                refetch();
            }
        })
    , [
        projectId,
        refetch,
        configureProject
    ]);
    const handleSetContributors = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (contributorsList)=>await setContributors({
            projectId,
            contributorsList,
            onError: undefined,
            onSuccess: ()=>{
                setShowContributorsModal(false);
                refetch();
            }
        })
    , [
        projectId,
        refetch,
        setContributors
    ]);
    const handleStartAuctions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (amountForCreator)=>await startAuctions({
            projectId,
            amountForCreator,
            initialMintPrice: project.initialMintPrice,
            onSuccess: ()=>{
                setShowAuthorMintModal(false);
                refetch();
            }
        })
    , [
        project.initialMintPrice,
        projectId,
        refetch,
        startAuctions
    ]);
    const handleEnableNextEdition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (price, amount)=>await enableNextEdition({
            projectId,
            amount,
            price,
            onSuccess: ()=>{
                setShowEnableNextEditionModal(false);
                refetch();
            }
        })
    , [
        enableNextEdition,
        projectId,
        refetch
    ]);
    const beforeAuction = ()=>{
        var ref, ref1;
        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Title__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                    size: "m",
                    margin: "0 0 3rem 0",
                    children: [
                        "Launching ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Emojis__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            symbol: "🚀",
                            label: "Rocket"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ProgressBarWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProgressBar__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                            completed: calculatedProgress
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProgressBarIndicator, {
                            children: calculatedProgressIndicationText
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ActionItems, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MoreDetails__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            title: configured || project.auctionsStarted ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: '1) Configure Project'
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Checkmark__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                                ]
                            }) : '1) Configure Project',
                            styles: {
                                marginBlockEnd: '1rem'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Save more information about this work in the contract, to make your project more appealing and trustworthy."
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                        disabled: configured || project.auctionsStarted,
                                        text: "Configure Your Project",
                                        loading: configureStatus == 'confirming' || configureStatus == 'waiting',
                                        onClick: ()=>setShowConfigureModal(true)
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MoreDetails__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            title: project.auctionsStarted || ((ref = project.contributors) === null || ref === void 0 ? void 0 : ref.length) > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: '2) Add Contributors'
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Checkmark__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                                ]
                            }) : '2) Add Contributors (Optional)',
                            styles: {
                                marginBlockEnd: '1rem'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "This is optional. You can specify what share of the fund contributors to your project will receive. This action can only be done before triggering the auctions."
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                        disabled: setContributorsStatus === 'confirming' || setContributorsStatus === 'waiting' || project.auctionsStarted || !!((ref1 = project.contributors) === null || ref1 === void 0 ? void 0 : ref1.length),
                                        text: "Add Contributors",
                                        loading: setContributorsStatus === 'confirming' || setContributorsStatus === 'waiting',
                                        onClick: ()=>setShowContributorsModal(true)
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MoreDetails__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            open: Number(project.premintedByAuthor) > 0 && !project.auctionsStarted,
                            title: project.auctionsStarted ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: '3) Start Auctions'
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Checkmark__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
                                ]
                            }) : '3) Start Auctions',
                            styles: {
                                marginBlockEnd: '1rem'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Start the auctions for your Genesis Edition. Make sure to claim an amount of NFTs for yourself. At least 1 and max 4."
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                        disabled: startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting' || project.auctionsStarted || !!Number(project.premintedByAuthor),
                                        text: "Start Auctions",
                                        loading: startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting',
                                        onClick: ()=>setShowAuthorMintModal(true)
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        }));
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                size: "l",
                children: "Project Settings"
            }),
            !project.auctionsStarted && beforeAuction(),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                size: "m",
                margin: "3rem 0 3rem 0",
                children: "Editions"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ActionItems, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MoreDetails__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    open: canTriggerNextEdition,
                    title: 'Unlock Next Edition',
                    styles: {
                        marginBlockEnd: '1rem'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "When all NFTs of the last editions have sold out, you can start the next one!"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                disabled: !canTriggerNextEdition || enableNextEditionStatus === 'confirming' || enableNextEditionStatus === 'waiting',
                                text: "Unlock Next Edition",
                                loading: enableNextEditionStatus === 'confirming' || enableNextEditionStatus === 'waiting',
                                onClick: ()=>setShowEnableNextEditionModal(true)
                            })
                        ]
                    })
                })
            }),
            showConfigureModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ConfigureModal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                onClose: ()=>setShowConfigureModal(false)
                ,
                onConfigure: handleConfigure,
                pending: configureStatus == 'confirming' || configureStatus == 'waiting'
            }),
            showContributorsModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ContributorsModal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                onClose: ()=>setShowContributorsModal(false)
                ,
                onSetContributors: handleSetContributors,
                pending: setContributorsStatus === 'confirming' || setContributorsStatus === 'waiting'
            }),
            showAuthorMintModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_StartAuctionsModal__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                onClose: ()=>setShowAuthorMintModal(false)
                ,
                onStartAuctions: handleStartAuctions,
                pending: startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting'
            }),
            showEnableNextEditionModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_EnableNextEditionModal__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                onClose: ()=>setShowEnableNextEditionModal(false)
                ,
                onEnableNextEdition: handleEnableNextEdition,
                pending: enableNextEditionStatus === 'confirming' || enableNextEditionStatus === 'waiting',
                project: project
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthorSection);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6206:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6577);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _BaseModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8698);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7289);
/* harmony import */ var _Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9019);
/* harmony import */ var _hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5441);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8639);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7603);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9826);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8217);
/* harmony import */ var _Create_RichText__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5937);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__, _hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_8__, _ActionButton__WEBPACK_IMPORTED_MODULE_9__, _Dropdown__WEBPACK_IMPORTED_MODULE_10__]);
([_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__, _hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_8__, _ActionButton__WEBPACK_IMPORTED_MODULE_9__, _Dropdown__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const ContentWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 600px;
`;
const FlexColumn = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Label = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().label)`
  display: inline-block;
  margin-block-end: 0.5rem;
`;
const DropdownWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  margin-block-end: 3rem;
`;
const RichTextWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  margin-block-end: 3rem;
`;
const ConfigureModal = ({ onConfigure , onClose , pending  })=>{
    const client = (0,_hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_8__/* .useIpfsClient */ .c)();
    const { 0: imgBuffer , 1: setImgBuffer  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: imgFile , 1: setImgFile  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: blurb , 1: setBlurb  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: genre , 1: setGenre  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: subtitle , 1: setSubtitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: uploadPending , 1: setUploadPending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const genreOptions = _constants__WEBPACK_IMPORTED_MODULE_13__/* .GENRES */ .xG === null || _constants__WEBPACK_IMPORTED_MODULE_13__/* .GENRES */ .xG === void 0 ? void 0 : _constants__WEBPACK_IMPORTED_MODULE_13__/* .GENRES.map */ .xG.map((item)=>({
            id: item,
            value: item,
            onSelect: ()=>setGenre(item)
        })
    );
    const captureFile = (file)=>{
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = ()=>{
            const buffer = Buffer.from(reader.result);
            setImgFile(file);
            setImgBuffer(buffer);
        };
    };
    const handleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            setUploadPending(true);
            let blurbCID = '';
            let coverImgCID = '';
            if (imgBuffer) {
                coverImgCID = (await client.add(imgBuffer)).path;
            }
            if (blurb) {
                const uploadContent = typeof blurb === 'string' ? blurb : JSON.stringify(blurb);
                blurbCID = (await client.add(uploadContent)).path;
            }
            onConfigure({
                imgHash: coverImgCID,
                animationHash: '',
                blurbHash: blurbCID,
                genre,
                subtitle
            });
            setUploadPending(false);
        } catch (e) {
            setUploadPending(false);
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error('Something went wrong while trying to uplod your data to IPFS.');
        }
    }, [
        blurb,
        client,
        genre,
        imgBuffer,
        onConfigure,
        subtitle
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BaseModal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        onClose: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContentWrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                    size: "m",
                    margin: "0 0 2rem 0",
                    children: "Configure Your Project"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexColumn, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .ZP, {
                            label: 'Subtitle: ',
                            value: subtitle,
                            onChange: (e)=>{
                                setSubtitle(e.target.value);
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DropdownWrapper, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Dropdown__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                options: genreOptions,
                                placeholder: "Genre",
                                width: "100%"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                            children: 'Blurb:'
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RichTextWrapper, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Create_RichText__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                                onKeyDown: (val)=>setBlurb(val)
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__/* .StyledImageForm */ .j9, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__/* .DragNDrop */ .EZ, {
                                    onDragOver: (e)=>{
                                        e.preventDefault();
                                    },
                                    onDrop: (e)=>{
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        captureFile(file);
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                                        src: imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png',
                                        height: '100%',
                                        width: '100%',
                                        alt: 'Cover',
                                        quality: 65,
                                        layout: "responsive"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FlexColumn, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__/* .FileName */ .dJ, {
                                            children: imgFile ? (0,_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__/* .shortenImageName */ .sr)(imgFile.name) : ''
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_7__/* .StyledFileInput */ .hw, {
                                            disabled: pending,
                                            type: "file",
                                            onChange: (e)=>{
                                                e.preventDefault();
                                                const file = e.target.files[0];
                                                captureFile(file);
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                            disabled: pending,
                            onClick: handleClick,
                            loading: uploadPending || pending,
                            width: "100%",
                            text: "Configure",
                            web3Connectable: true
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigureModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9723:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BaseModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8698);
/* harmony import */ var _Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9275);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_4__]);
_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const ContentWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 600px;
`;
const ContributorsModal = ({ onClose , onSetContributors , pending  })=>{
    const contribInitialState = {
        1: {
            address: '',
            share: 0,
            role: ''
        },
        2: {
            address: '',
            share: 0,
            role: ''
        },
        3: {
            address: '',
            share: 0,
            role: ''
        }
    };
    const { 0: contributors , 1: setContributors  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(contribInitialState);
    const contributorsList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const contribsArray = Object.values(contributors).map((contrib)=>contrib
        ).filter((contrib)=>contrib.address.length && contrib.share
        );
        return contribsArray;
    }, [
        contributors
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BaseModal__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        onClose: onClose,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ContentWrapper, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                contributors: contributors,
                contributorsList: contributorsList,
                loading: pending,
                onChange: (idx, key, val)=>setContributors({
                        ...contributors,
                        [idx]: {
                            ...contributors[idx],
                            [key]: val
                        }
                    })
                ,
                onSubmit: (e)=>{
                    e.preventDefault();
                    onSetContributors(contributorsList);
                }
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContributorsModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4493:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8317);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8639);
/* harmony import */ var _BaseModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8698);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7289);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5468);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__]);
([_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const EnableNextEditionModal = ({ onClose , onEnableNextEdition , pending , project  })=>{
    const { 0: nextEditionMaxAmount , 1: setNextEditionMaxAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const { 0: nextEditionMintPrice , 1: setMextEditionMintPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('0');
    const maxPossibleAmount = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        if ((project === null || project === void 0 ? void 0 : project.endId) && (project === null || project === void 0 ? void 0 : project.currentId)) {
            return Number(project.endId.sub(project.currentId));
        }
        return 0;
    }, [
        project === null || project === void 0 ? void 0 : project.endId,
        project === null || project === void 0 ? void 0 : project.currentId
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BaseModal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        onClose: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.ContentWrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "m",
                    children: 'Unlock Next Edition'
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.ModalText, {
                    children: "Specify the max amount and price per mint."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "xs",
                    color: _themes__WEBPACK_IMPORTED_MODULE_7__/* .PINK */ .hl,
                    margin: "0 0 2rem 0",
                    width: "75%",
                    children: "Caution: The matic your project earns by selling the NFTs are only distributed after an edition sells out. Make sure you choose an appropriate price and amount. If an edition does not sell out, the matic earned stays locked inside the contract."
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.CTAWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                            label: 'Max Amount',
                            value: nextEditionMaxAmount,
                            onChange: (e)=>{
                                const onlyNumbers = /^[0-9\b]+$/;
                                if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                                    setNextEditionMaxAmount(Number(e.target.value));
                                }
                            },
                            error: (Number(nextEditionMaxAmount) < 1 || Number(nextEditionMaxAmount) > maxPossibleAmount) && `Must be between 1 and ${maxPossibleAmount}.`
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                            label: 'Mint Price',
                            value: nextEditionMintPrice,
                            onChange: (e)=>{
                                setMextEditionMintPrice(e.target.value);
                            },
                            // TODO: read this from contract
                            error: Number(nextEditionMintPrice) < 0.1 && 'Price too low.',
                            type: "number"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            disabled: pending || Number(nextEditionMaxAmount) < 1 || Number(nextEditionMaxAmount) > maxPossibleAmount || Number(nextEditionMintPrice) < 0.01,
                            text: "UNLOCK",
                            loading: pending,
                            margin: "1rem 0 0 0",
                            onClick: (e)=>{
                                e.preventDefault();
                                onEnableNextEdition(nextEditionMintPrice, nextEditionMaxAmount);
                            },
                            web3Connectable: true
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EnableNextEditionModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5992:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_formatNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5346);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8639);
/* harmony import */ var _BaseModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8698);
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6293);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5468);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _NextLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5369);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ActionButton__WEBPACK_IMPORTED_MODULE_3__]);
_ActionButton__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];










const Wrapper = (styled_components__WEBPACK_IMPORTED_MODULE_8___default().div)`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter';
`;
const MintLegalModal = ({ amount , handleClick , onClose , mintStatus , price  })=>{
    const { 0: agreed , 1: setAgreed  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const toggleChecked = ()=>{
        setAgreed(!agreed);
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BaseModal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        onClose: ()=>{
            onClose();
            setAgreed(false);
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Wrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    color: _themes__WEBPACK_IMPORTED_MODULE_7__/* .PINK */ .hl,
                    size: "s",
                    padding: "0 0 0 1rem",
                    children: `Total: ${(0,_utils_formatNumber__WEBPACK_IMPORTED_MODULE_1__/* .formatNumber */ .u)(price)} Matic (Amount: ${amount})`
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Checkbox__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    onChange: toggleChecked,
                    check: agreed,
                    readonly: false,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: [
                            "I have read and understood the",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NextLink__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                href: "https://moonpage.gitbook.io/moonpage-terms-of-service/",
                                name: "Terms of Service (Last updated: 14.11.2022)."
                            }),
                            "and want to mint this NFT."
                        ]
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    disabled: mintStatus === 'confirming' || mintStatus === 'waiting' || !agreed,
                    loading: mintStatus === 'confirming' || mintStatus === 'waiting',
                    onClick: handleClick,
                    text: "MINT",
                    web3Connectable: true
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MintLegalModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2285:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2522);
/* harmony import */ var ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5468);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
/* harmony import */ var _PieChart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5785);
/* harmony import */ var _hooks_collection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7268);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8639);
/* harmony import */ var _MintLegalModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5992);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ActionButton__WEBPACK_IMPORTED_MODULE_9__, _MintLegalModal__WEBPACK_IMPORTED_MODULE_10__]);
([_ActionButton__WEBPACK_IMPORTED_MODULE_9__, _MintLegalModal__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const Root = (styled_components__WEBPACK_IMPORTED_MODULE_4___default().div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Price = (styled_components__WEBPACK_IMPORTED_MODULE_4___default().h3)`
  text-transform: uppercase;
`;
const ControlWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_4___default().div)`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 1rem;
  }
`;
const StyledControl = styled_components__WEBPACK_IMPORTED_MODULE_4___default()(_themes__WEBPACK_IMPORTED_MODULE_5__/* .BaseButton */ .Yd)``;
const StyledFakeInput = (styled_components__WEBPACK_IMPORTED_MODULE_4___default().span)`
  width: 100px;
  display: inline-block;
  margin: 0 1rem;
  text-align: center;
`;
const MintSection = ({ currentEdition , project , refetch  })=>{
    const { 0: showLegalModal , 1: setShowLegalModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: amount , 1: setAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const { mint , mintStatus  } = (0,_hooks_collection__WEBPACK_IMPORTED_MODULE_8__/* .useCollection */ .K)();
    const totalSupply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return project.currentId.sub(currentEdition === null || currentEdition === void 0 ? void 0 : currentEdition.startId);
    }, [
        project,
        currentEdition
    ]);
    const maxSupply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (currentEdition) {
            const totalOfThisEdition = currentEdition === null || currentEdition === void 0 ? void 0 : currentEdition.endId.sub(currentEdition === null || currentEdition === void 0 ? void 0 : currentEdition.startId).add(ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from('1'));
            return totalOfThisEdition;
        }
        return undefined;
    }, [
        currentEdition
    ]);
    const edition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return currentEdition ? Number(currentEdition.edition) : 'Unknown';
    }, [
        currentEdition
    ]);
    const price = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (currentEdition === null || currentEdition === void 0 ? void 0 : currentEdition.mintPrice) {
            return currentEdition === null || currentEdition === void 0 ? void 0 : currentEdition.mintPrice.mul(amount);
        }
    }, [
        currentEdition,
        amount
    ]);
    const isMinting = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            'confirming',
            'waiting'
        ].includes(mintStatus)
    , [
        mintStatus
    ]);
    const isSoldOut = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>totalSupply.eq(maxSupply)
    , [
        maxSupply,
        totalSupply
    ]);
    const handleIncrement = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setAmount(amount + 1);
    }, [
        amount
    ]);
    const handleDecrement = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setAmount(amount - 1);
    }, [
        amount
    ]);
    const handleMint = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        await mint({
            projectId: project.id,
            amount,
            price,
            onSuccess: ()=>{
                refetch();
                setShowLegalModal(false);
            }
        });
    }, [
        amount,
        mint,
        price,
        project.id,
        refetch
    ]);
    var ref;
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                children: `MINT - EDITION ${edition}`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Price, {
                children: `Price ${price ? (0,ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__.formatEther)(price) : 0} MATIC`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_PieChart__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                part: (ref = Number(totalSupply)) !== null && ref !== void 0 ? ref : 0,
                whole: Number(maxSupply)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ControlWrapper, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledControl, {
                        onClick: handleDecrement,
                        disabled: amount === 1 || isSoldOut,
                        children: "-"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledFakeInput, {
                        children: amount
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledControl, {
                        onClick: handleIncrement,
                        disabled: amount === 10 || amount === Number(maxSupply.sub(totalSupply)) || isSoldOut,
                        children: "+"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                disabled: amount > Number(maxSupply.sub(totalSupply)) || isMinting,
                onClick: ()=>setShowLegalModal(true)
                ,
                text: "MINT",
                loading: isMinting,
                web3Connectable: true
            }),
            showLegalModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_MintLegalModal__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                amount: amount,
                handleClick: handleMint,
                onClose: ()=>setShowLegalModal(false)
                ,
                mintStatus: mintStatus,
                price: price
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MintSection);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6499:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8317);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8639);
/* harmony import */ var _BaseModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8698);
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7289);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9826);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__]);
([_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__, _ActionButton__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const StartAuctionsModal = ({ onClose , onStartAuctions , pending  })=>{
    const { 0: authorMintInput , 1: setAuthorMintInput  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const isValidInput = (amount)=>amount >= 1 && amount <= _constants__WEBPACK_IMPORTED_MODULE_7__/* .MAX_MINTABLE_BY_CREATOR */ .WB
    ;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BaseModal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        onClose: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.ContentWrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Start Genesis Edition Auctions"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.ModalText, {
                    children: `You as an author can mint an amount (min 1, max 4) of your project's Genesis
        Edition NFTs for yourself. One will always go to the Moonpage Project.`
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.ModalText, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            size: "xs",
                            padding: "0",
                            children: `You: ${authorMintInput !== null && authorMintInput !== void 0 ? authorMintInput : ''}`
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            size: "xs",
                            padding: "0",
                            children: 'Moonpage: 1'
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_pages_projects_projectId___WEBPACK_IMPORTED_MODULE_1__.CTAWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_InputField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP, {
                            value: authorMintInput,
                            onChange: (e)=>{
                                if (isValidInput(Number(e.target.value))) {
                                    setAuthorMintInput(Number(e.target.value));
                                } else {
                                    // to enable the user to delete everything
                                    setAuthorMintInput(undefined);
                                }
                            },
                            error: !isValidInput(authorMintInput) && 'Incorrect amount.',
                            type: "number"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ActionButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            disabled: pending || !isValidInput(authorMintInput),
                            text: "MINT",
                            loading: pending,
                            margin: "0",
                            onClick: (e)=>{
                                e.preventDefault();
                                onStartAuctions(Number(authorMintInput));
                            },
                            web3Connectable: true
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StartAuctionsModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4930:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var slate_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9811);
/* harmony import */ var slate_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(slate_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(370);
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(slate__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var slate_history__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9116);
/* harmony import */ var slate_history__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(slate_history__WEBPACK_IMPORTED_MODULE_5__);






const StyledEditable = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(slate_react__WEBPACK_IMPORTED_MODULE_3__.Editable)`
  width: 100%;
  overflow-wrap: break-word;
  margin-block-start: 1rem;
  font-size: 16px;
  font-family: monospace;
`;
const RichText = ({ text  })=>{
    const renderElement = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Element, {
            ...props
        })
    , []);
    const renderLeaf = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Leaf, {
            ...props
        })
    , []);
    const editor = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,slate_history__WEBPACK_IMPORTED_MODULE_5__.withHistory)((0,slate_react__WEBPACK_IMPORTED_MODULE_3__.withReact)((0,slate__WEBPACK_IMPORTED_MODULE_4__.createEditor)()))
    , []);
    if (!text) return;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(slate_react__WEBPACK_IMPORTED_MODULE_3__.Slate, {
        editor: editor,
        value: text,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledEditable, {
            renderElement: renderElement,
            renderLeaf: renderLeaf,
            disabled: true
        })
    }));
};
const Element = ({ children , element  })=>{
    const attributes = {
        contentEditable: false
    };
    const style = {
        textAlign: element.align
    };
    switch(element.type){
        case 'block-quote':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("blockquote", {
                style: style,
                ...attributes,
                children: children
            }));
        case 'bulleted-list':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                style: style,
                ...attributes,
                children: children
            }));
        case 'heading-one':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                style: {
                    fontSize: '36px'
                },
                ...attributes,
                children: children
            }));
        case 'heading-two':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                style: {
                    fontSize: '24px'
                },
                ...attributes,
                children: children
            }));
        case 'list-item':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                style: style,
                ...attributes,
                children: children
            }));
        case 'numbered-list':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ol", {
                style: style,
                ...attributes,
                children: children
            }));
        default:
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                style: style,
                ...attributes,
                children: children
            }));
    }
};
const Leaf = ({ children , leaf  })=>{
    if (leaf.bold) {
        children = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
            children: children
        });
    }
    if (leaf.code) {
        children = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("code", {
            children: children
        });
    }
    if (leaf.italic) {
        children = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("em", {
            children: children
        });
    }
    if (leaf.underline) {
        children = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("u", {
            children: children
        });
    }
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        contentEditable: false,
        children: children
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RichText);


/***/ }),

/***/ 9285:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6577);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5680);
/* harmony import */ var _BaseModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8698);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5468);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7603);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8217);
/* harmony import */ var _utils_switchNetwork__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6957);
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6293);
/* harmony import */ var _NextLink__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5369);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Dropdown__WEBPACK_IMPORTED_MODULE_9__]);
_Dropdown__WEBPACK_IMPORTED_MODULE_9__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];














const ContentWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  margin: 3rem;

  @media (max-width: 900px) {
    margin: 1rem;
  }
`;
const SubHeader = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().h3)`
  text-align: center;
`;
const DropdownWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  width: 100%;
  margin-block-end: 1.5rem;
`;
const TermsOfService = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_8__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_8__/* .INSET_BASE_BOX_SHADOW */ .ux};
  margin-block-end: 1rem;
  padding: 1rem;

  :disabled {
    box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_8__/* .INSET_BASE_BOX_SHADOW */ .ux};
    pointer-events: none;
  }
`;
const ConnectionButton = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(_themes__WEBPACK_IMPORTED_MODULE_8__/* .BaseButton */ .Yd)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-block-start: 1.5rem;
  padding: 1rem;

  :disabled {
    opacity: 0.5;
  }
`;
const ConnectorName = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().span)`
  display: inlinel-block;
`;
const WalletConnectionModal = ({ onClose  })=>{
    const isProd = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD';
    const { 0: selectedNetwork , 1: setSelectedNetwork  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isProd ? 137 : 80001);
    const { 0: isTermsAccepted , 1: setIsTermsAccepted  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { activate , chainId  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_3__.useWeb3React)();
    const toggleTermsAccepted = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsTermsAccepted(!isTermsAccepted);
    }, [
        isTermsAccepted
    ]);
    const handleMetaMaskClick = async ()=>{
        try {
            await activate(_connectors__WEBPACK_IMPORTED_MODULE_6__/* .injected */ .Lj, undefined, true);
            onClose();
        } catch (e) {
            if (e.name === 'UnsupportedChainIdError' || e.message.includes('Unsupported chain id:')) {
                // TODO: close modal on success etc
                (0,_utils_switchNetwork__WEBPACK_IMPORTED_MODULE_11__/* .switchNetwork */ .I)(selectedNetwork, ()=>react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error('Switching Network failed.')
                , async ()=>{
                    // onSuccess reattempt connect and close modal
                    await activate(_connectors__WEBPACK_IMPORTED_MODULE_6__/* .injected */ .Lj, undefined, true);
                    onClose();
                });
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(e.message);
            }
        }
    };
    const handleWalletConnectClick = async ()=>{
        try {
            await activate(_connectors__WEBPACK_IMPORTED_MODULE_6__/* .walletconnect */ .Lw, undefined, true);
            onClose();
        } catch (e) {
            react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(e.message);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (chainId) {
            const isSupported = _connectors__WEBPACK_IMPORTED_MODULE_6__/* .supportedChainIds.includes */ .KC.includes(chainId);
            if (!isSupported) {
                react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error('Wrong chain. Please connect to a supported network!');
            }
        }
    }, [
        chainId
    ]);
    const networkDropdownItems = Object.values(_connectors__WEBPACK_IMPORTED_MODULE_6__/* .supportedChainMapping */ .H).map((chain, idx)=>{
        return {
            id: Number(Object.keys(_connectors__WEBPACK_IMPORTED_MODULE_6__/* .supportedChainMapping */ .H)[idx]),
            value: chain.name,
            img: chain.icon,
            onSelect: (network)=>{
                console.log({
                    network
                });
                setSelectedNetwork(network);
            }
        };
    });
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BaseModal__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
        onClose: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContentWrapper, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    size: "m",
                    children: "Connect To Your Wallet"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TermsOfService, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Checkbox__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                        onChange: toggleTermsAccepted,
                        check: isTermsAccepted,
                        readonly: false,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            children: [
                                "By connecting your wallet and using the Moonpage website, you agree to our",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NextLink__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                                    href: "https://moonpage.gitbook.io/moonpage-terms-of-service/",
                                    name: "Terms of Service (Last updated: 14.11.2022)."
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DropdownWrapper, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Dropdown__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        isDisabled: true,
                        preselected: networkDropdownItems[isProd ? 0 : 1],
                        options: [
                            networkDropdownItems[isProd ? 0 : 1]
                        ],
                        width: '100%'
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SubHeader, {
                    children: "Wallets"
                }),
                (window === null || window === void 0 ? void 0 : window.ethereum) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ConnectionButton, {
                    disabled: !isTermsAccepted,
                    onClick: handleMetaMaskClick,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ConnectorName, {
                            children: "METAMASK"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                src: '/MetaMask.png',
                                width: 36,
                                height: 36,
                                alt: "Metamask icon",
                                priority: true
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ConnectionButton, {
                    disabled: !isTermsAccepted,
                    onClick: handleWalletConnectClick,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ConnectorName, {
                            children: "WALLETCONNECT"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                src: '/WalletConnect.png',
                                width: 40,
                                height: 25,
                                alt: "Walletconnect icon",
                                priority: true
                            })
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WalletConnectionModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "x": () => (/* reexport */ useAuctions)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./providers/index.ts + 16 modules
var providers = __webpack_require__(7000);
;// CONCATENATED MODULE: ./hooks/auctions/useAuctions.ts


const useAuctions = ()=>{
    const api = (0,external_react_.useContext)(providers/* AuctionsContext */.Q5);
    if (!api) {
        throw new Error('useAuctions must be used within a AuctionsProvider');
    }
    return api;
};

;// CONCATENATED MODULE: ./hooks/auctions/index.ts



/***/ }),

/***/ 7268:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "K": () => (/* reexport */ useCollection)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./providers/index.ts + 16 modules
var providers = __webpack_require__(7000);
;// CONCATENATED MODULE: ./hooks/collection/useCollection.ts


const useCollection = ()=>{
    const api = (0,external_react_.useContext)(providers/* CollectionContext */.WH);
    if (!api) {
        throw new Error('useCollection must be used within a ManagerProvider');
    }
    return api;
};

;// CONCATENATED MODULE: ./hooks/collection/index.ts



/***/ }),

/***/ 7757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "r": () => (/* reexport */ useFactory)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./providers/index.ts + 16 modules
var providers = __webpack_require__(7000);
;// CONCATENATED MODULE: ./hooks/factory/useFactory.ts


const useFactory = ()=>{
    const api = (0,external_react_.useContext)(providers/* FactoryContext */.jW);
    if (!api) {
        throw new Error('useFactory must be used within a Factory');
    }
    return api;
};

;// CONCATENATED MODULE: ./hooks/factory/index.ts



/***/ }),

/***/ 7563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "v": () => (/* reexport */ useManager)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./providers/index.ts + 16 modules
var providers = __webpack_require__(7000);
;// CONCATENATED MODULE: ./hooks/manager/useManager.ts


const useManager = ()=>{
    const api = (0,external_react_.useContext)(providers/* ManagerContext */.tl);
    if (!api) {
        throw new Error('useUManager must be used within a ManagerProvider');
    }
    return api;
};

;// CONCATENATED MODULE: ./hooks/manager/index.ts



/***/ }),

/***/ 1689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ useGetProject)
/* harmony export */ });
/* unused harmony export GET_ONE_PROJECT */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_2__);



const GET_ONE_PROJECT = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  query oneProjectQuery($id: String!) {
    project(id: $id) {
      auctionsEnded
      auctionsStarted
      blurbIpfsHash
      contributors {
        id
        address
        sharePercentage
        role
      }
      createdAt
      creator
      currentAuctionExpiresAt
      currentId
      editions {
        id
        edition
        startId
        endId
        mintPrice
      }
      endId
      genre
      id
      imgIpfsHash
      initialMintPrice
      mintCount
      originalLanguage
      premintedByAuthor
      startId
      subtitle
      textIpfsHash
      translationIpfsHash
      title
    }
  }
`;
function useGetProject(projectId) {
    const { loading , error , data , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(GET_ONE_PROJECT, {
        variables: {
            id: projectId
        }
    });
    const formattedData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        var ref, ref1;
        if (!data) return;
        const { project  } = data;
        if (!project) return;
        const formattedContributors = (ref = project.contributors) === null || ref === void 0 ? void 0 : ref.map((contributor)=>({
                ...contributor,
                ['sharePercentage']: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(contributor.sharePercentage)
            })
        );
        const formattedEditions = (ref1 = project.editions) === null || ref1 === void 0 ? void 0 : ref1.map((edition)=>({
                ...edition,
                ['edition']: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(edition.edition),
                ['startId']: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(edition.startId),
                ['endId']: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(edition.endId),
                ['mintPrice']: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(edition.mintPrice)
            })
        );
        return {
            ...data.project,
            mintCount: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(project.mintCount),
            startId: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(project.startId),
            endId: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(project.endId),
            currentId: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(project.currentId),
            initialMintPrice: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(project.initialMintPrice),
            premintedByAuthor: ethers__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(project.premintedByAuthor),
            contributors: formattedContributors,
            editions: formattedEditions,
            imgIpfsHash: data.project.imgIpfsHash
        };
    }, [
        data
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            isLoading: loading,
            error,
            project: formattedData,
            refetch
        })
    , [
        loading,
        error,
        formattedData,
        refetch
    ]);
}


/***/ }),

/***/ 5441:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ useIpfsClient)
/* harmony export */ });
/* harmony import */ var ipfs_http_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2962);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([ipfs_http_client__WEBPACK_IMPORTED_MODULE_0__]);
ipfs_http_client__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const useIpfsClient = ()=>{
    const projectId = process.env.NX_PUBLIC_IPFS_INFURA_PROJECT_ID;
    const projectSecret = process.env.NX_PUBLIC_IPFS_INFURA_SECRET;
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const client = (0,ipfs_http_client__WEBPACK_IMPORTED_MODULE_0__.create)({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        apiPath: '/api/v0',
        headers: {
            authorization: auth
        }
    });
    return client;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export GET_PROJECT */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _user_useUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7402);




const GET_PROJECT = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  query oneProjectQuery($id: String!) {
    project(id: $id) {
      createdAt
      creator
      genre
      id
      originalLanguage
      subtitle
      textIpfsHash
      translationIpfsHash
      title
    }
  }
`;
const useShowText = (projectId)=>{
    const { account  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_2__.useWeb3React)();
    const { detailedNfts  } = (0,_user_useUser__WEBPACK_IMPORTED_MODULE_3__/* .useUser */ .a)();
    const allowedToRead = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return !!(detailedNfts === null || detailedNfts === void 0 ? void 0 : detailedNfts.find((nft)=>nft.projectId === Number(projectId)
        ));
    }, [
        detailedNfts,
        projectId
    ]);
    const { 0: text , 1: setText  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const { 0: translation , 1: setTranslation  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const { 0: pending , 1: setPending  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const { loading: isLoading , error , data ,  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(GET_PROJECT, {
        variables: {
            id: projectId
        }
    });
    const project = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return data === null || data === void 0 ? void 0 : data.project;
    }, [
        data
    ]);
    const fetchTextData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        setPending(true);
        if (!project || !account || error) {
            return null;
        }
        try {
            const response = await fetch(`https://ipfs.io/ipfs/${project === null || project === void 0 ? void 0 : project.textIpfsHash}`);
            if (response.ok) {
                const fetchedText = await response.text();
                const formatted = JSON.parse(fetchedText);
                setText(formatted);
                setPending(false);
            }
        } catch (e) {
            console.log({
                e
            });
            setPending(false);
        }
    }, [
        project,
        account,
        error
    ]);
    const fetchTranslation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        setPending(true);
        if (!(project === null || project === void 0 ? void 0 : project.translationIpfsHash) || !account || error) {
            return null;
        }
        try {
            const response = await fetch(`https://ipfs.io/ipfs/${project === null || project === void 0 ? void 0 : project.translationIpfsHash}`);
            if (response.ok) {
                const fetchedTranslation = await response.text();
                const formatted = JSON.parse(fetchedTranslation);
                setTranslation(formatted);
                setPending(false);
            }
        } catch (e) {
            console.log({
                e
            });
            setPending(false);
        }
    }, [
        account,
        error,
        project
    ]);
    const hasTranslation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        var ref;
        return (project === null || project === void 0 ? void 0 : (ref = project.translationIpfsHash) === null || ref === void 0 ? void 0 : ref.length) > 0;
    }, [
        project
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (account && allowedToRead) {
            fetchTextData();
        }
    }, [
        account,
        allowedToRead,
        fetchTextData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (account && hasTranslation) {
            fetchTranslation();
        }
    }, [
        account,
        allowedToRead,
        fetchTextData,
        fetchTranslation,
        hasTranslation
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return {
            allowedToRead,
            pending: pending || isLoading,
            project,
            text,
            translation,
            hasTranslation,
            fetchTranslation,
            textIpfsHash: project === null || project === void 0 ? void 0 : project.textIpfsHash
        };
    }, [
        allowedToRead,
        fetchTranslation,
        hasTranslation,
        isLoading,
        pending,
        project,
        text,
        translation, 
    ]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useShowText);


/***/ }),

/***/ 3869:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useIpfsClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5441);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useIpfsClient__WEBPACK_IMPORTED_MODULE_2__]);
_useIpfsClient__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const useUploadTextToIpfs = ()=>{
    const client = (0,_useIpfsClient__WEBPACK_IMPORTED_MODULE_2__/* .useIpfsClient */ .c)();
    const uploadText = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (content)=>{
        try {
            const uploadContent = typeof content === 'string' ? content : JSON.stringify(content);
            // upload to IPFS
            const added = await client.add(uploadContent);
            return added.path;
        } catch (e) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error('Something went wrong while uploading your text to ipfs.');
        }
    }, [
        client
    ]);
    return {
        uploadText
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useUploadTextToIpfs);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7000);


const useUser = ()=>{
    const api = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers__WEBPACK_IMPORTED_MODULE_1__/* .UserContext */ .St);
    if (!api) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return api;
};


/***/ }),

/***/ 3082:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlockSpan": () => (/* binding */ BlockSpan),
/* harmony export */   "ReviewItem": () => (/* binding */ ReviewItem),
/* harmony export */   "TextInput": () => (/* binding */ TextInput),
/* harmony export */   "FadeIn": () => (/* binding */ FadeIn),
/* harmony export */   "ReviewItemWrapper": () => (/* binding */ ReviewItemWrapper),
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "InputName": () => (/* binding */ InputName),
/* harmony export */   "InputDescription": () => (/* binding */ InputDescription),
/* harmony export */   "FlexContainer": () => (/* binding */ FlexContainer),
/* harmony export */   "ButtonsWrapper": () => (/* binding */ ButtonsWrapper),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2522);
/* harmony import */ var ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ProgressBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3998);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5468);
/* harmony import */ var _components_Create_NameForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5181);
/* harmony import */ var _components_Create_TextForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4744);
/* harmony import */ var _components_Create_AmountForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7024);
/* harmony import */ var _components_Create_PriceForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8909);
/* harmony import */ var _components_Create_ReviewForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6568);
/* harmony import */ var _components_Create_Congrats__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8105);
/* harmony import */ var _components_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9019);
/* harmony import */ var _components_Create_BlurbForm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7155);
/* harmony import */ var _components_Create_GenreForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8529);
/* harmony import */ var _components_Create_SubtitleForm__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4594);
/* harmony import */ var _components_Create_ConfigReviewForm__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6653);
/* harmony import */ var _components_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9275);
/* harmony import */ var _components_Create_Finished__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5641);
/* harmony import */ var _hooks_factory__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(7757);
/* harmony import */ var _hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5441);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _hooks_manager__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(7563);
/* harmony import */ var _components_Create_LanguageForm__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(5768);
/* harmony import */ var _components_Create_TranslationForm__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(4652);
/* harmony import */ var _components_Title__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(8217);
/* harmony import */ var _hooks_collection__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(7268);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _components_ConfettiCanon__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(7346);
/* harmony import */ var _hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(3869);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Create_NameForm__WEBPACK_IMPORTED_MODULE_6__, _components_Create_TextForm__WEBPACK_IMPORTED_MODULE_7__, _components_Create_AmountForm__WEBPACK_IMPORTED_MODULE_8__, _components_Create_PriceForm__WEBPACK_IMPORTED_MODULE_9__, _components_Create_ReviewForm__WEBPACK_IMPORTED_MODULE_10__, _components_Create_Congrats__WEBPACK_IMPORTED_MODULE_11__, _components_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_12__, _components_Create_BlurbForm__WEBPACK_IMPORTED_MODULE_13__, _components_Create_GenreForm__WEBPACK_IMPORTED_MODULE_14__, _components_Create_SubtitleForm__WEBPACK_IMPORTED_MODULE_15__, _components_Create_ConfigReviewForm__WEBPACK_IMPORTED_MODULE_16__, _components_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_17__, _components_Create_Finished__WEBPACK_IMPORTED_MODULE_18__, _hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_20__, _components_Create_LanguageForm__WEBPACK_IMPORTED_MODULE_23__, _components_Create_TranslationForm__WEBPACK_IMPORTED_MODULE_24__, _hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_29__]);
([_components_Create_NameForm__WEBPACK_IMPORTED_MODULE_6__, _components_Create_TextForm__WEBPACK_IMPORTED_MODULE_7__, _components_Create_AmountForm__WEBPACK_IMPORTED_MODULE_8__, _components_Create_PriceForm__WEBPACK_IMPORTED_MODULE_9__, _components_Create_ReviewForm__WEBPACK_IMPORTED_MODULE_10__, _components_Create_Congrats__WEBPACK_IMPORTED_MODULE_11__, _components_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_12__, _components_Create_BlurbForm__WEBPACK_IMPORTED_MODULE_13__, _components_Create_GenreForm__WEBPACK_IMPORTED_MODULE_14__, _components_Create_SubtitleForm__WEBPACK_IMPORTED_MODULE_15__, _components_Create_ConfigReviewForm__WEBPACK_IMPORTED_MODULE_16__, _components_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_17__, _components_Create_Finished__WEBPACK_IMPORTED_MODULE_18__, _hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_20__, _components_Create_LanguageForm__WEBPACK_IMPORTED_MODULE_23__, _components_Create_TranslationForm__WEBPACK_IMPORTED_MODULE_24__, _hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_29__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






























const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-block: 3rem 6rem;
`;
const Content = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  padding-inline: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    padding-inline: 2rem;
  }
`;
const ProgressBarWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-block-end: 3rem;

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;
const FormWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-block-start: 1rem;
`;
const Form = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 100%;
  max-width: 1200px;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BOX_SHADOW */ .S0};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const BlockSpan = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  display: inline-block;
  margin-block-end: 1rem;
`;
const ReviewItem = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().p)`
  display: inline-block;
  font-style: italic;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .PINK */ .hl};
`;
const TextInput = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().textarea)`
  height: 600px;
  width: 100%;

  font-size: 14px;
  line-height: 170%;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .INSET_BASE_BOX_SHADOW */ .ux};
  margin-block-end: 2rem;
  padding: 1rem;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .PLAIN_WHITE */ ._I};
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BG_NORMAL */ .te};
  outline: none;
`;
const FadeIn = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 100%;
  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ReviewItemWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  margin-block-end: 2rem;
`;
const Wrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 300px;
`;
const InputName = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().h2)`
  text-align: center;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .INTER_BOLD */ .UY};
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BORDER_RADIUS */ .B};

  padding: 1rem;
  display: inline-block;
  margin-block-end: 1rem;
`;
const InputDescription = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().p)`
  margin-block-end: 2rem;
  display: inline-block;
  text-align: center;
  width: 75%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const FlexContainer = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
`;
const ButtonsWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: space-between;
`;
const Create = ()=>{
    const client = (0,_hooks_useIpfsClient__WEBPACK_IMPORTED_MODULE_20__/* .useIpfsClient */ .c)();
    const { uploadText  } = (0,_hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .Z)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_27__.useRouter)();
    const { 0: currentStep , 1: setCurrentStep  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: title , 1: setTitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: text , 1: setText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: language , 1: setLanguage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: translation , 1: setTranslation  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    // const [textIPFS, setTextIPFS] = useState<null | string>(null);
    const { 0: agreed , 1: setAgreed  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: firstEdMintPrice , 1: setFirstEdMintPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('0');
    const { 0: firstEdMaxAmount , 1: setFirstEdMaxAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: projectId , 1: setProjectId  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: imgBuffer , 1: setImgBuffer  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: imgFile , 1: setImgFile  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: isUploadingImage , 1: setIsUploadingImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: coverImgIPFS , 1: setCoverImgIPFS  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: blurb , 1: setBlurb  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: blurbIPFS , 1: setBlurbIPFS  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: genre , 1: setGenre  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: subtitle , 1: setSubtitle  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: isPinPending , 1: setIsPinPending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { createProject  } = (0,_hooks_factory__WEBPACK_IMPORTED_MODULE_19__/* .useFactory */ .r)();
    const { configureProject , configureStatus , setContributors , setContributorsStatus , updateTranslation , updateTranslationStatus ,  } = (0,_hooks_manager__WEBPACK_IMPORTED_MODULE_22__/* .useManager */ .v)();
    const { startAuctions  } = (0,_hooks_collection__WEBPACK_IMPORTED_MODULE_26__/* .useCollection */ .K)();
    const nothingConfigured = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!subtitle.trim().length && !genre.trim().length && !(blurb === null || blurb === void 0 ? void 0 : blurb.length) && !coverImgIPFS.trim().length) return true;
        return false;
    }, [
        subtitle,
        genre,
        blurb,
        coverImgIPFS
    ]);
    const handleCreateProject = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setIsPinPending(true);
        const hash = await uploadText(text);
        setIsPinPending(false);
        await createProject({
            title,
            textIpfsHash: hash,
            originalLanguage: language,
            initialMintPrice: (0,ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__.parseEther)(firstEdMintPrice),
            firstEditionAmount: ethers__WEBPACK_IMPORTED_MODULE_21__.BigNumber.from(firstEdMaxAmount.toString()),
            onSuccess: (newProjectId)=>{
                setCurrentStep(currentStep + 1);
                setProjectId(newProjectId);
            },
            onError: undefined
        });
    }, [
        createProject,
        currentStep,
        firstEdMaxAmount,
        firstEdMintPrice,
        language,
        title,
        text,
        uploadText, 
    ]);
    const handleUpdateTranslation = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setIsPinPending(true);
        const hash = await uploadText(translation);
        setIsPinPending(false);
        await updateTranslation({
            projectId,
            translationIpfsHash: hash,
            onSuccess: ()=>{
                setCurrentStep(currentStep + 1);
            },
            onError: undefined
        });
    }, [
        currentStep,
        projectId,
        translation,
        updateTranslation,
        uploadText
    ]);
    const handleConfigure = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        // TODO: add animationhash
        await configureProject({
            projectId,
            imgHash: coverImgIPFS,
            animationHash: '',
            blurbHash: blurbIPFS,
            genre,
            subtitle,
            onSuccess: ()=>{
                setCurrentStep(currentStep + 1);
            }
        });
    }, [
        blurbIPFS,
        configureProject,
        coverImgIPFS,
        currentStep,
        genre,
        projectId,
        subtitle, 
    ]);
    const contribInitialState = {
        1: {
            address: '',
            share: 0,
            role: ''
        },
        2: {
            address: '',
            share: 0,
            role: ''
        },
        3: {
            address: '',
            share: 0,
            role: ''
        }
    };
    const { 0: contribs , 1: setContribs  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(contribInitialState);
    const contributorsList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const contribsArray = [];
        Object.entries(contribs).map((contrib)=>{
            if (contrib[1].address.length > 0 && contrib[1].share > 0) {
                contribsArray.push(contrib[1]);
            }
        });
        return contribsArray;
    }, [
        contribs
    ]);
    const handleSetContributors = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        await setContributors({
            projectId,
            contributorsList,
            onSuccess: ()=>{
                setCurrentStep(currentStep + 1);
            }
        });
    }, [
        contributorsList,
        currentStep,
        projectId,
        setContributors
    ]);
    const captureFile = (file)=>{
        // TODO: add loading
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = ()=>{
            // @ts-ignore
            const buffer = Buffer.from(reader.result);
            setImgFile(file);
            setImgBuffer(buffer);
        };
    };
    const submitImage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (event)=>{
        setIsUploadingImage(true);
        event.preventDefault();
        const added = await client.add(imgBuffer);
        setCoverImgIPFS(added.path);
        setCurrentStep(currentStep + 1);
        setIsUploadingImage(false);
    }, [
        client,
        imgBuffer,
        currentStep
    ]);
    const handleSetBlurb = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setIsPinPending(true);
        const hash = await uploadText(blurb);
        setIsPinPending(false);
        setBlurbIPFS(hash);
        setCurrentStep(currentStep + 1);
    }, [
        blurb,
        currentStep,
        uploadText
    ]);
    const handleStartAuctions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (authorMintInput)=>{
        await startAuctions({
            projectId,
            amountForCreator: authorMintInput,
            initialMintPrice: (0,ethers_lib_utils__WEBPACK_IMPORTED_MODULE_3__.parseEther)(firstEdMintPrice),
            onSuccess: ()=>router.push(`projects/${projectId}`)
        });
    }, [
        firstEdMintPrice,
        projectId,
        router,
        startAuctions
    ]);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .Z, {
                margin: "0 0 4rem 0",
                children: "Create"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Content, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProgressBarWrapper, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProgressBar__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            completed: currentStep ? currentStep / 14 * 100 : 0
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(FormWrapper, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ConfettiCanon__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .Z, {
                                show: !!projectId
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Form, {
                                children: [
                                    currentStep === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_NameForm__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                        onChange: (e)=>setTitle(e.target.value)
                                        ,
                                        onSubmit: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        title: title
                                    }),
                                    currentStep === 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_TextForm__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                        onKeyDown: (val)=>setText(val)
                                        ,
                                        onSubmit: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        text: text
                                    }),
                                    currentStep === 2 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_LanguageForm__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .Z, {
                                        onLanguageSet: (val)=>setLanguage(val)
                                        ,
                                        onSubmit: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        language: language,
                                        text: text
                                    }),
                                    currentStep === 3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_AmountForm__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                        onChange: (e)=>setFirstEdMaxAmount(Number(e.target.value))
                                        ,
                                        onSubmit: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        firstEdMaxAmount: firstEdMaxAmount
                                    }),
                                    currentStep === 4 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_PriceForm__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                        onChange: (e)=>setFirstEdMintPrice(e.target.value)
                                        ,
                                        onSubmit: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        firstEdMintPrice: firstEdMintPrice
                                    }),
                                    currentStep === 5 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_ReviewForm__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                        agreed: agreed,
                                        language: language,
                                        title: title,
                                        text: text,
                                        firstEdMaxAmount: firstEdMaxAmount,
                                        firstEdMintPrice: firstEdMintPrice,
                                        onCheck: ()=>setAgreed(!agreed)
                                        ,
                                        isPinPending: isPinPending,
                                        createDao: handleCreateProject
                                    }),
                                    currentStep === 6 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_Congrats__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                        onSubmit: ()=>{
                                            if (language == 'English') {
                                                setCurrentStep(currentStep + 2);
                                            } else {
                                                setCurrentStep(currentStep + 1);
                                            }
                                        }
                                    }),
                                    currentStep === 7 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_TranslationForm__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .Z, {
                                        onKeyDown: (val)=>setTranslation(val)
                                        ,
                                        onSubmit: handleUpdateTranslation,
                                        translation: translation,
                                        pending: updateTranslationStatus === 'confirming' || updateTranslationStatus === 'waiting' || isPinPending,
                                        reset: ()=>setTranslation(undefined)
                                        ,
                                        onNextStep: ()=>setCurrentStep(currentStep + 1)
                                    }),
                                    currentStep === 8 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_CoverImageForm__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .ZP, {
                                        captureFile: captureFile,
                                        imgFile: imgFile,
                                        imgBuffer: imgBuffer,
                                        onNextStep: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        onSubmit: submitImage,
                                        pending: isUploadingImage,
                                        reset: ()=>setCoverImgIPFS('')
                                    }),
                                    currentStep === 9 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_BlurbForm__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                                        blurb: blurb,
                                        onKeyDown: (val)=>setBlurb(val)
                                        ,
                                        onNextStep: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        onSubmit: handleSetBlurb,
                                        pending: isPinPending,
                                        reset: ()=>setBlurb(undefined)
                                    }),
                                    currentStep === 10 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_GenreForm__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                                        genre: genre,
                                        onGenreSet: (x)=>setGenre(x)
                                        ,
                                        onNextStep: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        reset: ()=>setGenre('')
                                    }),
                                    currentStep === 11 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_SubtitleForm__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                                        subtitle: subtitle,
                                        onChange: (e)=>setSubtitle(e.target.value)
                                        ,
                                        onNextStep: ()=>setCurrentStep(currentStep + (nothingConfigured ? 2 : 1))
                                        ,
                                        reset: ()=>setSubtitle('')
                                    }),
                                    currentStep === 12 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_ConfigReviewForm__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {
                                        genre: genre,
                                        subtitle: subtitle,
                                        blurb: blurb,
                                        imgFile: imgFile,
                                        loading: configureStatus === 'confirming' || configureStatus === 'waiting' || isPinPending,
                                        blurbIPFS: blurbIPFS,
                                        onSubmit: handleConfigure
                                    }),
                                    currentStep === 13 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_ContributorsForm__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z, {
                                        contributors: contribs,
                                        contributorsList: contributorsList,
                                        loading: setContributorsStatus === 'confirming' || setContributorsStatus === 'waiting',
                                        onChange: (idx, key, val)=>setContribs({
                                                ...contribs,
                                                [idx]: {
                                                    ...contribs[idx],
                                                    [key]: val
                                                }
                                            })
                                        ,
                                        onNextStep: ()=>setCurrentStep(currentStep + 1)
                                        ,
                                        onSubmit: handleSetContributors
                                    }),
                                    currentStep === 14 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_Finished__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z, {
                                        projectId: projectId,
                                        onStartAuctions: handleStartAuctions
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Create);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1500:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5468);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_isJson__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4553);
/* harmony import */ var _components_Title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8217);
/* harmony import */ var _components_EditButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9377);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9826);
/* harmony import */ var _components_RichTextRead__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4930);
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8965);
/* harmony import */ var _components_Create_RichText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5937);
/* harmony import */ var _components_ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8639);
/* harmony import */ var _hooks_manager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7563);
/* harmony import */ var _hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3869);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_ActionButton__WEBPACK_IMPORTED_MODULE_9__, _hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_11__]);
([_components_ActionButton__WEBPACK_IMPORTED_MODULE_9__, _hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const DescriptionSection = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().section)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  line-break: anywhere;
  max-width: 1200px;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_1__/* .PLAIN_WHITE */ ._I};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_1__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_1__/* .BASE_BOX_SHADOW */ .S0};

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Description = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().p)`
  display: inline-block;

  font-size: 14px;
  line-height: 170%;
`;
const RichTextWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
const Blurb = ({ blurbIpfsHash , projectId , isAllowedToEdit  })=>{
    const { uploadText  } = (0,_hooks_useUploadTextToIpfs__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)();
    const { 0: originalBlurb , 1: setOriginalBlurb  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const { 0: shouldResetToOriginal , 1: setShouldResetToOriginal  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    const { 0: blurb , 1: setBlurb  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const { 0: isEditing , 1: setIsEditing  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: isBlurbFetching , 1: setIsBlurbFetching  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { updateBlurb , updateBlurbStatus  } = (0,_hooks_manager__WEBPACK_IMPORTED_MODULE_10__/* .useManager */ .v)();
    const handleClickEditButton = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (isEditing && shouldResetToOriginal) {
            setBlurb(originalBlurb);
        }
        setIsEditing(!isEditing);
    }, [
        isEditing,
        originalBlurb,
        shouldResetToOriginal
    ]);
    const fetchBlurb = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async ()=>{
        if (blurbIpfsHash) {
            setIsBlurbFetching(true);
            // todo: cleanup, blurb will always be array of nodes in future
            try {
                const response = await fetch(`https://ipfs.io/ipfs/${blurbIpfsHash}`);
                if (response.ok) {
                    let fetchedBlurb = await response.text();
                    fetchedBlurb = (0,_utils_isJson__WEBPACK_IMPORTED_MODULE_12__/* .isJson */ .s)(fetchedBlurb) ? JSON.parse(fetchedBlurb) : fetchedBlurb;
                    setBlurb(fetchedBlurb);
                    setOriginalBlurb(fetchedBlurb);
                    setIsBlurbFetching(false);
                } else {
                    setBlurb(_constants__WEBPACK_IMPORTED_MODULE_13__/* .BLURB_FETCH_ERROR */ .yQ);
                    setOriginalBlurb(_constants__WEBPACK_IMPORTED_MODULE_13__/* .BLURB_FETCH_ERROR */ .yQ);
                    setIsBlurbFetching(false);
                }
            } catch (e) {
                setBlurb(_constants__WEBPACK_IMPORTED_MODULE_13__/* .BLURB_FETCH_ERROR */ .yQ);
                setOriginalBlurb(_constants__WEBPACK_IMPORTED_MODULE_13__/* .BLURB_FETCH_ERROR */ .yQ);
                setIsBlurbFetching(false);
            }
        }
    }, [
        blurbIpfsHash
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (blurbIpfsHash) {
            fetchBlurb();
        }
    }, [
        blurbIpfsHash,
        fetchBlurb
    ]);
    const handleUpdateBlurb = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async ()=>{
        if (!blurb || !blurbIpfsHash || !projectId) return null;
        const hash = await uploadText(blurb);
        await updateBlurb({
            projectId,
            blurbIpfsHash: hash,
            oldBlurbIpfsHash: blurbIpfsHash,
            onSuccess: ()=>{
                setShouldResetToOriginal(false);
                setIsEditing(false);
            },
            onError: undefined
        });
    }, [
        blurb,
        blurbIpfsHash,
        projectId,
        updateBlurb,
        uploadText
    ]);
    const correctBlurb = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (!blurb) {
            return null;
        // TODO format the first two - they are strings
        } else if (typeof blurb === 'string') {
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Description, {
                children: blurb
            }));
        } else {
            if (isEditing && isAllowedToEdit) {
                return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(RichTextWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Create_RichText__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                            onKeyDown: (val)=>setBlurb(val)
                            ,
                            text: blurb,
                            isDisabled: [
                                'confirming',
                                'waiting'
                            ].includes(updateBlurbStatus)
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ActionButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                            onClick: handleUpdateBlurb,
                            text: "Update",
                            loading: [
                                'confirming',
                                'waiting'
                            ].includes(updateBlurbStatus),
                            disabled: [
                                'confirming',
                                'waiting'
                            ].includes(updateBlurbStatus),
                            margin: "1rem 0 0 0"
                        })
                    ]
                }));
            } else {
                return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_RichTextRead__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    text: blurb
                }));
            }
        }
    }, [
        blurb,
        handleUpdateBlurb,
        isAllowedToEdit,
        isEditing,
        updateBlurbStatus
    ]);
    if (!blurbIpfsHash) return null;
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DescriptionSection, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                children: "Blurb"
            }),
            isAllowedToEdit && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_EditButton__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                disabled: isBlurbFetching || typeof blurb === 'string',
                onClick: handleClickEditButton,
                isEditing: isEditing
            }),
            isBlurbFetching ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Description, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loading__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    height: 20,
                    dotHeight: 20
                })
            }) : correctBlurb()
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blurb);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8317:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyledPrimaryButton": () => (/* binding */ StyledPrimaryButton),
/* harmony export */   "ContentWrapper": () => (/* binding */ ContentWrapper),
/* harmony export */   "ModalHeader": () => (/* binding */ ModalHeader),
/* harmony export */   "ModalText": () => (/* binding */ ModalText),
/* harmony export */   "CTAWrapper": () => (/* binding */ CTAWrapper),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6577);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_ActionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8639);
/* harmony import */ var _components_BaseModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8698);
/* harmony import */ var _components_ProjectDetails_AuthorSection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1797);
/* harmony import */ var _components_ProjectDetails_AuctionSection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(861);
/* harmony import */ var _components_Checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6293);
/* harmony import */ var _components_Title__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8217);
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8965);
/* harmony import */ var _components_ProjectDetails_MintSection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2285);
/* harmony import */ var _components_WalletIndicator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3092);
/* harmony import */ var _hooks_useShowText__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3262);
/* harmony import */ var _hooks_collection__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7268);
/* harmony import */ var _hooks_auctions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1529);
/* harmony import */ var _hooks_projects_useGetProject__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1689);
/* harmony import */ var _hooks_projects_useGetProjectId__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(3275);
/* harmony import */ var _hooks_useAuctionsManager__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5882);
/* harmony import */ var _utils_formatNumber__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(5346);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(5468);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(2391);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _components_NextLink__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(5369);
/* harmony import */ var _hooks_useMoonpageManager__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(7920);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _Blurb__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(1500);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_ActionButton__WEBPACK_IMPORTED_MODULE_6__, _components_ProjectDetails_AuthorSection__WEBPACK_IMPORTED_MODULE_8__, _components_ProjectDetails_AuctionSection__WEBPACK_IMPORTED_MODULE_9__, _components_ProjectDetails_MintSection__WEBPACK_IMPORTED_MODULE_13__, _Blurb__WEBPACK_IMPORTED_MODULE_27__]);
([_components_ActionButton__WEBPACK_IMPORTED_MODULE_6__, _components_ProjectDetails_AuthorSection__WEBPACK_IMPORTED_MODULE_8__, _components_ProjectDetails_AuctionSection__WEBPACK_IMPORTED_MODULE_9__, _components_ProjectDetails_MintSection__WEBPACK_IMPORTED_MODULE_13__, _Blurb__WEBPACK_IMPORTED_MODULE_27__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





























const Root = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block-start: 3rem;
  min-height: 700px;
`;
const MainInfoWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().section)`
  display: flex;
  width: 90%;
  max-width: 1200px;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .PLAIN_WHITE */ ._I};
  margin-block-end: 2rem;

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const InfoRight = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .INTER_BOLD */ .UY};

  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .BASE_BOX_SHADOW */ .S0};
  padding: 2rem;

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;
const ImageWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  position: relative;
  height: 100%;
  margin-block-end: 2rem;
  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain;
    }
  }
`;
const ReadIndicator = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(_themes__WEBPACK_IMPORTED_MODULE_22__/* .BaseButton */ .Yd)`
  position: absolute;
  z-index: 10;
  top: 1rem;
  left: 1rem;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .INTER_BOLD */ .UY};
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .PINK */ .hl};

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Author = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  margin-block-end: 1rem;
  padding: 1rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Language = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  padding: 1rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Genre = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  padding: 1rem !important;
  margin-block-end: 1rem;
  display: flex;
  justify-content: space-between;
`;
const StyledPrimaryButton = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(_themes__WEBPACK_IMPORTED_MODULE_22__/* .PrimaryButton */ .KM)`
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .INTER_BOLD */ .UY};
  padding: 1rem;
  width: 209px;

  :disabled {
    background-color: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .DISABLED_WHITE */ .s0};
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const InfoLeft = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  flex: 1;
  margin-inline-end: 2rem;
  display: flex;
  flex-direction: column;

  > div {
    padding: 2rem;
    border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .BASE_BORDER_RADIUS */ .B};
    box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .BASE_BOX_SHADOW */ .S0};
  }

  @media (max-width: 900px) {
    margin-inline: 0;
    margin-block-end: 2rem;
  }
`;
const ShareSection = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .PLAIN_WHITE */ ._I};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_22__/* .BASE_BOX_SHADOW */ .S0};

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Shares = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Share = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ShareTitle = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().h5)`
  margin-block-end: 1rem;
  text-transform: capitalize;
`;
const ShareAddress = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().span)`
  display: inline-block;
  margin-block-end: 1rem;
`;
const SharePercentage = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().span)`
  display: inline-block;
`;
const ContentWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    margin: 0;
  }
`;
const ModalHeader = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().h2)`
  display: inline-block;
`;
const ModalText = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().span)`
  display: inline-block;
  margin-block: 1rem 2rem;
  text-align: center;

  @media (max-width: 900px) {
    margin-block: 1rem 0rem;
  }
`;
const CTAWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_5___default().div)`
  display: flex;
  flex-direction: column;
`;
const ProjectDetailView = ()=>{
    var ref3, ref1, ref2;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { account  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_3__.useWeb3React)();
    const projectId = (0,_hooks_projects_useGetProjectId__WEBPACK_IMPORTED_MODULE_19__/* .useGetProjectId */ .W)();
    const { project: fetchedProject , refetch , isLoading: isProjectLoading ,  } = (0,_hooks_projects_useGetProject__WEBPACK_IMPORTED_MODULE_18__/* .useGetProject */ .Y)(projectId);
    const { buy , buyStatus , startAuctions  } = (0,_hooks_collection__WEBPACK_IMPORTED_MODULE_16__/* .useCollection */ .K)();
    const auctionsManager = (0,_hooks_useAuctionsManager__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .Z)();
    const mpManager = (0,_hooks_useMoonpageManager__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .Z)();
    const { retriggerAuction  } = (0,_hooks_auctions__WEBPACK_IMPORTED_MODULE_17__/* .useAuctions */ .x)();
    const { allowedToRead  } = (0,_hooks_useShowText__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z)(projectId);
    const { 0: coverImgLink , 1: setCoverImgLink  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: isGettingCurrentPrice , 1: setIsGettingCurentPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: updatedProject , 1: setUpdatedProject  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: showBuyModal , 1: setShowBuyModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: currentPrice , 1: setCurrentPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: agreed , 1: setAgreed  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const project = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>updatedProject || fetchedProject
    , [
        fetchedProject,
        updatedProject
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (project === null || project === void 0 ? void 0 : project.imgIpfsHash) {
            setCoverImgLink(`https://ipfs.io/ipfs/${project.imgIpfsHash}`);
        }
    }, [
        project
    ]);
    const refetchAuctionStateAndCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const auctionData = await auctionsManager.auctions(projectId);
        const editionData = await mpManager.editions(projectId);
        setUpdatedProject({
            ...project,
            auctionsStarted: auctionData.auctionsStarted,
            auctionsEnded: auctionData.auctionsEnded,
            currentId: editionData.currentTokenId,
            mintCount: project.mintCount.add(1)
        });
    }, [
        auctionsManager,
        mpManager,
        project,
        projectId
    ]);
    const refetchCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const editionData = await mpManager.editions(projectId);
        setUpdatedProject({
            ...project,
            currentId: editionData.currentTokenId,
            mintCount: editionData.currentEdLastTokenId.sub(editionData.currentTokenId).sub(1)
        });
    }, [
        mpManager,
        project,
        projectId
    ]);
    const refetchEdition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const editionData = await mpManager.editions(projectId);
        const newEdition = project.editions.length + 1;
        setUpdatedProject({
            ...project,
            currentId: editionData.currentTokenId,
            mintCount: editionData.currentEdLastTokenId.sub(editionData.currentTokenId),
            editions: [
                ...project.editions,
                {
                    edition: ethers__WEBPACK_IMPORTED_MODULE_26__.BigNumber.from(newEdition.toString()),
                    startId: editionData.currentTokenId,
                    endId: editionData.currentEdLastTokenId,
                    mintPrice: editionData.mintPrice
                }, 
            ]
        });
    }, [
        mpManager,
        project,
        projectId
    ]);
    const isAuthor = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        var ref;
        if (project && account && account.toLowerCase() === ((ref = project.creator) === null || ref === void 0 ? void 0 : ref.toLowerCase())) {
            return true;
        }
        return false;
    }, [
        project,
        account
    ]);
    const authorShare = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        var ref;
        let result = 85;
        if (project && ((ref = project.contributors) === null || ref === void 0 ? void 0 : ref.length) > 0) {
            var ref4;
            const contributorsShareTotal = (ref4 = project.contributors) === null || ref4 === void 0 ? void 0 : ref4.reduce((partialSum, a)=>partialSum + Number(a.sharePercentage)
            , 0);
            result = result - contributorsShareTotal;
        }
        return result;
    }, [
        project
    ]);
    const currentEdition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return project ? project.editions.find((edition)=>{
            return Number(edition.edition) === project.editions.length;
        }) : undefined;
    }, [
        project
    ]);
    const handleClickRead = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.preventDefault();
        router.push(`/projects/${projectId}/read`);
    }, [
        projectId,
        router
    ]);
    const toggleChecked = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setAgreed(!agreed);
    }, [
        agreed
    ]);
    const fetchCurrentPrice = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setIsGettingCurentPrice(true);
        let price;
        try {
            price = await auctionsManager.getPrice(projectId, project === null || project === void 0 ? void 0 : project.initialMintPrice);
            setCurrentPrice(price);
            setShowBuyModal(true);
        } catch (e) {
            react_toastify__WEBPACK_IMPORTED_MODULE_23__.toast.error(e === null || e === void 0 ? void 0 : e.message);
        }
        setIsGettingCurentPrice(false);
    }, [
        auctionsManager,
        projectId,
        project === null || project === void 0 ? void 0 : project.initialMintPrice
    ]);
    const handleClickBuy = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!(project === null || project === void 0 ? void 0 : project.initialMintPrice)) return;
        await buy({
            projectId,
            initialMintPrice: project.initialMintPrice,
            onError: undefined,
            onSuccess: ()=>{
                setShowBuyModal(false);
                refetch();
                refetchAuctionStateAndCount();
                setAgreed(false);
            }
        });
    }, [
        buy,
        project,
        projectId,
        refetch,
        refetchAuctionStateAndCount
    ]);
    const handleRetriggerAuction = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        await retriggerAuction({
            projectId,
            onError: undefined,
            onSuccess: ()=>{
                refetch();
            }
        });
    }, [
        retriggerAuction,
        projectId,
        refetch
    ]);
    const handleStartAuctions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (amountForCreator)=>{
        await startAuctions({
            projectId,
            amountForCreator,
            initialMintPrice: project === null || project === void 0 ? void 0 : project.initialMintPrice,
            onError: undefined,
            onSuccess: ()=>{
                refetch();
            }
        });
    }, [
        project === null || project === void 0 ? void 0 : project.initialMintPrice,
        projectId,
        refetch,
        startAuctions
    ]);
    if (!project && !isProjectLoading) {
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Root, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                size: "xl",
                children: `The project you are looking for does not exist :(`
            })
        }));
    }
    var _genre, _originalLanguage;
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            isProjectLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loading__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                height: 530
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(MainInfoWrapper, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoLeft, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                        padding: "1rem 1rem 0 1rem",
                                        children: project.title
                                    }),
                                    project.subtitle && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                        size: "s",
                                        padding: "0 1rem 1rem 1rem",
                                        children: project.subtitle
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ImageWrapper, {
                                        children: [
                                            allowedToRead && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ReadIndicator, {
                                                onClick: handleClickRead,
                                                children: "READ"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                                priority: true,
                                                src: coverImgLink !== null && coverImgLink !== void 0 ? coverImgLink : '/ImgPlaceholder.png',
                                                height: '100%',
                                                width: '100%',
                                                alt: 'Project Image',
                                                quality: 65,
                                                layout: "responsive"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Author, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                padding: "0",
                                                size: "xs",
                                                width: "fit-content",
                                                children: 'Author '
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                padding: "0",
                                                size: "xs",
                                                width: "fit-content",
                                                children: (0,_components_WalletIndicator__WEBPACK_IMPORTED_MODULE_14__/* .truncateAddress */ .F)(project.creator)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Genre, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                padding: "0",
                                                size: "xs",
                                                width: "fit-content",
                                                children: 'Genre '
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                padding: "0",
                                                size: "xs",
                                                width: "fit-content",
                                                children: (_genre = project.genre) !== null && _genre !== void 0 ? _genre : 'Unknown'
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Language, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                padding: "0",
                                                size: "xs",
                                                width: "fit-content",
                                                children: 'Original Language '
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                                padding: "0",
                                                size: "xs",
                                                width: "fit-content",
                                                children: (_originalLanguage = project.originalLanguage) !== null && _originalLanguage !== void 0 ? _originalLanguage : 'Unknown'
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoRight, {
                                children: [
                                    ((ref3 = project.editions) === null || ref3 === void 0 ? void 0 : ref3.length) > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProjectDetails_MintSection__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                                        currentEdition: currentEdition,
                                        project: project,
                                        refetch: refetchCount
                                    }),
                                    ((ref1 = project.editions) === null || ref1 === void 0 ? void 0 : ref1.length) === 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProjectDetails_AuctionSection__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                        isAuthor: isAuthor,
                                        project: project,
                                        isGettingCurrentPrice: isGettingCurrentPrice,
                                        onFetchCurrentPrice: fetchCurrentPrice,
                                        onRetriggerAuction: handleRetriggerAuction,
                                        onStartAuctions: handleStartAuctions
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Blurb__WEBPACK_IMPORTED_MODULE_27__["default"], {
                        blurbIpfsHash: project === null || project === void 0 ? void 0 : project.blurbIpfsHash,
                        projectId: projectId,
                        isAllowedToEdit: (project === null || project === void 0 ? void 0 : project.creator.toLowerCase()) === (account === null || account === void 0 ? void 0 : account.toLowerCase())
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ShareSection, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                                children: "Contributors"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Shares, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Share, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareTitle, {
                                                children: "Creator"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareAddress, {
                                                children: (0,_components_WalletIndicator__WEBPACK_IMPORTED_MODULE_14__/* .truncateAddress */ .F)(project === null || project === void 0 ? void 0 : project.creator)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SharePercentage, {
                                                children: `${authorShare} %`
                                            })
                                        ]
                                    }),
                                    (ref2 = project.contributors) === null || ref2 === void 0 ? void 0 : ref2.map((cntrb, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Share, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareTitle, {
                                                    children: cntrb.role.length ? cntrb.role : 'Unknown role'
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareAddress, {
                                                    children: (0,_components_WalletIndicator__WEBPACK_IMPORTED_MODULE_14__/* .truncateAddress */ .F)(cntrb.address)
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SharePercentage, {
                                                    children: `${cntrb.sharePercentage} %`
                                                })
                                            ]
                                        }, i)
                                    ),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Share, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareTitle, {
                                                children: "Moonpage"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareAddress, {
                                                children: (0,_components_WalletIndicator__WEBPACK_IMPORTED_MODULE_14__/* .truncateAddress */ .F)(_constants__WEBPACK_IMPORTED_MODULE_28__/* .MOONPAGE_DEV_ADDRESS */ .b_)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SharePercentage, {
                                                children: "15 %"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    isAuthor && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ProjectDetails_AuthorSection__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                        currentEdition: currentEdition,
                        projectId: projectId,
                        project: project,
                        refetch: refetchEdition
                    })
                ]
            }),
            showBuyModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_BaseModal__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                onClose: ()=>{
                    setShowBuyModal(false);
                    setAgreed(false);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ContentWrapper, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                            size: "m",
                            padding: "1rem 0 0 0",
                            children: "Current Price:"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Title__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                            color: _themes__WEBPACK_IMPORTED_MODULE_22__/* .PINK */ .hl,
                            size: "s",
                            padding: "0 0 0 1rem",
                            children: `${(0,_utils_formatNumber__WEBPACK_IMPORTED_MODULE_21__/* .formatNumber */ .u)(currentPrice)} MATIC`
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ModalText, {
                            children: `In a dutch auction the price keeps going down. Don't miss the
              chance and mint now!`
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Checkbox__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            onChange: toggleChecked,
                            check: agreed,
                            readonly: false,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    "I have read and understood the",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_NextLink__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .Z, {
                                        href: "https://moonpage.gitbook.io/moonpage-terms-of-service/",
                                        name: "Terms of Service (Last updated: 14.11.2022)."
                                    }),
                                    "and want to mint this NFT."
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ActionButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            disabled: buyStatus === 'confirming' || buyStatus === 'waiting' || !agreed,
                            loading: buyStatus === 'confirming' || buyStatus === 'waiting',
                            onClick: handleClickBuy,
                            text: "MINT"
                        })
                    ]
                })
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectDetailView);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ capitalizeFirstLetter)
/* harmony export */ });
function capitalizeFirstLetter(input) {
    if (input.length) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    } else {
        return input;
    }
}


/***/ }),

/***/ 8604:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ detectLanguage),
/* harmony export */   "u": () => (/* binding */ getDetectableLanguages)
/* harmony export */ });
/* harmony import */ var languagedetect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9822);
/* harmony import */ var languagedetect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(languagedetect__WEBPACK_IMPORTED_MODULE_0__);

const detectLanguage = (input)=>{
    const lngDetector = new (languagedetect__WEBPACK_IMPORTED_MODULE_0___default())();
    let result;
    if (input) {
        result = lngDetector.detect(input);
        if ((result === null || result === void 0 ? void 0 : result.length) && result[0][1] > 0.2) {
            // we want to treat "pidgin" like english - coz could also just be slang/internat language
            if (result[0][0] === 'pidgin') {
                return [
                    'english',
                    result[0][1]
                ];
            }
            return result[0];
        } else {
            return undefined;
        }
    }
    return undefined;
};
const getDetectableLanguages = ()=>{
    const lngDetector = new (languagedetect__WEBPACK_IMPORTED_MODULE_0___default())();
    return lngDetector.getLanguages();
};


/***/ }),

/***/ 5346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ formatNumber)
/* harmony export */ });
/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3138);
/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ethersproject_units__WEBPACK_IMPORTED_MODULE_0__);

const formatNumber = (value, options = {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
})=>{
    if (value === undefined) {
        return '0';
    }
    const result = typeof value === 'number' ? value : Number((0,_ethersproject_units__WEBPACK_IMPORTED_MODULE_0__.formatEther)(value));
    if (result > 0) {
        return new Intl.NumberFormat('en-US', options).format(result);
    }
    return '0';
};


/***/ }),

/***/ 4553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ isJson)
/* harmony export */ });
const isJson = (str)=>{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


/***/ }),

/***/ 7887:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ serialize)
/* harmony export */ });
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(370);
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slate__WEBPACK_IMPORTED_MODULE_0__);

const serialize = (nodes)=>{
    return nodes.map((n)=>slate__WEBPACK_IMPORTED_MODULE_0__.Node.string(n)
    ).join('\n');
};


/***/ }),

/***/ 6957:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ switchNetwork)
/* harmony export */ });
/* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5680);

// todo - turn this into a hook
const switchNetwork = async (chainId, onError, onSuccess)=>{
    const provider = window === null || window === void 0 ? void 0 : window.ethereum;
    if (provider) {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`
                    }
                ]
            });
            onSuccess();
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: `0x${chainId.toString(16)}`,
                                chainName: _connectors__WEBPACK_IMPORTED_MODULE_0__/* .supportedChainMapping */ .H[chainId].name,
                                rpcUrls: [
                                    _connectors__WEBPACK_IMPORTED_MODULE_0__/* .RPC_URLS */ .vl[chainId]
                                ]
                            }, 
                        ]
                    });
                    onSuccess();
                } catch (addError) {
                    console.error('Failed to setup the network in Metamask:', addError);
                }
            } else {
                // if other than 4902
                console.log(switchError);
            }
        }
    } else {
        onError();
    }
};


/***/ }),

/***/ 3480:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const validateAddress = (ethereumAddress)=>{
    if (ethereumAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        return true;
    }
    return false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateAddress);


/***/ })

};
;