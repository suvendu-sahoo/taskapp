const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        name: {type: String, required: true},
        deadline: {type: String, required: true},
        priority: {type: Number, required: true},
        isCompleted: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('task', taskSchema);