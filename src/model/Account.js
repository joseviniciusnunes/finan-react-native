import { AsyncStorage, Alert } from 'react-native';

const keyModal = '@Account';

export async function getAccount() {
    try {
        const value = await AsyncStorage.getItem(keyModal);
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return [];
        }
    } catch (error) {
        console.log('ERRO GET', error)
    }
}

export async function storeAccount(account) {
    try {
        let accounts = await getAccount();
        if (account.id) {
            accounts = accounts.map((it) => (it.id === account.id ? { ...it, ...account } : it));
        } else {
            account.id = randHex(12);
            accounts.push(account);
        }
        await AsyncStorage.setItem(keyModal, JSON.stringify(accounts));
    } catch (error) {
        console.log('ERRO STORE', error)
    }
}

export async function deleteAccount(id) {
    try {
        let accounts = await getAccount();
        accounts = accounts.filter((item) => item.id !== id)
        await AsyncStorage.setItem(keyModal, JSON.stringify(accounts));
    } catch (error) {
        console.log('ERRO STORE', error)
    }
}

function randHex(len) {
    let maxlen = 8
    let min = Math.pow(16, Math.min(len, maxlen) - 1)
    let max = Math.pow(16, Math.min(len, maxlen)) - 1
    let n = Math.floor(Math.random() * (max - min + 1)) + min
    let r = n.toString(16);
    while (r.length < len) {
        r = r + randHex(len - maxlen);
    }
    return r;
};