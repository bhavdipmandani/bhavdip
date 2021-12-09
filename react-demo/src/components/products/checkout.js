import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CheckOut = ({ price , product_name }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51K3wdKSCD8AaqSEyaOviwA6W2Tk4u3Icy80NIbiPyUvwEmsb12rPZMPILtygdP6jpXu0Nx9wM6IbK7FPxabB4dDm00ts89ornFpk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='For Demo Payment'
            // billingAddress
            // shippingAddress
            description={`Your total is $${price} , ${product_name}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />


    )
}

export default CheckOut;