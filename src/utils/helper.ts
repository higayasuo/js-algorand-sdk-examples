import * as algosdk from 'algosdk';

export const SERVER = 'http://localhost';
export const TOKEN =
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export const ALGOD_PORT = 4001;
export const KMD_PORT = 4002;

export const TEST_PASSWORD = 'testpassword';
export const WALLET1 = 'MyTestWallet1';

export { algosdk };

export const algodClient = new algosdk.Algodv2(TOKEN, SERVER, ALGOD_PORT);

export const kmdClient = new algosdk.Kmd(TOKEN, SERVER, KMD_PORT);

const MN1 =
  'dance turn spoon split interest brief dinosaur tunnel collect search orchard silent debris art clinic series hint dial inner define age beauty step absorb ladder';

const MN2 =
  'call finish repair coffee fatal cook finger fortune deputy scout biology pause kite spin typical improve island noise review category feed rapid total absent can';

const MN3 =
  'penalty fence fix ahead brisk oyster lobster category stove flee unveil minimum way warrior match ritual business interest bullet notable reflect retire stereo abandon glow';

export const accountA = algosdk.mnemonicToSecretKey(MN1);
export const accountB = algosdk.mnemonicToSecretKey(MN2);
export const accountC = algosdk.mnemonicToSecretKey(MN3);
