import mongoose from 'mongoose';
import PackageSchema from '../Models/Package.js';

const PackageModel = mongoose.model("WeddingPackage", PackageSchema);

export default PackageModel;
