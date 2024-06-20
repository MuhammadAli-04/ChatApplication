const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    const user = this;
    try {
        const salt = await bcrypt.genSalt(10);
        if (salt) {
            const hashedPassword = await bcrypt.hash(user.password, salt);
            if (hashedPassword) {
                user.password = hashedPassword;
                next(null);
            } else {
                throw new Error("There was an error generating salt");
            }
        } else {
            throw new Error("There was an error generating hashedPassword");
        }

    } catch (error) {
        console.log(`userModel <> userSchema.pre : ${error}`);
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password,this.password);
};
const User = model("User", userSchema);

module.exports = {User, userSchema};