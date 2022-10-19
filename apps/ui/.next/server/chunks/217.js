"use strict";
exports.id = 217;
exports.ids = [217];
exports.modules = {

/***/ 8217:
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




const StyledTitle = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().h1)`
  display: inline-block;
  text-align: center;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .INTER_BLACK */ .c7};
  font-size: ${({ size  })=>size
};
  color: ${({ color  })=>color !== null && color !== void 0 ? color : _themes__WEBPACK_IMPORTED_MODULE_3__/* .PLAIN_WHITE */ ._I
};
  margin: ${({ margin  })=>margin !== null && margin !== void 0 ? margin : '0'
};
  padding: ${({ padding  })=>padding !== null && padding !== void 0 ? padding : '1rem'
};
  width: ${({ width  })=>width !== null && width !== void 0 ? width : '100%'
};
  overflow-wrap: break-word;

  @media (max-width: 900px) {
    padding: 0;
  }
`;
// render differen ones depending on size
// make them smaller on smallscreen
const Title = ({ children , color , margin , padding , size ='l' , width  })=>{
    switch(size){
        case 'xl':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '72px',
                width: width,
                children: children
            }));
        case 'l':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '54px',
                width: width,
                children: children
            }));
        case 'm':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '36px',
                width: width,
                children: children
            }));
        case 's':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '24px',
                width: width,
                children: children
            }));
        case 'xs':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '16px',
                width: width,
                children: children
            }));
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Title);


/***/ }),

/***/ 5468:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "te": () => (/* binding */ BG_NORMAL),
/* harmony export */   "aL": () => (/* binding */ BG_DARK),
/* harmony export */   "_I": () => (/* binding */ PLAIN_WHITE),
/* harmony export */   "hl": () => (/* binding */ PINK),
/* harmony export */   "s0": () => (/* binding */ DISABLED_WHITE),
/* harmony export */   "Zv": () => (/* binding */ VALID_GREEN),
/* harmony export */   "B": () => (/* binding */ BASE_BORDER_RADIUS),
/* harmony export */   "S0": () => (/* binding */ BASE_BOX_SHADOW),
/* harmony export */   "U_": () => (/* binding */ INTER_LIGHT),
/* harmony export */   "jI": () => (/* binding */ INTER_REGULAR),
/* harmony export */   "UY": () => (/* binding */ INTER_BOLD),
/* harmony export */   "c7": () => (/* binding */ INTER_BLACK),
/* harmony export */   "ux": () => (/* binding */ INSET_BASE_BOX_SHADOW),
/* harmony export */   "Yd": () => (/* binding */ BaseButton),
/* harmony export */   "KM": () => (/* binding */ PrimaryButton),
/* harmony export */   "Qc": () => (/* binding */ BaseInput),
/* harmony export */   "Fg": () => (/* binding */ StyledLink),
/* harmony export */   "X1": () => (/* binding */ Cross),
/* harmony export */   "ag": () => (/* binding */ FadeInBaseAnimation)
/* harmony export */ });
/* unused harmony exports BG_LIGHT, FlatButton */
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const BG_LIGHT = '#222632';
const BG_NORMAL = '#1B1E28';
const BG_DARK = '#161820';
const PLAIN_WHITE = '#FFF';
const PINK = '#F50A48';
const DISABLED_WHITE = '#808080';
const VALID_GREEN = '#19bdb4';
const BASE_BORDER_RADIUS = '.5em';
const BASE_BOX_SHADOW = `
  -4px -2px 4px 0px rgba(125,125,125,0.1),
  4px 2px 8px 0px rgba(0,0,0,0.7);
`;
const INTER_LIGHT = `
  'Inter Light', sans-serif;
`;
const INTER_REGULAR = `
  'Inter', sans-serif;
`;
const INTER_BOLD = `
  'Inter Bold', sans-serif;
`;
const INTER_BLACK = `
  'Inter Black', sans-serif;
`;
const INSET_BASE_BOX_SHADOW = `
  inset -4px -2px 4px 0px rgb(125 125 125 / 10%),
  inset 4px 2px 8px 0px rgb(0 0 0 / 70%);
`;
const BaseButton = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().button)`
  background-color: ${BG_NORMAL};
  color: ${PLAIN_WHITE};
  font-family: ${INTER_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :hover {
    cursor: pointer;
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :disabled {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
    pointer-events: none;
  }
`;
const FlatButton = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().button)`
  color: ${PLAIN_WHITE};
  font-family: ${INTER_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  padding: 10px;
  margin: 5px;

  :hover {
    cursor: pointer;
  }

  :disabled {
    // background-color: ${BG_LIGHT};
    color: grey;
    pointer-events: none;
  }
`;
const PrimaryButton = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().button)`
  background-color: ${PLAIN_WHITE};
  color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};

  :disabled {
    pointer-events: none;
  }

  :hover {
    cursor: pointer;
  }
`;
const BaseInput = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().input)`
  font-family: ${INTER_BOLD};
  font-size: 16px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  padding: 1rem;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  outline: none;
  -webkit-appearance: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const StyledLink = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().a)`
  color: #f50a48;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
`;
const Cross = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  margin-left: -60px;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  :before,
  :after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: white;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;
const FadeInBaseAnimation = `
  animation: fadein 2s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;


/***/ })

};
;