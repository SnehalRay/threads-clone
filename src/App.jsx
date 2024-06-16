import { Button } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Routes } from "react-router-dom"
import { UserPage } from "./pages/UserPage"

function App() {

  return (
    <Container maxW='620px' bg='gray.900'>
      <Routes>
      <Route path="/:username" element={<UserPage/>}/>
      </Routes>
    </Container>
  )
}

export default App
