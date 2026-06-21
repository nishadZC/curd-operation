import mongoose from 'mongoose';
import ServiceImageSchema from '../Models/ServiceImageSchema.js';

const PhotographerSampleModel = mongoose.model('PhotographerSamples', ServiceImageSchema);
export default PhotographerSampleModel;
