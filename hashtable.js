module.exports = (function(){
    let hashTable = {};
    class HashTable {
        constructor(tableLength){
            this.table = new Array(tableLength)
            this.tableLength = tableLength;
            this.populateHashTableWithArrayOfKeys = populateHashTableWithArrayOfKeys;
            this.searchTableWithLinearProbing = searchTableWithLinearProbing;
        }
    }

    let hashFunction = function(key, tableLength){
        return key % tableLength;
    }

    hashTable.createHashTable = function(sizeOfTable) {
        let hashTable;
        if(isNaN(sizeOfTable))
            throw "The table size must be a number.";

        hashTable = new HashTable(sizeOfTable);

        return hashTable;
    }

    let populateHashTableWithArrayOfKeys = function(arrayOfKeys){
        let table = this;
        if(!(arrayOfKeys instanceof Array))
            throw "Must populate the hash table with an array.";

        if(arrayOfKeys.length > table.tableLength)
            throw "The array of keys must match the table size.";

        for(let i = 0; i < arrayOfKeys.length; i++) {
            addKeyWithLinearProbing(table, arrayOfKeys[i]);
        }
    }

    let addKeyWithLinearProbing = function(table, key){
        let index = hashFunction(key, table.tableLength)
        if(table.table[index] === undefined) {
            table.table[index] = key;
        } else {
            while(table.table[index] !== undefined) {
                index++;
                index = index % table.tableLength;
            }
            table.table[index] = key;
        }
    }

    let searchTableWithLinearProbing = function (key) {
        let HashTable = this, numOfIndexesSearched = 0;
        if(isNaN(key))
            throw "The key must be an integer.";

        let index = hashFunction(key, HashTable.tableLength);
        if(HashTable.table[index] === key)
            return true;

        while(numOfIndexesSearched !== HashTable.tableLength && HashTable.table[index] !== key) {
            index = index++ % table.tableLength;
            numOfIndexesSearched++;
        }
        return false;
    }

    return hashTable;
});