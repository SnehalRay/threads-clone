import {
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatpageAtom, selectedConversationAtom } from "../../atoms/chatpageAtom";

const MessageInput = ({ setMessages }) => {
    const [input, setInput] = useState("");
    const toast = useToast();
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(chatpageAtom);
    const [isSending, setIsSending] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        console.log("Message sent:", input);
        if (isSending) return;

        setIsSending(true);

        try {
            const res = await fetch("/api/messages/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input,
                    recipientId: selectedConversation.userId,
                }),
            });

            const data = await res.json();
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

            setMessages((messages) => [...messages, data]);

            setConversations((prevConvs) => {
                const updatedConversations = prevConvs.map((conversation) => {
                    if (conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: input,
                                sender: data.sender,
                            },
                        };
                    }
                    return conversation;
                });
                return updatedConversations;
            });

            setInput(""); // Clear the input field after sending

        } catch (error) {
            console.error("Error sending message:", error);
            toast({
                title: "Error",
                description: error.toString(),
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Flex gap={2} alignItems={"center"}>
            <form style={{ flex: 95 }} onSubmit={handleSend}>
                <InputGroup>
                    <Input 
                        placeholder='Type a message' 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label='Send message'
                            icon={<IoSendSharp />}
                            size='md' // Increased size
                            variant='ghost'
                            type="submit"
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
