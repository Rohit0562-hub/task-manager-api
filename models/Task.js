const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },

    description: String,
    priority: {
        type: String, 
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    deadline: {
        type: Date
    },
    
    status: {
        type: String, 
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);


