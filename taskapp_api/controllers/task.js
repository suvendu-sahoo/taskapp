const mongoose = require('mongoose');

const TaskModel = require('../models/task');

/*
|   List task
*/
exports.list =  async (req, res, next) => {
	TaskModel.find({user: req.user})
    .sort({priority: -1})
    .then((tasks) => {
        var taskList = {overdue: [], today: [], upcoming: []};
        
        tasks.forEach(task => {
            var todayDate = new Date(new Date().toDateString()).getTime();
            var deadlineDate = new Date(new Date(task.deadline).toDateString()).getTime();

            if (deadlineDate < todayDate) {
                taskList['overdue'].push(task);
            }

            if (deadlineDate == todayDate) {
                taskList['today'].push(task);
            }

            if (deadlineDate > todayDate) {
                taskList['upcoming'].push(task);
            }
        });

        return res.status(200).json({success: true, message: 'Task list retrieved successfully.', data: taskList});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in finding task list.'});
    });
};

/*
|   Create task
*/
exports.create =  async (req, res, next) => {
	const {name, deadline, priority} = req.body;

    const taskData = new TaskModel({
        _id: new mongoose.Types.ObjectId,
        user: req.user,
        name,
        deadline,
        priority
    });

    taskData.save()
    .then(task => {
        return res.status(201).json({success: true, message: 'Task created successfully.', data: task});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in creating task.'});
    });
};

/*
|   Update task
*/
exports.update =  async (req, res, next) => {
	const {name, deadline, priority} = req.body;

    TaskModel.findOneAndUpdate({_id: req.params._id}, {name, deadline, priority}, {returnOriginal: false})
    .then(task => {
        return res.status(200).json({success: true, message: 'Task updated successfully.', data: task});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in updating task.'});
    });
};

/*
|   Update task staus
*/
exports.updateStatus =  async (req, res, next) => {
    const taskDetails = await TaskModel.findOne({_id: req.params._id});

    if (!taskDetails) {
        return response.status(400).json({success: false, message: 'Task not found.'});
    }
	
    TaskModel.updateOne({_id: req.params._id}, {isCompleted: !taskDetails.isCompleted}, {returnOriginal: false})
    .then(task => {
        return res.status(200).json({success: true, message: 'Task status updated successfully.', data: task});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in updating task staus.'});
    });
};

/*
|   Delete task
*/
exports.delete =  async (req, res, next) => {
	TaskModel.findOneAndDelete({_id: req.params._id})
    .then(() => {
        return res.status(200).json({success: true, message: 'Task deleted successfully.'});
    })
    .catch(err => {
        return res.status(500).json({success: false, message: 'Error in deleting task.'});
    });
};