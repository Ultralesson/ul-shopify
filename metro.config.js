import blackList from "metro-config/src/defaults/exclusionList";

export default {
    resolver: {
        blacklistRE: blackList([/videos\/.*/]),
    },
};
