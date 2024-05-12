// Utility function to determine the mobile provider based on the given phone number
function getMobileProvider(phoneNumber) {
    // Extract the first two digits after the country code
    const prefix = phoneNumber.substring(4, 6);

    // Mapping of prefixes to providers
    const providerMap = {
        '24': 'mtn',
        '25': 'mtn',
        '53': 'mtn',
        '54': 'mtn',
        '55': 'mtn',
        '59': 'mtn',
        '27': 'atl',
        '57': 'atl',
        '26': 'atl',
        '56': 'atl',
        '20': 'vod',
        '50': 'vod'
    };

    // Return the provider based on the prefix
    return providerMap[prefix] || 'Unknown';
}

module.exports = {
    getMobileProvider
};
