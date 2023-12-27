import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    users:{
        type: Number,
        default: 0,
    },
    subscription:{
        type: Number,
        default: 0,
    },
    views:{
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export const Stats = mongoose.model('Stats', Schema);