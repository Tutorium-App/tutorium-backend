try {
    const service = await tutorialServiceModel.findById(tutorialID);
    if (service) {
        service.sales++;
        await service.save();
        const tutor = await tutorModel.findOne({ tutorID: tutorID });
        tutor.sales++;
        await tutor.save();
        alertTutorService(tutorName, tutorEmail, studentName, studentEmail, studentNumber, tutorialTitle, amount);
        const qrCode = generateRandomCode(tutorialID);
        const pendingTutorial = await PendingTutorialServices.createPendingTutorial(tutorID, studentID, tutorName, studentName, studentEmail, tutorEmail, tutorialTitle, amount, qrCode, tutorNumber, studentNumber);
    } else {
        const video = await tutorialVideoModel.findById(tutorialID);
        if (video) {
            payTutorForVideo(amount, tutorNumber, tutorEmail);
            video.sales++;
            await video.save();
            const tutor = await tutorModel.findOne({ tutorID: tutorID });
            tutor.sales++;
            await tutor.save();
            const student = await studentModel.findOne({studentID: studentID});
            student.numberOfVideos++;
            await student.save();
            alertTutorVideo(tutorName, tutorEmail, tutorialTitle, amount);
            const boughtVideo = await BoughtVideoServices.createBoughtVideo(tutorID, tutorName, tutorEmail, tutorNumber, tutorialTitle, video.category, video.description, video.dateCreated, video.school, video.cost, video.thumbnailLink, video.videoLink);
        }
    }
    resolve(body);
} catch (err) {
    reject(err);
}