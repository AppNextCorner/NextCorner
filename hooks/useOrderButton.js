import {useState} from 'react';

/**
 * Prevents the allowing of the user to press multiple times causing multiple orders to be processed simultaneously
 * 
 * @returns 
 * order - initial state
 * setOrder - after button is clicked for adding an order to be processed
 */
const useOrderButton = () => {
    const [order, setOrder] = useState(false);

    return {
        order,
        setOrder,
    }
}


export default useOrderButton;
