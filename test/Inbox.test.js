const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


const { interface, bytecode } = require('../compile');
let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hello world!';

beforeEach(async () => {
  
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });
  
});

describe('Inbox', () => {

  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    let message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it('can change the message', async () => {
    let newMessage = '¡Hola mundo!';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    let actualMessage = await inbox.methods.message().call();
    assert.equal(actualMessage, newMessage);
  });

});
