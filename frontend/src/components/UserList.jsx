import React from 'react';
import { VStack, HStack, Avatar, Box, Text, Link } from '@chakra-ui/react';
import userAtom from '../../atoms/userAtom';
import { useRecoilValue } from 'recoil';

export const UserList = ({ users }) => {
  const myUser = useRecoilValue(userAtom);

  return (
    <VStack align="start" spacing={4} w="100%">
      {users.map((user) => (
        <HStack key={user.username} spacing={4} w="100%">
          <Avatar name={user.name} src={user.profilePic} size="md" />
          <Box>
            <Text fontWeight="bold" fontSize="md">
              {user.username}
            </Text>
            <Text fontSize="sm">{user.name} • {user.followers.includes(myUser._id) ? 'Following' : 'Not Following'}</Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
};
