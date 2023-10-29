import './App.css';
import{Route,Routes} from 'react-router-dom';
import IndexPage from  './pages/indexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import { UserContextProvider } from './userContext';
import { useEffect } from 'react';
axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;
export default function App() {
  
  return(
   <UserContextProvider> 
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}
