import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import FeedbackItem from './FeedbackItem'

function FeedbackList({ feedback, handleDelete }) {
	if (!feedback || feedback.length === 0) {
		return <p>No Feedback Yet</p>
	}

	return (
		<ul className='feedback-list'>
			<AnimatePresence>
				{feedback.map((item) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						<FeedbackItem
							key={item.id}
							item={item}
							handleDelete={handleDelete}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</ul>
	)

	// return (
	// 	<ul>
	// 		{feedback.map((item) => (
	// 			<FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
	// 		))}
	// 	</ul>
	// )
}

FeedbackList.propTypes = {
	feedback: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			rating: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
		}),
	),
}

export default FeedbackList