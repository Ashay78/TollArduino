const mongoose = require('mongoose');
const {User, UserSchema} = require('./User');


const BadgingSchema = new mongoose.Schema(
    {
        user: {
            type: UserSchema,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    }
);

const Badging = mongoose.model('Badging', BadgingSchema);
module.exports = {Badging, BadgingSchema};