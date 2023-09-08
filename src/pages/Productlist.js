import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';
const columns = [
    {
        title: 'No',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Productlist = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [productId, setProductId] = useState('');
    const productState = useSelector((state) => state.product.products);
    const newProduct = useSelector((state) => state.product);
    const { isError, isSuccess, isLoading, deletedProduct } = newProduct;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const showModal = (id) => {
        setProductId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteProduct(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getProducts());
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess && deletedProduct) {
            toast.success('Blog Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isError, isLoading, isSuccess, deletedProduct]);

    const data = [];
    for (let i = 0; i < productState.length; i++) {
        data.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color.map((i, index) => {
                return <p key={index}>{i}</p>;
            }),
            price: productState[i].price,
            action: (
                <>
                    <Link to={`/admin/product/${productState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(productState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Product List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(productId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this product?"
            />
        </div>
    );
};

export default Productlist;
