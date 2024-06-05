// script.js

// List of sentences to use in the game
const sentences = [
    "The cat sits on the mat.",
    "I love to read books.",
    "She sells seashells.",
    "We went to the park.",
    "They play soccer every day.",
    "He likes to eat apples.",
    "Can you see the stars?",
    "Birds fly in the sky.",
    "The dog is barking loudly.",
    "It is raining outside."
];

// Function to create a new sentence element
function createSentence() {
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    const sentenceElement = document.createElement('div');
    sentenceElement.className = 'sentence';
    sentenceElement.textContent = sentence;

    // Set a random horizontal position
    sentenceElement.style.left = Math.random() * 80 + '%';

    document.getElementById('game-area').appendChild(sentenceElement);
}

// Function to normalize text by removing punctuation and extra spaces
function normalizeText(text) {
    return text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
}

// Function to handle voice recognition
function setupVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = normalizeText(event.results[event.results.length - 1][0].transcript);
        const sentences = document.querySelectorAll('.sentence');

        // Append the transcription to the transcription area
        const transcriptionArea = document.getElementById('transcriptions');
        const transcriptionElement = document.createElement('div');
        transcriptionElement.textContent = transcript;
        transcriptionArea.appendChild(transcriptionElement);

        sentences.forEach(sentenceElement => {
            const normalizedText = normalizeText(sentenceElement.textContent);
            if (normalizedText === transcript) {
                sentenceElement.style.animation = 'none'; // Stop the animation
                sentenceElement.remove(); // Remove the sentence
            }
        });
    };

    recognition.start();
}

// Initialize the game
function initGame() {
    setInterval(createSentence, 2000);
    setupVoiceRecognition();
}

// Start the game when the page loads
window.onload = initGame;