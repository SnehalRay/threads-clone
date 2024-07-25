import React, { useState, useEffect } from 'react';
import { Flex, Avatar, AvatarBadge, Stack, Text, useColorModeValue, WrapItem } from '@chakra-ui/react';

export const Conversation = ({ conversation, onClick }) => {
    const bgColor = useColorModeValue("gray.600", "gray.dark");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`/api/users/getUserFromID/${conversation.participants[0]._id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();
    }, [conversation.participants]);

    if (!user) {
        return null; // or a loading spinner, placeholder, etc.
    }

    const isLastMessageFromOtherUser = conversation.lastMessage.sender == user._id

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
            onClick={onClick}
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
                    <AvatarBadge boxSize='1em' bg='green.500' />
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight='700' display={"flex"} alignItems={"center"}>
                    {user.username}
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} fontWeight={isLastMessageFromOtherUser ? 'bold' : 'normal'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth="200px">
                    {conversation.lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    );
};
