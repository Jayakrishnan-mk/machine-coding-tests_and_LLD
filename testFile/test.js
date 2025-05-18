
// // Interview — LLD + Machine Coding
// // ---------------------------------
// // Design a Payment Gateway system that supports different payment modes (Card, UPI, Netbanking). 
// // Each payment mode should route to a different bank for processing. You should ensure:

// // Input validation based on payment mode.
// // Support for multiple banks with their own success/failure logic.
// // A clean, object-oriented approach with extendable design (e.g., easily add a new bank/payment method later).

// // Implement core classes and simulate a few test cases showing both success and failure scenarios.


// // pseudocode:

// // create a class called PaymentGateway
// // create a bankMap in constructor
// // make the makePaymenthello fn in the class 
// // then create the seperate classes for the specific banks axis, icici, kotak
// // and use a payment class to create the objects structure with validation method
// // test with some inputs with card, api, and online banking criteria
// // the bankmap and validation fns needs to be encapsulated
// // and we need to do the abstraction with only exposing this makePaymenthello method
// // in the makePaymenthello fn, we need to check the bankmode with checking the bankmap object
// // then, we need to validate the bankdetails with checking the validation fn inside the payment class
// // then we need to delegate the banking process to specific bank classes
// // in bank classes we only need one process fn, and inside that, console for check the bank
// // and response proper success and failure message with the reason
// // so, after process to banks, assign this process fn to a var called isSuccess. 
// // and return this at the end. done


class PaymentGateway {
    constructor() {
        this.bankMap = {        // encapsulated the bank map
            card: new KotakBank(),
            upi: new AxisBank(),
            onlineBanking: new ICICIBank()
        }
    }

    makePayment(payment) {
        let bank = this.bankMap[payment.mode];

        if (!bank) {
            console.log('❌ Banking mode is invalid!');
            return false;
        }

        if (!payment.isValid()) {
            console.log('❌ Missing required Payment details');
            return false;
        }

        let isSuccess = bank.process(); // delegated the banks process separately
        return isSuccess;
    }
}

class Payment {
    constructor(mode, details) {
        this.mode = mode;
        this.details = details;
    }

    isValid() {        // encapsulated the validation fn
        if (this.mode === 'card') {
            return this.details.number && this.details.expiry && this.details.cvv
        } else if (this.mode === 'upi') {
            return this.details.vpa;
        } else if (this.mode === 'onlineBanking') {
            return this.details.userId && this.details.password;
        }
        return false;
    }
}

class KotakBank {
    process() {
        let chance = Math.random();
        // 90% success
        if (chance > 0.1) {
            console.log('✅ KotakBank: Payment process completed successfully')
            return true;
        } else {
            console.log('❌ KotakBank: Payment process failed due to card blocked!')
            return false;
        }
    }
}

class AxisBank {
    process() {
        let chance = Math.random();
        // 80% success
        if (chance > 0.2) {
            console.log('✅ AxisBank: Payment process completed successfully')
            return true;
        } else {
            console.log('❌ AxisBank: Payment process failed due to insufficient balance!')
            return false;
        }
    }

}

class ICICIBank {
    process() {
        let chance = Math.random();
        // 70% success
        if (chance > 0.1) {
            console.log('✅ ICICIBank: Payment process completed successfully')
            return true;
        } else {
            console.log('❌ ICICIBank: Payment process failed due to bank server down!')
            return false;
        }
    }
}


let gatewayy = new PaymentGateway();

let payments = [
    new Payment(
        'card',
        {
            number: 12345678,
            expiry: '02/2026',
            cvv: 678
        }),
    new Payment(
        'upi',
        {
            vpa: 'username@icicibank'
        }),
    new Payment(
        'onlineBanking',
        {
            userId: 'user234',
            password: '1234567890asdf'
        }
    ),
    new Payment(
        'onlineBanking',
        {
            userId: 'user234',
        }
    ),
    new Payment(
        'onlineBan',
        {
            userId: 'user234',
            password: '1234567890asdf'
        }
    ),
];

payments.map((payment, index) => {
    console.log(`Payment id : #${index + 1}`)
    gatewayy.makePayment(payment);
})

