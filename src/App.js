import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import { UserProvider } from './contexts/user.context';
import { CartProvider } from './contexts/cart.context';
import { ProductsProvider } from './contexts/products.context';

const App = () => {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <Routes >
            <Route path='/' element={<Navigation />} >
              <Route index element={<Home />} />
              <Route path='shop' element={<Shop />} />
              <Route path='auth' element={<Authentication />}/>
            </Route>
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
}
export default App;