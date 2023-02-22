"use strict";
exports.id = 217;
exports.ids = [217];
exports.modules = {

/***/ 2391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C5": () => (/* binding */ MOONPAGE_FACTORY_ADDRESS_DEV),
/* harmony export */   "$g": () => (/* binding */ MOONPAGE_MANAGER_ADDRESS_DEV),
/* harmony export */   "_j": () => (/* binding */ AUCTIONS_MANAGER_ADDRESS_DEV),
/* harmony export */   "R1": () => (/* binding */ MOONPAGE_COLLECTION_ADDRESS_DEV),
/* harmony export */   "PB": () => (/* binding */ MOONPAGE_BALLOTS_FACTORY_ADDRESS_DEV),
/* harmony export */   "SA": () => (/* binding */ MOONPAGE_FACTORY_ADDRESS),
/* harmony export */   "op": () => (/* binding */ MOONPAGE_MANAGER_ADDRESS),
/* harmony export */   "A1": () => (/* binding */ AUCTIONS_MANAGER_ADDRESS),
/* harmony export */   "BI": () => (/* binding */ MOONPAGE_COLLECTION_ADDRESS),
/* harmony export */   "Om": () => (/* binding */ MOONPAGE_BALLOTS_FACTORY_ADDRESS),
/* harmony export */   "b_": () => (/* binding */ MOONPAGE_DEV_ADDRESS)
/* harmony export */ });
/* unused harmony exports MOONPAGE_AIRDROP_ADDRESS_DEV, MOONPAGE_AIRDROP_ADDRESS, MOONPAGE_ROYALTIES_RECEIVER_ADDRESS, NULL_ADDRESS */
const MOONPAGE_FACTORY_ADDRESS_DEV =
  '0x16384A82e586008601deC3EabAffaD1FC0657D32';
const MOONPAGE_MANAGER_ADDRESS_DEV =
  '0x5fce69239815e7a409615426e73FDD9909E8a931';
const AUCTIONS_MANAGER_ADDRESS_DEV =
  '0x105Fdf7e952741554DaD0bd1Bc68cB54FFC5C25D';
const MOONPAGE_COLLECTION_ADDRESS_DEV =
  '0xa5A234AA62C9411A717D349D4229CaF577Fa7d19';
const MOONPAGE_AIRDROP_ADDRESS_DEV =
  '0x0eC473B1BD821D386cd7209203Ba6826Fd653B96';
const MOONPAGE_BALLOTS_FACTORY_ADDRESS_DEV =
  '0x7040F5c4e425f54dB209aEf39224db6478243d77';

const MOONPAGE_FACTORY_ADDRESS =
  '0x9005462EE777cb934Da349d56f542847629098bA';
const MOONPAGE_MANAGER_ADDRESS =
  '0xb506F8587cdb61CE205FA88BdCCcfBd90c588A6e';
const AUCTIONS_MANAGER_ADDRESS =
  '0xA6AcA4DB9853234b5CAa0005549642D113443803';
const MOONPAGE_COLLECTION_ADDRESS =
  '0x0eC473B1BD821D386cd7209203Ba6826Fd653B96';
const MOONPAGE_AIRDROP_ADDRESS =
  '0x2cB0B300dcB8497254155A4567c094984ddd806B';
const MOONPAGE_BALLOTS_FACTORY_ADDRESS =
  '0x52928DA9B72B98b11F3143abb47753194c9e1FF5';

const MOONPAGE_DEV_ADDRESS =
  '0xb849DE17AB1d9D6d96c5146b4C1d19a953135A0B';
const MOONPAGE_ROYALTIES_RECEIVER_ADDRESS =
  '0x0afF32d090190b254D3eC5Aa4487db2C98c17a23';
const NULL_ADDRESS = '0x0';


/***/ }),

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
/* harmony import */ var _hooks_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1013);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5468);





const StyledTitle = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().h1)`
  display: inline-block;
  text-align: ${({ textAlign  })=>textAlign !== null && textAlign !== void 0 ? textAlign : 'center'
};
  font-family: ${_themes__WEBPACK_IMPORTED_MODULE_4__/* .FONT_SERIF_BLACK */ .kn};
  font-size: ${({ size  })=>size
};
  color: ${({ color , theme  })=>color !== null && color !== void 0 ? color : theme.MAIN_TEXT_COLOR
};
  margin: ${({ margin  })=>margin !== null && margin !== void 0 ? margin : '0'
};
  padding: ${({ padding  })=>padding !== null && padding !== void 0 ? padding : '1rem'
};
  width: ${({ width  })=>width !== null && width !== void 0 ? width : 'auto'
};
  overflow-wrap: break-word;

  @media (max-width: 900px) {
    padding: 0;
    font-size: ${({ size  })=>{
    if (size == '72px') {
        return '54px';
    } else if (size === '54px') {
        return '36px';
    } else if (size === '36px') {
        return '24px';
    } else {
        return size;
    }
}};
  }
`;
// render differen ones depending on size
// make them smaller on smallscreen
const Title = ({ children , color , margin , padding , size ='l' , width , textAlign  })=>{
    const theme = (0,_hooks_theme__WEBPACK_IMPORTED_MODULE_3__/* .useTheme */ .F)();
    switch(size){
        case 'xl':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '72px',
                textAlign: textAlign,
                width: width,
                theme: theme,
                children: children
            }));
        case 'l':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '54px',
                textAlign: textAlign,
                width: width,
                children: children
            }));
        case 'm':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '36px',
                textAlign: textAlign,
                width: width,
                children: children
            }));
        case 's':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '24px',
                textAlign: textAlign,
                width: width,
                children: children
            }));
        case 'xs':
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTitle, {
                color: color,
                margin: margin,
                padding: padding,
                size: '16px',
                textAlign: textAlign,
                width: width,
                children: children
            }));
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Title);


/***/ }),

/***/ 5680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vl": () => (/* binding */ RPC_URLS),
/* harmony export */   "KC": () => (/* binding */ supportedChainIds),
/* harmony export */   "Lj": () => (/* binding */ injected),
/* harmony export */   "Lw": () => (/* binding */ walletconnect),
/* harmony export */   "Dq": () => (/* binding */ coinbaseWallet),
/* harmony export */   "H": () => (/* binding */ supportedChainMapping)
/* harmony export */ });
/* harmony import */ var _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6590);
/* harmony import */ var _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9795);
/* harmony import */ var _web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _web3_react_walletlink_connector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7738);
/* harmony import */ var _web3_react_walletlink_connector__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_web3_react_walletlink_connector__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_isDev__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9871);




const RPC_URLS = {
    137: process.env.NEXT_PUBLIC_RPC_URL_POLYGON_MAINNET_INFURA,
    80001: process.env.NEXT_PUBLIC_RPC_URL_POLYGON_MUMBAI_INFURA
};
const supportedChainIds = (0,_utils_isDev__WEBPACK_IMPORTED_MODULE_3__/* .isDev */ .r)() ? [
    80001
] : [
    137
];
const injected = new _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0__.InjectedConnector({
    supportedChainIds
});
const rpc = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV' ? {
    80001: RPC_URLS[80001]
} : {
    137: RPC_URLS[137]
};
const coinbaseRPC = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV' ? RPC_URLS[80001] : RPC_URLS[137];
const walletconnect = new _web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1__.WalletConnectConnector({
    rpc,
    qrcode: true,
    bridge: 'https://bridge.walletconnect.org/',
    chainId: 1
});
const coinbaseWallet = new _web3_react_walletlink_connector__WEBPACK_IMPORTED_MODULE_2__.WalletLinkConnector({
    url: coinbaseRPC,
    appName: 'Moonpage',
    supportedChainIds
});
const supportedChainMapping = {
    137: {
        symbol: 'MATIC',
        name: 'Polygon',
        icon: 'PolygonIcon.svg'
    },
    80001: {
        symbol: 'MUMBAI',
        name: 'Mumbai',
        icon: 'PolygonIcon.svg'
    }
};


/***/ }),

/***/ 9826:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "yQ": () => (/* binding */ BLURB_FETCH_ERROR),
/* harmony export */   "WB": () => (/* binding */ MAX_MINTABLE_BY_CREATOR),
/* harmony export */   "xG": () => (/* binding */ GENRES),
/* harmony export */   "KG": () => (/* binding */ VOTE_ENDING_TIMES),
/* harmony export */   "pq": () => (/* binding */ DEFAULT_COVER_IMAGE_IPFS_HASH)
/* harmony export */ });
const BLURB_FETCH_ERROR = 'Something went wrong while loading this blurb. Sorry. Maybe refresh?';
const MAX_MINTABLE_BY_CREATOR = 4;
const GENRES = [
    'Other',
    'Article',
    'Crime',
    'Fanfiction',
    'Fantasy',
    'Fiction',
    'Horror',
    'Idea',
    'Invitation',
    'Lyrics',
    'Non-Fiction',
    'Paper',
    'Poetry',
    'Proposal',
    'Recipe',
    'Romance',
    'Screenplay',
    'Short story', 
];
const VOTE_ENDING_TIMES = [
    '1 hour',
    '1 day',
    '1 week',
    '1 month'
];
const DEFAULT_COVER_IMAGE_IPFS_HASH = 'QmcfMQgmbwUUqhpagyKNwBQ4zMe6NpMuupASNfMhRh32zS';


/***/ }),

/***/ 2024:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "W": () => (/* reexport */ useGetProjectId/* useGetProjectId */.W),
  "Z": () => (/* reexport */ useProjects)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./providers/index.ts + 21 modules
var providers = __webpack_require__(6900);
;// CONCATENATED MODULE: ./hooks/projects/useProjects.ts


const useProjects = ()=>{
    const api = (0,external_react_.useContext)(providers/* ProjectsContext */.v5);
    if (!api) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return api;
};

// EXTERNAL MODULE: ./hooks/projects/useGetProjectId.ts
var useGetProjectId = __webpack_require__(3275);
;// CONCATENATED MODULE: ./hooks/projects/index.ts




/***/ }),

/***/ 3275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ useGetProjectId)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function useGetProjectId() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    const projectId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!router.query.projectId) return null;
        return Array.isArray(router.query.projectId) ? router.query.projectId[0] : router.query.projectId;
    }, [
        router
    ]);
    return projectId;
}


/***/ }),

/***/ 1013:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* reexport safe */ _useTheme__WEBPACK_IMPORTED_MODULE_0__.F)
/* harmony export */ });
/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5330);



/***/ }),

/***/ 5330:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6900);


const useTheme = ()=>{
    const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers__WEBPACK_IMPORTED_MODULE_1__/* .ThemeContext */ .Ni);
    if (!value) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return value;
};


/***/ }),

/***/ 7038:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_2__);



const useAddressInRoute = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        var ref;
        const routeParts = router === null || router === void 0 ? void 0 : (ref = router.asPath) === null || ref === void 0 ? void 0 : ref.split('/');
        const routeEnding = routeParts[routeParts.length - 1];
        const hasRouteAddress = ethers__WEBPACK_IMPORTED_MODULE_2__.utils.isAddress(routeEnding);
        return hasRouteAddress ? routeEnding : undefined;
    }, [
        router === null || router === void 0 ? void 0 : router.asPath
    ]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useAddressInRoute);


/***/ }),

/***/ 5882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ hooks_useAuctionsManager)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./abis/AuctionsManager.json
const AuctionsManager_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"AuctionsEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"AuctionsStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expirationTime","type":"uint256"}],"name":"ExpirationSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"AUCTION_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"auctions","outputs":[{"internalType":"bool","name":"exists","type":"bool"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"discountRate","type":"uint256"},{"internalType":"uint256","name":"startsAt","type":"uint256"},{"internalType":"uint256","name":"expiresAt","type":"uint256"},{"internalType":"bool","name":"auctionsStarted","type":"bool"},{"internalType":"bool","name":"auctionsEnded","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"endAuctions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_startPrice","type":"uint256"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"moonpageCollection","outputs":[{"internalType":"contract IMoonpageCollection","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageFactory","outputs":[{"internalType":"contract IMoonpageFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageManager","outputs":[{"internalType":"contract IMoonpageManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readAuctionSettings","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"retriggerAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_manager","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_collection","type":"address"}],"name":"setContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"address","name":"_creatorAddress","type":"address"}],"name":"setupAuctions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_discountRate","type":"uint256"}],"name":"startAuctions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"triggerNextAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
// EXTERNAL MODULE: ../constants.ts
var constants = __webpack_require__(2391);
// EXTERNAL MODULE: ./hooks/useContract.ts
var useContract = __webpack_require__(9214);
;// CONCATENATED MODULE: ./hooks/useAuctionsManager.ts




const useAuctionsManager = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'DEV' ? constants/* AUCTIONS_MANAGER_ADDRESS_DEV */._j : constants/* AUCTIONS_MANAGER_ADDRESS */.A1;
    const AuctionsManager = (0,useContract/* default */.Z)({
        address,
        abi: AuctionsManager_namespaceObject
    });
    const AuctionsManagerContract = (0,external_react_.useMemo)(()=>AuctionsManager
    , [
        AuctionsManager
    ]);
    return AuctionsManagerContract;
};
/* harmony default export */ const hooks_useAuctionsManager = (useAuctionsManager);


/***/ }),

/***/ 9214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8054);
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_web3_react_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5680);




const RPC_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV' ? _connectors__WEBPACK_IMPORTED_MODULE_3__/* .RPC_URLS[80001] */ .vl[80001] : _connectors__WEBPACK_IMPORTED_MODULE_3__/* .RPC_URLS[137] */ .vl[137];
const useContract = ({ address , abi  })=>{
    const { account , library  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_1__.useWeb3React)();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        if (!address) return null;
        return library && account ? new ethers__WEBPACK_IMPORTED_MODULE_2__.Contract(address, abi, library === null || library === void 0 ? void 0 : library.getSigner(account)) : new ethers__WEBPACK_IMPORTED_MODULE_2__.Contract(address, abi, (0,ethers__WEBPACK_IMPORTED_MODULE_2__.getDefaultProvider)(RPC_URL));
    }, [
        library,
        account,
        address,
        abi
    ]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useContract);


/***/ }),

/***/ 4459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ useDarkMode)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useDarkMode = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=> false ? 0 : false
    , []);
};


/***/ }),

/***/ 7920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ hooks_useMoonpageManager)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./abis/MoonpageManager.json
const MoonpageManager_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"AnimationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BalanceDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BalanceIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"frozen","type":"bool"}],"name":"BaseDataFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"BlurbUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"imgHash","type":"string"},{"indexed":false,"internalType":"string","name":"animationHash","type":"string"},{"indexed":false,"internalType":"string","name":"blurbHash","type":"string"},{"indexed":false,"internalType":"string","name":"newGenre","type":"string"},{"indexed":false,"internalType":"string","name":"newSubtitle","type":"string"}],"name":"Configured","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"},{"indexed":false,"internalType":"string","name":"role","type":"string"}],"name":"ContributorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isCurated","type":"bool"}],"name":"Curated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newGenre","type":"string"}],"name":"GenreUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"ImageUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newLanguage","type":"string"}],"name":"LanguageUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"editionId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endId","type":"uint256"}],"name":"NextEditionEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PremintedByAuthor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"address","name":"royaltiesSplitter","type":"address"},{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"title","type":"string"},{"indexed":false,"internalType":"string","name":"textIpfsHash","type":"string"},{"indexed":false,"internalType":"string","name":"originalLanguage","type":"string"},{"indexed":false,"internalType":"uint256","name":"initialMintPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"firstEditionAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"currentEdLastId","type":"uint256"}],"name":"ProjectCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"}],"name":"ProjectDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"ProjectPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newSubtitle","type":"string"}],"name":"SubtitleUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"TextUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"shouldTokenGate","type":"bool"}],"name":"TokenGatingToggled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenIdIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"TranslationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"address[]","name":"_contributors","type":"address[]"},{"internalType":"uint256[]","name":"_shares","type":"uint256[]"},{"internalType":"string[]","name":"_roles","type":"string[]"}],"name":"addContributors","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"authorShares","outputs":[{"internalType":"uint256","name":"share","type":"uint256"},{"internalType":"uint256","name":"shareInMatic","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"baseDatas","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"subtitle","type":"string"},{"internalType":"string","name":"genre","type":"string"},{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"address","name":"royaltiesSplitter","type":"address"},{"internalType":"string","name":"textIpfsHash","type":"string"},{"internalType":"string","name":"imgIpfsHash","type":"string"},{"internalType":"string","name":"animationIpfsHash","type":"string"},{"internalType":"string","name":"blurbIpfsHash","type":"string"},{"internalType":"string","name":"originalLanguage","type":"string"},{"internalType":"uint256","name":"premintedByCreator","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collection","outputs":[{"internalType":"contract IMoonpageCollection","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_imgHash","type":"string"},{"internalType":"string","name":"_animationHash","type":"string"},{"internalType":"string","name":"_blurbHash","type":"string"},{"internalType":"string","name":"_genre","type":"string"},{"internalType":"string","name":"_subtitle","type":"string"}],"name":"configureProjectDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"contributions","outputs":[{"internalType":"address","name":"shareRecipient","type":"address"},{"internalType":"string","name":"role","type":"string"},{"internalType":"uint256","name":"share","type":"uint256"},{"internalType":"uint256","name":"shareInMatic","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"contributionsIndeces","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"curatedProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"deleteProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"distributeShares","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"editionOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"editionRanges","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"editions","outputs":[{"internalType":"uint256","name":"current","type":"uint256"},{"internalType":"uint256","name":"mintPrice","type":"uint256"},{"internalType":"uint256","name":"startTokenId","type":"uint256"},{"internalType":"uint256","name":"currentTokenId","type":"uint256"},{"internalType":"uint256","name":"lastGenEdTokenId","type":"uint256"},{"internalType":"uint256","name":"currentEdLastTokenId","type":"uint256"},{"internalType":"uint256","name":"endTokenId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_newEdAmount","type":"uint256"},{"internalType":"uint256","name":"_newEdMintPrice","type":"uint256"}],"name":"enableNextEdition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"existingProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"frozenProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"increaseBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"increaseCurrentTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAmountEdition","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageDev","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pausedProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"projectBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"projectIdOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"projectsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readAuthorShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readBaseData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"readContribution","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readContributionIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readEditionData","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_collection","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_mpDev","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"setIsBaseDataFrozen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setIsCurated","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setIsPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPrice","type":"uint256"}],"name":"setMinPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_premintedByCreator","type":"uint256"}],"name":"setPremintedByCreator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_caller","type":"address"},{"internalType":"address","name":"_royaltiesSplitter","type":"address"},{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_textCID","type":"string"},{"internalType":"string","name":"_originalLanguage","type":"string"},{"internalType":"uint256","name":"_initialMintPrice","type":"uint256"},{"internalType":"uint256","name":"_firstEditionAmount","type":"uint256"}],"name":"setupProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"bool","name":"_shouldTokenGate","type":"bool"}],"name":"toggleTokengating","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"translationIpfsHashes","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ungatedProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateAnimationIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateBlurbIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_genre","type":"string"}],"name":"updateGenre","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateImgIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_language","type":"string"}],"name":"updateLanguage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_subtitle","type":"string"}],"name":"updateSubtitle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateTextIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateTranslationIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
// EXTERNAL MODULE: ../constants.ts
var constants = __webpack_require__(2391);
// EXTERNAL MODULE: ./hooks/useContract.ts
var useContract = __webpack_require__(9214);
;// CONCATENATED MODULE: ./hooks/useMoonpageManager.ts




const useMoonpageManager = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'DEV' ? constants/* MOONPAGE_MANAGER_ADDRESS_DEV */.$g : constants/* MOONPAGE_MANAGER_ADDRESS */.op;
    const MoonpageManager = (0,useContract/* default */.Z)({
        address,
        abi: MoonpageManager_namespaceObject
    });
    const MoonpageManagerContract = (0,external_react_.useMemo)(()=>MoonpageManager
    , [
        MoonpageManager
    ]);
    return MoonpageManagerContract;
};
/* harmony default export */ const hooks_useMoonpageManager = (useMoonpageManager);


/***/ }),

/***/ 6900:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Q5": () => (/* reexport */ AuctionsContext),
  "W$": () => (/* reexport */ AuctionsProvider),
  "Kd": () => (/* reexport */ BallotsFactoryContext),
  "F7": () => (/* reexport */ BallotsFactoryProvider),
  "WH": () => (/* reexport */ CollectionContext),
  "YQ": () => (/* reexport */ CollectionProvider),
  "jW": () => (/* reexport */ FactoryContext),
  "LI": () => (/* reexport */ FactoryProvider),
  "tl": () => (/* reexport */ ManagerContext),
  "eC": () => (/* reexport */ ManagerProvider),
  "v5": () => (/* reexport */ ProjectsContext),
  "V3": () => (/* reexport */ ProjectsProvider),
  "Ni": () => (/* reexport */ ThemeContext),
  "f6": () => (/* reexport */ ThemeProvider),
  "St": () => (/* reexport */ UserContext),
  "dr": () => (/* reexport */ UserProvider)
});

// UNUSED EXPORTS: GET_RECENT_VOTINGS

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(1982);
;// CONCATENATED MODULE: ./providers/projects-provider/useGetAllProjects.tsx



const GET_ALL_PROJECTS = client_.gql`
  query allProjects {
    projects(
      orderBy: createdAt
      orderDirection: desc
      where: { isDeleted: null, id_not: 13 }
    ) {
      auctionsEnded
      auctionsStarted
      balance
      createdAt
      creator
      editions {
        id
        edition
        startId
        endId
      }
      genre
      id
      imgIpfsHash
      isCurated
      isDeleted
      isFrozen
      isPaused
      mintCount
      originalLanguage
      subtitle
      title
      mintCount
      startId
      endId
      currentId
      initialMintPrice
      premintedByAuthor
    }
  }
`;
function useGetAllProjects() {
    const { loading , error , data , refetch  } = (0,client_.useQuery)(GET_ALL_PROJECTS);
    const formattedData = (0,external_react_.useMemo)(()=>{
        if (!data) return;
        const { projects  } = data;
        const formatted = projects === null || projects === void 0 ? void 0 : projects.map((project)=>({
                ...project,
                balance: external_ethers_.BigNumber.from(project.balance),
                mintCount: external_ethers_.BigNumber.from(project.mintCount),
                startId: external_ethers_.BigNumber.from(project.startId),
                endId: external_ethers_.BigNumber.from(project.endId),
                currentId: external_ethers_.BigNumber.from(project.currentId),
                initialMintPrice: external_ethers_.BigNumber.from(project.initialMintPrice),
                premintedByAuthor: external_ethers_.BigNumber.from(project.premintedByAuthor),
                imgIpfsHash: project.imgIpfsHash
            })
        );
        return formatted;
    }, [
        data
    ]);
    return (0,external_react_.useMemo)(()=>({
            isLoading: loading,
            error,
            data: formattedData,
            refetch
        })
    , [
        loading,
        error,
        refetch,
        formattedData
    ]);
}

;// CONCATENATED MODULE: ./providers/projects-provider/useGetTopProjects.tsx



const GET_TOP_PROJECTS = client_.gql`
  query topProjectsQuery {
    projects(
      first: 3
      orderBy: mintCount
      orderDirection: desc
      where: { isDeleted: null }
    ) {
      auctionsEnded
      auctionsStarted
      balance
      createdAt
      creator
      editions {
        id
      }
      genre
      id
      imgIpfsHash
      isCurated
      isFrozen
      isPaused
      mintCount
      originalLanguage
      subtitle
      title
      mintCount
      startId
      endId
      currentId
      initialMintPrice
      premintedByAuthor
    }
  }
`;
function useGetTopProjects() {
    const { loading , error , data , refetch  } = (0,client_.useQuery)(GET_TOP_PROJECTS);
    const formattedData = (0,external_react_.useMemo)(()=>{
        if (!data) return;
        const { projects  } = data;
        const formatted = projects === null || projects === void 0 ? void 0 : projects.map((project)=>({
                ...project,
                balance: external_ethers_.BigNumber.from(project.balance),
                mintCount: external_ethers_.BigNumber.from(project.mintCount),
                startId: external_ethers_.BigNumber.from(project.startId),
                endId: external_ethers_.BigNumber.from(project.currentId),
                currentId: external_ethers_.BigNumber.from(project.currentId),
                initialMintPrice: external_ethers_.BigNumber.from(project.initialMintPrice),
                premintedByAuthor: external_ethers_.BigNumber.from(project.premintedByAuthor),
                imgIpfsHash: project.imgIpfsHash
            })
        );
        return formatted;
    }, [
        data
    ]);
    return (0,external_react_.useMemo)(()=>({
            isLoading: loading,
            error,
            data: formattedData,
            refetch
        })
    , [
        loading,
        error,
        refetch,
        formattedData
    ]);
}

;// CONCATENATED MODULE: ./providers/projects-provider/projects-provider.tsx




const defaultContext = {
    allProjects: [],
    areAllProjectsLoading: false,
    allProjectsFetchError: undefined,
    refetchAllProjects: async ()=>undefined
    ,
    topProjects: [],
    areTopProjectsLoading: false,
    topProjectsFetchError: undefined,
    refetchTopProjects: async ()=>undefined
};
const ProjectsContext = /*#__PURE__*/ (0,external_react_.createContext)(defaultContext);
const ProjectsProvider = ({ children  })=>{
    const { data: allProjects , isLoading: areAllProjectsLoading , error: allProjectsFetchError , refetch: refetchAllProjects ,  } = useGetAllProjects();
    const { data: topProjects , isLoading: areTopProjectsLoading , error: topProjectsFetchError , refetch: refetchTopProjects ,  } = useGetTopProjects();
    const api = (0,external_react_.useMemo)(()=>({
            // all projects
            allProjects,
            areAllProjectsLoading,
            allProjectsFetchError,
            refetchAllProjects,
            // top projects
            topProjects,
            areTopProjectsLoading,
            topProjectsFetchError,
            refetchTopProjects
        })
    , [
        allProjects,
        areAllProjectsLoading,
        allProjectsFetchError,
        refetchAllProjects,
        topProjects,
        areTopProjectsLoading,
        topProjectsFetchError,
        refetchTopProjects, 
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(ProjectsContext.Provider, {
        value: api,
        children: children
    }));
};

// EXTERNAL MODULE: external "@web3-react/core"
var core_ = __webpack_require__(8054);
// EXTERNAL MODULE: external "ethereum-multicall"
var external_ethereum_multicall_ = __webpack_require__(1317);
// EXTERNAL MODULE: external "@ethersproject/providers"
var providers_ = __webpack_require__(399);
;// CONCATENATED MODULE: ./abis/MoonpageCollection.json
const MoonpageCollection_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"edition","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"auctionsManager","outputs":[{"internalType":"contract IAuctionsManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintableCreator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageDev","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageManager","outputs":[{"internalType":"contract IMoonpageManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mpManager","type":"address"},{"internalType":"address","name":"_aManager","type":"address"},{"internalType":"address","name":"_mpDev","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxAmount","type":"uint256"}],"name":"setMaxMintableCreator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fraction","type":"uint256"},{"internalType":"uint256","name":"_bips","type":"uint256"}],"name":"setRoyaltyParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_amountForCreator","type":"uint256"},{"internalType":"uint256","name":"_discountRate","type":"uint256"}],"name":"startAuctions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
// EXTERNAL MODULE: ../constants.ts
var constants = __webpack_require__(2391);
// EXTERNAL MODULE: ./hooks/useContract.ts
var useContract = __webpack_require__(9214);
;// CONCATENATED MODULE: ./hooks/useMoonpageCollection.ts




const useMoonpageCollection = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'DEV' ? constants/* MOONPAGE_COLLECTION_ADDRESS_DEV */.R1 : constants/* MOONPAGE_COLLECTION_ADDRESS */.BI;
    const MoonpageCollection = (0,useContract/* default */.Z)({
        address,
        abi: MoonpageCollection_namespaceObject
    });
    const MoonpageCollectionContract = (0,external_react_.useMemo)(()=>MoonpageCollection
    , [
        MoonpageCollection
    ]);
    return MoonpageCollectionContract;
};
/* harmony default export */ const hooks_useMoonpageCollection = (useMoonpageCollection);

// EXTERNAL MODULE: ./hooks/projects/index.ts + 1 modules
var projects = __webpack_require__(2024);
// EXTERNAL MODULE: ./connectors.ts
var connectors = __webpack_require__(5680);
;// CONCATENATED MODULE: ./utils/loop.ts
// generic loop
const loop = (times, callback)=>{
    for(let i = 0; i < times; i++){
        callback(i);
    }
};

// EXTERNAL MODULE: external "@ethersproject/bignumber"
var bignumber_ = __webpack_require__(5757);
;// CONCATENATED MODULE: ./providers/user-provider/useGetAllNftsOfAccount.ts











const useGetAllNftsOfAccount = (account)=>{
    const { chainId  } = (0,core_.useWeb3React)();
    const collection = hooks_useMoonpageCollection();
    const { allProjects , refetchAllProjects  } = (0,projects/* useProjects */.Z)();
    const { 0: balance , 1: setBalance  } = (0,external_react_.useState)(0);
    const { 0: nfts , 1: setNfts  } = (0,external_react_.useState)([]);
    const { 0: loading , 1: setIsLoading  } = (0,external_react_.useState)(false);
    const { 0: detailedNfts , 1: setDetailedNfts  } = (0,external_react_.useState)(null);
    const { 0: groupedNfts , 1: setGroupedNfts  } = (0,external_react_.useState)(null);
    const getProjectIdOfToken = (0,external_react_.useCallback)((tokenId, projects)=>{
        const project1 = projects.find((project)=>tokenId >= Number(project.startId) && tokenId <= Number(project.endId)
        );
        if (project1) {
            return project1.id;
        } else {
            return null;
        }
    }, []);
    // returns null when a tokenId is valid but not in an edition yet
    const getNFTDetails = (0,external_react_.useCallback)((tokenId, projects)=>{
        const projectId = Number(getProjectIdOfToken(tokenId, projects));
        if ((projects === null || projects === void 0 ? void 0 : projects.length) > 0 && projectId) {
            var ref;
            const project2 = projects.find((project)=>Number(project.id) === projectId
            );
            if (!project2) return undefined;
            const edition = (ref = project2.editions) === null || ref === void 0 ? void 0 : ref.find((ed)=>tokenId >= Number(ed.startId) && tokenId <= Number(ed.endId)
            );
            if (!edition) return null;
            return {
                imgIpfsHash: project2.imgIpfsHash,
                tokenId,
                projectId,
                edition: Number(edition.edition),
                title: project2.title,
                creator: project2.creator
            };
        } else {
            return null;
        }
    }, [
        getProjectIdOfToken
    ]);
    const fetchBalance = (0,external_react_.useCallback)(async ()=>{
        const provider = new providers_.JsonRpcProvider(connectors/* RPC_URLS */.vl[chainId], chainId);
        const multicall = new external_ethereum_multicall_.Multicall({
            ethersProvider: provider,
            tryAggregate: false
        });
        try {
            setIsLoading(true);
            refetchAllProjects();
            // fetch the balance
            const fetchedBalanceBig = await collection.balanceOf(account);
            const fetchedBalance = Number(fetchedBalanceBig);
            const callsForMulticalls = [];
            let tokens = [];
            // prepare multicall
            loop(fetchedBalance, (i)=>{
                callsForMulticalls.push({
                    reference: 'tokenOfOwnerByIndex',
                    methodName: 'tokenOfOwnerByIndex',
                    methodParameters: [
                        account,
                        i
                    ]
                });
            });
            const multicallContext = {
                reference: 'NFTS_OF_USER',
                contractAddress: process.env.NX_PUBLIC_ENVIRONMENT === 'DEV' ? constants/* MOONPAGE_COLLECTION_ADDRESS_DEV */.R1 : constants/* MOONPAGE_COLLECTION_ADDRESS */.BI,
                abi: MoonpageCollection_namespaceObject,
                calls: callsForMulticalls
            };
            const result = (await multicall.call(multicallContext)).results.NFTS_OF_USER.callsReturnContext.filter((returnElement)=>returnElement.success
            );
            // get all token Ids of user
            tokens = result.map((el)=>Number(bignumber_.BigNumber.from(el.returnValues[0].hex))
            );
            setBalance(fetchedBalance);
            setNfts(tokens);
            setIsLoading(false);
            const nftsWithDetails = tokens.map((token)=>getNFTDetails(token, allProjects)
            ).filter((el)=>el !== null
            );
            const groupByProjectId = nftsWithDetails.reduce((group, product)=>{
                const { projectId  } = product;
                var _projectId;
                group[projectId] = (_projectId = group[projectId]) !== null && _projectId !== void 0 ? _projectId : [];
                group[projectId].push(product);
                return group;
            }, {});
            const groupedInArray = [];
            for (const [key, value] of Object.entries(groupByProjectId)){
                groupedInArray.push(value);
            }
            setDetailedNfts(nftsWithDetails);
            setGroupedNfts(groupedInArray);
            setIsLoading(false);
        } catch (e) {
            console.log({
                e
            });
            setIsLoading(false);
        }
    }, [
        account,
        allProjects,
        chainId,
        collection,
        getNFTDetails,
        refetchAllProjects, 
    ]);
    (0,external_react_.useEffect)(()=>{
        if (account) {
            fetchBalance();
        }
    }, [
        account,
        fetchBalance
    ]);
    return (0,external_react_.useMemo)(()=>({
            fetchBalance,
            balance,
            nfts,
            isLoading: loading,
            detailedNfts,
            groupedNfts
        })
    , [
        fetchBalance,
        balance,
        nfts,
        loading,
        detailedNfts,
        groupedNfts
    ]);
};
/* harmony default export */ const user_provider_useGetAllNftsOfAccount = (useGetAllNftsOfAccount);

// EXTERNAL MODULE: ./hooks/useAddressInRoute.ts
var useAddressInRoute = __webpack_require__(7038);
;// CONCATENATED MODULE: ./providers/user-provider/user-provider.tsx





const user_provider_defaultContext = {
    balance: 0,
    nfts: null,
    isLoading: false,
    groupedNfts: [],
    detailedNfts: [],
    fetchBalance: ()=>null
};
const UserContext = /*#__PURE__*/ (0,external_react_.createContext)(user_provider_defaultContext);
const UserProvider = ({ children  })=>{
    const { account: loggedInAccount  } = (0,core_.useWeb3React)();
    const addressInRoute = (0,useAddressInRoute/* default */.Z)();
    const account = (0,external_react_.useMemo)(()=>addressInRoute !== null && addressInRoute !== void 0 ? addressInRoute : loggedInAccount
    , [
        addressInRoute,
        loggedInAccount
    ]);
    const { balance , nfts , isLoading , detailedNfts , groupedNfts , fetchBalance  } = user_provider_useGetAllNftsOfAccount(account);
    const api = (0,external_react_.useMemo)(()=>({
            fetchBalance,
            balance,
            nfts,
            isLoading,
            detailedNfts,
            groupedNfts
        })
    , [
        fetchBalance,
        balance,
        nfts,
        detailedNfts,
        isLoading,
        groupedNfts
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(UserContext.Provider, {
        value: api,
        children: children
    }));
};

// EXTERNAL MODULE: ./hooks/useMoonpageManager.ts + 1 modules
var useMoonpageManager = __webpack_require__(7920);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./utils/isDev.ts
var isDev = __webpack_require__(9871);
;// CONCATENATED MODULE: ./components/ToastLink.tsx




const Link = (external_styled_components_default()).a`
  color: #232630;
`;
const ToastLink = ({ message , linkText  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: `${message}`
            }),
            linkText && /*#__PURE__*/ jsx_runtime_.jsx(Link, {
                rel: "noreferrer",
                target: "_blank",
                href: `https://${(0,isDev/* isDev */.r)() ? 'testnets.' : ''}opensea.io/account`,
                children: linkText
            })
        ]
    }));
};
/* harmony default export */ const components_ToastLink = (ToastLink);

// EXTERNAL MODULE: ./constants.ts
var constants_0 = __webpack_require__(9826);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./utils/pinToPinata.ts

const url = process.env.NEXT_PUBLIC_PINATA_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
const pinToPinata = async (hash, projectId, type, title)=>{
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV') return;
    const timestamp = new Date().getTime();
    const name = `${projectId !== null && projectId !== void 0 ? projectId : title}-${type}-${timestamp}`;
    try {
        await external_axios_default().post(url, {
            hashToPin: hash,
            pinataMetadata: {
                name,
                keyvalues: {}
            }
        }, {
            headers: {
                pinata_api_key: API_KEY,
                pinata_secret_api_key: API_SECRET,
                'Content-Type': 'application/json'
            }
        });
        return 'ok';
    } catch (e) {
        console.log({
            e
        });
        return 'error';
    }
};
/* harmony default export */ const utils_pinToPinata = (pinToPinata);

// EXTERNAL MODULE: ./utils/getGasMargin.ts
var getGasMargin = __webpack_require__(9172);
;// CONCATENATED MODULE: ./utils/unpinFromPinata.ts

const unpinFromPinata_url = process.env.NEXT_PUBLIC_PINATA_UNPIN_API_URL;
const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const unpinFromPinata = async (hash)=>{
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV') return;
    const config = {
        method: 'delete',
        url: `${unpinFromPinata_url}/${hash}`,
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    };
    try {
        const res = await external_axios_default()(config);
        return res.data;
    } catch (e) {
        console.debug({
            e
        });
    }
};
/* harmony default export */ const utils_unpinFromPinata = (unpinFromPinata);

;// CONCATENATED MODULE: ./providers/manager-provider/manager-provider.tsx










const manager_provider_defaultContext = {
    configureProject: async ()=>undefined
    ,
    configureStatus: 'idle',
    deleteProject: async ()=>undefined
    ,
    deleteProjectStatus: 'idle',
    setContributors: async ()=>undefined
    ,
    setContributorsStatus: 'idle',
    enableNextEdition: async ()=>undefined
    ,
    enableNextEditionStatus: 'idle',
    updateTranslation: async ()=>undefined
    ,
    updateTranslationStatus: 'idle',
    updateBlurb: async ()=>undefined
    ,
    updateBlurbStatus: 'idle',
    updateText: async ()=>undefined
    ,
    updateTextStatus: 'idle'
};
const ManagerContext = /*#__PURE__*/ (0,external_react_.createContext)(manager_provider_defaultContext);
function ManagerProvider({ children  }) {
    const mpManager = (0,useMoonpageManager/* default */.Z)();
    const { 0: configureStatus , 1: setConfigureStatus  } = (0,external_react_.useState)();
    const { 0: setContributorsStatus , 1: setSetContributorsStatus  } = (0,external_react_.useState)();
    const { 0: updateTranslationStatus , 1: setUpdateTranslationStatus  } = (0,external_react_.useState)();
    const { 0: updateBlurbStatus , 1: setUpdateBlurbStatus  } = (0,external_react_.useState)();
    const { 0: updateTextStatus , 1: setUpdateTextStatus  } = (0,external_react_.useState)();
    const { 0: enableNextEditionStatus , 1: setEnableNextEditionStatus  } = (0,external_react_.useState)();
    const { 0: deleteProjectStatus , 1: setDeleteProjectStatus  } = (0,external_react_.useState)();
    const configureProject = (0,external_react_.useCallback)(async ({ projectId , imgFile , imgHash , animationHash , blurb , blurbHash , genre , subtitle , onError , onSuccess  })=>{
        try {
            setConfigureStatus('confirming');
            imgHash = imgHash.length ? imgHash : constants_0/* DEFAULT_COVER_IMAGE_IPFS_HASH */.pq;
            // const estimatedGas =
            //   await mpManager.estimateGas.configureProjectDetails(
            //     projectId,
            //     imgHash,
            //     animationHash,
            //     blurbHash,
            //     genre,
            //     subtitle
            //   );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.configureProjectDetails(projectId, imgHash, animationHash, blurbHash, genre, subtitle, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setConfigureStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Configuring...'
            }));
            const handleSuccess = ()=>{
                setConfigureStatus('success');
                external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            };
            mpManager.provider.once(hash, async (transaction)=>{
                if (blurb) {
                    // upload blurb metadata to BE
                    try {
                        const blurbRequestOptions = {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                blurb
                            })
                        };
                        // fire and forget
                        await fetch(`${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/projects/blurb/${projectId}`, blurbRequestOptions);
                    } catch (e) {
                    // do nothing
                    }
                }
                if (imgFile) {
                    // upload cover image metadata to BE
                    try {
                        const formData = new FormData();
                        formData.append('file', imgFile);
                        const imgRequestOptions = {
                            method: 'POST',
                            body: formData
                        };
                        // fire and forget
                        await fetch(`${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/image-upload/${projectId}`, imgRequestOptions);
                    } catch (e) {
                    // do nothing
                    }
                }
                // pin metadata to IPFS
                try {
                    await utils_pinToPinata(imgHash, projectId, 'image');
                    await utils_pinToPinata(blurbHash, projectId, 'blurb');
                } catch (e) {
                // do nothing
                }
                handleSuccess();
            });
        } catch (e) {
            setConfigureStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const setContributors = (0,external_react_.useCallback)(async ({ projectId , contributorsList , onError , onSuccess  })=>{
        const addressesArray = [];
        const sharesArray = [];
        const rolesArray = [];
        contributorsList === null || contributorsList === void 0 ? void 0 : contributorsList.forEach((contrib)=>{
            addressesArray.push(contrib.address);
            sharesArray.push(contrib.share);
            rolesArray.push(contrib.role);
        });
        try {
            setSetContributorsStatus('confirming');
            // const estimatedGas = await mpManager.estimateGas.addContributors(
            //   projectId,
            //   addressesArray,
            //   sharesArray,
            //   rolesArray
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.addContributors(projectId, addressesArray, sharesArray, rolesArray, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setSetContributorsStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Adding Contributor(s)...'
            }));
            const handleSuccess = ()=>{
                setSetContributorsStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            };
            mpManager.provider.once(hash, (transaction)=>{
                handleSuccess();
            });
        } catch (e) {
            setSetContributorsStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const updateTranslation = (0,external_react_.useCallback)(async ({ projectId , translation , translationIpfsHash , onError , onSuccess  })=>{
        try {
            setUpdateTranslationStatus('confirming');
            // const estimatedGas =
            //   await mpManager.estimateGas.updateTranslationIpfsHash(
            //     projectId,
            //     translationIpfsHash
            //   );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.updateTranslationIpfsHash(projectId, translationIpfsHash, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setUpdateTranslationStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Setting Translation...'
            }));
            const handleSuccess = ()=>{
                setUpdateTranslationStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            };
            mpManager.provider.once(hash, async (transaction)=>{
                // save update in BE
                try {
                    const translationUpdateOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            translation
                        })
                    };
                    const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/translation/${projectId}`;
                    await fetch(metadataUrl, translationUpdateOptions);
                } catch (e) {
                // do nothing
                }
                // then pin it with Pinata
                try {
                    await utils_pinToPinata(translationIpfsHash, projectId, 'translation');
                } catch (e1) {
                // do nothing
                }
                handleSuccess();
            });
        } catch (e) {
            setUpdateTranslationStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const updateBlurb = (0,external_react_.useCallback)(async ({ projectId , blurb , blurbIpfsHash , oldBlurbIpfsHash , onError , onSuccess  })=>{
        try {
            setUpdateBlurbStatus('confirming');
            // const estimatedGas = await mpManager.estimateGas.updateBlurbIpfsHash(
            //   projectId,
            //   blurbIpfsHash
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.updateBlurbIpfsHash(projectId, blurbIpfsHash, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setUpdateBlurbStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Updating Blurb...'
            }));
            const handleSuccess = ()=>{
                setUpdateBlurbStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            };
            mpManager.provider.once(hash, async (transaction)=>{
                // save update in BE
                try {
                    const blurbUpdateOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            blurb
                        })
                    };
                    const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/blurb/${projectId}`;
                    await fetch(metadataUrl, blurbUpdateOptions);
                } catch (e) {
                // do nothing
                }
                // then pin it with Pinata
                try {
                    // TODO: find a way to only unpin the first all other than the last one.
                    // Because we want to show the user the latest change made.
                    // await unpinFromPinata(oldBlurbIpfsHash);
                    await utils_pinToPinata(blurbIpfsHash, projectId, 'blurb');
                } catch (e2) {
                // do nothing
                }
                handleSuccess();
            });
        } catch (e) {
            setUpdateBlurbStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const updateText = (0,external_react_.useCallback)(async ({ projectId , text , textIpfsHash , oldTextIpfsHash , onError , onSuccess  })=>{
        try {
            setUpdateTextStatus('confirming');
            // const estimatedGas = await mpManager.estimateGas.updateTextIpfsHash(
            //   projectId,
            //   textIpfsHash
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.updateTextIpfsHash(projectId, textIpfsHash, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setUpdateTextStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Updating Text...'
            }));
            const handleSuccess = ()=>{
                setUpdateTextStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            };
            mpManager.provider.once(hash, async (transaction)=>{
                // save update in BE
                try {
                    const textUpdateOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text
                        })
                    };
                    const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/text/${projectId}`;
                    await fetch(metadataUrl, textUpdateOptions);
                } catch (e) {
                // do nothing
                }
                // then pin it with Pinata
                try {
                    // TODO: find a way to only unpin the first all other than the last one.
                    // Because we want to show the user the latest change made.
                    // await unpinFromPinata(oldTextIpfsHash);
                    await utils_pinToPinata(textIpfsHash, projectId, 'text');
                } catch (e3) {
                // do nothing
                }
                handleSuccess();
            });
        } catch (e) {
            setUpdateTextStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const enableNextEdition = (0,external_react_.useCallback)(async ({ projectId , price , amount , onError , onSuccess  })=>{
        try {
            setEnableNextEditionStatus('confirming');
            const formattedPrice = external_ethers_.BigNumber.from((Number(price) * 1000000000000000000).toString());
            // const estimatedGas = await mpManager.estimateGas.enableNextEdition(
            //   projectId,
            //   amount,
            //   formattedPrice
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.enableNextEdition(projectId, amount, formattedPrice, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setEnableNextEditionStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Unlocking next edition...'
            }));
            mpManager.provider.once(hash, (transaction)=>{
                setEnableNextEditionStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            });
        } catch (e) {
            setEnableNextEditionStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const deleteProject = (0,external_react_.useCallback)(async ({ projectId , textHash , imgHash , blurbHash , translationHash , onError , onSuccess  })=>{
        try {
            setDeleteProjectStatus('confirming');
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await mpManager.deleteProject(projectId, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setDeleteProjectStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Deleting project...'
            }));
            mpManager.provider.once(hash, async (transaction)=>{
                // unpin hashes
                textHash && utils_unpinFromPinata(textHash);
                imgHash && utils_unpinFromPinata(imgHash);
                blurbHash && utils_unpinFromPinata(blurbHash);
                translationHash && utils_unpinFromPinata(translationHash);
                // delete metadata in BE
                try {
                    const deleteProjectRequestOptions = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    // fire and forget
                    await fetch(`${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/projects/${projectId}`, deleteProjectRequestOptions);
                    await fetch(`${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/file/project-${projectId}`, deleteProjectRequestOptions);
                } catch (e) {
                    console.log('something went wrong while deleting BE stuff', {
                        e
                    });
                // do nothing
                }
                setDeleteProjectStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            });
        } catch (e) {
            setDeleteProjectStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        mpManager
    ]);
    const api = (0,external_react_.useMemo)(()=>({
            configureProject,
            configureStatus,
            deleteProject,
            deleteProjectStatus,
            setContributors,
            setContributorsStatus,
            enableNextEdition,
            enableNextEditionStatus,
            updateTranslation,
            updateTranslationStatus,
            updateBlurb,
            updateBlurbStatus,
            updateText,
            updateTextStatus
        })
    , [
        configureProject,
        configureStatus,
        deleteProject,
        deleteProjectStatus,
        enableNextEdition,
        enableNextEditionStatus,
        setContributors,
        setContributorsStatus,
        updateTranslation,
        updateTranslationStatus,
        updateBlurb,
        updateBlurbStatus,
        updateText,
        updateTextStatus, 
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(ManagerContext.Provider, {
        value: api,
        children: children
    }));
}

// EXTERNAL MODULE: ./hooks/useAuctionsManager.ts + 1 modules
var useAuctionsManager = __webpack_require__(5882);
;// CONCATENATED MODULE: ./providers/collection-provider/collection-provider.tsx







const collection_provider_defaultContext = {
    startAuctions: async ()=>undefined
    ,
    startAuctionsStatus: 'idle',
    buy: async ()=>undefined
    ,
    buyStatus: 'idle',
    mint: async ()=>undefined
    ,
    mintStatus: 'idle'
};
const CollectionContext = /*#__PURE__*/ (0,external_react_.createContext)(collection_provider_defaultContext);
function CollectionProvider({ children  }) {
    const collection = hooks_useMoonpageCollection();
    const auctionsManager = (0,useAuctionsManager/* default */.Z)();
    const { 0: startAuctionsStatus , 1: setStartAuctionsStatus  } = (0,external_react_.useState)();
    const { 0: buyStatus , 1: setBuyStatus  } = (0,external_react_.useState)();
    const { 0: mintStatus , 1: setMintStatus  } = (0,external_react_.useState)();
    const startAuctions = (0,external_react_.useCallback)(async ({ projectId , amountForCreator , initialMintPrice , onSuccess , onError  })=>{
        try {
            setStartAuctionsStatus('confirming');
            const discountRate = Number(initialMintPrice.div(60 * 60 * 24));
            // const estimatedGas = await collection.estimateGas.startAuctions(
            //   projectId,
            //   amountForCreator,
            //   discountRate
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await collection.startAuctions(projectId, amountForCreator, discountRate, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setStartAuctionsStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Starting Auctions...'
            }));
            collection.provider.once(hash, async (transaction)=>{
                // we need a time, because the graph needs some time
                setTimeout(()=>{
                    setStartAuctionsStatus('success');
                    external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!',
                        linkText: "View your NFTs on Opensea"
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 10000);
            });
        } catch (e) {
            console.log({
                e
            });
            setStartAuctionsStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        collection
    ]);
    const buy = (0,external_react_.useCallback)(async ({ projectId , initialMintPrice , onSuccess , onError  })=>{
        try {
            setBuyStatus('confirming');
            const currentPrice = await auctionsManager.getPrice(projectId, initialMintPrice);
            // const estimatedGas = await collection.estimateGas.buy(projectId, {
            //   value: currentPrice,
            // });
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await collection.buy(projectId, {
                value: currentPrice,
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setBuyStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Minting...'
            }));
            collection.provider.once(hash, (transaction)=>{
                setBuyStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            });
        } catch (e) {
            setBuyStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        auctionsManager,
        collection
    ]);
    const mint = (0,external_react_.useCallback)(async ({ projectId , amount , price , onSuccess , onError  })=>{
        try {
            setMintStatus('confirming');
            // const estimatedGas = await collection.estimateGas.publicMint(
            //   projectId,
            //   amount,
            //   {
            //     value: price,
            //   }
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const tx = await collection.publicMint(projectId, amount, {
                value: price,
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = tx;
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Minting...'
            }));
            collection.provider.once(hash, (transaction)=>{
                setMintStatus('success');
                external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!',
                    linkText: "View your NFTs on Opensea"
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            });
        } catch (e) {
            setMintStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        collection
    ]);
    const api = (0,external_react_.useMemo)(()=>({
            startAuctions,
            startAuctionsStatus,
            buy,
            buyStatus,
            mint,
            mintStatus
        })
    , [
        buy,
        buyStatus,
        mint,
        mintStatus,
        startAuctions,
        startAuctionsStatus
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(CollectionContext.Provider, {
        value: api,
        children: children
    }));
}

;// CONCATENATED MODULE: ./providers/auctions-provider/auctions-provider.tsx







const auctions_provider_defaultContext = {
    retriggerAuction: async ()=>undefined
    ,
    retriggerAuctionStatus: 'idle'
};
const AuctionsContext = /*#__PURE__*/ (0,external_react_.createContext)(auctions_provider_defaultContext);
function AuctionsProvider({ children  }) {
    const auctionsManager = (0,useAuctionsManager/* default */.Z)();
    const { 0: retriggerAuctionStatus , 1: setRetriggerAuctionStatus  } = (0,external_react_.useState)();
    const retriggerAuction = (0,external_react_.useCallback)(async ({ projectId , onSuccess , onError  })=>{
        try {
            setRetriggerAuctionStatus('confirming');
            // this estimation is not working anymore 3.Dec 2022
            // const estimatedGas = await auctionsManager.estimateGas.retriggerAuction(
            //   BigNumber.from(projectId)
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await auctionsManager.retriggerAuction(external_ethers_.BigNumber.from(projectId), {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setRetriggerAuctionStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Retriggering...'
            }));
            auctionsManager.provider.once(hash, (transaction)=>{
                // we need time, because the graph needs a while
                const timeout = setTimeout(()=>{
                    setRetriggerAuctionStatus('success');
                    external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!'
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 10000);
                return ()=>{
                    clearTimeout(timeout);
                };
            });
        } catch (e) {
            setRetriggerAuctionStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        auctionsManager
    ]);
    const api = (0,external_react_.useMemo)(()=>({
            retriggerAuction,
            retriggerAuctionStatus
        })
    , [
        retriggerAuction,
        retriggerAuctionStatus
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(AuctionsContext.Provider, {
        value: api,
        children: children
    }));
}

;// CONCATENATED MODULE: ./abis/MoonpageFactory.json
const MoonpageFactory_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"}],"name":"Created","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowlist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"auctionsManager","outputs":[{"internalType":"contract IAuctionsManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_textIpfsHash","type":"string"},{"internalType":"string","name":"_originalLanguage","type":"string"},{"internalType":"uint256","name":"_initialMintPrice","type":"uint256"},{"internalType":"uint256","name":"_firstEditionAmount","type":"uint256"}],"name":"createProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"denylist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"firstEditionMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"firstEditionMin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mpManager","type":"address"},{"internalType":"address","name":"_auctionsManager","type":"address"},{"internalType":"address","name":"_mpRoyaltiesReceiver","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAllowlistOnly","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageManager","outputs":[{"internalType":"contract IMoonpageManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageRoyaltiesReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"projectsIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mpManager","type":"address"},{"internalType":"address","name":"_aManager","type":"address"},{"internalType":"address","name":"_mpRoyaltiesReceiver","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isAllowlistOnly","type":"bool"}],"name":"setIsAllowlistOnly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"bool","name":"_isOnAllowlist","type":"bool"}],"name":"updateAllowlist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"bool","name":"_isOnDenylist","type":"bool"}],"name":"updateDenylist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
;// CONCATENATED MODULE: ./hooks/useMoonpageFactoryContract.ts




const useMoonpageFactoryContract = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'DEV' ? constants/* MOONPAGE_FACTORY_ADDRESS_DEV */.C5 : constants/* MOONPAGE_FACTORY_ADDRESS */.SA;
    const Factory = (0,useContract/* default */.Z)({
        address,
        abi: MoonpageFactory_namespaceObject
    });
    const FactoryContract = (0,external_react_.useMemo)(()=>Factory
    , [
        Factory
    ]);
    return FactoryContract;
};
/* harmony default export */ const hooks_useMoonpageFactoryContract = (useMoonpageFactoryContract);

;// CONCATENATED MODULE: ./providers/factory-provider/factory-provider.tsx







const factory_provider_defaultContext = {
    createProject: async ()=>undefined
    ,
    createProjectStatus: 'idle'
};
const FactoryContext = /*#__PURE__*/ (0,external_react_.createContext)(factory_provider_defaultContext);
function FactoryProvider({ children  }) {
    const factory = hooks_useMoonpageFactoryContract();
    const { 0: createProjectStatus , 1: setCreateProjectStatus  } = (0,external_react_.useState)();
    const createProject = (0,external_react_.useCallback)(async ({ title , text , textIpfsHash , originalLanguage , initialMintPrice , firstEditionAmount , onSuccess , onError  })=>{
        try {
            setCreateProjectStatus('confirming');
            // const estimatedGas = await factory.estimateGas.createProject(
            //   title,
            //   textIpfsHash,
            //   originalLanguage,
            //   initialMintPrice,
            //   firstEditionAmount
            // );
            // const gasLimit = getGasMargin(estimatedGas);
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await factory.createProject(title, textIpfsHash, originalLanguage, initialMintPrice, firstEditionAmount, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setCreateProjectStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Setting up project...'
            }));
            factory.provider.once(hash, async (transaction)=>{
                var ref;
                const receipt = await Tx.wait();
                const latestProjectId = Number(await factory.projectsIndex()) - 1;
                const CreationEvent = (ref = receipt.events) === null || ref === void 0 ? void 0 : ref.find((event)=>event.event === 'Created'
                );
                // we are fetching a fallback, because configuration fails
                // guessing this is because the CreationEvent does not contain the project Id somehow
                // not sure tho
                const projectId = Number(CreationEvent.args.projectId).toString();
                const project = projectId || (latestProjectId === null || latestProjectId === void 0 ? void 0 : latestProjectId.toString());
                // upload metadata to BE
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title,
                            mpId: project,
                            text
                        })
                    };
                    // fire and forget
                    await fetch(`${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/projects/${project}`, requestOptions);
                } catch (e) {
                    // do nothing
                    console.log({
                        e
                    });
                }
                // pin metadata with Pinata
                try {
                    await utils_pinToPinata(textIpfsHash, project, 'text', title);
                } catch (e1) {
                // do nothing
                }
                setCreateProjectStatus('success');
                external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(project);
            });
        } catch (e) {
            console.log({
                e
            });
            setCreateProjectStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        factory
    ]);
    const api = (0,external_react_.useMemo)(()=>({
            createProject,
            createProjectStatus
        })
    , [
        createProject,
        createProjectStatus
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(FactoryContext.Provider, {
        value: api,
        children: children
    }));
}

// EXTERNAL MODULE: ./hooks/useDarkMode.ts
var useDarkMode = __webpack_require__(4459);
// EXTERNAL MODULE: ./themes.ts
var themes = __webpack_require__(5468);
;// CONCATENATED MODULE: ./providers/theme-provider/theme-provider.tsx




const ThemeContext = /*#__PURE__*/ (0,external_react_.createContext)(null);
const ThemeProvider = ({ children  })=>{
    const isDark = (0,useDarkMode/* useDarkMode */.v)();
    const theme = isDark ? themes/* darkTheme */.$_ : themes/* lightTheme */.Wb;
    return(/*#__PURE__*/ jsx_runtime_.jsx(ThemeContext.Provider, {
        value: theme,
        children: children
    }));
};

;// CONCATENATED MODULE: ./abis/BallotsFactory.json
const BallotsFactory_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"address","name":"ballotAddress","type":"address"}],"name":"BallotCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ballots","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ballotsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string[]","name":"_firstVoteParams","type":"string[]"},{"internalType":"uint256","name":"_firstVoteEnd","type":"uint256"}],"name":"createBallot","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mpManager","type":"address"},{"internalType":"address","name":"_collection","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"moonpageCollection","outputs":[{"internalType":"contract IMoonpageCollection","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageManager","outputs":[{"internalType":"contract IMoonpageManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mpManager","type":"address"},{"internalType":"address","name":"_collection","type":"address"}],"name":"setContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
;// CONCATENATED MODULE: ./hooks/useBallotsFactoryContract.ts




const useBallotsFactoryContract = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'DEV' ? constants/* MOONPAGE_BALLOTS_FACTORY_ADDRESS_DEV */.PB : constants/* MOONPAGE_BALLOTS_FACTORY_ADDRESS */.Om;
    const BallotsFactory = (0,useContract/* default */.Z)({
        address,
        abi: BallotsFactory_namespaceObject
    });
    const BallotsFactoryContract = (0,external_react_.useMemo)(()=>BallotsFactory
    , [
        BallotsFactory
    ]);
    return BallotsFactoryContract;
};
/* harmony default export */ const hooks_useBallotsFactoryContract = (useBallotsFactoryContract);

;// CONCATENATED MODULE: ./providers/ballots-factory-provider/ballots-factory-provider.tsx







const GET_RECENT_VOTINGS = client_.gql`
  query recentVotes {
    votings(orderBy: voteStarted, orderDirection: desc, first: 3) {
      id
      proposal
      option1
      option2
      option3
      option1Count
      option2Count
      option3Count
      isVoting
      totalCount
      voteStarted
      voteEnding
      project {
        ballotAddress
        id
        title
      }
    }
  }
`;
const ballots_factory_provider_defaultContext = {
    createBallot: async ()=>undefined
    ,
    createBallotStatus: 'idle',
    fetchBallotAddress: async ()=>null
    ,
    votingsData: null,
    votingsLoading: false,
    refetchVotingsData: async ()=>null
};
const BallotsFactoryContext = /*#__PURE__*/ (0,external_react_.createContext)(ballots_factory_provider_defaultContext);
function BallotsFactoryProvider({ children  }) {
    const ballotsFactory = hooks_useBallotsFactoryContract();
    const { 0: createBallotStatus , 1: setCreateBallotStatus  } = (0,external_react_.useState)();
    const { loading: votingsLoading , data: votingsData , refetch: refetchVotingsData ,  } = (0,client_.useQuery)(GET_RECENT_VOTINGS);
    const createBallot = (0,external_react_.useCallback)(async ({ projectId , proposal , options , endTime , onSuccess , onError  })=>{
        try {
            setCreateBallotStatus('confirming');
            const { maxFeePerGas , maxPriorityFeePerGas  } = await (0,getGasMargin/* getGasMargin */.f)();
            const Tx = await ballotsFactory.createBallot(projectId, [
                proposal,
                ...options
            ], endTime, {
                maxFeePerGas,
                maxPriorityFeePerGas
            });
            const { hash  } = Tx;
            setCreateBallotStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Create Voting Station...'
            }));
            ballotsFactory.provider.once(hash, async (transaction)=>{
                // we need a time, because the graph needs some time
                setTimeout(()=>{
                    setCreateBallotStatus('success');
                    external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!',
                        linkText: "Voting Station was created!"
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 10000);
            });
        } catch (e) {
            setCreateBallotStatus('error');
            external_react_toastify_.toast.error(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Something went wrong!'
            }));
            onError === null || onError === void 0 ? void 0 : onError(e);
        }
    }, [
        ballotsFactory
    ]);
    const fetchBallotAddress = (0,external_react_.useCallback)(async (projectId)=>{
        try {
            const address = await ballotsFactory.ballots(projectId);
            return address;
        } catch (e) {
            return null;
        }
    }, [
        ballotsFactory
    ]);
    const api = (0,external_react_.useMemo)(()=>{
        return {
            createBallot,
            createBallotStatus,
            fetchBallotAddress,
            votingsLoading,
            votingsData: votingsData === null || votingsData === void 0 ? void 0 : votingsData.votings,
            refetchVotingsData
        };
    }, [
        createBallot,
        createBallotStatus,
        fetchBallotAddress,
        refetchVotingsData,
        votingsData,
        votingsLoading, 
    ]);
    return(// @ts-ignore
    /*#__PURE__*/ jsx_runtime_.jsx(BallotsFactoryContext.Provider, {
        value: api,
        children: children
    }));
}

;// CONCATENATED MODULE: ./providers/index.ts










/***/ }),

/***/ 5468:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z3": () => (/* binding */ BG_NORMAL_LIGHTMODE),
/* harmony export */   "VA": () => (/* binding */ MAIN_TEXT_COLOR_LIGHTMODE),
/* harmony export */   "mI": () => (/* binding */ BG_NORMAL_DARKMODE),
/* harmony export */   "jI": () => (/* binding */ MAIN_TEXT_COLOR_DARKMODE),
/* harmony export */   "Wb": () => (/* binding */ lightTheme),
/* harmony export */   "$_": () => (/* binding */ darkTheme),
/* harmony export */   "p6": () => (/* binding */ POP),
/* harmony export */   "s0": () => (/* binding */ DISABLED_WHITE),
/* harmony export */   "Zv": () => (/* binding */ VALID_GREEN),
/* harmony export */   "B": () => (/* binding */ BASE_BORDER_RADIUS),
/* harmony export */   "X": () => (/* binding */ FONT_SERIF_LIGHT),
/* harmony export */   "Bf": () => (/* binding */ FONT_SERIF_REGULAR),
/* harmony export */   "cr": () => (/* binding */ FONT_SERIF_BOLD),
/* harmony export */   "kn": () => (/* binding */ FONT_SERIF_BLACK),
/* harmony export */   "Yd": () => (/* binding */ BaseButton),
/* harmony export */   "KM": () => (/* binding */ PrimaryButton),
/* harmony export */   "Qc": () => (/* binding */ BaseInput),
/* harmony export */   "Fg": () => (/* binding */ StyledLink),
/* harmony export */   "X1": () => (/* binding */ Cross)
/* harmony export */ });
/* unused harmony exports BG_DARK_LIGHTMODE, BG_DARK_DARKMODE, BASE_BOX_SHADOW_LIGHTMODE, INSET_BASE_BOX_SHADOW_LIGHTMODE, BASE_BOX_SHADOW_DARKMODE, INSET_BASE_BOX_SHADOW_DARKMODE, FlatButton, FadeInBaseAnimation */
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const BG_NORMAL_LIGHTMODE = '#cfd5ea';
const BG_DARK_LIGHTMODE = '#B0BADF';
const MAIN_TEXT_COLOR_LIGHTMODE = '#364165';
const BG_NORMAL_DARKMODE = '#1B1E28';
const BG_DARK_DARKMODE = '#161820';
const MAIN_TEXT_COLOR_DARKMODE = '#FFF';
const BASE_BOX_SHADOW_LIGHTMODE = `
5px 5px 16px #b4b9cc,
-5px -5px 16px #eaf1ff;
`;
const INSET_BASE_BOX_SHADOW_LIGHTMODE = `
  inset 5px 5px 16px #b4b9cc,
  inset -5px -5px 16px #eaf1ff;
`;
const BASE_BOX_SHADOW_DARKMODE = `
  5px 5px 16px rgba(125,125,125,0.1),
  -5px -5px 16px rgba(0,0,0,0.7);
`;
const INSET_BASE_BOX_SHADOW_DARKMODE = `
  inset 5px 5px 16px rgba(12, 125, 125, 0.1),
  inset -5px -5px 16px rgba(0, 0, 0, 0.7);
`;
const lightTheme = {
    BG_NORMAL: '#cfd5ea',
    BG_DARK: '#B0BADF',
    MAIN_TEXT_COLOR: '#364165',
    BASE_BOX_SHADOW: `
    5px 5px 16px #b4b9cc,
    -5px -5px 16px #eaf1ff;
  `,
    INSET_BASE_BOX_SHADOW: `
    inset 5px 5px 16px #b4b9cc,
    inset -5px -5px 16px #eaf1ff;
  `
};
const darkTheme = {
    BG_NORMAL: '#1B1E28',
    BG_DARK: '#161820',
    MAIN_TEXT_COLOR: '#FFF',
    BASE_BOX_SHADOW: `
    5px 5px 16px rgba(125,125,125,0.1),
    -5px -5px 16px rgba(0,0,0,0.7);
  `,
    INSET_BASE_BOX_SHADOW: `
    inset 5px 5px 16px rgba(12, 125, 125, 0.1),
    inset -5px -5px 16px rgba(0, 0, 0, 0.7);
  `
};
const POP = '#ff6f00';
const DISABLED_WHITE = '#808080';
const VALID_GREEN = '#19bdb4';
const BASE_BORDER_RADIUS = '.5rem';
const FONT_SERIF_LIGHT = `
  'Merriweather Light', sans-serif;
`;
const FONT_SERIF_REGULAR = `
  'Merriweather', sans-serif;
`;
const FONT_SERIF_BOLD = `
  'Merriweather Bold', sans-serif;
`;
const FONT_SERIF_BLACK = `
  'Merriweather Black', sans-serif;
`;
const BaseButton = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().button)`
  font-family: ${FONT_SERIF_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  padding: 1rem;

  @media (prefers-color-scheme: dark) {
    background-color: ${BG_NORMAL_DARKMODE};
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    box-shadow: ${BASE_BOX_SHADOW_DARKMODE};

    :active {
      box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
    }

    :disabled {
      box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
      pointer-events: none;
    }
  }

  @media (prefers-color-scheme: light) {
    background-color: ${BG_NORMAL_LIGHTMODE};
    color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    box-shadow: ${BASE_BOX_SHADOW_LIGHTMODE};

    :active {
      box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
    }

    :disabled {
      box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
      pointer-events: none;
    }
  }

  :hover {
    cursor: pointer;
  }
`;
const FlatButton = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().button)`
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  font-family: ${FONT_SERIF_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  padding: 10px;
  margin: 5px;

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    color: grey;
    pointer-events: none;
  }
`;
const PrimaryButton = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().button)`
  background-color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  color: ${BG_NORMAL_LIGHTMODE};
  border-radius: ${BASE_BORDER_RADIUS};

  @media (prefers-color-scheme: dark) {
    color: ${BG_NORMAL_DARKMODE};
    background-color: ${MAIN_TEXT_COLOR_DARKMODE};
  }

  :disabled {
    pointer-events: none;
  }

  :hover {
    cursor: pointer;
  }
`;
const BaseInput = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().input)`
  font-family: ${FONT_SERIF_BOLD};
  font-size: 16px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
  padding: 1rem;
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  background-color: ${BG_NORMAL_LIGHTMODE};
  outline: none;
  -webkit-appearance: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    background-color: ${BG_NORMAL_DARKMODE};
    box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
  }
`;
const StyledLink = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().a)`
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
  }
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

  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
  @media (prefers-color-scheme: light) {
    :before,
    :after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 20px;
      width: 2px;
      background-color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    }
  }

  @media (prefers-color-scheme: dark) {
    :before,
    :after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 20px;
      width: 2px;
      background-color: ${MAIN_TEXT_COLOR_DARKMODE};
    }
  }
`;
const FadeInBaseAnimation = (/* unused pure expression or super */ null && (`
  animation: fadein 2s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`));


/***/ }),

/***/ 9172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ getGasMargin)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


// add 15%
// export const getGasMargin = (value?: any) => {
//   return value
//     .mul(BigNumber.from(10000).add(BigNumber.from(1500)))
//     .div(BigNumber.from(10000));
// };
const getGasMargin = async ()=>{
    // get max fees from gas station
    let maxFeePerGas = ethers__WEBPACK_IMPORTED_MODULE_0__.BigNumber.from(40000000000); // fallback to 40 gwei
    let maxPriorityFeePerGas = ethers__WEBPACK_IMPORTED_MODULE_0__.BigNumber.from(40000000000); // fallback to 40 gwei
    const isDev = process.env.NX_PUBLIC_ENVIRONMENT === 'DEV';
    try {
        const { data  } = await axios__WEBPACK_IMPORTED_MODULE_1___default()({
            method: 'get',
            url: isDev ? 'https://gasstation-mumbai.matic.today/v2' : 'https://gasstation-mainnet.matic.network/v2'
        });
        maxFeePerGas = ethers__WEBPACK_IMPORTED_MODULE_0__.utils.parseUnits(Math.ceil(data.fast.maxFee) + '', 'gwei');
        maxPriorityFeePerGas = ethers__WEBPACK_IMPORTED_MODULE_0__.utils.parseUnits(Math.ceil(data.fast.maxPriorityFee) + '', 'gwei');
        return {
            maxFeePerGas,
            maxPriorityFeePerGas
        };
    } catch  {
        return {
            maxFeePerGas,
            maxPriorityFeePerGas
        };
    }
};


/***/ }),

/***/ 9871:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ isDev)
/* harmony export */ });
const isDev = ()=>process.env.NX_PUBLIC_ENVIRONMENT === 'DEV'
;


/***/ })

};
;