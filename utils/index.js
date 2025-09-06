const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const schedule = require('node-schedule');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// =====================
//  প্রশ্ন-উত্তর ডাটাবেস
// =====================
const responses = {
    "হ্যালো": "হ্যালো! কেমন আছো? 😊",
    "কেমন আছো": "আমি ভালো আছি, তুমি কেমন আছো? 😄",
    "ইসলামিক ভিডিও": "এখানে ইসলামিক ভিডিও লিংক থাকবে। 📹",
    "কষ্ট": "💔 জীবন সবসময় সহজ নয়, ধৈর্য ধরো।",
    "হাসি": "😆 জীবনটা হাসি দিয়ে সুন্দর রাখো!",
    "ঠাট্টা": "😜 তুমি ঠিক মজা করছো!"
};

// =====================
//  নামাজের সময়
// =====================
const namazTimes = {
    "ফজর": "04:30",
    "যোহর": "12:30",
    "আসর": "16:00",
    "মাগরিব": "18:15",
    "এশা": "19:30"
};

// =====================
//  Messenger Webhook ভেরিফিকেশন
// =====================
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN";
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Webhook verified!');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// =====================
//  Messenger POST হ্যান্ডলিং
// =====================
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            const senderPsid = webhookEvent.sender.id;

            if (webhookEvent.message && webhookEvent.message.text) {
                handleMessage(senderPsid, webhookEvent.message.text);
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// =====================
//  ইউজারের মেসেজ প্রক্রিয়াকরণ
// =====================
function handleMessage(senderPsid, receivedMessage) {
    const userMessage = receivedMessage.toLowerCase();
    let reply = responses[userMessage] || "দুঃখিত, আমি সেটা বুঝতে পারিনি। 🤔";

    callSendAPI(senderPsid, reply);
}

// =====================
//  Messenger API এ উত্তর পাঠানো
// =====================
function callSendAPI(senderPsid, response) {
    const PAGE_ACCESS_TOKEN = "YOUR_PAGE_ACCESS_TOKEN";
    const requestBody = {
        recipient: { id: senderPsid },
        message: { text: response }
    };

    fetch(`https://graph.facebook.com/v16.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}

// =====================
//  নামাজের সময় অ্যালার্ম সেটআপ
// =====================
function scheduleNamazAlerts(senderPsid) {
    Object.keys(namazTimes).forEach(namaz => {
        const time = namazTimes[namaz].split(':');
        schedule.scheduleJob({ hour: parseInt(time[0]), minute: parseInt(time[1]) }, () => {
            callSendAPI(senderPsid, `🕌 সময় হয়েছে ${namaz} নামাজের!`);
        });
    });
}

// =====================
//  প্রতি ঘন্টায় মজার সংকেত
// =====================
function scheduleHourlyFun(senderPsid) {
    schedule.scheduleJob('0 * * * *', () => { // প্রতি ঘন্টায়
        const funMessages = [
            "😂 আজও হাসতে ভোলো না!",
            "😜 একটু মজা করা যাক!",
            "😆 জীবনটা হালকা রাখো!",
            "🤣 একটু ঠাট্টা করো, মন খুশি থাকবে!"
        ];
        const msg = funMessages[Math.floor(Math.random() * funMessages.length)];
        callSendAPI(senderPsid, msg);
    });
}

// =====================
//  উদাহরণ senderPsid দিয়ে চালানো (লেখার জন্য)
// =====================
const exampleUserPsid = "RECIPIENT_PSID"; // তুমি ইউজারের PSID বসাবে
scheduleNamazAlerts(exampleUserPsid);
scheduleHourlyFun(exampleUserPsid);

// =====================
//  সার্ভার চালু করা
// =====================
app.listen(PORT, () => {
    console.log(`Messenger Bot is running on port ${PORT}`);
});
