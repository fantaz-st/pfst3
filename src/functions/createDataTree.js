const createDataTree = (dataset) => {
  const hashTable = Object.create(null);
  dataset.forEach((aData) => (hashTable[aData.databaseId] = { ...aData, childNodes: [] }));
  const dataTree = [];
  dataset.forEach((aData) => {
    if (aData.parentDatabaseId) hashTable[aData.parentDatabaseId].childNodes.push(hashTable[aData.databaseId]);
    else dataTree.push(hashTable[aData.databaseId]);
  });
  // console.log(dataTree);
  return dataTree;
};

export default createDataTree;
