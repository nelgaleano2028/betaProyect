const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const storageSchema = new mongoose.Schema(
    {
        url: { type: String },
        filename: { type: String }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false,
    }
);

storageSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('storage', storageSchema);