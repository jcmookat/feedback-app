import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState(FeedbackData)

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	//Add Feedback
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}
	//Delete Feedback
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}
	// Update Feedback Item
	const updateFeedback = (id, updItem) => {
		// console.log(id, updItem)
		setFeedback(
			feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)),
		)
	}
	//Edit Feedback
	const editFeedback = (item) => {
		// console.log(item)
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				addFeedback,
				deleteFeedback,
				editFeedback,
				updateFeedback,
			}}>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
