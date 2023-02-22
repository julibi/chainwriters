"use strict";
exports.id = 796;
exports.ids = [796];
exports.modules = {

/***/ 6849:
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




const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .FONT_SERIF_BLACK */ .kn};
  font-size: ${({ fontSizeDesktop  })=>fontSizeDesktop
}px;

  @media (max-width: 900px) {
    font-size: ${({ fontSizeMobile  })=>fontSizeMobile
}px;
  }
`;
const Cursor = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().span)`
  display: inline-block;
  color: ${({ hasCursor  })=>hasCursor ? 'currentColor' : 'transparent'
};
  animation: blink 0.5s ease-in-out 0s infinite alternate;
  margin-inline-start: 3px;

  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
const TypeWriter = ({ cursor =true , onFinish , pauseLength =3000 , shouldErase =true , shouldLoop =true , speed =100 , fontSizeDesktop =72 , fontSizeMobile =54 , text  })=>{
    const { 0: currentText , 1: setCurrentText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { 0: typeForward , 1: setTypeForward  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: typedOnce , 1: setTypedOnce  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const delay = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>new Promise((res)=>setTimeout(res, pauseLength)
        )
    , [
        pauseLength
    ]);
    const type = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (currentText.length < text.length) {
            const displayText = text.substring(0, currentText.length + 1);
            setCurrentText(displayText);
        } else {
            await delay();
            if (shouldErase) {
                setTypeForward(false);
            }
            setTypedOnce(true);
            onFinish && onFinish();
        }
    }, [
        currentText,
        delay,
        onFinish,
        shouldErase,
        text
    ]);
    const erase = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (currentText.length) {
            const displayText = text.substring(0, currentText.length - 1);
            setCurrentText(displayText);
        } else {
            await delay();
            setTypeForward(true);
        }
    }, [
        currentText,
        delay,
        text
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const interval = setInterval(()=>{
            if (typeForward) {
                if (typedOnce && !shouldLoop) return;
                type();
            } else {
                if (shouldErase) {
                    erase();
                }
            }
        }, speed);
        return ()=>{
            clearInterval(interval);
        };
    }, [
        speed,
        type,
        erase,
        shouldErase,
        shouldLoop,
        typeForward,
        typedOnce
    ]);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        fontSizeDesktop: fontSizeDesktop,
        fontSizeMobile: fontSizeMobile,
        children: [
            currentText,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Cursor, {
                hasCursor: cursor,
                children: "|"
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypeWriter);


/***/ })

};
;