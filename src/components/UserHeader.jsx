import React from 'react'
// import { VStack, Flex, Box, Avatar, Text, Menu, MenuButton, MenuList, Button } from '@chakra-ui/react'
import { VStack, Flex, Box, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { SlSocialInstagram } from "react-icons/sl";
import { CgMoreO } from "react-icons/cg";





export const UserHeader = () => {

    const toast = useToast();

    const copyClipboard = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
              title: 'Link copied.',
              description: "The current URL has been copied to your clipboard.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }).catch(err => {
            toast({
              title: 'Failed to copy.',
              description: "Could not copy the URL. Please try again.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
        
    }

  return (
    <VStack
  gap={4}
  align='start'
>
  <Flex justifyContent={"space-between"} w={"full"}>
  
    <Box>
    {/* BOX 1 */}
    <Text fontSize={'3xl'} as={'b'} fontStyle={''}> Cristiano Ronaldo </Text>

    <Flex gap={2} alignItems={"center"}>

    <Text fontSize={'xl'} fontStyle={''}>cristiano</Text>
    <Text fontSize={'lg'} fontStyle={''} backgroundColor={"grey.light"}> threads.next </Text>
    


    </Flex>

    </Box>
    <Box>
    <Avatar
    name="Cristiano Ronaldo"
    src='/130018.png'
    size={'2xl'}
    />
  </Box>

  </Flex>


  <Text fontSize={'xl'}> The Greatest Footballer Of All Time 🐐</Text>

  <Flex justifyContent={"space-between"} w={"full"}>

    <Flex  gap={2} alignItems={"center"}>
        <Text color={"gray.light"}>100M followers</Text>
        <Text color={"gray.light"}> - </Text>
        <Link color={"gray.light"} href="https://instagram.com">instagram.com</Link>
    </Flex>

    <Flex gap={2} alignItems={"center"}>
        <Box className='circular-icon'>
            <SlSocialInstagram size={30}/>
        </Box>
        <Box className='circular-icon'>
            <Menu>
              <MenuButton as={Button}>
                <CgMoreO size={30}/>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={copyClipboard}>Copy Clipboard</MenuItem>
              </MenuList>
            </Menu>
          </Box>
    </Flex>



  </Flex>

  <Flex w={"full"}>
    <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
        <Text fontWeight={"bold"}>Threads</Text>
    </Flex>
    <Flex flex={1} borderBottom={"1.8px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
        <Text fontWeight={"bold"}>Replies</Text>
    </Flex>

  </Flex>




</VStack>
  )
}
