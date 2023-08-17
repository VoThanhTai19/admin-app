import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
} from 'react-icons/ai';
import { RiCoupon5Line } from 'react-icons/ri';
import { BiCategoryAlt, BiLogoBlogger } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { FaClipboardList } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { ImBlog } from 'react-icons/im';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical d-flex align-items-center justify-content-center">
                    <h2 className="text-white fs-4 fw-bold">Dev Cornor</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'singout') {
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className="fs-5" />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className="fs-5" />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineShoppingCart className="fs-5" />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className="fs-5" />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineShoppingCart className="fs-5" />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className="fs-5" />,
                                    label: 'Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <SiBrandfolder className="fs-5" />,
                                    label: 'Brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategoryAlt className="fs-5" />,
                                    label: 'Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <BiCategoryAlt className="fs-5" />,
                                    label: 'Category List',
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className="fs-5" />,
                                    label: 'Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <AiOutlineBgColors className="fs-5" />,
                                    label: 'Color List',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className="fs-5" />,
                            label: 'Orders',
                        },
                        {
                            key: 'marketing',
                            icon: <RiCoupon5Line className="fs-5" />,
                            label: 'Marketing',
                            children: [
                                {
                                    key: 'coupon',
                                    icon: <ImBlog className="fs-5" />,
                                    label: 'Coupon',
                                },
                                {
                                    key: 'coupon-list',
                                    icon: <RiCoupon5Line className="fs-5" />,
                                    label: 'Coupon List',
                                },
                            ],
                        },
                        {
                            key: 'blos',
                            icon: <BiLogoBlogger className="fs-5" />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <ImBlog className="fs-5" />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <BiLogoBlogger className="fs-5" />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <ImBlog className="fs-5" />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <BiLogoBlogger className="fs-5" />,
                                    label: 'Blog Category List',
                                },
                            ],
                        },
                        {
                            key: 'enquiries',
                            icon: <AiOutlineDashboard className="fs-5" />,
                            label: 'Enquiries',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{ padding: 0, background: colorBgContainer }}
                    className="d-flex justify-content-between align-items-center px-3"
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            height: 64,
                        }}
                    />
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <div className="position-relative">
                            <IoIosNotifications className="fs-3" />
                            <span className="position-absolute noti bg-warning">3</span>
                        </div>
                        <div className="d-flex align-items-center gap-3 dropdown">
                            <img
                                style={{ width: '40px', height: '40px' }}
                                src="../images/avatar.jpeg"
                                alt="Avatar"
                                className="img-fluid rounded-circle"
                            />
                            <div
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <h5 className="mb-0">Thanh Tai</h5>
                                <p className="mb-0">thanhtai1892001@gmail.com</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="abc">
                                    Action
                                </a>
                                <a className="dropdown-item" href="abc">
                                    Another action
                                </a>
                                <a className="dropdown-item" href="abc">
                                    Something else here
                                </a>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={250}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
