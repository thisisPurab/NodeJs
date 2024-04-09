const mongoose = require("mongoose");

const taskScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        maxlength: [20, "name cannot be more than 20 charectres"],
    },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskScheme);
