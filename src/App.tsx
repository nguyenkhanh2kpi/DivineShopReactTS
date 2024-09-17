import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { PrivateRoute } from './components';
import { Login } from './pages/Account/Login';
import { Admin } from './pages/Admin/Admin';
import { Home } from './pages/Home/Home'
import { Category } from './pages/Category/Category';
import { Cart } from './pages/Cart/Cart';
import { SoftwareDetail } from './pages/SoftwareDetail/SoftwareDetail';
import { BaseUser } from './pages/WhishList/BaseUser';
import { Favorite } from './pages/Favorite/Favorite';
import { Register } from './pages/Account/Register';
import { Logout } from './pages/Account/Logout';
import { Profile } from './pages/Profile/Profile';
import { Checkout } from './pages/Checkout/Checkout';
import { Momo } from './pages/Momo/Momo';
import { OrderHistory } from './pages/OrderHistory/OrderHistory';
import { OrderDetailHistory } from './pages/OrderHistory/OrderDetailHistory';
import { Blog } from './pages/Blog/Blog';
import { BlogDetail } from './pages/Blog/BlogDetail';
import { Contact } from './pages/Contact/Contact';
import { Password } from './pages/Password/Password';


// import cho trang home

function App() {
  return (
    <div className="App" id="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute/>}></Route>
          <Route path='/login/:message?' element={<Login/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/contact' element={<Contact />}></Route>

          <Route path='/admin' element={<Admin/>}></Route>

          <Route path='/home/:message?' element={<Home/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/blog' element={<Blog/>}></Route>
          <Route path='/blog-detail/:id' element={<BlogDetail/>}></Route>

          <Route path='/categories' element={<Category/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>

          <Route path='/detail/:id' element={<SoftwareDetail/>}></Route>
          
          <Route path='/user/favorite' element={<Favorite />}></Route>
          <Route path='/user/pasword' element={<Password />}></Route>
          <Route path='/user/account' element={<Profile />}></Route>
          <Route path='/user/history' element={<OrderHistory />}></Route>
          <Route path='/order-detail/:id' element={<OrderDetailHistory />}></Route>


          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/momo' element={<Momo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
