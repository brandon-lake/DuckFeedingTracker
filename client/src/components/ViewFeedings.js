import React, { useEffect, useState } from 'react';

const ViewFeedings = () => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = async() => {
        fetch("/view")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMsg(data.msg);
            });
    }
    return (
        <div>
            <h3>{ msg }</h3>
        </div>
    );
};

export default ViewFeedings;