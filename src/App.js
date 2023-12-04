
import './App.css';
import { Route, Routes} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Login from './admin/login';
import Addproduct from './admin/addproduct';
import GetAllproduct from './admin/getAllproduct';
import GetaProduct from './admin/getaProduct';
import GetAllUsers from './admin/getAllusers';
import Admin from './admin/admin';
import Home from './user/home';
import About from './user/about';
import Registration from './admin/registration';
import ViewAproduct from './user/viewAproduct';
import Cart from './user/cart';
import Kitchen from './user/kitchen';
import Wishlist from './user/wishlist';
import Account from './user/account';
import { selectIsAdmin, selectToken } from './redux/authSlice';
import {useSelector} from 'react-redux'
import Basic from './user/fromik';


function App() {
  const isAdmin=useSelector(selectIsAdmin)
  
  return (
    <div className="App">
   
     <BrowserRouter>
    <Toaster position="top-center"/>  

     <Routes>

   
      
      <Route path='/'  element={<Home/>}/>
   <Route path='/login'  element={<Login/>}/> 
   <Route path='/reg'  element={<Registration/>}/> 
      <Route path='/cart'  element={<Cart/>}/>
      <Route path='/kitchen/:category'  element={<Kitchen/>}/>
      <Route path='/wishlist'  element={<Wishlist/>}/>
      <Route path='/account'  element={<Account/>}/>
      <Route path='/about'  element={<About/>}/>
      <Route path='/form'  element={<Basic/>}/>
     
      <Route path='/addproduct'  element={<Addproduct/>}/>
      <Route path='/getallpro'  element={<GetAllproduct/>}/>
      <Route path='/getapro'  element={<GetaProduct/>}/>
      <Route path='/getallusers'  element={<GetAllUsers/>}/>
      <Route path='/viewproduct/:productId' element={<ViewAproduct />} />

      {
        isAdmin?<>
      <Route path='/admin'  element={<Admin/>}/>
      <Route path='/admin/user' element={<Admin />} />
            <Route path='/admin/sales' element={<Admin />} />
            <Route path='/admin/prosec' element={<Admin />} />
            <Route path='/admin/add' element={<Admin />} />
        
        
        </>:
        ""
        
      }
      
           </Routes>
     
  
     </BrowserRouter>
    </div>
  );
}

export default App;
