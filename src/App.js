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
import AddCoupon from './pages/AddCoupon';
import Couponlist from './pages/Couponlist';
import ViewEnq from './pages/ViewEnq';
import OrderByUser from './pages/OrderByUser';
import OrderDetails from './pages/OrderDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="enquiries" element={<Enquiries />} />
                    <Route path="enquiries/:id" element={<ViewEnq />} />
                    <Route path="blog" element={<AddBlog />} />
                    <Route path="blog/:id" element={<AddBlog />} />
                    <Route path="blog-list" element={<Bloglist />} />
                    <Route path="coupon" element={<AddCoupon />} />
                    <Route path="coupon/:id" element={<AddCoupon />} />
                    <Route path="coupon-list" element={<Couponlist />} />
                    <Route path="blog-category" element={<AddBlogCat />} />
                    <Route path="blog-category/:id" element={<AddBlogCat />} />
                    <Route path="blog-category-list" element={<BlogCatList />} />
                    <Route path="user-orders/:id" element={<OrderByUser />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order/:id" element={<OrderDetails />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="color-list" element={<Colorlist />} />
                    <Route path="color" element={<AddColor />} />
                    <Route path="color/:id" element={<AddColor />} />
                    <Route path="category-list" element={<Categorylist />} />
                    <Route path="category" element={<AddCategory />} />
                    <Route path="category/:id" element={<AddCategory />} />
                    <Route path="brand-list" element={<Brandlist />} />
                    <Route path="brand/:id" element={<AddBrand />} />
                    <Route path="brand/" element={<AddBrand />} />
                    <Route path="product-list" element={<Productlist />} />
                    <Route path="product" element={<AddProduct />} />
                    <Route path="product/:id" element={<AddProduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
