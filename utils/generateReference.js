const { v4: uuidv4 } = require('uuid');

function generateTransferReference() {
    // Generate a v4 UUID
    const uuid = uuidv4();

    // Trim to a maximum of 100 characters
    const trimmedUuid = uuid.substring(0, 100);

    return trimmedUuid;
}


module.exports = {
    generateTransferReference
};
