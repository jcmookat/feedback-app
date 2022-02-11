// import { useEffect } from 'react'
import FeedbackForm from '../components/FeedbackForm'
import FeedbackList from '../components/FeedbackList'
import FeedbackStats from '../components/FeedbackStats'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Card from '../components/shared/Card'

function FeedbackPage() {
	const auth = getAuth()

	const name = auth.currentUser.displayName

	const onLogout = () => {
		auth.signOut()
		navigate('/sign-in')
	}
	const navigate = useNavigate()

	return (
		<>
			<Card>
				<div className='input-group border-none'>
					<input type='text' value={name} readOnly={true} />
					<button className='btn btn-secondary logOut' onClick={onLogout}>
						Logout
					</button>
				</div>
			</Card>
			<FeedbackForm />
			<FeedbackStats />
			<FeedbackList />
		</>
	)
}

export default FeedbackPage
