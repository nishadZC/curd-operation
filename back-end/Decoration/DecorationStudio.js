import mongoose from 'mongoose';
import StudioSchema from '../Models/Studio.js';

const StudioModel = mongoose.model("DecorationStudios", StudioSchema);


export default StudioModel;
