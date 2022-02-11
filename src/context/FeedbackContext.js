import { createContext, useEffect, useState } from 'react'
import {
	collection,
	getDocs,
	query,
	orderBy,
	doc,
	addDoc,
	deleteDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'

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
		try {
			//Get reference to the collection, not the document
			const feedbackRef = collection(db, 'feedbackItems')

			//Create query
			const q = query(feedbackRef, orderBy('timestamp', 'desc'))

			//Execute query
			const querySnap = await getDocs(q)

			const feedback = []

			querySnap.forEach((doc) => {
				return feedback.push({
					id: doc.id,
					data: doc.data(),
				})
			})
			setFeedback(feedback)
			setIsLoading(false)
		} catch (error) {
			console.log('Could not fetch feedback')
		}
	}

	//Add Feedback
	const addFeedback = async (newFeedback) => {
		try {
			const docRef = await addDoc(collection(db, 'feedbackItems'), {
				rating: newFeedback.rating,
				text: newFeedback.text,
				timestamp: serverTimestamp(),
			})

			setFeedback([
				{
					id: docRef.id,
					data: { rating: newFeedback.rating, text: newFeedback.text },
				},
				...feedback,
			])
		} catch (error) {
			console.log('Could not add feedback')
		}
		return true
	}

	//Delete Feedback
	const deleteFeedback = async (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await deleteDoc(doc(db, 'feedbackItems', id))
			const updatedFeedback = feedback.filter((feedback) => feedback.id !== id)
			setFeedback(updatedFeedback)
		}
	}

	// Update Feedback Item
	const updateFeedback = async (id, updItem) => {
		const newFeedback = {
			rating: updItem.rating,
			text: updItem.text,
		}

		//Update Listing
		const docRef = doc(db, 'feedbackItems', id)
		await updateDoc(docRef, newFeedback)

		setFeedback(
			feedback.map((item) =>
				item.id === id ? { ...item, id, data: { ...newFeedback } } : item,
			),
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
