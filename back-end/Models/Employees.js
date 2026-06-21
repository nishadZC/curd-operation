import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    emp_name: String,
    emp_email: String,
    emp_age: String
});

const EmployeeModel = mongoose.model("Employees", EmployeeSchema);

export default EmployeeModel;
