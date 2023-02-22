exports.id = 507;
exports.ids = [507];
exports.modules = {

/***/ 65:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6577);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5468);
/* harmony import */ var _hooks_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1013);
/* harmony import */ var _ProfileLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7204);







const Item = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 360px;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${({ theme  })=>theme.BASE_BOX_SHADOW
};
`;
const ImageWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  position: relative;
  flex: 1;

  span {
    width: 100% !important;
    height: 150px !important;

    img {
      object-fit: contain !important;
    }
  }
`;
const BlockSpan = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().span)`
  display: inline-block;
`;
const Bold = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(BlockSpan)`
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .FONT_SERIF_BLACK */ .kn};
`;
const InfoWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  flex: 1;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .FONT_SERIF_LIGHT */ .X};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().h4)`
  color: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .POP */ .p6};
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .FONT_SERIF_BOLD */ .cr};
  margin-block-end: 0;
`;
const Flex = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`
  display: flex;
  justify-content: space-between;
`;
const Label = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().span)`
  color: ${({ theme  })=>theme.MAIN_TEXT_COLOR
};
`;
const Edition = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(BlockSpan)`
  @media (max-width: 900px) {
    display: none;
  }
`;
const Contribution = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(BlockSpan)`
  @media (max-width: 900px) {
    display: none;
  }
`;
const DetailsButton = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(_themes__WEBPACK_IMPORTED_MODULE_4__/* .BaseButton */ .Yd)`
  padding: 0.5rem;
  margin-block-start: 1rem;
`;
const ReadButton = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(_themes__WEBPACK_IMPORTED_MODULE_4__/* .BaseButton */ .Yd)`
  margin-block-start: 1rem;
  padding: 0.5rem;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .POP */ .p6};
`;
const BookshelfItem = ({ nft , onClickDetails , onClickRead  })=>{
    const theme = (0,_hooks_theme__WEBPACK_IMPORTED_MODULE_5__/* .useTheme */ .F)();
    const { creator , edition , imgIpfsHash , tokenId  } = nft;
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Item, {
        theme: theme,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ImageWrapper, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    src: imgIpfsHash ? `https://moonpage.mypinata.cloud/ipfs/${imgIpfsHash}` : '/ImgPlaceholder.png',
                    height: '100%',
                    width: '100%',
                    alt: 'Project Image',
                    priority: true
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoWrapper, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Title, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Bold, {
                            children: nft === null || nft === void 0 ? void 0 : nft.title
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                                children: "ID"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: tokenId
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                                children: "Edition"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: edition
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Label, {
                                theme: theme,
                                children: "Author"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProfileLink__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                account: creator
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Flex, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DetailsButton, {
                                onClick: onClickDetails,
                                children: "Project"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ReadButton, {
                                onClick: onClickRead,
                                children: "Read"
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookshelfItem);


/***/ }),

/***/ 6582:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _hooks_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1013);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8217);
/* harmony import */ var _ProfileLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7204);







const Item = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .FONT_SERIF_REGULAR */ .Bf};
  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${({ theme  })=>theme.BASE_BOX_SHADOW
};
`;
const ButtonsWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
`;
const DetailsButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .BaseButton */ .Yd)`
  padding: 1rem;
`;
const ReadButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .BaseButton */ .Yd)`
  margin-inline-start: 1rem;
  padding: 1rem;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .POP */ .p6};
`;
const ContributorProject = ({ creator , title , contributionRole , contributionSharePercentage , onClickDetails , onClickRead  })=>{
    const theme = (0,_hooks_theme__WEBPACK_IMPORTED_MODULE_4__/* .useTheme */ .F)();
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Item, {
        theme: theme,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        size: "xs",
                        color: "POP",
                        padding: "1rem 0 1rem 1rem",
                        children: title
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: " - by "
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ProfileLink__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        account: creator
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: `${contributionSharePercentage}% for ${contributionRole}`
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ButtonsWrapper, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DetailsButton, {
                        onClick: onClickDetails,
                        children: "Project"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ReadButton, {
                        onClick: onClickRead,
                        children: "Read"
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContributorProject);


/***/ }),

/***/ 3716:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _hooks_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1013);
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8217);






const Item = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BORDER_RADIUS */ .B};
  box-shadow: ${({ theme  })=>theme.BASE_BOX_SHADOW
};
`;
const ButtonsWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`
  display: flex;
`;
const DetailsButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .BaseButton */ .Yd)`
  padding: 1rem;
`;
const ReadButton = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_themes__WEBPACK_IMPORTED_MODULE_3__/* .BaseButton */ .Yd)`
  margin-inline-start: 1rem;
  padding: 1rem;
  background-color: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .POP */ .p6};
`;
const OwnProject = ({ title , onClickDetails , onClickRead  })=>{
    const theme = (0,_hooks_theme__WEBPACK_IMPORTED_MODULE_4__/* .useTheme */ .F)();
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Item, {
        theme: theme,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Title__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                size: "xs",
                color: "POP",
                children: title
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ButtonsWrapper, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DetailsButton, {
                        onClick: onClickDetails,
                        children: "Project"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ReadButton, {
                        onClick: onClickRead,
                        children: "Read"
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OwnProject);


/***/ }),

/***/ 4203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ useGetContributionsOfAccount)
/* harmony export */ });
/* unused harmony export GET_CONTRIBUTIONS_OF_ACCOUNT */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _useAddressInRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7038);




const GET_CONTRIBUTIONS_OF_ACCOUNT = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  query contributionsQuery($account: String!) {
    contributors(where: { address: $account }) {
      sharePercentage
      address
      role
      project {
        id
        title
        creator
      }
    }
  }
`;
function useGetContributionsOfAccount() {
    const { account: loggedInAccount  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_2__.useWeb3React)();
    const addressInRoute = (0,_useAddressInRoute__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const account = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>addressInRoute !== null && addressInRoute !== void 0 ? addressInRoute : loggedInAccount
    , [
        addressInRoute,
        loggedInAccount
    ]);
    const { loading , error , data , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(GET_CONTRIBUTIONS_OF_ACCOUNT, {
        variables: {
            account
        }
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            isLoading: loading,
            error,
            contributions: data && data.contributors,
            refetch
        })
    , [
        loading,
        error,
        data,
        refetch
    ]);
}


/***/ }),

/***/ 4862:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ useGetProjectsOfAccount)
/* harmony export */ });
/* unused harmony export GET_PROJECTS_OF_ACCOUNT */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _useAddressInRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7038);




const GET_PROJECTS_OF_ACCOUNT = _apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql`
  query oneProjectQuery($account: String!) {
    projects(where: { creator: $account, isDeleted: null }) {
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
      premintedByAuthor
      startId
      subtitle
      textIpfsHash
      title
    }
  }
`;
function useGetProjectsOfAccount() {
    const { account: loggedInAccount  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_2__.useWeb3React)();
    const addressInRoute = (0,_useAddressInRoute__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const account = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>addressInRoute !== null && addressInRoute !== void 0 ? addressInRoute : loggedInAccount
    , [
        addressInRoute,
        loggedInAccount
    ]);
    const { loading , error , data , refetch  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_1__.useQuery)(GET_PROJECTS_OF_ACCOUNT, {
        variables: {
            account
        }
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            isLoading: loading,
            error,
            projects: data && data.projects,
            refetch
        })
    , [
        loading,
        error,
        data,
        refetch
    ]);
}


/***/ }),

/***/ 7402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6900);


const useUser = ()=>{
    const api = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers__WEBPACK_IMPORTED_MODULE_1__/* .UserContext */ .St);
    if (!api) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return api;
};


/***/ }),

/***/ 3547:
/***/ (() => {



/***/ }),

/***/ 3582:
/***/ (() => {



/***/ })

};
;