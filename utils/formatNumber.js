function formatNumber(number) {
    if (typeof number !== 'string') {
        throw new TypeError('The provided number must be a string');
    }

    if (number.startsWith('0')) {
        return '233' + number.slice(1);
    }
    return number;
}

module.exports = { formatNumber };
