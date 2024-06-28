import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast 
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { authScreenAtom } from '../../atoms/authAtoms'
import { useSetRecoilState } from 'recoil'
import userAtom from '../../atoms/userAtom'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  //SETTER RECOIL 
  const setAuthenticationState = useSetRecoilState(authScreenAtom)
  const setUser = useSetRecoilState(userAtom);

  const toast = useToast()

  //SETTERS AND GETTERS FOR THE INPUTS

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  //HANDLING THE SIGNUP PART WITH THE API

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: inputs.name,
          username: inputs.username,
          email: inputs.email,
          password: inputs.password
        })

        
      });
      console.log("DONE")
      const data = await response.json();
      console.log(data)

      if (data.error){
        toast({
          title: "An error occurred.",
          description: data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }

      if(response.ok){
        toast({
          title: "Signup successful.",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      localStorage.setItem("user",JSON.stringify(data.user));
      setUser(JSON.parse(localStorage.getItem('user')));
      }

      

    } catch (err) {
      console.log(err)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignUp(); // Call handleLogin function when Enter key is pressed
    }
  }

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel isRequired>Name</FormLabel>
                  <Input type="text" onChange={(e) => setInputs({ ...inputs, name: e.target.value })} value={inputs.name} onKeyDown={handleKeyDown} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel isRequired>Username</FormLabel>
                  <Input type="text" onChange={(e) => setInputs({ ...inputs, username: e.target.value })} value={inputs.username} onKeyDown={handleKeyDown}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })} value={inputs.email} onKeyDown={handleKeyDown} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} value={inputs.password} onKeyDown={handleKeyDown} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignUp}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={() => { setAuthenticationState("login") }}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
