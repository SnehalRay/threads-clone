import { Button } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { UserPage } from "./pages/UserPage"
import { PostPage } from "./pages/PostPage"

function App() {

  return (
    <Container maxW='620px' bg='gray.900'>
      <Routes>
      <Route path="/:username" element={<UserPage/>}/>
      <Route path="/:username/post/:pid" element={<PostPage/>}/>
      </Routes>
    </Container>
  )
}

export default App
