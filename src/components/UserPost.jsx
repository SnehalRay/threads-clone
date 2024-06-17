import { VStack, Flex, Box, Avatar, Text, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CgMoreO } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

export const UserPost = () => {
  return (
    <Link to={"/cristiano/post/1"}>

        <VStack spacing={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="sm">

        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Flex gap={2} alignItems={"center"}>
                    <Avatar
                    name='cristiano'
                    src='/130018.png'
                    size={'lg'}>
                        
                    </Avatar>

                    <Box>
                        <Text fontSize='xl' as='b'>cristiano</Text>
                        <Text fontSize={'2xl'}>Ich bin der GOAT</Text>
                    </Box>
                    
                </Flex>
            </Box>

            <Box>
                <Flex direction={"column"} gap={2} alignItems={"center"}>
                    <Text align={'center'} fontSize={'xl'}> 1d </Text>
                    <CgMoreO size="20px"/>
                </Flex>

            </Box>

        </Flex>

        <Box>
            <Image src="/post1.png"></Image>
        </Box>

        <Flex gap={4} alignItems={"center"} justifyContent="flex-start">
          <FaRegHeart size="30px" />
          <FaRegCommentAlt size="30px" />
          <AiOutlineRetweet size="30px" />
          <FiSend size="30px" />
        </Flex>

        <Flex gap={2} alignItems={"center"} justifyContent="flex-start">
            <Text color={"gray.light"}> 100k likes</Text>
          <Text color={"gray.light"}> 5k replies</Text>

        </Flex>










        </VStack>

    
    </Link>
  )
}
