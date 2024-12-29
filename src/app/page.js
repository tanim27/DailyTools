'use client'

import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import { Button } from '@mui/material'

const page = () => {
	return (
		<div className='flex justify-center items-center bg-gray-200 w-full absolute left-0 right-0 top-0 bottom-0'>
			<div className='flex flex-col md:flex-row justify-between items-center gap-2'>
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

				<div>
					<Button
						size='medium'
						variant='contained'
						color='secondary'
						href='calculator'
						startIcon={<CalculateRoundedIcon />}
					>
						Calculator
					</Button>
				</div>
			</div>
		</div>
	)
}

export default page
