import React from 'react';
import { Flex, Avatar, AvatarBadge, Stack, Text, Image, useColorModeValue, WrapItem } from '@chakra-ui/react';

export const Conversation = () => {
    const bgColor = useColorModeValue("gray.600", "gray.dark");
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
        >
            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                    }}
                    name='Snehal'
                >
                    <AvatarBadge boxSize='1em' bg='green.500' />
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight='700' display={"flex"} alignItems={"center"}>
                    John Doe<Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    Hello Some Message
                </Text>
            </Stack>
        </Flex>
    );
}