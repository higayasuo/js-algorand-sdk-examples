import * as algosdk from 'algosdk';

const account = algosdk.generateAccount();
const mn = algosdk.secretKeyToMnemonic(account.sk);

console.log('My address:' + account.addr);
console.log('My mnemonic:' + mn);

const recoveredAccount = algosdk.mnemonicToSecretKey(mn);
const recoveredMn = algosdk.secretKeyToMnemonic(recoveredAccount.sk);

console.log('My mnemonic and recovered mnemonic are same:', mn == recoveredMn);
