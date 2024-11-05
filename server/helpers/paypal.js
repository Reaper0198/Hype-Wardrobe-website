const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode : 'sandbox',
    client_id : 'AYkodM_QhbuiWtjHsvoSu9NqiZ03L6nQ2AJrljYrRwUno3NGTxRQeUHkFQ31K24YVKjUrcu78QI7fDL6',
    client_secret : 'EGfDSU9eJ6IWOCYFr0WSegrVve7EY0SF_vjUe87fYh7jCHLnPINAKCK0MCfgRMDsohkPrpI7TljpAUGm'

});

module.exports = paypal;