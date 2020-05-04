import { auth } from '../services/firebase'
import firebase from 'firebase'

export function signup (email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
}

export function signin (email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

export function signinWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  return auth.signInWithPopup(provider)
}