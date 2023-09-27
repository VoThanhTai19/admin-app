import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrder, updateOrder } from '../features/auth/authSlice';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getOrderId = location.pathname.split('/')[3];
    const orderState = useSelector((state) => state?.auth?.orderDetails);

    useEffect(() => {
        if (getOrderId !== undefined) {
            dispatch(getOrder(getOrderId));
        }
    }, [dispatch, getOrderId]);

    const handleUpdateOrder = (id, status) => {
        if (id !== undefined) {
            dispatch(updateOrder({ id, status }));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-4 title">View Order</h3>
                <button className="btn btn-primary mb-4" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
            <div className="bg-white p-4 rounded-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Name:
                    </h6>
                    <p className="mb-0">
                        {orderState?.shippingInfo.first_name}
                        {orderState?.shippingInfo.last_name}
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Mobile:
                    </h6>
                    <p className="mb-0">
                        <a href={`tel: +84{orderState?.user?.mobile}`}>
                            {orderState?.user?.mobile}
                        </a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Email:
                    </h6>
                    <p className="mb-0">
                        <a href={`mailto: {orderState?.user?.email}`}>{orderState?.user?.email}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Address:
                    </h6>
                    <p className="mb-0">{orderState?.shippingInfo?.address}</p>
                </div>
                <div className="d-flex flex-column gap-3">
                    <h6 className="mb-0">Product:</h6>
                    <div className="d-flex flex-column gap-3 w-75">
                        {orderState &&
                            orderState?.orderItems?.map((i) => {
                                return (
                                    <div key={i?._id} className="row align-items-center">
                                        <div className="col-2 position-relative">
                                            <span className="badges position-absolute">
                                                {i?.quantity}
                                            </span>
                                            <img
                                                src={
                                                    i?.productId.images[0].url
                                                        ? i?.productId.images[0].url
                                                        : '../images/watch.jpg'
                                                }
                                                className="img-fluid w-100 p-2"
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-8 d-flex flex-column gap-10">
                                            <h6 className="mb-0">
                                                {i?.productId?.title.substr(0, 60) + ' ...'}
                                            </h6>
                                            <p className="mb-0 prod-link">
                                                Color: {i?.colorId?.title}
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p className="mb-0 prod-price">
                                                $ {i?.price * i?.quantity}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Total Price:
                    </h6>
                    <p className="mb-0">$ {orderState?.totalPrice}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Price Discount:
                    </h6>
                    <p className="mb-0">$ {orderState?.totalPriceAfterDiscount}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Status:
                    </h6>
                    <p className="mb-0">{orderState?.orderStatus}</p>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0" style={{ width: '120px' }}>
                        Changes Status:
                    </h6>
                    <div>
                        <select
                            defaultValue={
                                orderState?.orderStatus ? orderState?.orderStatus : 'Ordered'
                            }
                            className="form-control form-select"
                            id="order_status"
                            onChange={(e) => handleUpdateOrder(getOrderId, e.target.value)}
                        >
                            <option value="Ordered" disabled>
                                Ordered
                            </option>
                            <option value="Processed">Processed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
