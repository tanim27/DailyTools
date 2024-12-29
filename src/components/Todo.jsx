'use client'

import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { Alert, Button, IconButton, Snackbar } from '@mui/material'

import { useEffect, useState } from 'react'

const Todo = () => {
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	})

	// Load tasks from local storage on component mount
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks'))
		if (storedTasks) {
			try {
				setTasks(storedTasks)
			} catch (error) {
				console.error('Error parsing tasks from local storage:', error)
				localStorage.removeItem('tasks')
			}
		}
	}, [])

	// Save tasks to local storage whenever they change
	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		} else {
			localStorage.removeItem('tasks')
		}
	}, [tasks])

	const addTask = () => {
		if (task.trim()) {
			const newTasks = [...tasks, { title: task.trim(), completed: false }]
			setTasks(newTasks)
			setTask('')
			showSnackBar('Task added successfully!', 'success')
		} else {
			showSnackBar('Task cannot be empty', 'error')
		}
	}

	const deleteTask = (index) => {
		const newTasks = [...tasks]
		newTasks.splice(index, 1)
		setTasks(newTasks)
		showSnackBar(`Task ${index + 1} deleted`, 'info')
	}

	const toggleTaskCompletion = (index) => {
		const newTasks = tasks.map((task, i) =>
			i === index ? { ...task, completed: !task.completed } : task,
		)
		setTasks(newTasks)

		const updatedTask = newTasks[index]
		showSnackBar(
			`Task ${index + 1} ${
				updatedTask.completed ? 'completed' : 'marked as incomplete'
			}`,
			'success',
		)
	}

	const handleDeleteAll = () => {
		setTasks([])
		showSnackBar('All tasks deleted', 'warning')
	}

	const showSnackBar = (message, severity) => {
		setSnackbar({ open: true, message, severity })
	}

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false })
	}

	return (
		<div className='font-inter bg-gray-200 flex flex-col items-center space-y-10 py-10 w-[100vw] max-w-[100vw] min-h-screen max-h-[100%]'>
			<div className='flex flex-col items-center space-y-4 w-[90%] sm:w-[60%] md:w-[40%]'>
				<h1 className='font-nunito font-bold text-center text-black text-4xl md:text-5xl'>
					To Do
				</h1>
				<div className='flex flex-col items-center space-y-2 w-full'>
					<input
						type='text'
						placeholder='Task name'
						value={task}
						onChange={(event) => setTask(event.target.value)}
						className='text-black px-4 py-2 border rounded-lg shadow focus:outline-none focus:border-blue-500 w-full'
					/>
					<div className='flex justify-between w-full'>
						<Button
							size='small'
							variant='contained'
							color='success'
							startIcon={<AddIcon />}
							onClick={addTask}
						>
							Add
						</Button>
						<Button
							size='small'
							variant='contained'
							color='error'
							startIcon={<DeleteRoundedIcon />}
							onClick={handleDeleteAll}
						>
							Delete All
						</Button>
					</div>
				</div>
			</div>

			{tasks.length > 0 ? (
				<div className='flex flex-col items-start w-[90%]'>
					<h2 className='font-nunito font-semibold text-black text-2xl md:text-3xl'>
						To-do list:
					</h2>
					<ul className='flex flex-col justify-center items-center w-full'>
						{tasks.map((task, index) => (
							<li
								key={index}
								className={`text-black flex flex-col px-4 py-2 mb-2 rounded shadow w-full ${
									task.completed ? 'bg-green-200 line-through' : 'bg-white'
								}`}
							>
								<div className='flex justify-between items-center w-full'>
									<h4 className='text-black text-md md:text-2xl truncate w-full'>
										{task.title.length > 35
											? `${task.title.substring(0, 35)}...`
											: task.title}
									</h4>
									<div className='flex justify-between'>
										<IconButton
											aria-label='mark as done'
											onClick={() => toggleTaskCompletion(index)}
										>
											<CheckCircleOutlineIcon
												color={task.completed ? 'success' : 'action'}
											/>
										</IconButton>
										<IconButton
											aria-label='delete'
											color='error'
											onClick={() => deleteTask(index)}
										>
											<DeleteRoundedIcon />
										</IconButton>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className='flex justify-center items-center  w-[90%]'>
					<h2 className='font-bold text-3xl sm:text-4xl md:text-5xl text-gray-600'>
						Empty!
					</h2>
				</div>
			)}

			{/* Snackbar */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom-left', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default Todo
