import DataUriParser from 'datauri/parser.js';
import path from 'path';

//this function takes a file as input and returns its uri
const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();//get extension of file

    return parser.format(extName, file.buffer);
}

export default getDataUri;//export this function to use it in other files