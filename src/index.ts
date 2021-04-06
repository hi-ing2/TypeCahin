// TS interface & class for example
interface Human {
    name: string;
    age: number;
    sex: string;
}

class realHuman{
    name: string;
    age: number;
    sex: string;
    constructor(name: string, age: number, sex: string){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}


const person = {
    name: "soo",
    age: 28,
    sex: "man"
}
const person2 = new realHuman("hee", 30, "woman");


const sayHi = (human: Human): string => {
    return(`Hi! I'm ${human.name}, I am ${human.age}/${human.sex}`)
}


//console.log(sayHi(person2))
//console.log(sayHi(person))



//Making BlockChain~~~ 
import * as CryptoJS from "crypto-js";
import { LanguageServiceMode } from "typescript";


// Defiine class
class Block {
    public index: number;
    public hash: string;
    public preHash: string;
    public data: string;
    public timestamp: number;
    // export a new value of Hash
    static calculateBlockHash = (
        index: number,
        preHash: string,
        data: string,
        timestamp: number
    ): string => CryptoJS.SHA256(index + preHash + data + timestamp).toString(); 
    // does it have vaild Structure for 'Block'?
    static validateStructure = (block: Block): boolean => 
        typeof block.index === "number" &&
        typeof block.hash === "string" &&
        typeof block.preHash === "string" &&
        typeof block.data === "string" &&
        typeof block.timestamp === "number";
    
    constructor(
        index: number,
        hash: string,
        preHash: string,
        data: string,
        timestamp: number,
    ){
        this.index = index;
        this.hash = hash;
        this.preHash = preHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}


//a block for one example
const genesisBlock = new Block(
    0,
    "202020202",
    "",
    "Hello",
    123456
)

let blockchain: Block[] = [genesisBlock];

//get blockchain list(It is equal to 'blockchain')
const getBlockChain = (): Block[] => blockchain;
//get latest block in blockchain 
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
//get new timestamp for using now date
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

//create a new block, adding new this in 'blockchain' 
const createNewBlock = (data: string): Block => {
    const preBlock: Block = getLatestBlock()
    const newIndex: number = preBlock.index + 1;
    const preHash: string = preBlock.hash;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, preHash, data, newTimeStamp);

    const newBlock: Block = new Block(
        newIndex,
        newHash,
        preHash,
        data,
        newTimeStamp
    )
    
    addBlock(newBlock);
    return newBlock;
}

//console.log(createNewBlock("hello"), createNewBlock("Bye"));

//simplfy a work 'exporting a new value of Hash'
const getHashforBlock = (block: Block): string => Block.calculateBlockHash(
    block.index, 
    block.preHash, 
    block.data, 
    block.timestamp)

// is it valid that a new candidate Block?
const isBlockValid = (candidateBlock: Block, preBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)) return false
    else if(preBlock.index +1 !== candidateBlock.index) return false
    else if(preBlock.hash !== candidateBlock.preHash) return false
    else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) return false
    else return true;
}

// add block, if it is'valid'
const addBlock = (candidateBlock: Block) => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock)
    }
}

//test
createNewBlock("hi")
console.log(blockchain);
createNewBlock("bye")
console.log(blockchain);