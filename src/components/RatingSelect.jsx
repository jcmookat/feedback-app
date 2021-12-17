import { useState } from 'react'
import RatingItem from './RatingItem'
function RatingSelect({ select }) {
	const [selected, setSelected] = useState(10)

	const handleChange = (e) => {
		setSelected(+e.currentTarget.value)
		select(+e.currentTarget.value)
	}

	let ratings = []
	for (let i = 1; i <= 10; i++) {
		ratings.push(
			<RatingItem
				key={i}
				index={i}
				onChange={handleChange}
				selected={selected}
			/>,
		)
	}
	return (
		<div>
			<ul className='rating'>
				{ratings}
				{/* <li>
					<input
						type='radio'
						id='num1'
						name='rating'
						value='1'
						onChange={handleChange}
						checked={selected === 1}
					/>
					<label htmlFor='num1'>1</label>
				</li> */}
			</ul>
		</div>
	)
}

export default RatingSelect
