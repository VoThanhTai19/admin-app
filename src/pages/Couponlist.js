import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

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
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [couponId, setCouponId] = useState('');
    const couponState = useSelector((state) => state.coupon.coupons);
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isLoading, isError, deletedCoupon } = newCoupon;
    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);

    const showModal = (id) => {
        setCouponId(id);
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const handleOk = (id) => {
        dispatch(deleteCoupon(id));
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch(resetState());
            dispatch(getCoupons());
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess && deletedCoupon) {
            toast.success('Coupon Deleted Successfully!!!');
        }
        if (isError) {
            toast.error('Something Went Wrong!!!');
        }
    }, [isSuccess, isLoading, isError, deletedCoupon]);

    const data = [];
    for (let i = 0; i < couponState.length; i++) {
        data.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
            action: (
                <>
                    <Link to={`/admin/coupon/${couponState[i]._id}`}>
                        <BiEdit className="fs-3 text-danger p-1" />
                    </Link>
                    <button className="bg-transparent border-0">
                        <AiFillDelete
                            onClick={() => showModal(couponState[i]._id)}
                            className="fs-3 text-danger p-1"
                        />
                    </button>
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
            <CustomModal
                onCancel={hideModal}
                open={open}
                onOk={() => {
                    handleOk(couponId);
                }}
                confirmLoading={confirmLoading}
                title="Are you sure you want to delete this color?"
            />
        </div>
    );
};

export default Couponlist;
