import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x330C0220bB80F187EeBc311e4DAF3becb1549315";

export async function doLogin(){
    if(!window.ethereum) throw new Error("MetaMask não encontrado");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Carteira não encontrada ou autorizada!");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract(){
    if(!window.ethereum) throw new Error("MetaMask não encontrado");

    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });

}

export async function addTweet(text){
    const contract = getContract();
    return contract.methods.addTweet(text).send();
}

export async function changeUsername(newUsername){
    const contract = getContract();
    return contract.methods.changeUsername(newUsername).send();
}

export async function getLastTweets(page){
    const contract = getContract();
    const tweets = await contract.methods.getLastTweets(page).call();
    return tweets.map(t => { return {...t}}).filter(t => t.text !== "");
}