// models/SubEvent.js
import mongoose from "mongoose";
import SubEventSchema from "../Models/SubEvent.js";

const SubEventModel = mongoose.model("HallSubEvent", SubEventSchema);

export default SubEventModel;
