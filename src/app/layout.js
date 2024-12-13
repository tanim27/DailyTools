import '@/styles/globals.css'

export const metadata = {
	title: 'Daily Tools',
	description: 'Simple daily tools application by Abdullah Al Mahmud',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='relative'>
				<div className='h-[100vh]'>{children}</div>
				{/* <div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
					laudantium maxime, omnis vero voluptatum in adipisci assumenda quis
					doloremque mollitia ducimus, expedita blanditiis, ad fugit dicta
					obcaecati nam exercitationem incidunt!
				</div> */}
				{/* <div className='fixed bottom-6 right-6'>
					<Fab
						size='small'
						color='warning'
						aria-label='add'
						href='/'
					>
						<HomeRoundedIcon />
					</Fab>
				</div> */}
			</body>
		</html>
	)
}
