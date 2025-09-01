
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/layout';
import Home from './pages/Home';
import OurStore from './pages/OurStore';
import Contact from './pages/Contact';
import Compare from './pages/Compare';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SingleProduct from './pages/SingleProduct';
import Cart2 from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Shipping from './pages/Shipping';
import SignUp from './pages/Signup';


function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
     <Route path="/" element= {<Layout />}>
      <Route index element={ <Home /> } />
      <Route path='/store' element={ <OurStore /> } />
      <Route path='/store/search?' element={ <OurStore /> } />
      <Route path='/contact' element={ <Contact/> } />
      <Route path='/compare-product' element={ <Compare/> } />
      <Route path='/login' element={ <Login/> } />
       <Route path='/signUp' element={ <SignUp/> } />
      <Route path='/forgot-password' element={ <ForgotPassword/> } />
      <Route path='/product/:id' element={ <SingleProduct/> } />
      <Route path='/product/buy/:id?' element={ <Checkout/> } />
      <Route path='/cart' element={ <Cart2/> } />
      <Route path='/wishlist' element={ <Wishlist/> } />
      <Route path='/checkout' element={ <Checkout/> } />
      <Route path='/shipping' element={ <Shipping/> } />

     </Route>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
