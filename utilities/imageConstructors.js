export const viewImage = (key) => {
    return `https://drive.google.com/uc?export=view&id=${key}`;
};

export const thumbnailImage = (key) => {
    return `https://drive.google.com/thumbnail?id=${key}`;
};

export const extractKeyFromUrl = (url) => {
    let key = url.split("id=")[1]; // Split into key-value pairs
    return key;
};
