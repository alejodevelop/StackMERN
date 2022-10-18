import React, { useState } from 'react';

function Test(props) {

    const [count, setCount] = useState(0)

    function increment(e) {
        e.preventDefault();
        setCount(count + 1);
        alert(count);
    }

    function decrement(e) {
        e.preventDefault();
        setCount(count - 1);
        alert(count);
    }



    return (
        <div>
            <button onClick={(e) => { increment(e) }} >+</button>
            <button onClick={(e) => { decrement(e) }} >-</button>
        </div>
    );
}

export default Test;