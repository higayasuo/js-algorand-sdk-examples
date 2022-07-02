import * as algosdk from 'algosdk';

const account = algosdk.generateAccount();
const mn = algosdk.secretKeyToMnemonic(account.sk);

console.log('My address:' + account.addr);
console.log('My mnemonic:' + mn);

const recoveredSk = algosdk.mnemonicToSecretKey(mn);
const recoveredMn = algosdk.secretKeyToMnemonic(recoveredSk);

console.log('My recovered mnemonic:' + recoveredMn);
