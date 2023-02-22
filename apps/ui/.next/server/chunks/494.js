"use strict";
exports.id = 494;
exports.ids = [494];
exports.modules = {

/***/ 8965:
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
/* harmony import */ var _hooks_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1013);




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(p)=>p.height
}px;
`;
const Dot = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  height: ${(p)=>p.dotHeight
}px;
  width: ${(p)=>p.dotHeight
}px;
  margin: 0 15px;
  border-radius: 40px;
  box-shadow: ${({ theme  })=>theme.BASE_BOX_SHADOW
};
  animation: animate 3s linear infinite;
  animation-delay: calc(0.5s * ${(p)=>p.index
});

  @keyframes animate {
    0% {
      box-shadow: ${({ theme  })=>theme.INSET_BASE_BOX_SHADOW
};
    }
    100% {
      box-shadow: ${({ theme  })=>theme.BASE_BOX_SHADOW
};
    }
  }
`;
const Loading = ({ height , dotHeight =40 , short =false  })=>{
    const theme = (0,_hooks_theme__WEBPACK_IMPORTED_MODULE_3__/* .useTheme */ .F)();
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        height: height,
        dotHeight: dotHeight,
        children: [
            !short && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Dot, {
                index: 0,
                dotHeight: dotHeight,
                theme: theme
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Dot, {
                index: 1,
                dotHeight: dotHeight,
                theme: theme
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Dot, {
                index: 2,
                dotHeight: dotHeight,
                theme: theme
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);


/***/ }),

/***/ 7204:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _WalletIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3092);






const ProfileSpan = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().span)`
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }
`;
const ProfileLink = ({ account  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { account: loggedInAccount  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_2__.useWeb3React)();
    const handleClick = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)((e)=>{
        e.preventDefault();
        if (loggedInAccount.toLowerCase() === account.toLowerCase()) {
            router.push(`/myprofile`);
        } else {
            router.push(`/profile/${account}`);
        }
    }, [
        account,
        loggedInAccount,
        router
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProfileSpan, {
        onClick: handleClick,
        children: (0,_WalletIndicator__WEBPACK_IMPORTED_MODULE_5__/* .truncateAddress */ .F)(account)
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileLink);


/***/ }),

/***/ 1439:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ Tooltip)
/* harmony export */ });
/* unused harmony exports TooltipThemes, TooltipPlacementTypes */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tippyjs_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4787);
/* harmony import */ var _tippyjs_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tippyjs_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3547);
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tippy_js_themes_light_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3582);
/* harmony import */ var tippy_js_themes_light_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tippy_js_themes_light_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hooks_useDarkMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4459);






const TOOLTIPTHEMES = (/* unused pure expression or super */ null && ([
    'light',
    'dark'
]));
const TooltipThemes = (/* unused pure expression or super */ null && (TOOLTIPTHEMES));
const TOOLTIPPLACEMENTTYPES = (/* unused pure expression or super */ null && ([
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'auto',
    'auto-start',
    'auto-end', 
]));
const TooltipPlacementTypes = (/* unused pure expression or super */ null && (TOOLTIPPLACEMENTTYPES));
const TooltipComponent = ({ children , content , className ='' , theme , placement ='auto' , isArrow =true , forwardedRef , ...props })=>{
    const isDarkMode = (0,_hooks_useDarkMode__WEBPACK_IMPORTED_MODULE_5__/* .useDarkMode */ .v)();
    const renderContent = ()=>{
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: content
        }));
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_tippyjs_react__WEBPACK_IMPORTED_MODULE_2___default()), {
        content: renderContent(),
        interactive: true,
        arrow: isArrow,
        theme: theme ? theme : isDarkMode ? 'light' : 'dark',
        placement: placement,
        ref: forwardedRef,
        ...props,
        children: children
    }));
};
const Tooltip = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(({ children , ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TooltipComponent, {
        forwardedRef: ref,
        ...props,
        children: children
    })
);


/***/ }),

/***/ 2250:
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
/* harmony import */ var _hooks_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1013);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1439);





const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  height: 24px;
  width: 24px;
  z-index: 1;
  background-color: ${({ backgroundColor  })=>backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : '#364165'
};
  border-radius: 50%;
  font-family: sans-serif;
  margin-inline-start: 6px;
  display: flex;
  justify-content: center;
`;
const IconWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  font-size: 18px;
  height: 18px;
`;
const TooltippedIndicator = ({ backgroundColor , tooltipContent , icon  })=>{
    const theme = (0,_hooks_theme__WEBPACK_IMPORTED_MODULE_3__/* .useTheme */ .F)();
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Root, {
        backgroundColor: backgroundColor,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Tooltip__WEBPACK_IMPORTED_MODULE_4__/* .Tooltip */ .u, {
            content: tooltipContent,
            theme: theme,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(IconWrapper, {
                children: icon
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TooltippedIndicator);


/***/ }),

/***/ 3092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_WalletIndicator),
  "F": () => (/* binding */ truncateAddress)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@material-ui/icons/PowerSettingsNew"
var PowerSettingsNew_ = __webpack_require__(4720);
var PowerSettingsNew_default = /*#__PURE__*/__webpack_require__.n(PowerSettingsNew_);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: external "@metamask/jazzicon"
var jazzicon_ = __webpack_require__(3623);
var jazzicon_default = /*#__PURE__*/__webpack_require__.n(jazzicon_);
;// CONCATENATED MODULE: ./components/AccountAvatar.tsx




const Avatar = (external_styled_components_default()).div`
  display: flex;
  align-items: center;
  height: 100%;

  
  @media (max-width: 768px) {
    display: none;
  }
`;
const AccountAvatar = ({ address  })=>{
    const ref = (0,external_react_.useRef)();
    (0,external_react_.useEffect)(()=>{
        if (address && ref.current) {
            ref.current.innerHTML = "";
            ref.current.appendChild(jazzicon_default()(16, parseInt(address.slice(2, 10), 16)));
        }
    }, [
        address
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Avatar, {
            ref: ref
        })
    }));
};
/* harmony default export */ const components_AccountAvatar = (AccountAvatar);

// EXTERNAL MODULE: ./connectors.ts
var connectors = __webpack_require__(5680);
// EXTERNAL MODULE: ./themes.ts
var themes = __webpack_require__(5468);
// EXTERNAL MODULE: ./components/Tooltip.tsx
var Tooltip = __webpack_require__(1439);
;// CONCATENATED MODULE: ./components/WalletIndicator.tsx








const Root = (external_styled_components_default()).div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 320px;
  font-family: ${themes/* FONT_SERIF_BOLD */.cr};
`;
const CTAButton = external_styled_components_default()(themes/* PrimaryButton */.KM)`
  font-family: ${themes/* FONT_SERIF_BOLD */.cr};
  margin-inline-start: 1rem;
  padding: 1rem;

  @media (max-width: 900px) {
    padding: 0.5rem;
    margin-inline: 0 1rem;
  }
`;
const LogoutButton = external_styled_components_default()(themes/* PrimaryButton */.KM)`
  font-family: ${themes/* FONT_SERIF_BOLD */.cr};
  margin-inline-start: 1rem;
  padding: 0.3rem;

  @media (max-width: 900px) {
    margin-inline: 0 1rem;
  }
`;
const OnlyOnDesktop = (external_styled_components_default()).div`
  @media (max-width: 900px) {
    display: none;
  }
`;
const Item = (external_styled_components_default()).div`
  margin-inline-end: 1rem;
`;
const truncateAddress = (address)=>{
    if (address) {
        const addressStart = address.substring(0, 6);
        const addressLength = address.length;
        const cut = addressLength - 5;
        const addressEnd = address.substring(addressLength, cut);
        return `${addressStart}...${addressEnd}`;
    }
    return;
};
const WalletIndicator = ({ address , chain: chain1 , handleClick , showLoading =false , deactivate  })=>{
    const getNetwork = (chain)=>{
        if (chain) {
            if (connectors/* supportedChainIds.includes */.KC.includes(chain)) {
                var ref;
                return(/*#__PURE__*/ jsx_runtime_.jsx(OnlyOnDesktop, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Item, {
                        children: (ref = connectors/* supportedChainMapping */.H[chain]) === null || ref === void 0 ? void 0 : ref.name
                    })
                }));
            } else {
                return(/*#__PURE__*/ jsx_runtime_.jsx(Item, {
                    children: 'False Network'
                }));
            }
        } else {
            return(/*#__PURE__*/ jsx_runtime_.jsx(CTAButton, {
                "data-testid": 'modal-opener',
                onClick: handleClick,
                children: "Connect to wallet"
            }));
        }
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx(Root, {
        children: showLoading ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
            children: "Loading..."
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: getNetwork(chain1)
                }),
                address && chain1 && connectors/* supportedChainIds.includes */.KC.includes(chain1) && /*#__PURE__*/ jsx_runtime_.jsx(Item, {
                    children: truncateAddress(address)
                }),
                chain1 && connectors/* supportedChainIds.includes */.KC.includes(chain1) && /*#__PURE__*/ jsx_runtime_.jsx(components_AccountAvatar, {
                    address: address
                }),
                address && /*#__PURE__*/ jsx_runtime_.jsx(Tooltip/* Tooltip */.u, {
                    content: "Disconnect wallet",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(LogoutButton, {
                        onClick: deactivate,
                        children: /*#__PURE__*/ jsx_runtime_.jsx((PowerSettingsNew_default()), {})
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const components_WalletIndicator = (WalletIndicator);


/***/ }),

/***/ 8700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ formatEtherBigNumber)
/* harmony export */ });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5757);
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3138);
/* harmony import */ var _ethersproject_units__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ethersproject_units__WEBPACK_IMPORTED_MODULE_1__);


/**
 * This function converts a Bignumber into a string representation with the desired amount of decimals
 * The number is then displayed in american style e.g. 1,000,000.1234
 */ function formatEtherBigNumber(number, decimalCount = 2, unit = 18) {
    const decimalLength = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_0__.BigNumber.from(10).pow(unit - decimalCount);
    const remainder = number.mod(decimalLength);
    let result = (0,_ethersproject_units__WEBPACK_IMPORTED_MODULE_1__.commify)((0,_ethersproject_units__WEBPACK_IMPORTED_MODULE_1__.formatEther)(number.sub(remainder)));
    if (decimalCount === 0) {
        result = result.split('.')[0]; //needed because the helper functions return .0
    }
    return result;
}


/***/ }),

/***/ 7049:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ getCoverImageUrl)
/* harmony export */ });
const getCoverImageUrl = async (projectId, imgIpfsHash)=>{
    // if available fetch from Metadata BE
    // otherwise from IPFS directly
    if (imgIpfsHash) {
        const imgUrl = `${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/file/project-${projectId}`;
        let response;
        try {
            response = await fetch(imgUrl);
            if (response.ok) {
                return imgUrl;
            } else {
                return `https://ipfs.io/ipfs/${imgIpfsHash}`;
            }
        } catch (e) {
        // do nothing
        }
    }
};


/***/ })

};
;