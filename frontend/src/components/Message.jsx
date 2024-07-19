import React from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';

export const Message = ({ ownMessage }) => {
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
                            Hello
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
                    <Avatar name="John Doe" size={"sm"} />
                    <Flex flexDir={"column"} gap={2}>
                        <Text bg={"gray.500"} color={"white"} p={2} borderRadius={"md"} alignSelf={"flex-start"}>
                            Hello
                        </Text>
                    </Flex>
                </Flex>
            )}
        </>
    );
};
