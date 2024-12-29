'use client'

import AddIcon from '@mui/icons-material/Add'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Alert, Button, Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'

const Note = () => {
	const [noteName, setNoteName] = useState('')
	const [noteDescription, setNoteDescription] = useState('')
	const [notes, setNotes] = useState([])
	const [editingIndex, setEditingIndex] = useState(null)
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	})

	// Load notes from local storage on component mount
	useEffect(() => {
		const savedNotes = localStorage.getItem('notes')
		if (savedNotes) {
			try {
				setNotes(JSON.parse(savedNotes))
			} catch (error) {
				console.error('Error parsing notes from localStorage:', error)
				localStorage.removeItem('notes')
			}
		}
	}, [])

	// Save notes to local storage whenever they change
	useEffect(() => {
		if (notes.length > 0) {
			localStorage.setItem('notes', JSON.stringify(notes))
		} else {
			localStorage.removeItem('notes')
		}
	}, [notes])

	const addNote = () => {
		if (noteName.trim() && noteDescription.trim()) {
			if (editingIndex !== null) {
				const updatedNotes = [...notes]
				updatedNotes[editingIndex] = {
					name: noteName.trim(),
					description: noteDescription.trim(),
				}
				setNotes(updatedNotes)
				showSnackbar('Note updated successfully!', 'success')
				setEditingIndex(null)
			} else {
				const newNote = {
					name: noteName.trim(),
					description: noteDescription.trim(),
				}
				setNotes([...notes, newNote])
				showSnackbar('Note added successfully!', 'success')
			}
			setNoteName('')
			setNoteDescription('')
		} else {
			showSnackbar('Please fill in both fields!', 'error')
		}
	}

	const editNote = (index) => {
		setNoteName(notes[index].name)
		setNoteDescription(notes[index].description)
		setEditingIndex(index)
	}

	const deleteNote = (index) => {
		const newNotes = notes.filter((_, i) => i !== index)
		setNotes(newNotes)
		showSnackbar('Note deleted!', 'info')
	}

	const handleDeleteAll = () => {
		setNotes([])
		showSnackbar('All notes deleted!', 'warning')
	}

	const showSnackbar = (message, severity) => {
		setSnackbar({ open: true, message, severity })
	}

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false })
	}

	return (
		<div className='font-inter bg-gray-200 flex flex-col items-center space-y-10 py-10 w-[100vw] max-w-[100vw] min-h-screen max-h-[100%]'>
			<div className='flex flex-col items-center space-y-4 w-[90%] sm:w-[60%] md:w-[40%]'>
				<h1 className='font-nunito font-bold text-center text-black text-4xl md:text-5xl'>
					Create your note here
				</h1>
				<div className='flex flex-col items-center space-y-2 w-full'>
					<input
						type='text'
						placeholder='Title'
						value={noteName}
						onChange={(e) => setNoteName(e.target.value)}
						className='text-black px-4 py-2 border rounded-lg shadow focus:outline-none focus:border-blue-500 w-full'
					/>
					<textarea
						placeholder='Description'
						value={noteDescription}
						onChange={(e) => setNoteDescription(e.target.value)}
						className='text-black px-4 py-2 border rounded-lg shadow focus:outline-none focus:border-blue-500 w-full'
					/>
					<div className='flex justify-between w-full'>
						<Button
							size='small'
							variant='contained'
							color='success'
							startIcon={<AddIcon />}
							onClick={addNote}
						>
							{editingIndex !== null ? 'Update' : 'Add'}
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

			{notes.length > 0 ? (
				<div className='flex flex-col items-start w-[90%]'>
					<h2 className='font-nunito font-semibold text-black text-2xl md:text-3xl '>
						All notes:
					</h2>
					<ul className='flex-col justify-center items-center w-full'>
						{notes.map((note, index) => (
							<li
								key={index}
								className='flex flex-col bg-white text-black px-4 py-2 mb-2 rounded shadow w-full'
							>
								<div className='flex justify-between items-center w-full'>
									<h4 className='text-black text-lg md:text-2xl truncate w-full'>
										{note.name.length > 35
											? `${note.name.substring(0, 35)}...`
											: note.name}
									</h4>
									<div className='flex justify-between'>
										<IconButton
											aria-label='edit'
											color='success'
											onClick={() => editNote(index)}
										>
											<EditRoundedIcon />
										</IconButton>
										<IconButton
											aria-label='delete'
											color='error'
											onClick={() => deleteNote(index)}
										>
											<DeleteRoundedIcon />
										</IconButton>
									</div>
								</div>
								<p className='text-sm md:text-base text-gray-600 truncate w-full'>
									{note.description.length > 50
										? `${note.description.substring(0, 50)}...`
										: note.description}
								</p>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className='flex justify-center items-center w-[90%]'>
					<h2 className='font-bold text-center text-3xl sm:text-4xl md:text-5xl text-gray-600'>
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

export default Note
