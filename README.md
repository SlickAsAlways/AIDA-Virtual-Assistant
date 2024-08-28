<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIDA</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        :root {
    /* Light theme colors */
    --background-color: #f4f4f6;
    --chat-background: #ffffff;
    --message-background: #f8f8f8;
    --message-hover: #f1f1f1;
    --text-color: #333;
    --button-background: #38b6ff;
    --button-hover: #83858c;
    --divider-color: #ddd;
    --warning-color: #888;
    --spinner-border: rgba(0, 0, 0, 0.1);
    --spinner-left: #007bff;

    /* Dark theme colors */
    --dark-background-color: #1e1e1e;
    --dark-chat-background: #2c2c2c;
    --dark-message-background: #3c3c3c;
    --dark-message-hover: #4c4c4c;
    --dark-text-color: #e0e0e0;
    --dark-button-background: #38b6ff;
    --dark-button-hover: #83858c;
    --dark-divider-color: #444;
    --dark-warning-color: #ccc;
    --dark-spinner-border: rgba(255, 255, 255, 0.1);
    --dark-spinner-left: #007bff;
}


        body, h1, div {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
        }

       /* Sidebar styles */
#sidebar {
    position: fixed;
    top: 0;
    left: -250px; /* Hidden by default */
    width: 250px;
    height: 100%;
    background-color: var(--chat-background);
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s ease, opacity 0.3s ease; /* Updated transition properties */
    z-index: 1000;
    padding: 20px;
    opacity: 0;
}

#sidebar.open {
    transform: translateX(250px); /* Smoothly translate the sidebar in */
    opacity: 1; /* Fade in */
}

#sidebar .close-btn {
    font-size: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    transition: color 0.3s ease;
    position: absolute;
    top: 20px;
    right: 20px;
}

#sidebar .close-btn:hover {
    color: var(--button-background);
}

#sidebar ul {
    list-style: none;
    padding: 0;
    margin-top: 60px; /* Adjust margin to position the list below the close button */
}

#sidebar ul li {
    margin: 15px 0;
}

#sidebar ul li a {
    text-decoration: none;
    color: var(--text-color);
    font-size: 18px;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
}

#sidebar ul li a i {
    margin-right: 15px; /* Add some spacing between icon and text */
    font-size: 24px;
    transition: color 0.3s ease;
}

#sidebar ul li a:hover i {
    color: var(--button-background);
}

#sidebar ul li button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background);
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

#sidebar ul li button:hover {
    background-color: var(--button-hover);
}

/* Dark theme button styles */
body.dark-mode #sidebar ul li button {
    background-color: var(--dark-button-background);
}

body.dark-mode #sidebar ul li button:hover {
    background-color: var(--dark-button-hover);
}

/* Additional styling for better UX */
#sidebar ul li button, #sidebar ul li a {
    transition: transform 0.3s ease; /* Add hover effect for scaling */
}

#sidebar ul li button:hover, #sidebar ul li a:hover {
    transform: scale(1.05); /* Slightly scale up the element on hover */
}


        .container img.logo {
            max-width: 6%;
            position: absolute;
            left: 50px;
            bottom: 550px;
            height: auto;
            margin-bottom: 20px;
            cursor: pointer;
        }

        #chat-box {
            padding: 10px;
            height: 400px;
            width: 800px;
            position: absolute;
            left: 320px;
            overflow-y: auto;
            background: transparent;
            margin-bottom: 10px;
        }

        #chat-history {
            display: flex;
            background: transparent;
            flex-direction: column;
            gap: 10px;
        }

        .message {
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 75%;
            word-wrap: break-word;
            font-size: 16px;
            line-height: 1.4;
            display: flex;
            align-items: flex-start;
            background-color: var(--message-background);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: background-color 0.3s ease;
        }

        .message:hover {
            background-color: var(--message-hover);
        }

        .message img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .message .content {
            display: flex;
            background: transparent;
            flex-direction: column;
            width: 100%;
        }

        .message .response-text {
            margin-bottom: 5px;
            background: transparent;

        }

        .message .options {
            display: flex;
            justify-content: center;
            gap: 15px;
            padding-top: 5px;
            border-top: 1px solid var(--divider-color);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .message .options button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 20px;
            color: var(--text-color);
            transition: color 0.3s ease;
        }

        .message .options button:hover {
            color: var(--button-background);
        }

        .message.show-options .options {
            opacity: 1;
        }

        .user {
            align-self: flex-end;
            text-align: right;
            margin-left: auto;
        }

        .assistant {
            align-self: flex-start;
            text-align: left;
        }

        .divider {
            height: 1px;
            background-color: var(--divider-color);
            margin: 10px 0;
            width: 100%;
        }

        .spinner {
            border: 4px solid var(--spinner-border);
            border-left: 4px solid var(--spinner-left);
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        #user-input-container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 50%;
            bottom: 60px;
            transform: translateX(-50%);
            width: 740px;
            height: 80px;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        #user-input {
            flex: 1;
            padding: 12px 15px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            outline: none;
            background-color: #f0f0f0;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            padding-left: 45px;
            background-image: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/solid/microphone.svg');
            background-position: 15px center;
            background-repeat: no-repeat;
            color: #333;
        }

        #user-input:focus {
            background-color: #fff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
        }

        #send-button {
            margin-left: 10px;
            padding: 12px 15px;
            border: none;
            border-radius: 50%;
            background-color: var(--button-background);
            color: #fff;
            cursor: pointer;
            font-size: 18px;
            transition: background-color 0.3s ease, transform 0.3s ease;
        }

        #send-button i {
            margin: 0;
        }

        #send-button:hover {
            background-color: var(--button-hover);
            transform: scale(1.1);
        }

        #suggestion-buttons {
            margin: 15px 0;
            position: absolute;
            bottom: 160px;
            left: 420px;
            background: transparent;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }

        #suggestion-buttons button {
            padding: 8px 12px;
            border: none;
            border-radius: 10px;
            background-color: var(--button-background);
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }

        #suggestion-buttons button:hover {
            background-color: var(--button-hover);
        }

        #accuracy-warning {
            position: absolute;
            left: 50%;
            bottom: 10px;
            background: transparent;
            transform: translateX(-50%);
            font-size: 12px;
            color: var(--warning-color);
            text-align: center;
        }

        #title-container h1 {
            margin: 0;
            position: absolute;
            left: 390px;
            bottom: 401px;
            padding: 10px 20px;
            font-size: 56px;
            background: linear-gradient(to right, var(--button-background), var(--button-hover)); /* Gradient colors */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: inline-block;
        }

        /* Dark theme */
        body.dark-mode {
            background-color: var(--dark-background-color);
        }

        body.dark-mode {
            color: var(--dark-text-color);
        }

        body.dark-mode #chat-box {
            background-color: var(--dark-chat-background);
            background: transparent;
        }

        body.dark-mode .message .options {
            background-color: var(--dark-chat-background);
            background: transparent;
        }

        body.dark-mode .message {
            background-color: var(--dark-message-background);
            color: var(--dark-text-color);
        }

        body.dark-mode .message .response-text {
            background-color: var(--dark-message-background);
            color: var(--dark-text-color);
        }

        body.dark-mode .message:hover {
            background-color: var(--dark-message-hover);
        }

        body.dark-mode .divider {
            background-color: var(--dark-divider-color);
        }

        body.dark-mode #user-input-container {
            background-color: rgba(44, 44, 44, 0.9);
        }

        body.dark-mode #user-input {
            background-color: #333;
            color: #e0e0e0;
        }

        body.dark-mode #send-button {
            background-color: var(--dark-button-background);
        }

        body.dark-mode #send-button:hover {
            background-color: var(--dark-button-hover);
        }

        body.dark-mode #accuracy-warning {
            color: var(--dark-warning-color);
        }

        body.dark-mode #title-container h1 {

        }

        body.dark-mode #sidebar {
            background-color: var(--dark-chat-background);
            background: transparent;
        }

        /* Add this to your existing CSS */
        .hidden {
            display: none;
        }

        #title-container.show {
            display: block;
        }

        #chat-box.show {
            display: block;
        }

        #sidebar ul li {
    margin: 15px 0;
}

#sidebar ul li button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background);
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

#sidebar ul li button:hover {
    background-color: var(--button-hover);
}

        /* Light and Dark mode button styles */
#sidebar ul li button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background);
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

#sidebar ul li button:hover {
    background-color: var(--button-hover);
}

/* Dark theme button styles */
body.dark-mode #sidebar ul li button {
    background-color: var(--dark-button-background);
}

body.dark-mode #sidebar ul li button:hover {
    background-color: var(--dark-button-hover);
}

/* Button icons styling */
#sidebar ul li a {
    display: flex;
    position: relative;
    bottom: -400px;
    left: 87px;
    gap: 7%;
    align-items: center;
    text-decoration: none;
}

#sidebar ul li a i {
    color: var(--text-color);
    font-size: 24px;
    transition: color 0.3s ease;
}

#sidebar ul li a:hover i {
    color: var(--button-background);
}

/* Dark theme icon styles */
body.dark-mode #sidebar ul li a i {
    color: var(--dark-text-color);
}

body.dark-mode #sidebar ul li a:hover i {
    color: var(--dark-button-background);
}

        /* Font import */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

/* Default font family */
body, h1, div {
    font-family: Montserrat, Arial, sans-serif;
}

/* Sidebar button styles */
#sidebar ul li a, #sidebar ul li button {
    font-family: Montserrat, Arial, sans-serif;
    font-weight: 600; /* Bold weight for better emphasis */
}

/* Existing CSS for other elements */
#sidebar ul li a {
    text-decoration: none;
    color: var(--text-color);
    font-size: 18px;
    transition: color 0.3s ease;
}

#sidebar ul li a:hover {
    color: var(--button-background);
}

#sidebar ul li button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-background);
    color: #fff;
    cursor: pointer;
    font-size: 11px;
    transition: background-color 0.3s ease;
}

#sidebar ul li button:hover {
    background-color: var(--button-hover);
}

/* Dark theme button styles */
body.dark-mode #sidebar ul li button {
    background-color: var(--dark-button-background);
}

body.dark-mode #sidebar ul li button:hover {
    background-color: var(--dark-button-hover);
}

        /* Toggle Switch Styles */
/* Toggle Switch Styles */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--button-background);
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--button-hover);
}

input:checked + .slider:before {
    transform: translateX(26px);
}

/* Dark mode styles for toggle */
body.dark-mode .switch .slider {
    background-color: var(--dark-button-background);
}

body.dark-mode .switch input:checked + .slider {
    background-color: var(--dark-button-hover);
}

/* Styling for theme label */
#theme-label {
    margin-left: 10px;
    font-size: 16px;
    color: var(--text-color);
    vertical-align: middle;
}

/* Dark mode styling for the theme label */
body.dark-mode #theme-label {
    color: var(--dark-text-color);
}


           /* Settings menu styles */
        #settings-menu {
            position: absolute;
            top: 500px;
            left: 150px;
            display: none;
            width: 200px;
            padding: 10px;
            background-color: var(--chat-background);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            z-index: 1001;
        }

        #settings-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        #settings-menu ul li {
            margin: 10px 0;
        }

        #settings-menu ul li a {
            text-decoration: none;
            color: var(--text-color);
            font-size: 16px;
            transition: color 0.3s ease;
        }

        #settings-menu ul li a:hover {
            color: var(--button-background);
        }

        /* Dark theme settings menu */
        body.dark-mode #settings-menu {
            background-color: var(--dark-chat-background);
        }

        body.dark-mode #settings-menu ul li a {
            color: var(--dark-text-color);
        }

        body.dark-mode #settings-menu ul li a:hover {
            color: var(--dark-button-background);
        }

        /* Custom Scrollbar Styles */
#chat-box::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
}

#chat-box::-webkit-scrollbar-thumb {
    background-color: var(--button-background); /* Scrollbar thumb color */
    border-radius: 10px; /* Round the scrollbar thumb */
    border: 2px solid var(--message-background); /* Add padding around the thumb */
}

#chat-box::-webkit-scrollbar-thumb:hover {
    background-color: var(--button-hover); /* Thumb color on hover */
}

#chat-box::-webkit-scrollbar-track {
    background-color: var(--chat-background); /* Scrollbar track color */
    border-radius: 10px; /* Round the scrollbar track */
}

#chat-box {
    scrollbar-width: thin; /* For Firefox: set scrollbar width */
    scrollbar-color: var(--button-background) var(--chat-background); /* For Firefox: thumb and track color */
}


.Btn {
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: -400px;
  left: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: .4s;
  cursor: pointer;
  position: relative;
  background-color: rgb(31, 31, 31);
  overflow: hidden;
}

.svgIcon {
  transition-duration: .3s;
}

.svgIcon path {
  fill: white;
}

.text {
  position: absolute;
  color: rgb(255, 255, 255);
  width: 120px;
  font-weight: 600;
  opacity: 0;
  transition-duration: .4s;
}

.Btn:hover {
  width: 110px;
  transition-duration: .4s;
  border-radius: 30px;
}

.Btn:hover .text {
  opacity: 1;
  transition-duration: .4s;
}

.Btn:hover .svgIcon {
  opacity: 0;
  transition-duration: .3s;
}

    </style>
</head>
<body>
      <div id="sidebar">
        <button class="close-btn" onclick="toggleSidebar()">&times;</button>
        <ul>

            <li><button id="new-chat-button" onclick="newChat()">New Chat</button></li>
            <li><a href="#" id="settings-button" onclick="toggleSettingsMenu()"><i class="fas fa-cogs"></i></a></li>
            <li><a href="#" id="help-button" onclick="openHelp()"><i class="fas fa-question-circle"></i></a></li>
            <li><a href="#" id="account-button" onclick="openAccount()"><i class="fas fa-user"></i></a></li>

    <a href="https://github.com/SlickAsAlways" target="_blank">
    <button class="Btn">
      <svg class="svgIcon" viewBox="0 0 496 512" height="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.4 17.3-12 0-5.9-.3-25.9-.3-47.1-67.3 14.8-81.6-16.3-86.5-31.3-2.9-7.2-15.5-30.8-26.4-37-9-4.9-21.9-16.9-.3-17.3 20.3-.3 34.7 18.6 39.6 26.3 23.2 39.5 60.2 28.3 75.1 21.5 2.3-16.8 9-28.3 16.3-34.8-59.8-6.7-122.5-29.9-122.5-133.1 0-29.5 10.5-54.1 27.6-73.3-2.6-6.7-12-33.8 2.6-70.3 0 0 22.6-7.2 73.9 28 21.9-6.1 45.5-9 69.2-9s47.3 3 69.2 9c51.2-35.2 73.9-28 73.9-28 14.6 36.5 5.2 63.6 2.6 70.3 17.1 19.2 27.6 43.8 27.6 73.3 0 103.9-63 126.4-123.2 133.1 9 7.7 17.1 22.9 17.1 46.1 0 33.3-.3 60.2-.3 69.2 0 6.7 4.6 14.6 17.3 12C426.2 457.8 496 362.9 496 252 496 113.3 383.9 8 244.8 8z"/>
      </svg>
      <span class="text">GitHub</span>
    </button>
  </a>
        </ul>

    </div>


   <!-- Settings Menu -->
<div id="settings-menu">
    <ul>
        <li>
            <label class="switch">
                <input type="checkbox" id="theme-toggle" onclick="toggleTheme()">
                <span class="slider"></span>
            </label>
            <span id="theme-label">Dark mode</span>
        </li>
    </ul>
</div>

    <div class="container">
        <img src="aida.png" alt="Logo" class="logo" id="aida-logo" onclick="toggleSidebar()">


        <div id="title-container">
            <h1>Hello, How can I help?</h1>
        </div>

        <div id="suggestion-buttons">
            <button onclick="suggestionClicked('Find me a file')">Find me a file</button>
            <button onclick="suggestionClicked('Create me a new site')">Create me a new site</button>
            <button onclick="suggestionClicked('Share a folder')">Share a folder</button>
            <button onclick="suggestionClicked('Create me a new task')">Create me a new task</button>
        </div>

        <div id="chat-box">
            <div id="chat-history"></div>
        </div>

        <div id="user-input-container">
            <input type="text" id="user-input" placeholder="How can I help?..." autofocus>
            <button id="send-button"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

    <div id="accuracy-warning">
        AIDA is not always accurate always check important info.
    </div>


    <script>
   function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const logo = document.getElementById('aida-logo');

    sidebar.classList.toggle('open');

    // Hide logo when sidebar is open, show it when sidebar is closed
    if (sidebar.classList.contains('open')) {
        logo.style.display = 'none';
    } else {
        logo.style.display = 'block';
    }
}


        // Function to scroll to the bottom of the chat history
        function scrollToBottom() {
            const chatHistory = document.getElementById('chat-history');
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        // Function to send the message
        async function sendMessage() {
            const userInput = document.getElementById('user-input').value;
            if (!userInput) return;

            // Hide the title and show the chat box
            document.getElementById('title-container').classList.add('hidden');
            document.getElementById('chat-box').classList.add('show');

            const chatHistory = document.getElementById('chat-history');

            // Add user input to chat history
            chatHistory.innerHTML += `
                <div class="message user">
                    <img src="profileicon.png" alt="User Icon">
                    <div class="content">
                        <div class="response-text"><strong>User:</strong> ${userInput}</div>
                    </div>
                </div>`;



            // Scroll to the bottom after adding user message
            scrollToBottom();

            // Add divider
            chatHistory.innerHTML += `<div class="divider"></div>`;

            // Scroll to the bottom after adding divider
            scrollToBottom();

            // Add typing indicator
            const typingContainer = document.createElement('div');
            typingContainer.className = 'spinner';
            const assistantMessage = document.createElement('div');
            assistantMessage.className = 'message assistant';
            assistantMessage.innerHTML = `
                <img src="aida.png" alt="Assistant Icon">
                <div class="content">
                    <div class="response-text"><strong>AIDA:</strong> <div class="spinner"></div></div>
                    <div class="options">
                        <button onclick="copyText(this)"><i class="fas fa-copy"></i></button>
                        <button onclick="shareText(this)"><i class="fas fa-share-alt"></i></button>
                        <button onclick="thumbUp(this)"><i class="fas fa-thumbs-up"></i></button>
                        <button onclick="thumbDown(this)"><i class="fas fa-thumbs-down"></i></button>
                    </div>
                </div>`;

            chatHistory.appendChild(assistantMessage);

            // Scroll to the bottom after adding assistant message
            scrollToBottom();

            try {
                const response = await fetch('/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: userInput })
                });
                const data = await response.json();

                // Remove typing indicator
                assistantMessage.querySelector('.spinner').remove();

                if (data.response) {
                    const assistantResponse = data.response;
                    const responseTextDiv = assistantMessage.querySelector('.response-text');
                    let index = 0;
                    const typingSpeed = 30; // Speed in milliseconds per character

                    function typeCharacter() {
                        if (index < assistantResponse.length) {
                            responseTextDiv.innerHTML += assistantResponse[index++];
                            setTimeout(typeCharacter, typingSpeed);
                        } else {
                            // Show options after response is fully typed
                            assistantMessage.classList.add('show-options');
                        }
                        // Scroll to the bottom during typing
                        scrollToBottom();
                    }

                    typeCharacter();
                } else {
                    chatHistory.innerHTML += `<div class="message assistant">Sorry, I didn't understand that.</div>`;
                    chatHistory.innerHTML += `<div class="divider"></div>`;

                    // Scroll to the bottom after error message
                    scrollToBottom();
                }
            } catch (error) {
                // Remove typing indicator
                assistantMessage.querySelector('.spinner').remove();

                chatHistory.innerHTML += `<div class="message assistant">There was an error.</div>`;
                chatHistory.innerHTML += `<div class="divider"></div>`;

                // Scroll to the bottom after error message
                scrollToBottom();
            }

            // Clear the input field
            document.getElementById('user-input').value = '';

            // Scroll to the bottom after clearing input
            scrollToBottom();
        }

        // Event listener for the send button
        document.getElementById('send-button').addEventListener('click', sendMessage);

        // Event listener for the Enter key
        document.getElementById('user-input').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default form submission
                sendMessage();
            }
        });

        // Functions for action buttons
        function copyText(element) {
            const textToCopy = element.closest('.content').querySelector('.response-text').textContent.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Text copied to clipboard');
            }).catch(err => {
                console.error('Error copying text: ', err);
            });
        }

        function shareText(element) {
            const textToShare = element.closest('.content').querySelector('.response-text').textContent.trim();
            if (navigator.share) {
                navigator.share({
                    title: 'AIDA Response',
                    text: textToShare
                }).catch(error => {
                    console.error('Error sharing text: ', error);
                });
            } else {
                alert('Share not supported on this browser. Copy the text manually.');
            }
        }

        function thumbUp(element) {
            alert('You liked this response');
        }

        function thumbDown(element) {
            alert('You disliked this response');
        }

        // Function for suggestion button clicks
        function suggestionClicked(text) {
            const userInput = document.getElementById('user-input');
            userInput.value = text;
            sendMessage(); // Automatically send the message
        }

        // Function to toggle theme
        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        }

        // Load theme from localStorage
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }

        // Load theme on page load
        loadTheme();

        // Function to reset chat
function newChat() {
    const chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML = ''; // Clear chat history

    // Hide the chat box and show the title
    document.getElementById('chat-box').classList.remove('show');
    document.getElementById('title-container').classList.remove('hidden');

    // Clear the input field
    document.getElementById('user-input').value = '';
}

          // Function to toggle the settings menu
        function toggleSettingsMenu() {
            const settingsMenu = document.getElementById('settings-menu');
            settingsMenu.style.display = (settingsMenu.style.display === 'block') ? 'none' : 'block';
        }

        // Close settings menu when clicking outside of it
        document.addEventListener('click', function(event) {
            const settingsButton = document.getElementById('settings-button');
            const settingsMenu = document.getElementById('settings-menu');
            if (!settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
                settingsMenu.style.display = 'none';
            }
        });



    </script>
</body>
</html>
