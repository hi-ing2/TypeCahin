"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class realHuman {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}
const person = {
    name: "soo",
    age: 28,
    sex: "man"
};
const person2 = new realHuman("hee", 30, "woman");
const sayHi = (human) => {
    return (`Hi! I'm ${human.name}, I am ${human.age}/${human.sex}`);
};
//console.log(sayHi(person2))
//console.log(sayHi(person))
//Making BlockChain~~~ 
const CryptoJS = require("crypto-js");
// Defiine class
class Block {
    constructor(index, hash, preHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.preHash = preHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
// export a new value of Hash
Block.calculateBlockHash = (index, preHash, data, timestamp) => CryptoJS.SHA256(index + preHash + data + timestamp).toString();
// does it have vaild Structure for 'Block'?
Block.validateStructure = (block) => typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.preHash === "string" &&
    typeof block.data === "string" &&
    typeof block.timestamp === "number";
//a block for one example
const genesisBlock = new Block(0, "202020202", "", "Hello", 123456);
let blockchain = [genesisBlock];
//get blockchain list(It is equal to 'blockchain')
const getBlockChain = () => blockchain;
//get latest block in blockchain 
const getLatestBlock = () => blockchain[blockchain.length - 1];
//get new timestamp for using now date
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
//create a new block, adding new this in 'blockchain' 
const createNewBlock = (data) => {
    const preBlock = getLatestBlock();
    const newIndex = preBlock.index + 1;
    const preHash = preBlock.hash;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, preHash, data, newTimeStamp);
    const newBlock = new Block(newIndex, newHash, preHash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
//console.log(createNewBlock("hello"), createNewBlock("Bye"));
//simplfy a work 'exporting a new value of Hash'
const getHashforBlock = (block) => Block.calculateBlockHash(block.index, block.preHash, block.data, block.timestamp);
// is it valid that a new candidate Block?
const isBlockValid = (candidateBlock, preBlock) => {
    if (!Block.validateStructure(candidateBlock))
        return false;
    else if (preBlock.index + 1 !== candidateBlock.index)
        return false;
    else if (preBlock.hash !== candidateBlock.preHash)
        return false;
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash)
        return false;
    else
        return true;
};
// add block, if it is'valid'
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
//test
createNewBlock("hi");
console.log(blockchain);
createNewBlock("bye");
console.log(blockchain);
//# sourceMappingURL=index.js.map