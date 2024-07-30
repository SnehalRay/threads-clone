import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Input, Button, useColorModeValue, useToast } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { GiConversation } from 'react-icons/gi';
import { Conversation } from '../components/Conversation';
import { MessageContainer } from '../components/MessageContainer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { ChatUserList } from '../components/ChatUserList'; // New component for chat user list
import { useSocket } from '../../context/SocketContext';

export const ChatPage = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom);
    const { socket, onlineUsers } = useSocket();

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
    }, [toast, setConversations]);

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") {
            setUsers([]);
            setMessage("");
            return;
        }

        const searchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/users/search/${e.target.value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        const filteredUsers = data.filter(user =>
                            user._id !== currentUser._id &&
                            !conversations.some(conversation =>
                                conversation.participants.some(participant => participant._id === user._id)
                            )
                        );
                        setUsers(filteredUsers);
                        setMessage("");
                    } else {
                        setMessage("DOES NOT EXIST");
                        setUsers([]);
                    }
                } else {
                    setMessage("Error searching for users");
                    setUsers([]);
                }
            } catch (error) {
                setMessage("Error searching for users");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        searchUser();
    };

    const filteredConversations = conversations.filter(conversation =>
        conversation.participants.some(participant =>
            participant.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

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
                <Flex flex={1} gap={4} flexDirection={"column"} maxW={{ sm: "300px", md: "full" }} mx={"auto"} p={2}>
                    <Text fontWeight={700} fontSize={"lg"} color={useColorModeValue("gray.600", "gray.400")}>
                        Your Conversations
                    </Text>
                    <Flex alignItems={"center"} gap={3}>
                        <Input
                            placeholder='Search for a user'
                            size={"lg"}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button size={"md"}>
                            <SearchIcon />
                        </Button>
                    </Flex>

                    {searchQuery ? (
                        loading ? (
                            <Text>Loading...</Text>
                        ) : users.length > 0 ? (
                            <ChatUserList users={users} />
                        ) : (
                            message && <Text>{message}</Text>
                        )
                    ) : (
                        filteredConversations.map((conversation, index) => (
                            <Conversation
                                key={index}
                                conversation={conversation}
                                onClick={() => handleConversationClick(conversation)}
                                currentUserId={currentUser._id}
                                isOnline={conversation.participants.some(participant => onlineUsers.includes(participant._id))}
                            />
                        ))
                    )}
                </Flex>

                <Flex
                    flex={3}
                    borderRadius={"md"}
                    p={0} // Removed padding here
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
