"use strict";
exports.id = 853;
exports.ids = [853];
exports.modules = {

/***/ 4853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xC": () => (/* binding */ SectionTitleWrapper),
/* harmony export */   "NZ": () => (/* binding */ SectionTitle),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_projects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2024);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5468);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8965);
/* harmony import */ var _ProjectItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(612);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8217);








const Root = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().section)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SectionTitleWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const SectionTitle = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().h1)`
  text-align: center;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .INTER_BLACK */ .c7};
  font-size: 54px;
  padding: 1rem;

  @media (max-width: 900px) {
    margin-block-start: 1rem;
  }
`;
const ProjectList = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().section)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem 3rem 6rem 3rem;

  @media (max-width: 900px) {
    padding: 3rem;
  }
`;
const ProjectSection = ()=>{
    const { topProjects: data , areTopProjectsLoading: loading  } = (0,_hooks_projects__WEBPACK_IMPORTED_MODULE_3__/* .useProjects */ .Z)();
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                children: "Top Projects"
            }),
            loading && !data && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loading__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                height: 530
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProjectList, {
                children: data === null || data === void 0 ? void 0 : data.map(({ id , title , createdAt , creator , imgIpfsHash , subtitle , genre  }, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProjectItem__WEBPACK_IMPORTED_MODULE_6__/* .ProjectItem */ .L, {
                        id: id,
                        createdAt: createdAt,
                        creator: creator,
                        title: title,
                        imgIpfsHash: imgIpfsHash,
                        subtitle: subtitle,
                        genre: genre
                    }, idx)
                )
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectSection);


/***/ }),

/***/ 612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6577);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5468);
/* harmony import */ var _WalletIndicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3092);







const Root = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 400px;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .BASE_BOX_SHADOW */ .S0};

  :hover {
    cursor: pointer;
  }
`;
const ImageWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  flex: 1;

  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
    }
  }
`;
const InfoWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  flex: 1;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .INTER_REGULAR */ .jI};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().h4)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .PINK */ .hl};
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .INTER_BOLD */ .UY};
  margin-block-end: 0;
`;
const Flex = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  justify-content: space-between;
`;
const Label = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().span)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_5__/* .PLAIN_WHITE */ ._I};
`;
const ProjectItem = ({ id , createdAt , creator , title , imgIpfsHash , subtitle , genre  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const handleClick = (e)=>{
        e.preventDefault();
        router.push(`projects/${id}`);
    };
    const created = new Date(Number(createdAt) * 1000).toLocaleDateString('en-US');
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        onClick: handleClick,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ImageWrapper, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    src: imgIpfsHash ? `https://ipfs.io/ipfs/${imgIpfsHash}` : '/ImgPlaceholder.png',
                    height: '100%',
                    width: '100%',
                    alt: 'Project Image',
                    priority: true
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoWrapper, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Title, {
                        children: title
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Flex, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                            style: {
                                color: _themes__WEBPACK_IMPORTED_MODULE_5__/* .PINK */ .hl
                            },
                            children: subtitle !== null && subtitle !== void 0 ? subtitle : ''
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                                children: "Genre"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: genre !== null && genre !== void 0 ? genre : 'Unknown'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                                children: "Created"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: created
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                                children: "Author"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: (0,_WalletIndicator__WEBPACK_IMPORTED_MODULE_6__/* .truncateAddress */ .F)(creator)
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};



/***/ })

};
;