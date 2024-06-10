import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name should be not more than 25 character!"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\../, "please enter valid email!"],
  },
  password: {
    type: String,
    validate: {
        validator: function(value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        },
        message: props => `${props.value} is not a valid password! Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long.`
    }
},

  type: { type: String, enum: ["Seller", "Customer"] },
});
