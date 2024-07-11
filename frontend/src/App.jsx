import { Avatar, Container, Flex, IconButton } from '@chakra-ui/react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { PostPage } from './pages/PostPage';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Authentication } from './pages/Authentication';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { LogoutButton } from './components/LogoutButton';
import { EditProfilePage } from './pages/EditProfilePage';
import { CreatePost } from './components/CreatePost';
import { FaHome } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import Chatbot from './components/ChatBot';

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW='620px'>
      <Header />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/authentication" />} />
        <Route path="/authentication" element={!user ? <Authentication /> : <Navigate to="/" />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
        <Route path='/editProfile' element={user ? <EditProfilePage /> : <Navigate to="/authentication" />} />
        <Route path='/chatBot' element={<Chatbot/>}/>
      </Routes>

      {user && (
        <Flex
          position="fixed"
          top={["10px", "30px"]}
          right={["10px", "30px"]}
          alignItems="center"
        >
          <Link to="/chatBot">
          <IconButton
              icon={<RiRobot2Fill style={{ fontSize: '1.5em' }} />}
              size={["sm", "md"]}
              variant="ghost"
              aria-label="ChatBot"
              mr={[3, 6]}
            />
          </Link>
          
          <Link to="/">
            <IconButton
              icon={<FaHome style={{ fontSize: '1.5em' }} />}
              size={["sm", "md"]}
              variant="ghost"
              aria-label="Home"
              mr={[3, 6]}
            />
          </Link>
          <Link to={`/${user.username}`}>
            <Avatar name={user.name} src={user.profilePic} size={["sm", "md"]} mr={[3, 6]} cursor="pointer" bg="purple.500" color="white" />
          </Link>
          <Link to={"/"}>
          <LogoutButton size={["sm", "lg"]} />
          </Link>
        </Flex>
      )}
      {user && <CreatePost />}
    </Container>
  );
}

export default App;
