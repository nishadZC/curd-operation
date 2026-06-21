import mongoose from 'mongoose';

const ServiceImageSchema = new mongoose.Schema({
    studioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export default ServiceImageSchema;
