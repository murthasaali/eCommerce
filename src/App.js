
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
import Mainbar from './user/mainbar';
import About from './user/about';
import Registration from './admin/registration';
import ViewAproduct from './user/viewAproduct';


function App() {
  return (
    <div className="App">
   
     <BrowserRouter>
    <Toaster position="left-center"/>  
    
     <Routes>
      <Route path='/'  element={<Home/>}/>
   <Route path='/login'  element={<Login/>}/> 
   <Route path='/reg'  element={<Registration/>}/> 
      <Route path='/admin'  element={<Admin/>}/>
      <Route path='/about'  element={<About/>}/>
      <Route path='/admin/user' element={<Admin />} />
          {/* //  <Route path='/admin/addproduct' element={<Admin />} /> */}
            <Route path='/admin/sales' element={<Admin />} />
            <Route path='/admin/prosec' element={<Admin />} />
            <Route path='/admin/add' element={<Admin />} />
      <Route path='/addproduct'  element={<Addproduct/>}/>
      <Route path='/getallpro'  element={<GetAllproduct/>}/>
      <Route path='/getapro'  element={<GetaProduct/>}/>
      <Route path='/getallusers'  element={<GetAllUsers/>}/>
      <Route path='/viewproduct/:productId' element={<ViewAproduct />} />

      
           </Routes>
     
  
     </BrowserRouter>
    </div>
  );
}

export default App;
