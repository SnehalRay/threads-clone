import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';

import { authScreenAtom } from '../../atoms/authAtoms';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import userAtom from '../../atoms/userAtom';

export default function LoginCard() {
  const setAuthenticationState = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);

  // LOGIN LOGICS

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const toast = useToast();

  const handleLogin = async () => {
    try {
      console.log(inputs)
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password
        })
      });
  
      const data = await response.json();
      console.log(data)
  
      if (response.ok) {
        toast({
          title: "Login successful.",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        // setUser(data); // Update state with user data
        // setUser(data.user); // Update state with user data
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user data to localStorage
        setUser(data.user); // Update state with user data

        


      } else {
        toast({
          title: "An error occurred.",
          description: data.error || "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
  
    } catch (error) {
      console.log(error)
      toast({
        title: "An error occurred.",
        description: "Unable to login. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Call handleLogin function when Enter key is pressed
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
            Sign in
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={(e) => setInputs({ ...inputs, username: e.target.value })} value={inputs.username} onKeyDown={handleKeyDown} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })} value={inputs.password} onKeyDown={handleKeyDown} />
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
                onClick={handleLogin}>
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                New user?{' '}
                <Link color={'blue.400'} onClick={() => setAuthenticationState('signup')}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
