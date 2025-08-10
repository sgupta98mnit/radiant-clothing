import { CartItemContainer, ItemDetails, ItemName } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;