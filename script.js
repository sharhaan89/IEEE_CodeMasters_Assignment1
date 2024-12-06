const card = document.getElementById("card");
const date = document.getElementById("date");
const time = document.getElementById("time");
const advice = document.getElementById("advice");

const adviceButton = document.getElementById("adviceButton");
const resetButton = document.getElementById("resetButton");
const tweetButton = document.getElementById("tweetButton");
tweetButton.classList.add("hidden");

let text = "";

adviceButton.addEventListener("click", () => {
    fetch("https://api.adviceslip.com/advice")
        .then((res) => res.json())
        .then((data) => {
            const now = new Date();
            const dateString = "Date: " + now.toLocaleDateString();
            const timeString = "Time: " + now.toLocaleTimeString();
            
            text = data.slip.advice;
            advice.textContent = text;
            date.textContent = dateString;
            time.textContent = timeString;
            tweetButton.classList.remove("hidden");
        })
        .catch((err) => {
            console.log("Some error occurred in fetching the advice: ", err);
        });
});

resetButton.addEventListener("click", () => {
    location.reload();    
});

tweetButton.addEventListener("click", function() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, "_blank");
});

