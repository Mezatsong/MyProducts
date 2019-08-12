
export const getProductByFilter = (store) => {
    const { products, hideNullQte } = store;
    filter = store.filter.toLowerCase();
    if (filter || hideNullQte)
        return products.filter(product => {
            let b = !filter || product.name.toLowerCase().includes(filter);
            b &= !hideNullQte || product.quantity > 0;  
            return b;
        });
    return products;
};