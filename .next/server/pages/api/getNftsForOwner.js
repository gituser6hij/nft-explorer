"use strict";
(() => {
var exports = {};
exports.id = 928;
exports.ids = [928];
exports.modules = {

/***/ 366:
/***/ ((module) => {

module.exports = require("alchemy-sdk");

/***/ }),

/***/ 557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var alchemy_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(366);
/* harmony import */ var alchemy_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alchemy_sdk__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
    const { address , pageSize , chain , excludeFilter , pageKey  } = JSON.parse(req.body);
    if (req.method !== "POST") {
        res.status(405).send({
            message: "Only POST requests allowed"
        });
        return;
    }
    const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: alchemy_sdk__WEBPACK_IMPORTED_MODULE_0__.Network[chain]
    };
    const alchemy = new alchemy_sdk__WEBPACK_IMPORTED_MODULE_0__.Alchemy(settings);
    try {
        const nfts = await alchemy.nft.getNftsForOwner(address, {
            pageSize: pageSize ? pageSize : 100,
            excludeFilters: excludeFilter && [
                alchemy_sdk__WEBPACK_IMPORTED_MODULE_0__.NftFilters.SPAM
            ],
            pageKey: pageKey ? pageKey : ""
        });
        const formattedNfts = nfts.ownedNfts.map((nft)=>{
            const { contract , title , tokenType , tokenId , description , media  } = nft;
            console.log(nft.media);
            return {
                contract: contract.address,
                symbol: contract.symbol,
                collectionName: contract.openSea?.collectionName,
                media: media[0]?.gateway ? media[0]?.gateway : "https://via.placeholder.com/500",
                verified: contract.openSea?.safelistRequestStatus,
                tokenType,
                tokenId,
                title,
                description,
                format: media[0]?.format ? media[0]?.format : "png"
            };
        });
        if (excludeFilter) {
            const filteredNfts = formattedNfts.filter((nft)=>nft.title.length && nft.description.length && nft.media);
            if (filteredNfts) {
                res.status(200).json({
                    nfts: filteredNfts.length ? filteredNfts : null,
                    pageKey: nfts.pageKey
                });
            }
        } else {
            res.status(200).json({
                nfts: formattedNfts.length ? formattedNfts : null,
                pageKey: nfts.pageKey
            });
        }
    } catch (e) {
        console.warn(e);
        res.status(500).send({
            message: "something went wrong, check the log in your terminal"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(557));
module.exports = __webpack_exports__;

})();