import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { toast } from 'react-toastify'

function SignUpPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const { name, email, password } = formData
	const { loggedIn } = useAuthStatus()

	const navigate = useNavigate()

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

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			)

			const user = userCredential.user

			updateProfile(auth.currentUser, {
				displayName: name,
			})

			// const formDataCopy = { name, email }
			// OR

			const formDataCopy = { ...formData }
			delete formDataCopy.password

			formDataCopy.timestamp = serverTimestamp()

			await setDoc(doc(db, 'users', user.uid), formDataCopy)

			navigate('/')
		} catch (error) {
			toast.error('Something went wrong with registration')
		}
	}

	return (
		<Card>
			<div className='about'>
				<h1>Sign Up</h1>
				<form onSubmit={onSubmit}>
					<div className='input-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Name'
							id='name'
							value={name}
							onChange={onChange}
							required
						/>
					</div>
					<br />
					<div className='input-group'>
						<input
							type='email'
							className='emailInput'
							placeholder='Email'
							id='email'
							value={email}
							onChange={onChange}
							required
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
							required
						/>
						<span
							className='showPassword'
							alt='show password'
							onClick={() => setShowPassword((prevState) => !prevState)}>
							show password
						</span>
					</div>
					<br />

					<Button type='submit'>Sign Up</Button>
				</form>
				<br />
				<hr />
				<Link to='/sign-in'>
					<p>Sign In Instead</p>
				</Link>
			</div>
		</Card>
	)
}

export default SignUpPage
