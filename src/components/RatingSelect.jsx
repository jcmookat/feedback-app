import { useContext, useEffect, useState, useRef } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import RatingItem from './RatingItem'

function RatingSelect({ select }) {
	const [selected, setSelected] = useState(10)

	const { feedbackEdit, addFeedback } = useContext(FeedbackContext)
	const isMounted = useRef(true)
	useEffect(() => {
		if (isMounted) {
			if (feedbackEdit.edit === true) {
				setSelected(feedbackEdit.item.data.rating)
			} else {
				setSelected(10)
			}
			if (addFeedback) {
				setSelected(10)
			}
		}
		return () => {
			isMounted.current = false
		}
	}, [feedbackEdit, isMounted, addFeedback])

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
			<ul className='rating'>{ratings}</ul>
		</div>
	)
}

export default RatingSelect
