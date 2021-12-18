import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'

function FeedbackList() {
	const { feedback } = useContext(FeedbackContext)
	// console.log(feedback)
	// return
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
						<FeedbackItem key={item.id} item={item} />
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

export default FeedbackList
