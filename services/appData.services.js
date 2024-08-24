const appDataModel = require('../models/appData.model');

class AppDataServices {
    // Load appData from the database
    static async loadAppData() {
        try {
            const appData = await appDataModel.find();
            return appData;
        } catch (error) {
            console.error("Error retrieving appData from database:", error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    // Save appData to the database
    static async createAppData(app1Version, app2Version, app1ShareLink, app2ShareLink, app1ShareText, app2ShareText) {
        try {
            let appData = await appDataModel.findOne();
            if (!appData) {
                appData = await appDataModel.create({
                    app1Version, app2Version, app1ShareLink, app2ShareLink, app1ShareText, app2ShareText
                });
            } else {
                appData = await appDataModel.findOneAndUpdate({}, {
                    app1Version, app2Version, app1ShareLink, app2ShareLink, app1ShareText, app2ShareText
                }, { new: true });
            }

            return appData;
        } catch (error) {
            throw error; // Re-throw the error to be handled by the controller
        }
    }
}

module.exports = AppDataServices;
