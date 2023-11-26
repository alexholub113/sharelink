export const formatTagName = (name: string) => {
    const words = name.split(' ');
    return words.map((word) => {
        if (word.length < 4) {
            return word.toUpperCase();
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};