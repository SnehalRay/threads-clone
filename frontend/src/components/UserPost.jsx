import { VStack, Flex, Box, Avatar, Text, Image, useColorModeValue, Menu, MenuButton, MenuList, Button, MenuItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CgMoreO } from "react-icons/cg";
import { Actions } from './Actions';

export const UserPost = ({user, likes , replies , post , caption, time, id}) => {

    const [liked, setLiked] = useState(false);



  return (

    


        <VStack spacing={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="sm" color={useColorModeValue("black", "white")} >

        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${user.username}`}>
                    <Avatar
                    name={user.name}
                    src={user.profilePic}
                    size={'lg'}
                    bg="purple.500" color="white">
                        
                    </Avatar>
                    </Link>

                    <Box>
                        <Text fontSize='xl' as='b'>{user.name}</Text>
                        <Text fontSize={'2xl'}>{caption}</Text>
                    </Box>
                    
                </Flex>
            </Box>

            <Box>
                <Flex direction={"column"} gap={2} alignItems={"center"}>
                    <Text align={'center'} fontSize={'xl'}> {time} </Text>
                    <Menu>
                        <MenuButton as={Button} variant="ghost">
                            <CgMoreO size="20px" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Delete Post</MenuItem>
                         </MenuList>
                    </Menu>
                </Flex>

            </Box>

        </Flex>

        <Box>
            <Image src={post}></Image>
        </Box>

        <Actions liked={liked} setLiked={setLiked} />

        <Flex gap={2} alignItems={"center"} justifyContent="flex-start">
            <Text color={"gray.light"}> {likes} likes</Text>
          <Text color={"gray.light"}> {replies} replies</Text>

        </Flex>



        </VStack>


  )
}
