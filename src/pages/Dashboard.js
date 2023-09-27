import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsGraphDownArrow, BsGraphUpArrow } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyOrders, getOrders, getYearlyOrders } from '../features/auth/authSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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

const Dashboard = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [monthlyDataSales, setMonthlyDataSales] = useState([]);
    const dispatch = useDispatch();
    const monthlyState = useSelector((state) => state.auth.monthly);
    const yearlyState = useSelector((state) => state.auth.yearly);
    const orderState = useSelector((state) => state.auth.orders);

    useEffect(() => {
        dispatch(getMonthlyOrders());
        dispatch(getYearlyOrders());
        dispatch(getOrders());
    }, [dispatch]);

    useEffect(() => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let data = [];
        let monthlyOrderCount = [];
        for (let i = 0; i < monthlyState?.length; i++) {
            const element = monthlyState[i];
            data.push({
                type: months[element?._id?.month],
                income: element?.amount,
            });

            monthlyOrderCount.push({
                type: months[element?._id?.month],
                sales: element?.count,
            });
        }
        setMonthlyData(data);
        setMonthlyDataSales(monthlyOrderCount);
    }, [monthlyState]);

    const config = {
        data: monthlyData,
        xField: 'type',
        yField: 'income',
        color: ({ type }) => {
            return '#ffd333';
        },
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Income',
            },
        },
    };
    const config2 = {
        data: monthlyDataSales,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return '#ffd333';
        },
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Sales',
            },
        },
    };

    const data = [];
    for (let i = 0; i < orderState?.length; i++) {
        data.push({
            key: i + 1,
            name: (
                <>
                    <p className="mb-0">
                        {orderState[i]?.user.first_name + ' ' + orderState[i]?.user.last_name}
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
            date: new Date(orderState[i]?.createdAt).toLocaleString(),
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
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="flex-grow-1 card-wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 desc">Total Income</p>
                        <BiDotsVerticalRounded />
                    </div>
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0 sub-title">
                                $ {yearlyState && yearlyState[0]?.amount}
                            </h4>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <h6 className="align-self-end mb-0 green">
                                <BsGraphUpArrow /> 32%
                            </h6>
                            <p className="mb-0 desc">Compared to April</p>
                        </div>
                    </div>
                </div>
                <div className="flex-grow-1 card-wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 desc">Total Sales</p>
                        <BiDotsVerticalRounded />
                    </div>
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0 sub-title">
                                {yearlyState && yearlyState[0]?.count}
                            </h4>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <h6 className="align-self-end mb-0 red">
                                <BsGraphDownArrow /> 32%
                            </h6>
                            <p className="mb-0 desc">Compared to April</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="mt-4 flex-grow-1 w-50">
                    <h3 className="mb-4 title">Income Statics</h3>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="mt-4 flex-grow-1 w-50">
                    <h3 className="mb-4 title">Sales Statics</h3>
                    <div>
                        <Column {...config2} />
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="mb-4 title">Recent Orders</h3>
                <div>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
