import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    admin_name: String,
    admin_email: String,
    admin_password: String
});

const AdminModel = mongoose.model("admins", AdminSchema);

export default AdminModel;
