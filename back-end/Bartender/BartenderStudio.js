import mongoose from 'mongoose';
import StudioSchema from '../Models/Studio.js';

const StudioModel = mongoose.model("BartenderStudios", StudioSchema);


export default StudioModel;
