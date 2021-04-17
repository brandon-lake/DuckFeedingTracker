import React, { useEffect, useState } from 'react';

const AddFeeding = () => {
    const [test, setTest] = useState("");

    useEffect(() => {
        // initial page setup, won't have to call fetch items later
        fetchTest();
    }, []);

    const fetchTest = async() => {
        fetch("/add")
            .then(res => res.json())
            .then(data => {
                setTest(data.msg);
            });
    }

    return (
        <div>
            <h3>{ test }</h3>
        </div>
    );
};

export default AddFeeding;