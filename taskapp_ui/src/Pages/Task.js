import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import "../App.css";
import AuthService from "../Services/Auth";
import TaskService from "../Services/Task";

const Task = (props) => {
	const authUser = AuthService.getAuthUser();
	const [task, setTask] = useState({ name: '', deadline: '', priority: '' });
	const [overdueTasks, setOverdueTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);
	const [upcomingTasks, setUpcomingTasks] = useState([]);
	const [reloadList, setReloadList] = useState(false);
	const priorityList = { 1: 'Low', 2: 'Medium', 3: 'High' };

	let navigate = useNavigate();

	const onChange = (e) => {
		setTask({ ...task, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setTask({ name: '', deadline: '', priority: '' });
	};

	useEffect(() => {
		TaskService
			.list()
			.then((response) => {
				const data = response.data.data;
				setOverdueTasks(data['overdue']);
				setTodayTasks(data['today']);
				setUpcomingTasks(data['upcoming']);
				Swal.close();
				setReloadList(false);
			})
			.catch((error) => {
				Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message });
			});
	}, [reloadList]);

	const onSubmit = (e) => {
		e.preventDefault();
		Swal.showLoading();

		TaskService.create(task)
			.then((response) => {
				resetForm();
				Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message });
				setReloadList(true);
			})
			.catch((error) => {
				Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message });
			});
	};

	const edit = (task) => {
		const checkOptSelected = (val) => {
			return task.priority == val ? 'selected' : '';
		}

		Swal.fire({
			title: 'Update Task',
			html: `<div>
						<label for="name">Enter Task:</label>
						<input type="text" id="name" value="`+ task.name + `" class="swal2-input" placeholder="Enter Task" required/>
					</div>
					<div>
						<label for="deadline">Enter Deadline:</label>
						<input type="date" id="deadline" value=`+ task.deadline + ` class="swal2-input" placeholder="Enter Deadline" required/>
					</div>
					<div>
						<label for="priority">Select Priority:</label>
						<select id="priority" class="swal2-input" required>
							<option value="">Select Priority</option>
							<option value="1"`+ checkOptSelected('1') + `>Low</option>
							<option value="2"`+ checkOptSelected('2') + `>Medium</option>
							<option value="3"`+ checkOptSelected('3') + `>High</option>
						</select>
					</div>`,
			confirmButtonText: 'Update',
			preConfirm: () => {
				const name = Swal.getPopup().querySelector('#name').value;
				const deadline = Swal.getPopup().querySelector('#deadline').value;
				const priority = Swal.getPopup().querySelector('#priority').value;

				if (!name || !deadline || !priority) {
					Swal.showValidationMessage(`Please enter all details.`)
				}

				return { name, deadline, priority };
			}
		}).then((result) => {
			var request = { 'name': result.value.name, 'deadline': result.value.deadline, 'priority': result.value.priority };

			TaskService.update(task._id, request)
				.then((response) => {
					Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message });
					setReloadList(true);
				})
				.catch((error) => {
					Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message });
				});
		});
	};

	const updateStatus = (_id) => {
		Swal.showLoading();

		TaskService
			.updateStatus(_id)
			.then((response) => {
				Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message });
				setReloadList(true);
			})
			.catch((error) => {
				Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message });
			});
	};

	const destroy = (_id) => {
		if (window.confirm('Are you sure you want to delete this task?')) {
			Swal.showLoading();

			TaskService
				.destroy(_id)
				.then((response) => {
					Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message });
					setReloadList(true);
				})
				.catch((error) => {
					Swal.fire({ icon: 'error', title: 'Oops...', text: error.response.data.message });
				});
		}
	};

	const logout = () => {
		localStorage.clear();
		navigate('/');
	}

	const TaskBox = (props) => (
		<div class="task-box">
			<div className="taskname">Name: {props.task.name}</div>
			<div className="taskpriority">Priority: {priorityList[props.task.priority]}</div>
			<div className="taskdate">Deadline: {props.task.deadline}</div>
			<div className="checkbox">
				<span className="taskdate">Completed:</span>
				<input name="" onClick={() => updateStatus(props.task._id)} type="checkbox" id="switch" defaultChecked={props.task.isCompleted} />
			</div>
			<div className="task-button">
				<button onClick={() => edit(props.task)}>Edit</button>
				<button onClick={() => destroy(props.task._id)}>Delete</button>
			</div>
		</div>
	);

	return (
		<>
			<h3 className="name">
				Hello {authUser.name}
			</h3>
			<div className="container-fluid ">
				<form className="form-container" onSubmit={onSubmit}>
					<div>
						<label htmlFor="name">Enter Task:</label>
					</div>
					<div>
						<input type="text" name="name" value={task.name} onChange={onChange} className="form-control" placeholder="Enter Task" required
						/>
					</div>
					<div>
						<label htmlFor="deadline">Enter Deadline:</label>
					</div>
					<div>
						<input type="date" value={task.deadline} name="deadline" onChange={onChange} className="form-control" placeholder="Enter Deadline" required
						/>
					</div>
					<div>Select Priority:</div>
					<div>
						<select name="priority" value={task.priority} onChange={onChange} className="priority" required>
							<option value="">Select Priority</option>
							<option value="1">Low</option>
							<option value="2">Medium</option>
							<option value="3">High</option>
						</select>
					</div>
					<button type="submit" className="btn btn-primary ">Submit</button>
				</form>
				<div className="logout">
					<button onClick={logout} className="btn btn-primary ">Logout</button>
				</div>
			</div>
			<div className="Task-bar">
				<div className="tasklist">
					<h1 className="todo-heading">Overdue</h1>
					<div className="task-item">{overdueTasks.map(item => <TaskBox task={item} />)}</div>
				</div>
				<div className="tasklist">
					<h1 className="todo-heading">Today's</h1>
					<div className="task-item">{todayTasks.map(item => <TaskBox task={item} />)}</div>
				</div>
				<div className="tasklist">
					<h1 className="todo-heading">Upcoming</h1>
					<div className="task-item">{upcomingTasks.map(item => <TaskBox task={item} />)}</div>
				</div>
			</div>
		</>
	);
};

export default Task;
