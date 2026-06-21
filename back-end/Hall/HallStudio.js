import mongoose from 'mongoose';
import StudioSchema from '../Models/Studio.js';

const StudioModel = mongoose.model("HallStudios", StudioSchema);


export default StudioModel;
