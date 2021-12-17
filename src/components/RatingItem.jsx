function RatingItem({ index, onChange, selected }) {
	return (
		<li>
			<input
				type='radio'
				id={`num${index}`}
				name='rating'
				value={index}
				onChange={onChange}
				checked={selected === index}
			/>
			<label htmlFor={`num${index}`}>{index}</label>
		</li>
	)
}

export default RatingItem
