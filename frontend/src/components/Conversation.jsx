import React, { useState, useEffect } from 'react';
import { Flex, Avatar, AvatarBadge, Stack, Text, useColorModeValue, WrapItem, useColorMode } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { selectedConversationAtom } from '../../atoms/chatpageAtom';

export const Conversation = ({ conversation, onClick, currentUserId, isOnline }) => {
    const bgColor = useColorModeValue("gray.600", "gray.dark");
    const [user, setUser] = useState(null);
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);

    console.log("JUST CHECKING");
    console.log(currentUserId);
    console.log(selectedConversation);

    const { colorMode } = useColorMode();
    const lastMessage = conversation.lastMessage;

    useEffect(() => {
        const getOtherParticipant = () => {
            return conversation.participants.find(participant => participant._id !== currentUserId);
        };

        const getUser = async () => {
            try {
                const otherParticipant = getOtherParticipant();
                const response = await fetch(`/api/users/getUserFromID/${otherParticipant._id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();
    }, [conversation.participants, currentUserId]);

    if (!user) {
        return null; // or a loading spinner, placeholder, etc.
    }

    const isLastMessageFromOtherUser = lastMessage.sender === user._id;

    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={"1"}
            _hover={{
                cursor: "pointer",
                bg: bgColor,
                color: "white",
            }}
            borderRadius={"md"}
            onClick={() => {
                setSelectedConversation({
                    _id: conversation._id,
                    userId: user._id,
                    username: user.username,
                    profilePic: user.profilePic,
                });
                onClick();
            }}
            bg={selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.600" : "gray.dark") : "transparent"}
        >
            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                    }}
                    name={user.username}
                    src={user.profilePic || 'default-avatar.png'}
                    bg={"purple.500"}
                >
                    <AvatarBadge boxSize='1em' bg={isOnline ? 'green.500' : 'red.500'} />
                    {/* <AvatarBadge boxSize='1em' bg='green.500' /> */}
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight='700' display={"flex"} alignItems={"center"}>
                    {user.username}
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} fontWeight={isLastMessageFromOtherUser ? 'bold' : 'normal'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth="200px">
                    {lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    );
};
