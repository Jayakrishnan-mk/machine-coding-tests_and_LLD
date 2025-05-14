

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
// atlast, for more oop compliance, make the payment class separate.


// 💳 Object-Oriented Payment Gateway with Payment class abstraction

class Payment {
    constructor(mode, details) {
        this.mode = mode;
        this.details = details;
    }

    isValid() {
        if (this.mode === 'card') {
            return this.details.cardNumber && this.details.cvv && this.details.expiry;
        } else if (this.mode === 'upi') {
            return this.details.vpa;
        } else if (this.mode === 'netbanking') {
            return this.details.userId && this.details.password;
        }
        return false;
    }
}

class HSBCBank {
    process() {
        let chance = Math.random();
        if (chance > 0.1) {
            console.log('✅ HSBC Bank: Payment processed successfully');
            return true;
        } else {
            console.log('❌ HSBC Bank: Payment failed due to server down');
            return false;
        }
    }
}

class SIBBank {
    process() {
        let chance = Math.random();
        if (chance > 0.2) {
            console.log('✅ SIB Bank: Payment processed successfully');
            return true;
        } else {
            console.log('❌ SIB Bank: Payment failed due to insufficient balance');
            return false;
        }
    }
}

class AxisBank {
    process() {
        let chance = Math.random();
        if (chance > 0.3) {
            console.log('✅ Axis Bank: Payment processed successfully');
            return true;
        } else {
            console.log('❌ Axis Bank: Payment failed due to card blocked');
            return false;
        }
    }
}

class PaymentGateway {
    constructor() {
        this.bankMap = {
            card: new HSBCBank(),
            upi: new SIBBank(),
            netbanking: new AxisBank(),
        };
    }

    makePayment(payment) {          // public interface
        const bank = this.bankMap[payment.mode];
        if (!bank) {
            console.log('❌ Invalid payment mode');
            return false;
        }

        if (!payment.isValid()) {
            console.log('❌ Invalid payment details');
            return false;
        }

        // we are delegating the banks process from the payment gateway....
        const success = bank.process();
        console.log(success ? '✅ Payment Success' : '❌ Payment Failed');
        return success;
    }
}

// this code uses both abstraction and encapsulation. 
// I’ve abstracted away the internal logic by exposing only the makePayment() method, while encapsulating-
// the details like bankMap, _validate() and bank-specific implementations within their respective classes.


// ✅ Testing with multiple payment types
const gateway = new PaymentGateway();

const payments = [
    new Payment('card', { cardNumber: '43276543', cvv: '234', expiry: '12/28' }),
    new Payment('upi', { vpa: 'user@ybl' }),
    new Payment('netbanking', { userId: 'vijayakanth', password: '23e*kdfk' }),
    new Payment('netbanking', { userId: 'vijayakanth' }), // Invalid
    new Payment('netbankingfast', { userId: 'vijayakanth' }) // Invalid mode
];

payments.forEach((payment, idx) => {
    console.log(`\n=== Payment #${idx + 1} ===`);
    gateway.makePayment(payment);
});




//      UML Class Diagram
//      =================
        
//      +--------------------+
//      |  PaymentGateway    |
//      +--------------------+
//      | - bankMap          |
//      +--------------------+
//      | + makePayment()    |
//      | + _validate()      |
//      +--------------------+
//              |
//              |
//              | uses
//              ↓
//      +--------------+   +--------------+   +--------------+
//      |  HSBCBank    |   |  SIBBank     |   |  AxisBank    |
//      +--------------+   +--------------+   +--------------+
//      | + process()  |   | + process()  |   | + process()  |
//      +--------------+   +--------------+   +--------------+

