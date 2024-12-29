// components/Calculator.js
'use client'

import Button from '@mui/material/Button'
import { useState } from 'react'

const Calculator = () => {
	const [input, setInput] = useState('')
	const [result, setResult] = useState(null)

	const handleClick = (value) => {
		setInput((prev) => prev + value)
	}

	const calculateResult = () => {
		try {
			const evalResult = eval(input) // Be cautious with eval in production
			setResult(evalResult)
		} catch (error) {
			setResult('Error')
		}
	}

	const clearInput = () => {
		setInput('')
		setResult(null)
	}

	return (
		<div className='font-inter bg-gray-200 flex flex-col items-center justify-center space-y-4 min-h-screen'>
			<h1 className='font-nunito font-bold text-center text-black text-4xl md:text-5xl'>
				Calculator
			</h1>
			<div className='bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%]'>
				<div className='mb-4'>
					<input
						type='text'
						value={input}
						readOnly
						className='text-lg text-black p-2 border rounded-lg mb-2 focus:outline-none focus:border-blue-500 w-full'
					/>
					<div className='text-xl font-bold text-gray-700'>
						{result !== null && `Result: ${result}`}
					</div>
				</div>
				<div className='grid grid-cols-4 gap-2'>
					{[
						'7',
						'8',
						'9',
						'/',
						'4',
						'5',
						'6',
						'*',
						'1',
						'2',
						'3',
						'-',
						'0',
						'.',
						'+',
						'=',
					].map((btn) => (
						<button
							key={btn}
							className='p-3 bg-white rounded-lg text-lg text-black font-semibold hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							onClick={() =>
								btn === '=' ? calculateResult() : handleClick(btn)
							}
						>
							{btn}
						</button>
					))}
					<Button
						variant='contained'
						color='error'
						className='col-span-4'
						onClick={clearInput}
					>
						Clear
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Calculator
