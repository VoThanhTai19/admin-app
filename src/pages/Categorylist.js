import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProdCategories } from '../features/prodCategory/prodCategorySlice';

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

const Categorylist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProdCategories());
    }, []);
    const prodCategoryState = useSelector((state) => state.prodCategory.prodCategories);
    const data = [];
    for (let i = 0; i < prodCategoryState.length; i++) {
        data.push({
            key: i + 1,
            title: prodCategoryState[i].title,
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
            <h3 className="mb-4 title">Category List</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Categorylist;
