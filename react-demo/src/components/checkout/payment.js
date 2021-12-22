import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const Payment = ({TotalAmount}) => {
    const priceForStripe = TotalAmount * 100;
    const publishableKey = 'pk_test_51K3wdKSCD8AaqSEyaOviwA6W2Tk4u3Icy80NIbiPyUvwEmsb12rPZMPILtygdP6jpXu0Nx9wM6IbK7FPxabB4dDm00ts89ornF';

    const onToken = async (token) => {
        console.log(token);
        alert('Payment Succesful!');
    };


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
