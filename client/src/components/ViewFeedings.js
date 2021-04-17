import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFeedings = () => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = async() => {
        axios.get("http://localhost:4000/view")
            .then(res => console.log(res.data));

    }
    
    return (
        <div>
            <h3>{ msg }</h3>
        </div>
    );
};

export default ViewFeedings;