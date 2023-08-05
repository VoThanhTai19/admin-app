import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import BlogCatList from './pages/BlogCatList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="enquiries" element={<Enquiries />} />
                    <Route path="blog-list" element={<Bloglist />} />
                    <Route path="blog-category-list" element={<BlogCatList />} />
                    <Route path="blog-category" element={<AddBlogCat />} />
                    <Route path="blog" element={<AddBlog />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="color-list" element={<Colorlist />} />
                    <Route path="color" element={<AddColor />} />
                    <Route path="category-list" element={<Categorylist />} />
                    <Route path="category" element={<AddCategory />} />
                    <Route path="brand-list" element={<Brandlist />} />
                    <Route path="brand" element={<AddBrand />} />
                    <Route path="product-list" element={<Productlist />} />
                    <Route path="product" element={<AddProduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
