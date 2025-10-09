const { Schema, model } = require("mongoose");
const { USER_ROLES } = require("../enums/auth.enum");

const authSchema = new Schema(
  {
    // royhatdan otishsh uchun
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    // qoshimcha sozlamalar royhatda otgandan keyin
    avatar: { type: String, default: "" },
    roles: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    phone: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    bio: { type: String },
    isActive: { type: Boolean, default: false },
    lastLogin: { type: Date },
    settings: {
      themeDark: { type: Boolean, default: false },
    },
  },

  { timestamps: true }
);

module.exports = model("users", authSchema);
