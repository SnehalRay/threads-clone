import { VStack, Flex, Box, Avatar, Text, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CgMoreO } from "react-icons/cg";
import { Actions } from './Actions';

export const UserPost = () => {

    const [liked, setLiked] = useState(false);
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
                        <Text fontSize={'2xl'}>Let's go Portugal⚽</Text>
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

        <Actions liked={liked} setLiked={setLiked} />

        <Flex gap={2} alignItems={"center"} justifyContent="flex-start">
            <Text color={"gray.light"}> 100k likes</Text>
          <Text color={"gray.light"}> 5k replies</Text>

        </Flex>



        </VStack>

    
    </Link>
  )
}
