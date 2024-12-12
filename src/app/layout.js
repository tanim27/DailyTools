import '@/styles/globals.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { Fab } from '@mui/material'

export const metadata = {
	title: 'Daily Tools',
	description: 'Simple daily tools application by Abdullah Al Mahmud',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='relative min-h-screen'>
				{children}
				<Fab
					size='small'
					color='warning'
					aria-label='add'
					href='/'
					className='fixed bottom-6 right-6'
				>
					<HomeRoundedIcon />
				</Fab>
			</body>
		</html>
	)
}
