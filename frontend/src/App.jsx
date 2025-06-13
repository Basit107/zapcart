//import logo from './logo.svg';
import './App.css';
import HomeContextProvider from './context/HomeContext';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import CategoryPage from "./pages/CategoryPage"
import Products from './pages/Products';
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import Footer from './components/footer/Footer';
import HomeCategory from './pages/HomeCategory';
import banner1 from './components/assets/banner1.png';
import LoginSignup from './pages/LoginSignup';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div>
      <HomeContextProvider >
      <BrowserRouter> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mobile" element={<HomeCategory banner={banner1} category="mobile" />}/>
          <Route path="/tablets" element={<HomeCategory banner={banner1} category="tablet" />}/>
          <Route path="/accessories" element={<HomeCategory banner={banner1} category="accessory" />}/>
          <Route path="/product" element={<Products/>}>
            <Route path=':productId' element={<Products/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup />}/>

          {/* ⛔ Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes> 
        <Footer />
      </BrowserRouter>
      </HomeContextProvider>
    </div>
  );
}

export default App;