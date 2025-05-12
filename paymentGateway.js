
// Interview — LLD + Machine Coding
// ---------------------------------
// Design a Payment Gateway system that supports different payment modes (Card, UPI, Netbanking). 
// Each payment mode should route to a different bank for processing. You should ensure:

// Input validation based on payment mode.
// Support for multiple banks with their own success/failure logic.
// A clean, object-oriented approach with extendable design (e.g., easily add a new bank/payment method later).

// Implement core classes and simulate a few test cases showing both success and failure scenarios.

// --------------------------------------------------------------------------------------------------

// pseudocode:
// create one paymentGateway class
// in that constructor, initialize the object of bankMap to setup various bank collections (bankmap needs to be encapsulated)
// then make 2 methods called makePayment and _validate.(the validate fn will be encapsulated)
// in makePayment method, take 2 params paymentMode and details
// pass the payment mode and details to _validate method first
// and check the validations like, the banks are valid with checking the bankmap
// and according to the bank the paymentDetails input is valid or not.
// and make 3 other classes for 3 banks
// in that class, make a process fn, 
// then make a random number to check about the success rate 70,80,90% wise
// then, use consoles also with that, and return the boolean from there
// in back - our gateway class,
// make an obect to this class(according to the bankmap obj)
// then call this process method from there. and assign it to a variable called success
// console - if success is not null, 'success', otherwise 'fail'
// then return this success var
// after these all, make an object for this payment gateway
// and make a payments data array
// then, hit this makePayment method to check the working.

class PaymentGateway {
    constructor() {
        this.bankMap = {
            card: new HSBCBank(),
            upi: new SIBBank(),
            netbanking: new AxisBank(),
        }
    }

    makePayment(paymentMode, paymentDetails) {     // public interface
        let bank = this.bankMap[paymentMode];
        if (!bank) {
            console.log("❌ Payment mode invalid");
            return false;
        }
        if (!this._validate(paymentMode, paymentDetails)) {
            console.log(`❌ Payment failed: Invalid or missing details for mode = ${paymentMode}`);
            return false;
        }

        // we are delegating the banks process from the payment gateway....
        let isSuccess = bank.process();
        console.log(isSuccess ? 'Payment success' : 'Payment failed');
        return isSuccess;
    }

    _validate(mode, details) {       // internal private logic (encapsulated)
        if (mode === 'card') {
            return details.cardNumber && details.cvv && details.expiry;
        } else if (mode === 'upi') {
            return details.vpa;
        } else if (mode === 'netbanking') {
            return details.userId && details.password;
        }
        return false;
    }
}

class HSBCBank {
    process() {
        let chance = Math.random();
        // 90% success rate for HSBC bank
        if (chance > 0.1) {
            console.log('✅ HSBC Bank: Bank payment processed successfully');
            return true;
        } else {
            console.log('❌ HSBC Bank: Bank payment failed due to Banks server down');
            return false;
        }
    }
}

class SIBBank {
    process() {
        let chance = Math.random();
        // 80% success rate for SIB bank
        if (chance > 0.2) {
            console.log('✅ SIB Bank: Bank payment processed successfully');
            return true;
        } else {
            console.log('❌ SIB Bank: Bank payment failed due to insufficient balance');
            return false;
        }
    }
}

class AxisBank {
    process() {
        let chance = Math.random();
        // 70% success rate for Axis bank
        if (chance > 0.3) {
            console.log('✅ Axis Bank: Bank payment processed successfully');
            return true;
        } else {
            console.log('❌ Axis Bank: Bank payment failed due to card blocked');
            return false;
        }
    }
}

// this code uses both abstraction and encapsulation. 
// I’ve abstracted away the internal logic by exposing only the makePayment() method, while encapsulating-
// the details like bankMap, _validate() and bank-specific implementations within their respective classes.

let gateway = new PaymentGateway();

let payments = [
    { mode: 'card', details: { cardNumber: '43276543', cvv: '234', expiry: '12/28' } },
    { mode: 'upi', details: { vpa: 'user@ybl' } },
    { mode: 'netbanking', details: { userId: 'vijayakanth', password: '23e*kdfk' } },
    { mode: 'netbanking', details: { userId: 'vijayakanth' } },
    { mode: 'netbankingfast', details: { userId: 'vijayakanth' } },
]

payments.forEach((payment, idx) => {
    console.log(`✅ Payment #${idx + 1} processed`);
    gateway.makePayment(payment.mode, payment.details);
});

