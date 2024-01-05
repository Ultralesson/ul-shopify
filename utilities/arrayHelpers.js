export const fetchRandomElements = (array, count) => {
    let randomArrayElements = [];

    while (randomArrayElements.length !== count) {
        const randomIndex = Math.floor(Math.random() * array.length);
        if (!randomArrayElements.includes(randomIndex)) randomArrayElements.push(randomIndex);
    }

    randomArrayElements = randomArrayElements.map((randomElement, index) => {
        return (randomArrayElements[index] = array[randomElement]);
    });

    return randomArrayElements;
};
