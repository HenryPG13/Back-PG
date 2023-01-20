const setOrder = (products, by) => {
    switch (by) {
        case "modeloUp": {
            return products.sort((a, b) => a.modelo.localeCompare(b.modelo));
        };
        case "modeloDown": {
            return products.sort((a, b) => b.modelo.localeCompare(a.modelo));
        };
        case "precioUp": {
            return products.sort((a,b) => b.precio - a.precio);
        };
        case "precioDown": {
            return products.sort((a,b) => a.precio - b.precio);
        };
        default: return products;
    }
}

module.exports = { setOrder };