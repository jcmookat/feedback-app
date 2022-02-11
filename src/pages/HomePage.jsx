import { Link } from 'react-router-dom'
import FeedbackList from '../components/FeedbackList'
import FeedbackStats from '../components/FeedbackStats'
import { useAuthStatus } from '../hooks/useAuthStatus'

function HomePage() {
	const { loggedIn } = useAuthStatus()
	return (
		<>
			{!loggedIn ? (
				<Link className='pink' to={'/sign-in'}>
					Sign In
				</Link>
			) : (
				<Link className='pink' to={'/sign-in'}>
					Add feedback
				</Link>
			)}
			<FeedbackStats />
			<FeedbackList />
		</>
	)
}

export default HomePage
