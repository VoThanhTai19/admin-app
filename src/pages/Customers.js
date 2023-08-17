import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';

const columns = [
    {
        title: 'No',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const Customers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const state = useSelector((state) => state.customer.customers);

    const data = [];
    for (let i = 0; i < state.length; i++) {
        if (state[i].role !== 'admin') {
            data.push({
                key: i + 1,
                name: state[i].last_name + ' ' + state[i].first_name,
                product: state[i].email,
                status: state[i].mobile,
            });
        }
    }
    return (
        <div>
            <h3 className="mb-4 title">Customers</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Customers;
