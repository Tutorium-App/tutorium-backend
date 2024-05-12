function generateRandomCode(tutorialID) {
    const prefix = "TTP";
    const tutorialIDPart = tutorialID.toString().substr(5, 9);
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let randomLetters = '';
    for (let i = 0; i < 3; i++) {
        randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return prefix + tutorialIDPart + randomLetters;
}

module.exports = {
    generateRandomCode
};