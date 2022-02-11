// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDgmN8nkoEUc0wdDWN9nFLiQIrRRnRvqQA',
	authDomain: 'feedback-app-4a103.firebaseapp.com',
	projectId: 'feedback-app-4a103',
	storageBucket: 'feedback-app-4a103.appspot.com',
	messagingSenderId: '34603272268',
	appId: '1:34603272268:web:e8ac12a728253bddc9cce9',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
