import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

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

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const productState = useSelector((state) => state.product.products);

    const data = [];
    for (let i = 0; i < productState.length; i++) {
        console.log(productState[i]);

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
                    <Link>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <Link>
                        <AiFillDelete className="fs-3 text-danger p-1" />
                    </Link>
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
        </div>
    );
};

export default Productlist;
