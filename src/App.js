import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AboutIconLink from './components/AboutIconLink'
import Header from './components/Header'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import { FeedbackProvider } from './context/FeedbackContext'
import AboutPage from './pages/AboutPage'
import PrivateRoute from './components/PrivateRoute'
import FeedbackPage from './pages/FeedbackPage'
import HomePage from './pages/HomePage'

const App = () => {
	return (
		<FeedbackProvider>
			<Router>
				<Header />
				<div className='container'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/sign-up' element={<SignUpPage />} />
						<Route path='/sign-in' element={<SignInPage />} />
						<Route exact path='/feedback' element={<PrivateRoute />}>
							<Route path='/feedback' element={<FeedbackPage />} />
							{/* This is the Outlet from PrivateRoute */}
						</Route>
						<Route path='/about' element={<AboutPage />} />
					</Routes>
					<AboutIconLink />
				</div>
			</Router>
			<ToastContainer />
		</FeedbackProvider>
	)
}

export default App
