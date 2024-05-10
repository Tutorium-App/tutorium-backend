const adsModel = require('../models/ads.model');

class AdsServices {
    //function to store student data into database
    static async loadAds(school) {

        const tutorData = new adsModel({find});
        return await tutorData.save();
    }

    //function to increase ads count click
    static async countClick(adsID) {

        const tutorData = new adsModel({find});
        return await tutorData.save();
    }

}

module.exports = AdsServices;

