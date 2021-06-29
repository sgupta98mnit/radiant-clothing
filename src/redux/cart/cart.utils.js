export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem) {
        return cartItems.map(cartItem => 
                cartItem.id === existingCartItem.id 
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : {...cartItem}
            )
    } 

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(
        // eslint-disable-next-line
        cartItem => cartItem.id == cartItemToRemove.id
    );

    // eslint-disable-next-line 
    if(existingItem.quantity == 1) {
        return cartItems.filter( cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(
        cartItem => cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : {...cartItem}
    )
}