const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    name: {type: String},
    url: {type: String},
    caption: {type: String}
});

exports.Meme = mongoose.model('Meme',memeSchema,'memes');