import mongoose from 'mongoose';
import StudioSchema from '../Models/Studio.js';

const StudioModel = mongoose.model("PhotographerStudios", StudioSchema);


export default StudioModel;
