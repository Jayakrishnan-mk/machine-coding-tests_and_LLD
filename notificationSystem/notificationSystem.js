
// Interview — LLD + Machine Coding
// ---------------------------------
// 🎬 Design a Notification system


// create an interface for notificationChannel
// then create proper, email class, push class, and notification class/manager
// create a class Notification for the interface



class NotificationChannel {
    sendNotification(notification) {
        throw new Error("sendNotification must be implemented")
    }
}

class EmailChannel extends NotificationChannel {
    async sendNotification(notification) {
        await retry(async () => {
            console.log(`Trying to send EMAIL to ${notification.recipient}...`);

            // Simulate failure randomly
            if (Math.random() < 0.3) throw new Error("Email service failed.")
            console.log(`EMAIL Sent to ${notification.recipient}: ${notification.subject || ''} - ${notification.message}`);
        }, 3); // 3 attempts max
    }
}

class PushChannel extends NotificationChannel {
    async sendNotification(notification) {
        await retry(async () => {
            console.log(`Trying to Push notification to ${notification.recipient}...`);

            // Simulate failure randomly
            if (Math.random() < 0.5) throw new Error("Push service failed.")
            console.log(`Notification pushed to ${notification.recipient}: } - ${notification.message}`);
        }, 3); // 3 attempts max
    }
}

class SMSChannel extends NotificationChannel {
    async sendNotification(notification) {
        await retry(async () => {
            console.log(`Trying to Send sms to ${notification.recipient}...`);

            // Simulate failure randomly
            if (Math.random() < 0.1) throw new Error("SMS service failed.")
            console.log(`SMS Sent to ${notification.recipient}: } - ${notification.message}`);
        }, 3); // 3 attempts max
    }
}

class AppNotification {
    constructor(recipient, subject, message) {
        this.recipient = recipient;
        this.message = message;
        this.subject = subject;
    }
}

class NotificationManager {
    constructor(channels) {
        this.channels = channels;
    }

    async send(notification) {
        for (const channel of this.channels) {
            try {
                await channel.sendNotification(notification);
            } catch (error) {
                console.error(`Failed to send notification via ${channel.constructor.name}:`, error.message);
            }
        }
    }
}

// retry functionality - reusable....

function retry(fn, retries = 3, delay = 500) {  // 500 ms delay
    return new Promise(async (resolve, reject) => {
        while (retries > 0) {
            try {
                const result = await fn()
                return resolve(result)
            } catch (error) {
                retries--;
                if (retries === 0) {
                    return reject(error);
                }
                if (delay) await new Promise(res => setTimeout(res, delay));
            }
        }
    })
}

// IIFE....
(async () => {
    const emailChannel = new EmailChannel();
    const pushChannel = new PushChannel();
    const smsChannel = new SMSChannel();
    const manager = new NotificationManager([emailChannel, pushChannel, smsChannel]);

    const notification = new AppNotification("user@example.com", "Welcome to our platform!", "Greetings");

    await manager.send(notification);
})();

