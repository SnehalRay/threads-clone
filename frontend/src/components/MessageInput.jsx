import {
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
} from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";

const MessageInput = () => {
    return (
        <Flex gap={2} alignItems={"center"}>
            <form style={{ flex: 95 }}>
                <InputGroup>
                    <Input placeholder='Type a message' />
                    <InputRightElement>
                        <IconButton
                            aria-label='Send message'
                            icon={<IoSendSharp />}
                            size='md' // Increased size
                            variant='ghost'
                        />
                    </InputRightElement>
                </InputGroup>
            </form>
            <Flex flex={5} cursor={"pointer"}>
                <IconButton
                    aria-label='Attach image'
                    icon={<BsFillImageFill />}
                    size='md' // Increased size
                    variant='ghost'
                />
            </Flex>
        </Flex>
    );
};

export default MessageInput;
