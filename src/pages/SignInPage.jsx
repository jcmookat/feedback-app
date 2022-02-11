import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { toast } from 'react-toastify'

function SignInPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData

	const navigate = useNavigate()

	const { loggedIn } = useAuthStatus()
	useEffect(() => {
		if (loggedIn) {
			navigate('/feedback')
		}
	}, [loggedIn, navigate])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			)

			if (userCredential.user) {
				navigate('/feedback')
			}
		} catch (error) {
			toast.error('Bad User Credentials')
		}
	}

	return (
		<Card>
			<div className='about'>
				<h1>Welcome Back!</h1>
				<form onSubmit={onSubmit}>
					<div className='input-group'>
						<input
							type='email'
							className='emailInput'
							placeholder='Email'
							id='email'
							value={email}
							onChange={onChange}
						/>
					</div>
					<br />
					<div className='input-group'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Password'
							id='password'
							value={password}
							onChange={onChange}
						/>
						<span
							className='showPassword'
							alt='show password'
							onClick={() => setShowPassword((prevState) => !prevState)}>
							show password
						</span>
					</div>

					<br />
					<Button type='submit'>Sign In</Button>
				</form>
				<br />
				<hr />
				<Link to='/sign-up'>
					<p>Sign Up Instead</p>
				</Link>
			</div>
		</Card>
	)
}

export default SignInPage
