const safelyParseJSON = (json: string | null | undefined) => {
    if (!json) {
        return undefined;
    }

    try {
        return JSON.parse(json);
    } catch (e) {
        return undefined;
    }
}

export default safelyParseJSON;