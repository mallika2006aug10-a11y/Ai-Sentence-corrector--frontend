const sentenceInput = document.getElementById("sentenceInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const result = document.getElementById("result");


// Character and word counter
sentenceInput.addEventListener("input", function () {

    const text = sentenceInput.value;

    charCount.textContent = text.length + " / 1000";

    const words = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    wordCount.textContent = words + " words";
});


// Check sentence
checkBtn.addEventListener("click", async function () {

    const text = sentenceInput.value.trim();

    if (text === "") {
        result.textContent = "Please enter a sentence first.";
        return;
    }

    result.textContent = "Checking...";

    try {

        const response = await fetch(
            "https://ai-sentence-corrector-2.onrender.com/api/check",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            result.textContent = data.error || "Something went wrong.";
            return;
        }

        result.textContent = data.text;

    } catch (error) {

        result.textContent = "Unable to connect to the server.";

    }
});


// Clear button
clearBtn.addEventListener("click", function () {

    sentenceInput.value = "";

    charCount.textContent = "0 / 1000";
    wordCount.textContent = "0 words";

    result.textContent =
        "Your corrected sentence will appear here.";
});


// Copy button
copyBtn.addEventListener("click", async function () {

    const text = result.textContent;

    if (
        text === "Your corrected sentence will appear here." ||
        text === "Please enter a sentence first."
    ) {
        return;
    }

    await navigator.clipboard.writeText(text);

    copyBtn.textContent = "Copied!";

    setTimeout(function () {
        copyBtn.textContent = "Copy";
    }, 1500);
});
