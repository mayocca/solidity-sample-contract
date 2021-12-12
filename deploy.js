require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const HDWalletProvicer = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvicer(
  process.env.PRIVATE_KEY,
  'wss://rinkeby.infura.io/ws/v3/' + process.env.INFURA_PID
);

const web3 = new Web3(provider);


const deploy = async () => {
  
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account ${accounts[0]}`);

  const tx = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello world!'] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log(`Contract deployed to ${tx.options.address}`)

};

deploy();
