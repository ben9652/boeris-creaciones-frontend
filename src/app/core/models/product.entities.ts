export interface Product {
    id: number,
    name: string | null,
    price: number | null,
    stock: number,
    picture: string | null,
    comment?: string
}

export interface ProductRow {
    nonModified: Product,
    modified: Product
}

export function createNullProduct(): Product {
    let newProduct: Product = {
        id: 0,
        name: null,
        price: null,
        stock: 0,
        picture: 'pictures/cube-solid.svg'
    }

    return newProduct;
}

export function isNullProduct(product: Product): boolean {
    const id: boolean = product.id === 0;
    const name: boolean = product.name === null;
    const price: boolean = product.price === null;
    const stock: boolean = product.stock === 0;
    const picture: boolean = product.picture === 'pictures/cube-solid.svg';
    const comment: boolean = product.comment === undefined;

    return id && name && price && stock && picture && comment;
}

export function areProductsEqual(obj1: Product | null, obj2: Product | null): boolean {
    if(obj1 !== null && obj2 !== null) {
        if(obj1.id !== obj2.id)
            return false;
        if(obj1.name !== obj2.name)
            return false;
        if(obj1.price !== obj2.price)
            return false;
        if(obj1.stock !== obj2.stock)
            return false;
        if(obj1.picture !== obj2.picture)
            return false;
        if(obj1.comment !== obj2.comment)
            return false;
    }
    else if(obj1 === null || obj2 === null) {
        return false;
    }
    
    return true;
}

export function createProductRow(nonModified: Product, modified: Product): ProductRow {
    let productRow: ProductRow = {
        nonModified: createNullProduct(),
        modified: createNullProduct()
    };

    productRow.nonModified = nonModified;
    productRow.modified = modified;

    return productRow;
}