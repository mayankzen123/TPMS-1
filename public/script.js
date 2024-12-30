// Initialize Socket.io connection
const socket = io();

// Listen for incoming messages
socket.on('message', (data) => {
    appendMessage(data);
});

// Function to append messages to the chat
function appendMessage(data) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${data.name}: ${data.message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Handle form submission
document.getElementById('dataForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        message: document.getElementById('message').value
    };

    // Send message through WebSocket
    socket.emit('message', data);
    
    // Clear message input
    document.getElementById('message').value = '';
});