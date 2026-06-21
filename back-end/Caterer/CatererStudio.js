import mongoose from 'mongoose';
import StudioSchema from '../Models/Studio.js';

const StudioModel = mongoose.model("CatererStudios", StudioSchema);


export default StudioModel;
