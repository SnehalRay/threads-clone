import React from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../../atoms/chatpageAtom';
import userAtom from '../../atoms/userAtom';

export const Message = ({ ownMessage, message, otherParticipant }) => {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const user = useRecoilValue(userAtom);
    return (
        <>
            {ownMessage ? (
                <Flex
                    gap={2}
                    alignItems={"center"}
                    p={1}
                    borderRadius={"md"}
                    alignSelf={"flex-end"}
                >
                    <Flex flexDir={"column"} gap={2}>
                        <Text bg={"purple.500"} color={"white"} p={2} borderRadius={"md"} alignSelf={"flex-end"}>
                            {message.text}
                        </Text>
                    </Flex>
                </Flex>
            ) : (
                <Flex
                    gap={2}
                    alignItems={"center"}
                    p={1}
                    borderRadius={"md"}
                    alignSelf={"flex-start"}
                >
                    <Avatar 
                        name={otherParticipant.name} 
                        src={otherParticipant.profilePic} 
                        size={"sm"} 
                    />
                    <Flex flexDir={"column"} gap={2}>
                        <Text bg={"gray.500"} color={"white"} p={2} borderRadius={"md"} alignSelf={"flex-start"}>
                            {message.text}
                        </Text>
                    </Flex>
                </Flex>
            )}
        </>
    );
};