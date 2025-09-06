// freefire.js
// Free Fire সম্পর্কিত রিপ্লাই দেওয়ার জন্য আলাদা মডিউল

function freeFireBot(message) {
    message = message.toLowerCase();

    if (message.includes("free fire")) {
        return "🔥 Free Fire একটা জনপ্রিয় ব্যাটল রয়্যাল গেম!";
    } 
    else if (message.includes("id")) {
        return "👉 তোমার Free Fire আইডি লিখে দাও!";
    } 
    else if (message.includes("diamond")) {
        return "💎 ডায়মন্ড কিনতে হলে অফিসিয়াল উপায় ব্যবহার করো। হ্যাক/টুল ব্যবহার করলে অ্যাকাউন্ট ব্যান হতে পারে!";
    } 
    else {
        return "🤖 আমি শুধু Free Fire নিয়ে কথা বলি। 'help' লিখে দেখো!";
    }
}

module.exports = freeFireBot;
