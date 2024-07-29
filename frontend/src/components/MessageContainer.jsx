import React, { useState, useEffect } from 'react';
import { Flex, Avatar, Text, Image, Divider, useColorModeValue, Skeleton, SkeletonCircle, useToast } from '@chakra-ui/react';
import { Message } from './Message';
import MessageInput from './MessageInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../../atoms/chatpageAtom';
import userAtom from '../../atoms/userAtom';

export const MessageContainer = () => {
    const toast = useToast();
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const [otherParticipant, setOtherParticipant] = useState(null);
    const myUser = useRecoilValue(userAtom);

    console.log("SELECTED CONVERSATION:", selectedConversation);

    useEffect(() => {
        if (!selectedConversation || !selectedConversation.userId) return; // Make sure selectedConversation and userId are not null

        const getUser = async () => {
            try {
                console.log("OTHER USER ID:", selectedConversation.userId);
                const response = await fetch(`/api/users/getUserFromID/${selectedConversation.userId}`);
                const data = await response.json();
                setOtherParticipant(data);
            } catch (error) {
                console.error("Error fetching user:", error);
                toast({
                    title: "Error",
                    description: error.toString(),
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        };

        getUser();
    }, [selectedConversation, toast]);

    useEffect(() => {
        if (!selectedConversation) return; // Prevent fetching messages if no conversation is selected

        const fetchMessages = async () => {
            setLoadingMessages(true);
            try {
                const response = await fetch(`/api/messages/getMessage/${otherParticipant._id}`);
                const data = await response.json();
                console.log("MESSAGES:", data);
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
                setMessages(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [selectedConversation, toast]);

    console.log("OTHER PARTICIPANT:", otherParticipant);

    return (
        <Flex
            flex='70'
            bg={useColorModeValue("gray.200", "gray.800")}
            borderRadius={"md"}
            p={0}
            flexDirection={"column"}
        >
            {/* Message header */}
            <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
                <Avatar src={otherParticipant?.profilePic} name={otherParticipant?.name} size={"sm"} bg={"purple.500"} />
                <Text display={"flex"} alignItems={"center"}>
                    {otherParticipant?.username} <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
            </Flex>

            <Divider />

            {/* Message body */}
            <Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
                {loadingMessages && [...Array(5)].map((_, i) => (
                    <Flex
                        key={i}
                        gap={2}
                        alignItems={"center"}
                        p={1}
                        borderRadius={"md"}
                        alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                    >
                        <SkeletonCircle size={7} />
                        <Flex flexDir={"column"} gap={2}>
                            <Skeleton h='8px' w='250px' />
                            <Skeleton h='8px' w='250px' />
                            <Skeleton h='8px' w='250px' />
                        </Flex>
                    </Flex>
                ))}

                {!loadingMessages && messages.map(message => (
                    <Message key={message._id} ownMessage={message.sender === myUser._id} message={message} otherParticipant={otherParticipant} />
                ))}
            </Flex>

            <MessageInput myUser={myUser} otherUser={otherParticipant} />
        </Flex>
    );
};
