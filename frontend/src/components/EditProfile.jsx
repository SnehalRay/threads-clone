'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../../atoms/userAtom'
import Compressor from 'compressorjs';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);
  const toast = useToast();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: user.email,
    name: user.name,
    username: user.username,
    bio: user.bio,
    password: "",
    profilePic: user.profilePic
  });

  //HANDLE UPLOADING PICTURE
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInputs({ ...inputs, profilePic: reader.result });
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err.message);
          toast({
            title: "An error occurred.",
            description: "Failed to upload image. Please upload a PNG or JPEG file.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "An error occurred.",
        description: "Failed to upload image. Please upload a PNG or JPEG file.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  //HANDLING SUBMITTING IT
  const handleEdit = async () => {
    try {
      const response = await fetch("/api/users/editProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: inputs.email,
          name: inputs.name,
          username: inputs.username,
          bio: inputs.bio,
          password: inputs.password,
          profilePic: inputs.profilePic || null  // Send null if profilePic is an empty string
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Profile updated.",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        localStorage.setItem("user", JSON.stringify(data.user)); // Save user data to localStorage
        setUser(data.user); // Update state with user data

        navigate(-1);

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
      console.log("Catch error:", error)
      toast({
        title: "An error occurred.",
        description: "Unable to edit profile. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={{ base: '100vh', md: '80vh' }}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.100', '#101010')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={{ base: 'sm', md: 'lg' }}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={{ base: 4, md: 6 }}
        my={{ base: 8, md: 12 }}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userIcon">
          <FormLabel fontSize={{ base: 'md', md: 'lg' }}>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="2xl" src={inputs.profilePic} name={inputs.name} bg="purple.500" color="white">
                <AvatarBadge
                  as={IconButton}
                  size="md"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon boxSize={5} />}
                  onClick={() => setInputs({ ...inputs, profilePic: "" })}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" size="lg" onClick={() => fileRef.current.click()}>Change Profile Picture</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="name" isRequired>
          <FormLabel fontSize={{ base: 'md', md: 'lg' }}>Name</FormLabel>
          <Input
            placeholder="Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            size="lg"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel fontSize={{ base: 'md', md: 'lg' }}>User name</FormLabel>
          <Input
            placeholder="Username"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            size="lg"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel fontSize={{ base: 'md', md: 'lg' }}>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            size="lg"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel fontSize={{ base: 'md', md: 'lg' }}>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            size="lg"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel fontSize={{ base: 'md', md: 'lg' }}>Bio</FormLabel>
          <Textarea
            placeholder="Tell us about yourself"
            _placeholder={{ color: 'gray.500' }}
            size="lg"
            rows={4}
            value={inputs.bio}
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            size="lg"
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => { navigate(-1); }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            size="lg"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleEdit}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
