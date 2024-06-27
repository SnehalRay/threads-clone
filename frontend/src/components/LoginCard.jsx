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
  
  export default function LoginCard() {
    const setAuthenticationState = useSetRecoilState(authScreenAtom);




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
        } else {
          toast({
            title: "An error occurred.",
            description: data.error || "Something went wrong.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }

        localStorage.setItem("user",JSON.stringify(data));

    
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
            w={{base:"full",
                sm:"400px",
                }}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="type" onChange={(e)=>setInputs({...inputs, username:e.target.value})} value={inputs.username}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>setInputs({...inputs, password:e.target.value})} value={inputs.password} />
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
  