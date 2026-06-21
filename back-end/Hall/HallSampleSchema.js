import mongoose from 'mongoose';
import ServiceImageSchema from '../Models/ServiceImageSchema.js';

const HallSampleModel = mongoose.model('HallSamples', ServiceImageSchema);
export default HallSampleModel;
