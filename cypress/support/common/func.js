// Class from common functions
class CommonFuncs {
    // Create a unique name with given prefix
    static createUniqueName(prefix) {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    }
}

export default CommonFuncs;