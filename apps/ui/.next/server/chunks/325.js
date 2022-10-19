"use strict";
exports.id = 325;
exports.ids = [325];
exports.modules = {

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
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            allowedToRead,
            pending: pending || isLoading,
            project,
            text,
            translation,
            hasTranslation,
            fetchTranslation
        })
    , [
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

/***/ 7402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(381);


const useUser = ()=>{
    const api = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers__WEBPACK_IMPORTED_MODULE_1__/* .UserContext */ .St);
    if (!api) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return api;
};


/***/ })

};
;