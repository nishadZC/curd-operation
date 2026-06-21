import mongoose from 'mongoose';
import ServiceImageSchema from '../Models/ServiceImageSchema.js';

const CatererSampleModel = mongoose.model('CatererSamples', ServiceImageSchema);
export default CatererSampleModel;
