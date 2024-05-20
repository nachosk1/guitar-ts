export interface Guitar {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

// extender a Guitar
export interface CartItem extends Guitar {
    quantity: number;
}

//export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//    quantity: number;
//}

export type GuitarID = Guitar['id'] // no se puede colocar el & o | , en este caso solo puede funcionar con un solo tipo de dato, es escencial para ID en el hook useCart.ts
// export type GuitarID = Pick<Guitar, 'id'>
