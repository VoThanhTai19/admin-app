import React from 'react';
import CustomInput from '../components/CustomInput';

const AddBlogCat = () => {
    return (
        <div>
            <h3 className="mb-4 title">Add Blog Category</h3>

            <div>
                <form action="">
                    <CustomInput
                        type="text"
                        label="Enter BLog Category"
                        i_id="blog_category"
                        d_class="mb-3 mt-4"
                    />

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Blog Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogCat;