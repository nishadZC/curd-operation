import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  package_id: { type: String, required: true }
});

const UserDataModel = mongoose.model("UserDataForm", userDataSchema);

export default UserDataModel;
