import multer from "multer";

const storage = multer.memoryStorage();// it doesn't save the file to disk, it keeps it in memory, so that we can upload it to cloudinary later

const singleUpload = multer({ storage: storage }).single('file');//single file upload with name file

export default singleUpload;
//add this middleware to route, where you want to upload file, like this: router.route('/createcourse').post(singleUpload, createCourse);