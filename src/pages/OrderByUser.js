import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUser } from '../features/auth/authSlice';

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
        title: 'Total Price',
        dataIndex: 'price',
    },
    {
        title: 'Price Discount',
        dataIndex: 'price_discount',
    },
    {
        title: 'Status',
        dataIndex: 'status',
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

const OrderByUser = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const orderState = useSelector((state) => state?.auth?.orderByUser);
    const getUserId = location.pathname.split('/')[3];
    useEffect(() => {
        if (getUserId !== undefined) {
            dispatch(getOrderByUser(getUserId));
        }
    }, [dispatch, getUserId]);
    const data = [];
    for (let i = 0; i < orderState?.length; i++) {
        data.push({
            key: i + 1,
            name: (
                <>
                    <p className="mb-0">
                        {orderState[i]?.user?.first_name + ' ' + orderState[i]?.user.last_name}
                    </p>
                    <p className="mb-0">{orderState[i]?.user?.email}</p>
                    <a className="text-black" href="tel:+84 778353167">
                        +84 778353167
                    </a>
                </>
            ),
            product: orderState[i]?.orderItems?.map((i) => {
                return (
                    <div className="mb-2" key={i.productId._id}>
                        <p className="mb-0">{i.productId.title.substr(0, 20) + '...'}</p>
                        <span>
                            Price: ${i.price} x {i.quantity}
                        </span>
                    </div>
                );
            }),
            price: orderState[i]?.totalPrice,
            price_discount: orderState[i]?.totalPriceAfterDiscount,
            status: orderState[i]?.orderStatus,
            date: new Date(orderState[i].createdAt).toLocaleString(),
            action: (
                <div className="d-flex align-items-center justify-content-center">
                    <Link>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <Link>
                        <AiFillDelete className="fs-3 text-danger p-1" />
                    </Link>
                    <Link to={`/admin/order/${orderState[i]?._id}`}>
                        <AiOutlineEye className="fs-3 text-danger p-1" />
                    </Link>
                </div>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Order By User</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default OrderByUser;
