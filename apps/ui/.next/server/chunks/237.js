"use strict";
exports.id = 237;
exports.ids = [237];
exports.modules = {

/***/ 2391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C5": () => (/* binding */ MOONPAGE_FACTORY_ADDRESS_DEV),
/* harmony export */   "$g": () => (/* binding */ MOONPAGE_MANAGER_ADDRESS_DEV),
/* harmony export */   "_j": () => (/* binding */ AUCTIONS_MANAGER_ADDRESS_DEV),
/* harmony export */   "R1": () => (/* binding */ MOONPAGE_COLLECTION_ADDRESS_DEV),
/* harmony export */   "SA": () => (/* binding */ MOONPAGE_FACTORY_ADDRESS),
/* harmony export */   "op": () => (/* binding */ MOONPAGE_MANAGER_ADDRESS),
/* harmony export */   "A1": () => (/* binding */ AUCTIONS_MANAGER_ADDRESS),
/* harmony export */   "BI": () => (/* binding */ MOONPAGE_COLLECTION_ADDRESS),
/* harmony export */   "b_": () => (/* binding */ MOONPAGE_DEV_ADDRESS)
/* harmony export */ });
/* unused harmony exports MOONPAGE_ROYALTIES_RECEIVER_ADDRESS, NULL_ADDRESS */
const MOONPAGE_FACTORY_ADDRESS_DEV =
  '0x791A890ca01B6ff3e62007AAf143a65d390a71d8';
const MOONPAGE_MANAGER_ADDRESS_DEV =
  '0x0ffab0dE416A0ED309dF1E492a9D6aF8EDE2b9cD';
const AUCTIONS_MANAGER_ADDRESS_DEV =
  '0x40b971d1F63831777FB6850D6802931446DcCf8a';
const MOONPAGE_COLLECTION_ADDRESS_DEV =
  '0xc0702467e7f4160AD747cA59E80DFC9FedA87D1b';

const MOONPAGE_FACTORY_ADDRESS =
  '0x9005462EE777cb934Da349d56f542847629098bA';
const MOONPAGE_MANAGER_ADDRESS =
  '0xb506F8587cdb61CE205FA88BdCCcfBd90c588A6e';
const AUCTIONS_MANAGER_ADDRESS =
  '0xA6AcA4DB9853234b5CAa0005549642D113443803';
const MOONPAGE_COLLECTION_ADDRESS =
  '0x0eC473B1BD821D386cd7209203Ba6826Fd653B96';

const MOONPAGE_DEV_ADDRESS =
  '0xb849DE17AB1d9D6d96c5146b4C1d19a953135A0B';
const MOONPAGE_ROYALTIES_RECEIVER_ADDRESS =
  '0x0afF32d090190b254D3eC5Aa4487db2C98c17a23';
const NULL_ADDRESS = '0x0';


/***/ }),

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
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);




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
  box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BOX_SHADOW */ .S0};
  animation: animate 3s linear infinite;
  animation-delay: calc(0.5s * ${(p)=>p.index
});

  @keyframes animate {
    0% {
      box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .INSET_BASE_BOX_SHADOW */ .ux};
    }
    100% {
      box-shadow: ${_themes__WEBPACK_IMPORTED_MODULE_3__/* .BASE_BOX_SHADOW */ .S0};
    }
  }
`;
const Loading = ({ height , dotHeight =40 , short =false  })=>{
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Root, {
        height: height,
        dotHeight: dotHeight,
        children: [
            !short && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Dot, {
                index: 0,
                dotHeight: dotHeight
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Dot, {
                index: 1,
                dotHeight: dotHeight
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Dot, {
                index: 2,
                dotHeight: dotHeight
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);


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
;// CONCATENATED MODULE: ./components/WalletIndicator.tsx






const Root = (external_styled_components_default()).div`
  display: flex;
  justify-content: space-evenly;
  max-width: 320px;
  font-family: ${themes/* INTER_BOLD */.UY};
`;
const ConnectionModalOpener = external_styled_components_default()(themes/* PrimaryButton */.KM)`
  font-family: ${themes/* INTER_BOLD */.UY};
  padding: 1rem;

  @media (max-width: 900px) {
    padding: 0.5rem;
    margin-inline-end: 1rem;
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
const WalletIndicator = ({ address , chain: chain1 , handleClick , showLoading =false  })=>{
    const getNetwork = (chain)=>{
        if (chain) {
            if (connectors/* supportedChainIds.includes */.KC.includes(chain)) {
                var ref;
                return(/*#__PURE__*/ jsx_runtime_.jsx(Item, {
                    children: (ref = connectors/* supportedChainMapping */.H[chain]) === null || ref === void 0 ? void 0 : ref.name
                }));
            } else {
                return(/*#__PURE__*/ jsx_runtime_.jsx(Item, {
                    children: 'False Network'
                }));
            }
        } else {
            return(/*#__PURE__*/ jsx_runtime_.jsx(ConnectionModalOpener, {
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
                })
            ]
        })
    }));
};
/* harmony default export */ const components_WalletIndicator = (WalletIndicator);


/***/ }),

/***/ 5680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vl": () => (/* binding */ RPC_URLS),
/* harmony export */   "KC": () => (/* binding */ supportedChainIds),
/* harmony export */   "Lj": () => (/* binding */ injected),
/* harmony export */   "Lw": () => (/* binding */ walletconnect),
/* harmony export */   "H": () => (/* binding */ supportedChainMapping)
/* harmony export */ });
/* harmony import */ var _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6590);
/* harmony import */ var _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9795);
/* harmony import */ var _web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_isProd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3968);



const RPC_URLS = {
    137: process.env.NEXT_PUBLIC_RPC_URL_POLYGON_MAINNET_INFURA,
    80001: process.env.NEXT_PUBLIC_RPC_URL_POLYGON_MUMBAI_INFURA
};
const supportedChainIds = (0,_utils_isProd__WEBPACK_IMPORTED_MODULE_2__/* .isProd */ .B)() ? [
    137
] : [
    80001
];
const injected = new _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_0__.InjectedConnector({
    supportedChainIds
});
const rpc = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV' ? {
    80001: RPC_URLS[80001]
} : {
    137: RPC_URLS[137]
};
const walletconnect = new _web3_react_walletconnect_connector__WEBPACK_IMPORTED_MODULE_1__.WalletConnectConnector({
    rpc,
    qrcode: true,
    bridge: 'https://bridge.walletconnect.org/',
    chainId: 1
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
    'Lyrics',
    'Nonction',
    'Paper',
    'Poetry',
    'Proposal',
    'Recipe',
    'Romance',
    'Screenplay',
    'Short story', 
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
// EXTERNAL MODULE: ./providers/index.ts + 17 modules
var providers = __webpack_require__(381);
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
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD' ? constants/* AUCTIONS_MANAGER_ADDRESS */.A1 : constants/* AUCTIONS_MANAGER_ADDRESS_DEV */._j;
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




const RPC_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV' ? _connectors__WEBPACK_IMPORTED_MODULE_3__/* .RPC_URLS[137] */ .vl[137] : _connectors__WEBPACK_IMPORTED_MODULE_3__/* .RPC_URLS[80001] */ .vl[80001];
const useContract = ({ address , abi  })=>{
    const { account , library  } = (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_1__.useWeb3React)();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
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

/***/ 381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Q5": () => (/* reexport */ AuctionsContext),
  "W$": () => (/* reexport */ AuctionsProvider),
  "WH": () => (/* reexport */ CollectionContext),
  "YQ": () => (/* reexport */ CollectionProvider),
  "jW": () => (/* reexport */ FactoryContext),
  "LI": () => (/* reexport */ FactoryProvider),
  "tl": () => (/* reexport */ ManagerContext),
  "eC": () => (/* reexport */ ManagerProvider),
  "v5": () => (/* reexport */ ProjectsContext),
  "V3": () => (/* reexport */ ProjectsProvider),
  "St": () => (/* reexport */ UserContext),
  "dr": () => (/* reexport */ UserProvider)
});

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
    projects(orderBy: createdAt, orderDirection: desc) {
      auctionsEnded
      auctionsStarted
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
    projects(first: 3, orderBy: mintCount, orderDirection: desc) {
      auctionsEnded
      auctionsStarted
      createdAt
      creator
      editions {
        id
      }
      genre
      id
      imgIpfsHash
      isCurated
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
;// CONCATENATED MODULE: ./abis/MoonpageCollection.json
const MoonpageCollection_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"edition","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"auctionsManager","outputs":[{"internalType":"contract IAuctionsManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintableCreator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageDev","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageManager","outputs":[{"internalType":"contract IMoonpageManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mpManager","type":"address"},{"internalType":"address","name":"_aManager","type":"address"},{"internalType":"address","name":"_mpDev","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxAmount","type":"uint256"}],"name":"setMaxMintableCreator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fraction","type":"uint256"},{"internalType":"uint256","name":"_bips","type":"uint256"}],"name":"setRoyaltyParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_amountForCreator","type":"uint256"},{"internalType":"uint256","name":"_discountRate","type":"uint256"}],"name":"startAuctions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');
// EXTERNAL MODULE: ../constants.ts
var constants = __webpack_require__(2391);
// EXTERNAL MODULE: ./hooks/useContract.ts
var useContract = __webpack_require__(9214);
;// CONCATENATED MODULE: ./hooks/useMoonpageCollection.ts




const useMoonpageCollection = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD' ? constants/* MOONPAGE_COLLECTION_ADDRESS */.BI : constants/* MOONPAGE_COLLECTION_ADDRESS_DEV */.R1;
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
;// CONCATENATED MODULE: ./providers/user-provider/useGetAllNftsOfAccount.ts




// make this hook accept address parameter ?-> could be used in the future for "profile page"
const useGetAllNftsOfAccount = ()=>{
    const { account  } = (0,core_.useWeb3React)();
    const collection = hooks_useMoonpageCollection();
    const { allProjects , areAllProjectsLoading , allProjectsFetchError  } = (0,projects/* useProjects */.Z)();
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
    const getEditionAndIdOfToken = (0,external_react_.useCallback)((tokenId, projects)=>{
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
        try {
            setIsLoading(true);
            const fetchedBalanceBig = await collection.balanceOf(account);
            const fetchedBalance = Number(fetchedBalanceBig);
            const tokens = [];
            // todo: make a multicall instead
            for(let i = 0; i < fetchedBalance; i++){
                const nftIdBig = await collection.tokenOfOwnerByIndex(account, i);
                const nftId = Number(nftIdBig);
                tokens.push(nftId);
            }
            setBalance(fetchedBalance);
            setNfts(tokens);
            setIsLoading(false);
            const nftsWithIdAndEdition = tokens.map((token)=>getEditionAndIdOfToken(token, allProjects)
            );
            const groupByProjectId = nftsWithIdAndEdition.reduce((group, product)=>{
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
            setDetailedNfts(nftsWithIdAndEdition);
            setGroupedNfts(groupedInArray);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.log({
                e
            });
        }
    }, [
        account,
        allProjects,
        collection,
        getEditionAndIdOfToken
    ]);
    (0,external_react_.useEffect)(()=>{
        if (account && !areAllProjectsLoading && !allProjectsFetchError) {
            fetchBalance();
        }
    }, [
        account,
        allProjectsFetchError,
        areAllProjectsLoading,
        fetchBalance
    ]);
    return (0,external_react_.useMemo)(()=>({
            balance,
            nfts,
            isLoading: loading,
            detailedNfts,
            groupedNfts
        })
    , [
        balance,
        nfts,
        loading,
        detailedNfts,
        groupedNfts
    ]);
};
/* harmony default export */ const user_provider_useGetAllNftsOfAccount = (useGetAllNftsOfAccount); // const provider = new JsonRpcProvider(RPC_URLS[80001], 80001);
 // const multicall = new Multicall({
 //   ethersProvider: provider,
 //   tryAggregate: false,
 // });
 //   // multicall
 //   const addressLow = address.toLowerCase();
 //   const multicallContext = {
 //     reference: 'PROJECT_DETAILS',
 //     contractAddress: addressLow,
 //     abi: PROJECT_ABI,
 //     calls: [
 //       {
 //         reference: 'project',
 //         methodName: 'project',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'currentEdition',
 //         methodName: 'currentEdition',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'expiresAt',
 //         methodName: 'expiresAt',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'totalSupplyGenEd',
 //         methodName: 'totalSupply',
 //         methodParameters: [1],
 //       },
 //       {
 //         reference: 'mintPrice',
 //         // it should be getPrice
 //         methodName: 'INITIAL_MINT_PRICE',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'currentEditionMintPrice',
 //         methodName: 'currentEditionMintPrice',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'currentEditionMax',
 //         methodName: 'currentEditionMax',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'auctionsStarted',
 //         methodName: 'auctionStarted',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'auctionsEnded',
 //         methodName: 'auctionPhaseFinished',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'paused',
 //         methodName: 'paused',
 //         methodParameters: [],
 //       },
 //       {
 //         reference: 'factory',
 //         methodName: 'factory',
 //         methodParameters: [],
 //       },
 //     ],
 //   };

;// CONCATENATED MODULE: ./providers/user-provider/user-provider.tsx



const user_provider_defaultContext = {
    balance: 0,
    nfts: null,
    isLoading: false,
    groupedNfts: [],
    detailedNfts: []
};
const UserContext = /*#__PURE__*/ (0,external_react_.createContext)(user_provider_defaultContext);
const UserProvider = ({ children  })=>{
    const { balance , nfts , isLoading , detailedNfts , groupedNfts  } = user_provider_useGetAllNftsOfAccount();
    const api = (0,external_react_.useMemo)(()=>({
            balance,
            nfts,
            isLoading,
            detailedNfts,
            groupedNfts
        })
    , [
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

;// CONCATENATED MODULE: ./abis/MoonpageManager.json
const MoonpageManager_namespaceObject = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"AnimationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BalanceDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BalanceIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"frozen","type":"bool"}],"name":"BaseDataFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"BlurbUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"imgHash","type":"string"},{"indexed":false,"internalType":"string","name":"animationHash","type":"string"},{"indexed":false,"internalType":"string","name":"blurbHash","type":"string"},{"indexed":false,"internalType":"string","name":"newGenre","type":"string"},{"indexed":false,"internalType":"string","name":"newSubtitle","type":"string"}],"name":"Configured","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"},{"indexed":false,"internalType":"string","name":"role","type":"string"}],"name":"ContributorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isCurated","type":"bool"}],"name":"Curated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"ImageUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"editionId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endId","type":"uint256"}],"name":"NextEditionEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PremintedByAuthor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"address","name":"royaltiesSplitter","type":"address"},{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"title","type":"string"},{"indexed":false,"internalType":"string","name":"textIpfsHash","type":"string"},{"indexed":false,"internalType":"string","name":"originalLanguage","type":"string"},{"indexed":false,"internalType":"uint256","name":"initialMintPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"firstEditionAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"currentEdLastId","type":"uint256"}],"name":"ProjectCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"ProjectPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"TextUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenIdIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIpfsHash","type":"string"}],"name":"TranslationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"address[]","name":"_contributors","type":"address[]"},{"internalType":"uint256[]","name":"_shares","type":"uint256[]"},{"internalType":"string[]","name":"_roles","type":"string[]"}],"name":"addContributors","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"authorShares","outputs":[{"internalType":"uint256","name":"share","type":"uint256"},{"internalType":"uint256","name":"shareInMatic","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"baseDatas","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"subtitle","type":"string"},{"internalType":"string","name":"genre","type":"string"},{"internalType":"address","name":"creatorAddress","type":"address"},{"internalType":"address","name":"royaltiesSplitter","type":"address"},{"internalType":"string","name":"textIpfsHash","type":"string"},{"internalType":"string","name":"imgIpfsHash","type":"string"},{"internalType":"string","name":"animationIpfsHash","type":"string"},{"internalType":"string","name":"blurbIpfsHash","type":"string"},{"internalType":"string","name":"originalLanguage","type":"string"},{"internalType":"uint256","name":"premintedByCreator","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collection","outputs":[{"internalType":"contract IMoonpageCollection","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_imgHash","type":"string"},{"internalType":"string","name":"_animationHash","type":"string"},{"internalType":"string","name":"_blurbHash","type":"string"},{"internalType":"string","name":"_genre","type":"string"},{"internalType":"string","name":"_subtitle","type":"string"}],"name":"configureProjectDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"contributions","outputs":[{"internalType":"address","name":"shareRecipient","type":"address"},{"internalType":"string","name":"role","type":"string"},{"internalType":"uint256","name":"share","type":"uint256"},{"internalType":"uint256","name":"shareInMatic","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"contributionsIndeces","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"curatedProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"distributeShares","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"editionOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"editionRanges","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"editions","outputs":[{"internalType":"uint256","name":"current","type":"uint256"},{"internalType":"uint256","name":"mintPrice","type":"uint256"},{"internalType":"uint256","name":"startTokenId","type":"uint256"},{"internalType":"uint256","name":"currentTokenId","type":"uint256"},{"internalType":"uint256","name":"lastGenEdTokenId","type":"uint256"},{"internalType":"uint256","name":"currentEdLastTokenId","type":"uint256"},{"internalType":"uint256","name":"endTokenId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_newEdAmount","type":"uint256"},{"internalType":"uint256","name":"_newEdMintPrice","type":"uint256"}],"name":"enableNextEdition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"existingProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"frozenProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"increaseBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"increaseCurrentTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAmountEdition","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moonpageDev","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pausedProjectIds","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"projectBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"projectIdOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"projectsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readAuthorShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readBaseData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"readContribution","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readContributionIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"readEditionData","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_collection","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_mpDev","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"setIsBaseDataFrozen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setIsCurated","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setIsPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPrice","type":"uint256"}],"name":"setMinPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"uint256","name":"_premintedByCreator","type":"uint256"}],"name":"setPremintedByCreator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_caller","type":"address"},{"internalType":"address","name":"_royaltiesSplitter","type":"address"},{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_textCID","type":"string"},{"internalType":"string","name":"_originalLanguage","type":"string"},{"internalType":"uint256","name":"_initialMintPrice","type":"uint256"},{"internalType":"uint256","name":"_firstEditionAmount","type":"uint256"}],"name":"setupProject","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"translationIpfsHashes","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateAnimationIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateBlurbIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateImgIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateTextIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"internalType":"string","name":"_ipfsHash","type":"string"}],"name":"updateTranslationIpfsHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]');
;// CONCATENATED MODULE: ./hooks/useMoonpageManager.ts




const useMoonpageManager = ()=>{
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD' ? constants/* MOONPAGE_MANAGER_ADDRESS */.op : constants/* MOONPAGE_MANAGER_ADDRESS_DEV */.$g;
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

// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./utils/isProd.ts
var isProd = __webpack_require__(3968);
;// CONCATENATED MODULE: ./components/ToastLink.tsx




const Link = (external_styled_components_default()).a`
  color: #232630;
  text-decoration: none;
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
                href: `https://${!(0,isProd/* isProd */.B)() && 'testnets.'}opensea.io/account`,
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

;// CONCATENATED MODULE: ./providers/manager-provider/manager-provider.tsx








const manager_provider_defaultContext = {
    configureProject: async ()=>undefined
    ,
    configureStatus: 'idle',
    setContributors: async ()=>undefined
    ,
    setContributorsStatus: 'idle',
    enableNextEdition: async ()=>undefined
    ,
    enableNextEditionStatus: 'idle',
    updateTranslation: async ()=>undefined
    ,
    updateTranslationStatus: 'idle'
};
const ManagerContext = /*#__PURE__*/ (0,external_react_.createContext)(manager_provider_defaultContext);
function ManagerProvider({ children  }) {
    const mpManager = hooks_useMoonpageManager();
    const { 0: configureStatus , 1: setConfigureStatus  } = (0,external_react_.useState)();
    const { 0: setContributorsStatus , 1: setSetContributorsStatus  } = (0,external_react_.useState)();
    const { 0: updateTranslationStatus , 1: setUpdateTranslationStatus  } = (0,external_react_.useState)();
    const { 0: enableNextEditionStatus , 1: setEnableNextEditionStatus  } = (0,external_react_.useState)();
    const configureProject = (0,external_react_.useCallback)(async ({ projectId , imgHash , animationHash , blurbHash , genre , subtitle , onError , onSuccess , refetchWithTimeout =false  })=>{
        try {
            setConfigureStatus('confirming');
            imgHash = imgHash.length ? imgHash : constants_0/* DEFAULT_COVER_IMAGE_IPFS_HASH */.pq;
            const Tx = await mpManager.configureProjectDetails(projectId, imgHash, animationHash, blurbHash, genre, subtitle);
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
                try {
                    await utils_pinToPinata(imgHash, projectId, 'image');
                    await utils_pinToPinata(blurbHash, projectId, 'blurb');
                } catch (e) {
                // do nothing
                }
                // we need a timeout, because the graph needs some time
                if (refetchWithTimeout) {
                    setTimeout(()=>{
                        handleSuccess();
                    }, 10000);
                } else {
                    handleSuccess();
                }
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
    const setContributors = (0,external_react_.useCallback)(async ({ projectId , contributorsList , onError , onSuccess , refetchWithTimeout =false  })=>{
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
            const Tx = await mpManager.addContributors(projectId, addressesArray, sharesArray, rolesArray);
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
                // we need a timeout, because the graph needs some time
                if (refetchWithTimeout) {
                    setTimeout(()=>{
                        handleSuccess();
                    }, 10000);
                } else {
                    handleSuccess();
                }
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
    const updateTranslation = (0,external_react_.useCallback)(async ({ projectId , translationIpfsHash , onError , onSuccess , refetchWithTimeout =false  })=>{
        try {
            setUpdateTranslationStatus('confirming');
            const Tx = await mpManager.updateTranslationIpfsHash(projectId, translationIpfsHash);
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
                try {
                    await utils_pinToPinata(translationIpfsHash, projectId, 'translation');
                } catch (e) {
                // do nothing
                }
                if (refetchWithTimeout) {
                    // we need a timeout, because the graph needs some time
                    setTimeout(()=>{
                        handleSuccess();
                    }, 10000);
                } else {
                    handleSuccess();
                }
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
    const enableNextEdition = (0,external_react_.useCallback)(async ({ projectId , price , amount , onError , onSuccess  })=>{
        try {
            setEnableNextEditionStatus('confirming');
            const formattedPrice = external_ethers_.BigNumber.from((Number(price) * 1000000000000000000).toString());
            const Tx = await mpManager.enableNextEdition(projectId, amount, formattedPrice);
            const { hash  } = Tx;
            setEnableNextEditionStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Unlocking next edition...'
            }));
            mpManager.provider.once(hash, (transaction)=>{
                // we need a time, because the graph needs some time
                setTimeout(()=>{
                    setEnableNextEditionStatus('success');
                    external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!'
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 10000);
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
    const api = (0,external_react_.useMemo)(()=>({
            configureProject,
            configureStatus,
            setContributors,
            setContributorsStatus,
            enableNextEdition,
            enableNextEditionStatus,
            updateTranslation,
            updateTranslationStatus
        })
    , [
        configureProject,
        configureStatus,
        enableNextEdition,
        enableNextEditionStatus,
        setContributors,
        setContributorsStatus,
        updateTranslation,
        updateTranslationStatus, 
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
            const Tx = await collection.startAuctions(projectId, amountForCreator, discountRate);
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
            const Tx = await collection.buy(projectId, {
                value: currentPrice
            });
            const { hash  } = Tx;
            setBuyStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Minting...',
                linkText: "View your NFT on Opensea"
            }));
            collection.provider.once(hash, (transaction)=>{
                // we need a time, because the graph needs some time
                setTimeout(()=>{
                    setBuyStatus('success');
                    external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!'
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 10000);
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
            const tx = await collection.publicMint(projectId, amount, {
                value: price
            });
            const { hash  } = tx;
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Minting...'
            }));
            collection.provider.once(hash, (transaction)=>{
                // we need a time, because the graph needs some time
                setTimeout(()=>{
                    setMintStatus('success');
                    external_react_toastify_.toast.success(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!',
                        linkText: "View your NFTs on Opensea"
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 13000);
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
            const Tx = await auctionsManager.retriggerAuction(external_ethers_.BigNumber.from(projectId));
            const { hash  } = Tx;
            setRetriggerAuctionStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Retriggering...'
            }));
            auctionsManager.provider.once(hash, (transaction)=>{
                // we need a time, because the graph needs some time
                setTimeout(()=>{
                    setRetriggerAuctionStatus('success');
                    external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                        message: 'Success!'
                    }));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                }, 10000);
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
    const address = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD' ? constants/* MOONPAGE_FACTORY_ADDRESS */.SA : constants/* MOONPAGE_FACTORY_ADDRESS_DEV */.C5;
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
    const createProject = (0,external_react_.useCallback)(async ({ title , textIpfsHash , originalLanguage , initialMintPrice , firstEditionAmount , onSuccess , onError  })=>{
        try {
            setCreateProjectStatus('confirming');
            const Tx = await factory.createProject(title, textIpfsHash, originalLanguage, initialMintPrice, firstEditionAmount);
            const { hash  } = Tx;
            setCreateProjectStatus('waiting');
            external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                message: 'Setting up project...'
            }));
            factory.provider.once(hash, async (transaction)=>{
                var ref;
                const receipt = await Tx.wait();
                const CreationEvent = (ref = receipt.events) === null || ref === void 0 ? void 0 : ref.find((event)=>event.event === 'Created'
                );
                const projectId = Number(CreationEvent.args.projectId).toString();
                try {
                    await utils_pinToPinata(textIpfsHash, projectId, 'text', title);
                } catch (e) {
                // do nothing
                }
                setCreateProjectStatus('success');
                external_react_toastify_.toast.info(/*#__PURE__*/ jsx_runtime_.jsx(components_ToastLink, {
                    message: 'Success!'
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(projectId);
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

;// CONCATENATED MODULE: ./providers/index.ts








/***/ }),

/***/ 3968:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ isProd)
/* harmony export */ });
const isProd = ()=>process.env.NX_PUBLIC_ENVIRONMENT === 'PROD'
;


/***/ })

};
;