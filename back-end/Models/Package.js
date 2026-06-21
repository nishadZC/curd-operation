import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
    package_name: String,
    package_price: Number,
    package_photographer: Array,
    package_caterer: [String],
    package_hall: [String],
    package_bertender:[String],
    package_decoration:[String],
    package_description:String,
    package_image: String,
});

export default PackageSchema;
