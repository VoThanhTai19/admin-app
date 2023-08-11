import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';

const columns = [
    {
        title: 'No',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const orderState = useSelector((state) => state.auth.orders);
    const data = [];
    for (let i = 0; i < orderState.length; i++) {
        data.push({
            key: i + 1,
            name: `${orderState[i].orderBy.last_name} ${orderState[i].orderBy.first_name}`,
            product: orderState[i].products.map((item) => {
                return (
                    <div className="d-flex gap-3 align-items-center mt-2" key={item.product._id}>
                        <p className="mb-0">{item.product.title}</p>
                        <span>
                            {item.count} x ${item.product.price}
                        </span>
                    </div>
                );
            }),
            amount: `$ ${orderState[i].paymentIntent.amount}`,
            date: new Date(orderState[i].createdAt).toLocaleString(),
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
            <h3 className="mb-4 title">Orders</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Orders;
