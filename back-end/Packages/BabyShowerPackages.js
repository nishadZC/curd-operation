import mongoose from 'mongoose';
import PackageSchema from '../Models/Package.js';

const PackageModel = mongoose.model("BabyShowerPackage", PackageSchema);

export default PackageModel;
