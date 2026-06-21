import mongoose from 'mongoose';
import PackageSchema from '../Models/Package.js';

const PackageModel = mongoose.model("BirthdayPackage", PackageSchema);

export default PackageModel;
