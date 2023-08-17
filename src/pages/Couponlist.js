import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../features/coupon/couponSlice';

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
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,
    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Couponlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);

    const couponState = useSelector((state) => state.coupon.coupons);

    const data = [];
    for (let i = 0; i < couponState.length; i++) {
        data.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            expiry: couponState[i].expiry,
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
            <h3 className="mb-4 title">Coupon List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Couponlist;
