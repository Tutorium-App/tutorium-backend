const TutorialService = require('../models/tutorialService.model');
const TutorialVideo = require('../models/tutorialVideo.model');
const PendingTutorial = require('../models/pendingTutorials.model');
const EmailServices = require('../services/email.services');
const tutorModel = require('../models/tutor.model');

class ManageTutorialServices {
    // Fetch all tutorial services for a specific tutor
    static async readTutorialServices(tutorID) {
        try {
            const tutorialServices = await TutorialService.find({ tutorID: tutorID }).exec();
            return tutorialServices.length > 0 ? tutorialServices : null;
        } catch (error) {
            console.error('Error fetching tutorial services:', error);
            return null;
        }
    }

    // Fetch all tutorial videos for a specific tutor
    static async readTutorialVideos(tutorID) {
        try {
            const tutorialVideos = await TutorialVideo.find({ tutorID: tutorID }).exec();
            return tutorialVideos.length > 0 ? tutorialVideos : null;
        } catch (error) {
            console.error('Error fetching tutorial videos:', error);
            return null;
        }
    }

    // Fetch all pending tutorials for a specific tutor
    static async readPendingTutorials(tutorID) {
        try {
            const pendingTutorials = await PendingTutorial.find({ tutorID: tutorID }).exec();
            return pendingTutorials.length > 0 ? pendingTutorials : null;
        } catch (error) {
            console.error('Error fetching pending tutorial services:', error);
            return null;
        }
    }

    // Delete a specific tutorial service by tutorialID
    static async deleteTutorialService(_id) {
        try {
            const service = await TutorialService.findById(_id);
            if (!service) {
                console.error('No tutorial service found with the given ID');
                return null;
            }
    
            const result = await TutorialService.findByIdAndDelete(_id);
            if (result) {
                // Check if tutor exists and update the count safely
                const tutor = await tutorModel.findOne({ tutorID: result.tutorID });
                if (tutor && tutor.numberOfServices > 0) {
                    await tutorModel.findOneAndUpdate(
                        { tutorID: result.tutorID },
                        { $inc: { numberOfServices: -1 } },
                        { new: true }
                    );
                }
            }
    
            return result;
        } catch (error) {
            console.error('Error deleting tutorial service:', error);
            return null;
        }
    }

    // Delete a specific tutorial video by tutorialID
    static async deleteTutorialVideo(tutorialID) {
        try {
            const video = await TutorialVideo.findById(tutorialID);
            if (!video) {
                console.error('No tutorial video found with the given ID');
                return null;
            }
    
            const result = await TutorialVideo.findByIdAndDelete(tutorialID);
            if (result) {
                // Check if tutor exists and update the count safely
                const tutor = await tutorModel.findOne({ tutorID: result.tutorID });
                if (tutor && tutor.numberOfVideos > 0) {
                    await tutorModel.findOneAndUpdate(
                        { tutorID: result.tutorID },
                        { $inc: { numberOfVideos: -1 } },
                        { new: true }
                    );
                }
            }
    
            return result;
        } catch (error) {
            console.error('Error deleting tutorial video:', error);
            return null;
        }
    }

    // Cancel a specific pending tutorial by tutorialID
    static async cancelPendingTutorial(tutorialID, studentName, studentEmail, tutorialTitle) {
        try {
            const result = await PendingTutorial.findByIdAndDelete(tutorialID);
    
            if (result) {
                const message = `Dear ${studentName},\n\n
                We regret to inform you that your upcoming tutorial session titled "${tutorialTitle}" has been cancelled. We understand the inconvenience this may cause and want to assure you that any fees paid for this service will be fully refunded to your original payment method within the next 2-3 business days.\n\n
                You can revisit our platform for a suitable alternative. Our team is committed to providing you with the best learning experience and support throughout your journey with us.\n\n
                Thank you for your understanding and patience. If you have any questions or require further assistance, please do not hesitate to reach out. We value your choice to learn with Tutorium and look forward to continuing to serve your educational needs.\n\n
                Warm regards,\n
                The Tutorium Team`;

                const subject = "Cancellation of Tutorial Service";
                let emailStatus = await EmailServices.sendEmail(studentEmail, studentName, subject, message);
                if (!emailStatus) {
                    console.error('Error sending cancellation email');
                }
                return result;
            } else {
                console.log('No tutorial found with ID:', tutorialID);
                return null;
            }
        } catch (error) {
            console.error('Error canceling pending tutorial:', error);
            return null;
        }
    }
    


    // Update a specific tutorial service
    static async updateTutorialService(tutorialID, tutorID, title, category, description, thumbnailLink) {
        try {
            const updatedTutorialService = await TutorialService.findOneAndUpdate(
                { _id: tutorialID, tutorID: tutorID }, // ensures that only the tutor who owns the tutorial can update it
                { $set: { title, category, description, thumbnailLink } },
                { new: true }  // returns the updated document
            );
            return updatedTutorialService ? updatedTutorialService : null;
        } catch (error) {
            console.error('Error updating tutorial service:', error);
            return null;
        }
    }

    // Update a specific tutorial video
    static async updateTutorialVideo(tutorialID, tutorID, title, category, description, thumbnailLink) {
        try {
            const updatedTutorialVideo = await TutorialVideo.findOneAndUpdate(
                { _id: tutorialID, tutorID: tutorID }, // ensures that only the tutor who owns the video can update it
                { $set: { title, category, description, thumbnailLink } },
                { new: true }  // returns the updated document
            );
            return updatedTutorialVideo ? updatedTutorialVideo : null;
        } catch (error) {
            console.error('Error updating tutorial video:', error);
            return null;
        }
    }
}

module.exports = ManageTutorialServices;
