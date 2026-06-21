import mongoose from 'mongoose';
import ServiceImageSchema from '../Models/ServiceImageSchema.js';

const DecorationSampleModel = mongoose.model('DecorationSamples', ServiceImageSchema);
export default DecorationSampleModel;
