import React from 'react';
import CustomInput from '../components/CustomInput';

const AddBrand = () => {
    return (
        <div>
            <h3 className="mb-4 title">Add Brand</h3>

            <div>
                <form action="">
                    <CustomInput
                        type="text"
                        label="Enter Brand"
                        i_id="add_brand"
                        d_class="mb-3 mt-4"
                    />

                    <button type="submit" className="btn btn-success border-0 rounded-3 px-4 py-2">
                        Add Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;
