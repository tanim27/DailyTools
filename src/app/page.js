'use client'

import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import { Button } from '@mui/material'

const page = () => {
	return (
		<div className='flex justify-center items-center bg-gray-200 w-full h-[100vh]'>
			<div className='flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0 w-[90%] md:w-[30%] sm:w-[60%]'>
				<div>
					<Button
						size='medium'
						variant='contained'
						color='primary'
						href='todos'
						startIcon={<FormatListBulletedRoundedIcon />}
					>
						To-Do
					</Button>
				</div>

				<div>
					<Button
						size='medium'
						variant='contained'
						color='secondary'
						href='notes'
						startIcon={<NotesRoundedIcon />}
					>
						Notes
					</Button>
				</div>
			</div>
		</div>
	)
}

export default page
