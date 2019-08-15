
export const getProductByFilter = (store) => {
    let { products, hideNullQte } = store;
    filter = store.filter.toLowerCase();
    products = products || [];
    if (filter || hideNullQte)
        return products.filter(product => {
            let b = !filter || product.name.toLowerCase().includes(filter);
            b &= !hideNullQte || product.quantity > 0;  
            return b;
        });
    return products;
};