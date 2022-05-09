import { randomBytes } from "crypto"
import * as crypt from "crypto-js"
import HDSeedLoop, { SerializedSeedLoop } from "hdseedloop"
import { combineShares, createShares } from "./shareHandler"


export interface VaultContents{
    seedloopSerlializedCipher:string,
    vaultVersion:number,
    localShare:string,
    lastUnlockTime:number,
    createdTime: number
    uid:string
}



export const createVault = function(seedloop:HDSeedLoop, uid:string):string{
    let seedloopSerialized:SerializedSeedLoop = seedloop.serializeSync();
    // genrate random encryption key
    let newPassword = randomBytes(256).toString('hex');
    let seedloopString = JSON.stringify(seedloopSerialized);
    let seedloopEncrypted:string = crypt.AES.encrypt(seedloopString, newPassword).toString();
    // generate shares from encryption key
    let shares:Buffer[] = createShares(newPassword);
    // create string rep.'s of secret shares
    let remoteShare = shares[0].toString('hex');
    let localShare = shares[1].toString('hex');
    let newVault:VaultContents = {
        seedloopSerlializedCipher:seedloopEncrypted,
        vaultVersion: 0,
        localShare: localShare,
        createdTime: Date.now(),
        lastUnlockTime: 0,
        uid: uid
    };
    let vaultString:string = JSON.stringify(newVault);
    let vaultName:string = createVaultName(uid);
    localStorage.setItem(vaultName, vaultString);
    return remoteShare;
}


export const unlockVault = function(uid:string, remoteShare:string){
    let vaultName:string = createVaultName(uid);
    let vaultString:string|null = localStorage.getItem(vaultName);
    if(vaultString == null){
        console.log("There is no vault to unlock with the given id.");
        return;
    }
    let vaultRecovered:VaultContents = JSON.parse(vaultString);
    // array of shamir secret shares
    let shareArray:string[] = [remoteShare, vaultRecovered.localShare]
    let passwordRecovered:string = combineShares(shareArray).toString();
    let seedloopDeciphered = crypt.AES.decrypt(vaultRecovered.seedloopSerlializedCipher, passwordRecovered).toString(crypt.enc.Utf8);
    let seedloopSerialized:SerializedSeedLoop = JSON.parse(seedloopDeciphered);
    let seedloopRecovered = HDSeedLoop.deserialize(seedloopSerialized)
    console.log(seedloopRecovered);
}

// creates standard vault name given uid
const createVaultName = function(uid:string){
    return "wallet|"+uid;
}