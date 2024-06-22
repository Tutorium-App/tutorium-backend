const adsModel = require('../models/ads.model');

class AdsServices {
    // Load ads from the database based on the school
    static async loadAds(school) {
        try {
            const ads = await adsModel.find({ school: school }).sort({ createdAt: -1 }).limit(3);
            return ads;
        } catch (error) {
            console.error("Error retrieving ads from database:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }


    // Count and update the click count for a specific ad
    static async countClick(adsID) {
        try {
            const ad = await adsModel.findById(adsID);
            if (!ad) {
                return null;
            }

            ad.clickCount += 1; // Increment the click count
            await ad.save();
            return ad.clickCount; // Return the updated click count
        } catch (error) {
            console.error("Error updating click count:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = AdsServices;
