import React from 'react'
import SignupCard from '../components/SignupCard'
import { useRecoilValue } from 'recoil'
import {authScreenAtom} from '../../atoms/authAtoms'
import LoginCard from '../components/LoginCard'

export const Authentication = () => {
    const authenticationState = useRecoilValue(authScreenAtom);
  return (
    <>
    {authenticationState === 'login' ? <LoginCard /> : <SignupCard />}
    </>
  )
}
