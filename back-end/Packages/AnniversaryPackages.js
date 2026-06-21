import mongoose from 'mongoose';
import PackageSchema from '../Models/Package.js';

const PackageModel = mongoose.model("AnniversaryPackage", PackageSchema);

export default PackageModel;
