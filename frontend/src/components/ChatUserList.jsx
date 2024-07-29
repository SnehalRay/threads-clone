import React from 'react';
import { VStack, HStack, Avatar, Box, Text, useToast } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { selectedConversationAtom, chatpageAtom } from '../../atoms/chatpageAtom';

export const ChatUserList = ({ users }) => {
  const myUser = useRecoilValue(userAtom);
  const setSelectedConversation = useSetRecoilState(selectedConversationAtom);
  const setConversations = useSetRecoilState(chatpageAtom);
  const toast = useToast();

  const handleUserClick = async (user) => {
    try {
      const response = await fetch('/api/messages/startConversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure your token is set correctly
        },
        body: JSON.stringify({ participantId: user._id }),
      });
      const data = await response.json();
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      setConversations((prev) => [data, ...prev]);
      setSelectedConversation(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack align="start" spacing={4} w="100%">
      {users.map((user) => (
        <Box key={user._id} w="100%" onClick={() => handleUserClick(user)} cursor="pointer">
          <HStack spacing={4} w="100%">
            <Avatar name={user.name} src={user.profilePic} size="md" />
            <Box>
              <Text fontWeight="bold" fontSize="md">
                {user.username}
              </Text>
              <Text fontSize="sm">
                {user.name}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
