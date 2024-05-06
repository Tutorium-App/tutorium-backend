const tutorModel = require('../models/tutor.model');
const newTutorialVideo = require('../models/newTutorialVideo.model');
const newTutorialService = require('../models/newTutorialService.model');

class HomeScreenServices {
    static async fetchHomeScreenData(tutorID) {
        try {
            const tutorData = await tutorModel.find({ tutorID: tutorID }).exec();
            return tutorData;
        } catch (error) {
            console.error('Error fetching home screen data:', error);
            return null;
        }
    }
 
    static async uploadTutorialVideo(tutorID, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink) {
        try {
            const newVideo = new newTutorialVideo({
                tutorID, title, category, description, dateCreated, school, cost, thumbnailLink, videoLink, rating: 1, sales: 0
            });
            await newVideo.save();
    
            // Increment numberOfVideos for the tutor
            // const tutor = await tutorModel.findOneAndUpdate(
            //     { tutorID: tutorID }, // Update the filter to use tutorID
            //     { $inc: { numberOfVideos: 1 } },
            //     { new: true }
            // );
    
            // if (!tutor) {
            //     console.error('Tutor not found for updating video count');
            //     return null;
            // }
    
            return newVideo;
        } catch (error) {
            console.error('Error uploading tutorial video:', error);
            return null;
        }
    }

    static async uploadTutorialService(tutorID, title, category, description, dateCreated, school, cost, thumbnailLink) {
        try {
            const newService = new newTutorialService({
                tutorID, title, category, description, dateCreated, school, cost, thumbnailLink, rating: 1, sales: 0
            });
            await newService.save();
    
            // Increment numberOfServices for the tutor
            // const tutor = await tutorModel.findOneAndUpdate(
            //     { tutorID: tutorID }, // Update the filter to use tutorID
            //     { $inc: { numberOfServices: 1 } },
            //     { new: true }
            // );
    
            // if (!tutor) {
            //     console.error('Tutor not found for updating service count');
            //     return null;
            // }
    
            return newService;
        } catch (error) {
            console.error('Error uploading tutorial service:', error);
            return null;
        }
    }
}

module.exports = HomeScreenServices;
