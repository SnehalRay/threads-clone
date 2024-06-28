import { Container } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserPage } from './pages/UserPage'
import { PostPage } from './pages/PostPage'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { Authentication } from './pages/Authentication'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { LogoutButton } from './components/LogoutButton'
import { EditProfilePage } from './pages/EditProfilePage'

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW='620px'>
      <Header />
      <Routes>
        <Route path="/" element={user?<HomePage />: <Navigate to="/authentication"/>} />
        <Route path="/authentication" element={!user?<Authentication />:<Navigate to="/"/>} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
        <Route path='/editProfile' element={user ? <EditProfilePage/> : <Navigate to="/authentication"/>} />
      </Routes>

      {user && <LogoutButton/>}
    </Container>
  )
}

export default App
