import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'

function FeedbackList() {
	const { feedback, isLoading } = useContext(FeedbackContext)
	// return
	if (!isLoading && (!feedback || feedback.length === 0)) {
		return <p>No Feedback Yet</p>
	}

	return isLoading ? (
		<Spinner />
	) : (
		<ul className='feedback-list'>
			<AnimatePresence>
				{feedback.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						<FeedbackItem key={index} item={item} />
					</motion.div>
				))}
			</AnimatePresence>
		</ul>
	)
}

export default FeedbackList
