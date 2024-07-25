import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Input, Button, Skeleton, SkeletonCircle, useColorModeValue, useToast } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { GiConversation } from 'react-icons/gi';
import { Conversation } from '../components/Conversation';
import { MessageContainer } from '../components/MessageContainer';

export const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const toast = useToast();

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await fetch("api/messages/getConversation");
                const data = await response.json();
                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                    return;
                }
                setConversations(data);
                console.log(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        };
        getConversations();
    }, [toast]);

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };

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
                <Flex flex={1} gap={4} flexDirection={"column"} maxW={{ sm: "300px", md: "full" }} mx={"auto"}>
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

                    {conversations.map((conversation, index) => (
                        <Conversation
                            key={index}
                            conversation={conversation}
                            onClick={() => handleConversationClick(conversation)}
                        />
                    ))}
                </Flex>

                <Flex
                    flex={3}
                    borderRadius={"md"}
                    p={4}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"500px"}
                    width={"100%"}
                    maxW={{ base: "100%", md: "100%" }}
                    w={"full"}
                >
                    {!selectedConversation ? (
                        <>
                            <GiConversation size={120} />
                            <Text fontSize={24}>Select a conversation to start messaging</Text>
                        </>
                    ) : (
                        <MessageContainer conversation={selectedConversation} />
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};
