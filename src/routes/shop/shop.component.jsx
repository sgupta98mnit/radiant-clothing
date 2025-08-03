import {useContext } from 'react';

import { ProductContext } from '../../contexts/products.context';
const Shop = () => {
    const { products } = useContext(ProductContext);
  return (
   <div>
    {products.map((item) => {
      return <div key={item.id}>{item.name}</div>
    })}
   </div>
  );
};

export default Shop;