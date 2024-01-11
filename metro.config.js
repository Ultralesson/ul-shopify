const blackList = require("metro-config/src/defaults/exclusionList");

module.exports = {
    resolver: {
        blacklistRE: blackList([/videos\/.*/]),
    },
};
