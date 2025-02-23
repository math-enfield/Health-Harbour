// Add this at the very beginning of your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle button and chatbot box
    const toggleButton = document.getElementById('chatbotToggle');
    const chatbot = document.getElementById('chatbot');

    // Add click event listener to toggle button
    toggleButton.addEventListener('click', function() {
        chatbot.classList.toggle('active');
        if (chatbot.classList.contains('active')) {
            // Clear previous messages and start new diagnosis
            document.getElementById('chatMessages').innerHTML = '';
            addMessage('bot', "Hello! I'm your health assistant. Let's figure out what's bothering you.");
            startNewDiagnosis();
        }
    });
});

const healthDatabase = {
    'general': {
        initialQuestions: [
            {
                question: "What type of symptoms are you experiencing?",
                options: [
                    "Pain or Discomfort",
                    "Fever or Temperature",
                    "Respiratory Issues",
                    "Digestive Problems",
                    "Skin Issues"
                ]
            }
        ]
    },
    'pain': {
        questions: [
            {
                question: "Where is the pain located?",
                options: [
                    "Head/Migraine",
                    "Chest",
                    "Stomach",
                    "Joints/Muscles",
                    "Back"
                ]
            }
        ]
    },
    'fever': {
        questions: [
            {
                question: "What is your temperature?",
                options: [
                    "37.5-38°C (99.5-100.4°F)",
                    "38-39°C (100.4-102.2°F)",
                    "Above 39°C (102.2°F)",
                    "Not sure but feeling hot",
                    "Having chills"
                ]
            }
        ]
    }
};

let currentState = {
    stage: 'initial',
    category: null,
    answers: [],
    questionIndex: 0
};

function addMessage(type, text, options = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    // Add text message
    const textDiv = document.createElement('div');
    textDiv.innerHTML = text.replace(/\n/g, '<br>');
    messageDiv.appendChild(textDiv);
    
    // Add options if they exist
    if (options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'option-buttons';
        
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.onclick = () => handleOptionClick(index + 1, button);
            optionsDiv.appendChild(button);
        });
        
        messageDiv.appendChild(optionsDiv);
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleOptionClick(optionNumber, clickedButton) {
    // Remove selected class from all buttons in the same group
    const parentDiv = clickedButton.parentElement;
    parentDiv.querySelectorAll('.option-button').forEach(button => {
        button.classList.remove('selected-option');
    });
    
    // Add selected class to clicked button
    clickedButton.classList.add('selected-option');

    // Disable all buttons in this option group after selection
    parentDiv.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
    });

    // Process the selection
    processSelection(optionNumber);
}

function processSelection(optionNumber) {
    switch(currentState.stage) {
        case 'initial':
            handleInitialResponse(optionNumber);
            break;
        case 'questioning':
            handleQuestionResponse(optionNumber);
            break;
        case 'completed':
            startNewDiagnosis();
            break;
    }
}

function handleInitialResponse(optionNumber) {
    currentState.category = optionNumber === 1 ? 'pain' : 'fever';
    currentState.stage = 'questioning';
    currentState.questionIndex = 0;
    askNextQuestion();
}

function handleQuestionResponse(optionNumber) {
    currentState.answers.push(optionNumber);
    
    if (currentState.questionIndex < healthDatabase[currentState.category].questions.length - 1) {
        currentState.questionIndex++;
        askNextQuestion();
    } else {
        provideDiagnosis();
    }
}

function askNextQuestion() {
    const category = healthDatabase[currentState.category];
    const question = category.questions[currentState.questionIndex];
    addMessage('bot', question.question, question.options);
}

function provideDiagnosis() {
    const diagnosis = generateDiagnosis();
    addMessage('bot', diagnosis);
    
    // Add restart option
    addMessage('bot', "Would you like to start a new diagnosis?", ["Yes", "No"]);
    currentState.stage = 'completed';
}

function generateDiagnosis() {
    // Add your diagnosis logic here
    return "Based on your symptoms, here are my recommendations:\n\n" +
           "1. Rest and stay hydrated\n" +
           "2. Take over-the-counter medication if needed\n" +
           "3. Monitor your symptoms\n\n" +
           "Recommended doctor: General Physician\n" +
           "Urgency: Moderate";
}

function startNewDiagnosis() {
    currentState = {
        stage: 'initial',
        category: null,
        answers: [],
        questionIndex: 0
    };

    const initialQuestion = healthDatabase.general.initialQuestions[0];
    addMessage('bot', initialQuestion.question, initialQuestion.options);
} 