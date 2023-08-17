import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';

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
        title: 'Action',
        dataIndex: 'action',
    },
];

const Colorlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    const colorState = useSelector((state) => state.color.colors);

    const data = [];
    for (let i = 0; i < colorState.length; i++) {
        data.push({
            key: i + 1,
            title: colorState[i].title,
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
            <h3 className="mb-4 title">Color List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Colorlist;
