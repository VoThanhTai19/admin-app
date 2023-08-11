import React, { useEffect } from 'react';
import { Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice';

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
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries());
    }, []);
    const enquiryState = useSelector((state) => state.enquiry.enquiries);
    const data = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            status: (
                <div className="form-floating">
                    <select
                        className="form-select"
                        id="enquiry_status"
                        aria-label="Floating label select example"
                    >
                        <option value="selected" disabled>
                            Select Status
                        </option>
                        <option value="1">{enquiryState[i].status}</option>
                    </select>
                    <label htmlFor="enquiry_status">Select Status</label>
                </div>
            ),
            action: (
                <>
                    <Link>
                        <AiFillDelete className="fs-3 text-danger p-1" />
                    </Link>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Enquiries;
