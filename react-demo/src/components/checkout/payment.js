import React, {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {apiUrl} from "../../config";
import axios from "axios";
// import '../../assets/css/payment.css';


const Payment = ({TotalAmount}) => {
    const priceForStripe = TotalAmount * 100;
    const publishableKey = 'pk_test_51K3wdKSCD8AaqSEyaOviwA6W2Tk4u3Icy80NIbiPyUvwEmsb12rPZMPILtygdP6jpXu0Nx9wM6IbK7FPxabB4dDm00ts89ornF';

    const onToken = async (token) => {
        // e.preventDefault()

        const productStoreId = store[store.length - 1]._id;
        const addressId = address[address.length - 1]._id;


        await axios.post(`${apiUrl}/order`);

        console.log('order entered success')
        window.location.reload(false);

        const orderId = order[order.length - 1]._id;


        const addOrder = await axios.patch(`${apiUrl}/order/${orderId}`, {
            productStoreId: productStoreId,
            addressId: addressId,
            totalAmount: TotalAmount
        });

        console.log('--------------------------addOrder', addOrder)

        console.log(token);
        alert('Payment Succesful!');
    };


    const [store, setStore] = useState([])
    const [address, setAddress] = useState([])
    const [order, setOrder] = useState([])

    let Store = async () => {
        const response = await fetch(`${apiUrl}/store`);
        let storeData = await response.json();
        return storeData;
    }
    let Address = async () => {
        const response = await fetch(`${apiUrl}/address`);
        let address = await response.json();
        return address;
    }
    let Order = async () => {
        const response = await fetch(`${apiUrl}/order`);
        let order = await response.json();
        return order;
    }

    useEffect(() => {
        Store().then(((data) => setStore(data.data.product_data)));
        Address().then(((data) => setAddress(data.data.address)));
        Order().then(((data) => setOrder(data.data.order)));
    }, []);


    return (
        <div>
            <StripeCheckout
                label='Pay Now'
                name='For Demo Payment'
                // billingAddress
                // shippingAddress
                description={`Your total is ${TotalAmount}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                token={onToken}
                stripeKey={publishableKey}
            />
        </div>

    )
}

export default Payment;
