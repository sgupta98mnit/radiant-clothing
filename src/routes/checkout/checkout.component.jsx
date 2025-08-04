import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemToCart } =
    useContext(CartContext);
  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <h2>{cartItem.name}</h2>
            <span>{cartItem.quantity} </span>
            <span>{cartItem.price}</span>
            <br />
            <span onClick={() => removeItemToCart(cartItem)}>decrement</span>
            <br />
            <span onClick={() => addItemToCart(cartItem)}>increment</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
