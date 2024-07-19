import React from 'react';
import { Box, Flex, Text, Input, Button, Skeleton, SkeletonCircle, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { GiConversation } from 'react-icons/gi';
import { Conversation } from '../components/Conversation';
import { MessageContainer } from '../components/MessageContainer';

export const ChatPage = () => {
    return (
        <Box
            position={"absolute"}
            left={"50%"}
            w={{ base: "100%", md: "90%", lg: "850px" }}
            p={6}
            transform={"translateX(-50%)"}
        >
            <Flex
                gap={6}
                flexDirection={{ base: "column", md: "row" }}
                maxW={{
                    sm: "500px",
                    md: "full",
                }}
                mx={"auto"}
            >
                <Flex flex={30} gap={4} flexDirection={"column"} maxW={{ sm: "300px", md: "full" }} mx={"auto"}>
                    <Text fontWeight={700} fontSize={"lg"} color={useColorModeValue("gray.600", "gray.400")}>
                        Your Conversations
                    </Text>
                    <Flex alignItems={"center"} gap={3}>
                        <Input placeholder='Search for a user' size={"lg"} />
                        <Button size={"md"}>
                            <SearchIcon />
                        </Button>
                    </Flex>

                    {false && [0, 1, 2, 3, 4].map((_, i) => (
                        <Flex key={i} gap={5} alignItems={"center"} p={2} borderRadius={"md"}>
                            <Box>
                                <SkeletonCircle size={"12"} />
                            </Box>
                            <Flex w={"full"} flexDirection={"column"} gap={4}>
                                <Skeleton h={"12px"} w={"100px"} />
                                <Skeleton h={"10px"} w={"95%"} />
                            </Flex>
                        </Flex>
                    ))}

                    <Conversation/>
                    <Conversation/>
                    <Conversation/>





                </Flex>

                {/* <Flex
                    flex={70}
                    borderRadius={"md"}
                    p={4}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"500px"}
                >
                    <GiConversation size={120} />
                    <Text fontSize={24}>Select a conversation to start messaging</Text>
                </Flex> */}
                <MessageContainer/>
            </Flex>
        </Box>
    );
};
