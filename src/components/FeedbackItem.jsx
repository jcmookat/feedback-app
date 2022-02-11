import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'
import FeedbackContext from '../context/FeedbackContext'
import Card from './shared/Card'

function FeedbackItem({ item }) {
	const location = useLocation()

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true
		}
	}

	const { deleteFeedback, editFeedback } = useContext(FeedbackContext)
	return (
		<Card>
			<div className='num-display'>{item.data.rating}</div>
			{pathMatchRoute('/feedback') && (
				<>
					<button className='close' onClick={() => deleteFeedback(item.id)}>
						<FaTimes color='purple' />
					</button>
					<button className='edit' onClick={() => editFeedback(item)}>
						<FaEdit color='purple' />
					</button>
				</>
			)}

			<div className='text-display'>{item.data.text}</div>
		</Card>
	)
}

FeedbackItem.propTypes = {
	item: PropTypes.object.isRequired,
}

export default FeedbackItem
