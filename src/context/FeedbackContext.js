import { createContext, useEffect, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	useEffect(() => {
		fetchFeedback()
	}, [])

	//Fetch Feedback

	const fetchFeedback = async () => {
		// const response = await fetch(`/feedback.json`)
		// const data = await response.json()

		// const feedbackArr = []

		// for (const key in data) {
		// 	const feedbackItem = {
		// 		id: key,
		// 		...data[key],
		// 	}

		// 	feedbackArr.push(feedbackItem)
		// }
		// setFeedback(feedbackArr)
		// setIsLoading(false)

		fetch('/feedback.json')
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				const feedbackArr = []

				for (const key in data) {
					const item = {
						id: key,
						...data[key],
					}

					feedbackArr.push(item)
				}
				setIsLoading(false)
				setFeedback(feedbackArr)
				console.log(feedbackArr)
			})
	}

	//Add Feedback
	const addFeedback = async (newFeedback) => {
		// newFeedback.id = uuidv4()
		const response = await fetch(`/feedback.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})

		const data = await response.json()

		setFeedback([data, ...feedback])
	}
	//Delete Feedback
	const deleteFeedback = async (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`/feedback/${id}`, { method: 'DELETE' })
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}
	// Update Feedback Item
	const updateFeedback = async (id, updItem) => {
		const response = await fetch(`/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updItem),
		})

		const data = await response.json()

		setFeedback(
			feedback.map((item) => (item.id === id ? { ...item, ...data } : item)),
		)
		setFeedbackEdit({
			item: {},
			edit: false,
		})
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
				isLoading,
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
