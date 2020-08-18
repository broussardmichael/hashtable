const hashtable = require("../hashtable");
let hashTableInstantiation = hashtable();
let expect = require('chai').expect


describe("Hash Table Tests", function () {
    describe("Create Table",function () {
        it("#createHashTable", function () {
            let table = hashTableInstantiation.createHashTable(3);
            expect(table.tableLength).equal(3);
        });

        it("#createHashTable invalid parameter", function () {
            try {
                let table = hashTableInstantiation.createHashTable("hi");
            } catch (e) {
                expect(e).to.equal("The table size must be a number.");
            }
        });
    });

    describe("Functions",function () {
        it("#populateHashTableWithArrayOfKeys create the table with an array", function () {
            let HashTable = hashTableInstantiation.createHashTable(3);
            HashTable.populateHashTableWithArrayOfKeys([1, 2, 3]);
            //1 % 3 == 1
            //2 % 3 == 2
            //3 % 3 == 0
            expect(HashTable.table[0]).to.equal(3);
            expect(HashTable.table[1]).to.equal(1);
            expect(HashTable.table[2]).to.equal(2);
        });

        it("#populateHashTableWithArrayOfKeys create the table with an array that involves linear probing", function () {
            let HashTable = hashTableInstantiation.createHashTable(5);
            HashTable.populateHashTableWithArrayOfKeys([1, 2, 6, 4, 7]);
            //1 % 5 == 1 table[1] = 1
            //2 % 5 == 2 table[2] = 2
            //6 % 5 == 1 table[3] = 6
            //4 % 5 == 4 table[4] = 4
            //7 % 5 == 2 table[0] = 7

            expect(HashTable.table[0]).to.equal(7);
            expect(HashTable.table[1]).to.equal(1);
            expect(HashTable.table[2]).to.equal(2);
            expect(HashTable.table[3]).to.equal(6);
            expect(HashTable.table[4]).to.equal(4);
        });

        it("#populateHashTableWithArrayOfKeys throw error if not array of keys", function () {
            let table = hashTableInstantiation.createHashTable(1);
            try {
                table.populateHashTableWithArrayOfKeys(1);
            } catch (e){
                expect(e).to.equal("Must populate the hash table with an array.");
            }
        });

        it("#populateHashTableWithArrayOfKeys throw error if keys do not match the size of the table", function () {
            let table = hashTableInstantiation.createHashTable(1);
            try {
                table.populateHashTableWithArrayOfKeys([1,2,3]);
            } catch (e){
                expect(e).to.equal("The array of keys must match the table size.");
            }
        });

        it("#searchTableWithLinearProbing should find the key value", function () {
            let table = hashTableInstantiation.createHashTable(3);
            table.populateHashTableWithArrayOfKeys([1, 2, 3]);
            let found = table.searchTableWithLinearProbing(2);
            expect(found).to.be.true;
        });

        it("#searchTableWithLinearProbing search for key that doesn't exist", function () {
            let table = hashTableInstantiation.createHashTable(3);
            table.populateHashTableWithArrayOfKeys([1, 2, 3]);
            let found = table.searchTableWithLinearProbing(6);
            expect(found).to.be.false;
        });

        it("#searchTableWithLinearProbing throw error if not integer key", function () {
            let table = hashTableInstantiation.createHashTable(3);
            table.populateHashTableWithArrayOfKeys([1, 2, 3]);
            try {
                table.searchTableWithLinearProbing("bird");
            } catch (e){
                expect(e).to.equal("The key must be an integer.");
            }
        });
    });
})