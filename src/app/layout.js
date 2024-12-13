import '@/styles/globals.css'
import { HomeRounded } from '@mui/icons-material'
import { Fab } from '@mui/material'

export const metadata = {
	title: 'Daily Tools',
	description: 'Simple daily tools application by Abdullah Al Mahmud',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className=''>
				<div className=''>{children}</div>

				<div className='fixed bottom-6 right-6'>
					<Fab
						size='small'
						color='warning'
						aria-label='add'
						href='/'
					>
						<HomeRounded />
					</Fab>
				</div>
			</body>
		</html>
	)
}
