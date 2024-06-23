import { VStack, Flex, Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { CgMoreO } from "react-icons/cg";
import { Actions } from './Actions';
import { useState } from 'react';

export const Comment = () => {
    const [liked, setLiked] = useState(false);
  return (
    <VStack spacing={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="sm">

        <Flex justifyContent={"space-between"} w={"full"}>

        <Flex gap={2} alignItems={"start"}>

            <Avatar name="Cristiano Ronaldo"
            src='/130018.png'>
            </Avatar>
            <Flex direction={"column"} spacing={4}>
                <Text fontSize={"xl"} as={"b"}> cristiano </Text>
                <Text fontSize={"2xl"}> Here is the comment</Text>
            </Flex>

        </Flex>

        <Flex direction={"column"} gap={2} alignItems={"center"}>
                    <Text align={'center'} fontSize={'xl'}> 1d </Text>
                    <CgMoreO size="20px"/>
                </Flex>

        </Flex>

        <Actions liked={liked} setLiked={setLiked} />

        <Flex gap={2} alignItems={"center"} justifyContent="flex-start">
            <Text color={"gray.light"}> 5 likes</Text>
          <Text color={"gray.light"}> 6 replies</Text>

        </Flex>

    </VStack>
  )
}
