const { NodeCache } = require("@cacheable/node-cache");

const localNodeCache = new NodeCache({
    stdTTL: 120,
})

const removeLocalCollection = ({
    collectionKey,
}) => {
    const valuesSaved = localNodeCache.get(collectionKey)
    if (valuesSaved) {
        localNodeCache.del(collectionKey)
    }
}

module.exports = {
    localNodeCache,
    removeLocalCollection,
}