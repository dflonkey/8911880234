document.addEventListener('DOMContentLoaded', function () {
    var paymentButtons = document.querySelectorAll('#btn');
    const stripe = Stripe('pk_test_51OjoE8BYN32CVb4NBd6GF5CTgTjD061wZoLjgMAs1IJsYYZN2xeFI6MMqIK1ET8t3d6gaXRTkQ03ru82sZsgDGcr009reQO7Hy')
    var paymentModal = document.getElementById('paymentModal');
    const email = document.querySelector('#email');
    const error = document.querySelector(".error")
    paymentButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            paymentModal.classList.add('visible');


            var value = button.value;
            document.getElementById('value').innerHTML = value;
            console.log('Значение кнопки:', value);

            var buttons = document.querySelectorAll('.payment-buttons button')
            var lavaButton = document.getElementById("lavaButton")
            var stripeButton=document.getElementById('stripeButton')
            var cryptoButton = document.getElementById("cryptoButton")
           
            var lavaPurchase = document.querySelector('.pay-button-lava')
            var cryptoPurchase = document.querySelector('.pay-button-crypto')
            var stripePurchase=document.querySelector('.pay-button-stripe')

            buttons.forEach((button => {
                button.addEventListener("click", (function () {
                    buttons.forEach((btn => btn.classList.remove("selected"))), button.classList.add("selected")
                }))
            }));

            lavaButton.addEventListener('click', function () {
                lavaPurchase.style.display = 'inline-flex';
                cryptoPurchase.style.display = 'none';
                stripePurchase.style.display = 'none';
               
                
                
            });

            cryptoButton.addEventListener('click', function () {
                cryptoPurchase.style.display = 'inline-flex';
                lavaPurchase.style.display = 'none';
                stripePurchase.style.display = 'none';
                
            });

            stripeButton.addEventListener('click', function(){
                cryptoPurchase.style.display = 'none';
                lavaPurchase.style.display = 'none';
                stripePurchase.style.display = 'inline-flex';
            });
            



            lavaPurchase.addEventListener('click', async function () {
                if (!email.value) {
                    error.classList.remove('hide')
                        ;
                } else {
                    const secretKey = 'bee8c3cf8a77e8705e2b4a3788e1bbcee0f05431';
                    const key = await crypto.subtle.importKey(
                        'raw',
                        new TextEncoder().encode(secretKey),
                        { name: 'HMAC', hash: 'SHA-256' },
                        false,
                        ['sign']
                    );

                    const timestamp = Date.now().toString();
                    const randomNumber = Math.floor(Math.random() * 1000000).toString();
                    const orderId = timestamp + randomNumber;

                    const data = {
                        sum: value,
                        shopId: "0ffdc84f-ea2d-4b75-8e4b-5ab26e6e8b0c",
                        orderId: orderId,
                        excludeService:["sbp"],
                        successUrl: "https://fnvsk.pro/success",
                        failUrl: "ttps://fnvsk.pro/cancel",
                        
                    };

                    const signatureArrayBuffer = await crypto.subtle.sign(
                        'HMAC',
                        key,
                        new TextEncoder().encode(JSON.stringify(data))
                    );

                    const signature = Array.from(new Uint8Array(signatureArrayBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

                    console.log('Data:', JSON.stringify(data));
                    console.log('Signature:', signature);

                    const url = 'https://api.lava.ru/business/invoice/create';
                    const headers = new Headers({
                        'Content-Type': 'application/json',
                        'signature': signature
                    });

                    await fetch(url, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                return Promise.reject('Error');
                            }
                        })
                        .then(data => {
                            window.open(data.data.url, '_self')
                        })
                        .catch(error => {
                            console.error('Fail:', error);
                        });
                }
            });

            cryptoPurchase.addEventListener('click', async function () {
                if (!email.value) {
                    error.classList.remove('hide')

                } else {
                    error.classList.add('hide');
                    const url = 'https://api.cryptocloud.plus/v2/invoice/create';
                    const headers = new Headers({
                        'Authorization': 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTWpNeE9UZz0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiI3MWE3NTNjNzIwOTAzODg4NzdjZmU3YmQ1OWM5MDliY2YyZDJhZGMyMjliNDc5NDBjNGQ5NjgwYzY1NDQyMGNlIiwiZXhwIjo4ODEyMDE0MDQ1Nn0.2HeeEEgyanjqFZTDb36XhqVigVbL8tZ-P4kUpFdQpGA',
                        'Content-Type': 'application/json'
                    });
                    const data = {
                        amount: value,
                        shop_id: 'bGYQ5MPOWTfXkb6F',
                        currency: 'RUB',
                        email: email.value,
                    };

                    fetch(url, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(data)
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                return Promise.reject('Creation Error');
                            }
                        })
                        .then(data => {
                            window.open(data.result.link, '_self')
                        })
                        .catch(error => {
                            console.error('Fail:', error);
                        });
                }
            });

            stripePurchase.addEventListener('click', async function () {
                if (!email.value) {
                    error.classList.remove('hide')

                } else {
                    error.classList.add('hide');
                    try {
                        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': 'Bearer sk_test_51OjoE8BYN32CVb4N0eE0RwihrquwPEk7J42mvhoceDO4Yusfr2pJELTprOdjH683UkP7gO1AY859u9tpGOrz27pu008xhAHotf'
                            },
                            body: new URLSearchParams({
                                'payment_method_types[]': 'card',
                                'line_items[0][price_data][currency]': 'usd',
    
                                'line_items[0][price_data][unit_amount]': value,
                                'line_items[0][quantity]': '1',
                                'mode': 'payment',
                                'success_url': 'https://fnvsk.pro/success',
                                'cancel_url': 'https://fnvsk.pro/cancel',
                                'customer_email': email.value
                            })
                        });
        
                        const session = await response.json();
        
                        if (session.id) {
                            // Redirect to Checkout
                            stripe.redirectToCheckout({ sessionId: session.id });
                        } else {
                            console.error('Failed to create session');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
           
        });

            
            var closeButton = document.querySelector('.close');
            closeButton.addEventListener('click', function () {
                closePaymentModal();
            });

            window.addEventListener('click', function (event) {
                if (event.target == paymentModal) {
                    closePaymentModal();
                }
            });
        });
    

    function closePaymentModal() {
        paymentModal.classList.remove('visible');
    }
    });
});
