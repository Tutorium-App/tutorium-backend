const { v4: uuidv4 } = require('uuid');
const messageModel = require('../models/message.model');
const saveMessage = require('../utils/saveMessage');

/**
 * Generates a random alphanumeric string of 6 characters (A-Z, a-z, 0-9)
 * @returns {string}
 */
function generateMessageID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let messageID = '';
    for (let i = 0; i < 6; i++) {
        messageID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return messageID;
}

/**
 * Saves a message to MongoDB with a unique 6-character messageID
 * @param {string} message - The message to save
 * @returns {Promise<string>} - The generated messageID
 */
async function saveMessage(message) {
    try {
        const messageID = generateMessageID(); 

        const newMessage = new messageModel({ messageID, message });
        await newMessage.save();

        // Construct the URL
        const messageURL = `https://www.tutoriumonline.com/message/${messageID}`;

        return messageURL;
    } catch (error) {
        console.error('Error saving message:', error);
        throw new Error('Failed to save message');
    }
}

module.exports = saveMessage;
