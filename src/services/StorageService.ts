
import AsyncStorage from '@react-native-community/async-storage';
import * as APP_CONST from '../constants';

interface Product {
    id?: number,
    name: string,
    price: number,
    quantity: number,
    image: string
}

interface Setting {
    username: string,
    storageType: string,
    endpoint: string
}

const fetchLocalData = async (): Promise<Product[]> => {
    try {
        const data = await AsyncStorage.getItem(APP_CONST.STORAGE_PRODUCTS_KEY);
        const products: Product[] = JSON.parse(data);
        return Promise.resolve(products);
    } catch (error) {
        alert("Erreur lors de la lecture des données en local");
        return Promise.reject(error);
    }
}

const fetchRemoteData = async (url): Promise<Product[]> => {
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let products: Product[] = await response.json();
        return Promise.resolve(products);
    } catch (error) {
        alert("Erreur lors de la lecture des données à distance sur: " + url);
        return Promise.reject(error);
    }
}

const postLocalData = (product: Product): Promise<Product> => {
    product.id = + new Date();  //use current timestamp as id
    AsyncStorage.getItem(APP_CONST.STORAGE_PRODUCTS_KEY).then(data => {
        let products: Product[] = JSON.parse(data);
        if (!products || !products.length) {
            products = [];
        }
        products.push(product);
        AsyncStorage.setItem(APP_CONST.STORAGE_PRODUCTS_KEY, JSON.stringify(products)).finally();
    });
    return Promise.resolve(product);
}

const postRemoteData = async (url: string, product: Product, username: string): Promise<Product> => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ...product,
                'username': username
            })
        });
        let newProduct: Product = await response.json();
        return Promise.resolve(newProduct);
    } catch (error) {
        alert("Erreur lors de la sauvegarde des données à distance sur: " + url);
        return Promise.reject(error);
    }
}
const updateLocalData = (product: Product): Promise<Product> => {
    AsyncStorage.getItem(APP_CONST.STORAGE_PRODUCTS_KEY).then(data => {
        const products: Product[] = JSON.parse(data);
        let newData = products.filter(p => p.id != product.id);
        newData.push(product);
        AsyncStorage.setItem(APP_CONST.STORAGE_PRODUCTS_KEY, JSON.stringify(newData)).finally();
    });
    return Promise.resolve(product);
}

const updateRemoteData = async (url: string, product: Product, username: string): Promise<Product> => {
    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            ...product,
            'username': username
        })
    }).finally();
    return Promise.resolve(product);
}

const removeLocalData = async (productId: number) => {
    AsyncStorage.getItem(APP_CONST.STORAGE_PRODUCTS_KEY).then(data => {
        const products: Product[] = JSON.parse(data);
        let newData = products.filter(p => p.id != productId);
        AsyncStorage.setItem(APP_CONST.STORAGE_PRODUCTS_KEY, JSON.stringify(newData)).finally();
    });
}

const removeRemoteData = async (url: string, productId: number, username: string) => {
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: productId,
            'username': username
        })
    }).finally();
}


const readSettings = async (): Promise<Setting> => {
    let storages;
    try {
        storages = await AsyncStorage.multiGet([
            APP_CONST.SETTINGS_USERNAME_KEY,
            APP_CONST.SETTINGS_STORAGE_TYPE_KEY,
            APP_CONST.SETTINGS_STORAGE_END_POINT_KEY,
        ]);
    } catch (e) {
        storages = [
            [APP_CONST.SETTINGS_USERNAME_KEY, APP_CONST.SETTINGS_USERNAME_DEFAULT_VALUE],
            [APP_CONST.SETTINGS_STORAGE_TYPE_KEY, APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_LOCAL], //local storage by default
            [APP_CONST.SETTINGS_STORAGE_END_POINT_KEY, null]
        ];
    }

    const settings: Setting = {
        username: storages[0][1],
        storageType: storages[1][1],
        endpoint: storages[2][1]
    }

    return settings;
}

const getUsername = async (): Promise<string> => {
    try {
        const username = await AsyncStorage.getItem(APP_CONST.SETTINGS_USERNAME_KEY);
        return Promise.resolve(username);
    } catch (error) {
        return Promise.resolve(APP_CONST.SETTINGS_USERNAME_DEFAULT_VALUE);
    }
} 

const setUsername = (username): Promise<string> => {
    AsyncStorage.setItem(APP_CONST.SETTINGS_USERNAME_KEY, username).finally();
    return Promise.resolve(username);
} 

const getChunk = async (): Promise<number> => {
    try {
        const chunk = await AsyncStorage.getItem(APP_CONST.SETTINGS_NBR_COLUMN_KEY);
        return Promise.resolve(+chunk);
    } catch (error) {
        return Promise.resolve(1);
    }
} 

const setChunk = (chunk): Promise<number> => {
    AsyncStorage.setItem(APP_CONST.SETTINGS_NBR_COLUMN_KEY, `${chunk}`).finally();
    return Promise.resolve(chunk);
} 


const getHideNullQte = async (): Promise<boolean> => {
    try {
        const val = await AsyncStorage.getItem(APP_CONST.SETTINGS_HIDE_NULL_QTE);
        const b = val ? +val : 0;
        return Promise.resolve(b > 0);
    } catch (error) {
        return Promise.resolve(false);
    }
} 

const setHideNullQte = (hide): Promise<boolean> => {
    let val = hide ? 1:0;
    AsyncStorage.setItem(APP_CONST.SETTINGS_HIDE_NULL_QTE, `${val}`).finally();
    return Promise.resolve(hide);
} 


const getProducts = async (): Promise<Product[]> => {
    const settings : Setting = await readSettings();
    if (settings.storageType == APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_REMOTE && settings.endpoint) {
        return fetchRemoteData(`${settings.endpoint}?username=${settings.username}`);
    }
    return fetchLocalData();
}


const addProduct = async (product: Product): Promise<Product> => {
    const settings: Setting = await readSettings();
    if (settings.storageType == APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_REMOTE && settings.endpoint) {
        return postRemoteData(settings.endpoint, product, settings.username);   //save data with owner (username)
    } else {
        return postLocalData(product);
    }
}

const updateProduct = async (product: Product): Promise<Product> => {
    const settings: Setting = await readSettings();
    if (settings.storageType == APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_REMOTE && settings.endpoint) {
        return updateRemoteData(settings.endpoint, product, settings.username);   //save data with owner (username)
    } else {
        return updateLocalData(product);
    }
}


const removeProduct = async (productId: number) => {
    const settings: Setting = await readSettings();
    if (settings.storageType == APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_REMOTE && settings.endpoint) {
        removeRemoteData(settings.endpoint, productId, settings.username);  
    } else {
        removeLocalData(productId);
    }
}


const StorageService = {
    getUsername,
    setUsername,
    getChunk,
    setChunk,
    getHideNullQte,
    setHideNullQte,
    getProducts,
    addProduct,
    updateProduct,
    removeProduct
};

export default StorageService;