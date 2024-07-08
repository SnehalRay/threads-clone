import React from 'react';
import { VStack, HStack, Avatar, Box, Text } from '@chakra-ui/react';
import userAtom from '../../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

export const UserList = ({ users }) => {
  const myUser = useRecoilValue(userAtom);

  return (
    <VStack align="start" spacing={4} w="100%">
      {users.map((user) => (
        <Link to={`/${user.username}`} key={user.username} style={{ width: '100%' }}>
          <HStack spacing={4} w="100%">
            <Avatar name={user.name} src={user.profilePic} size="md" />
            <Box>
              <Text fontWeight="bold" fontSize="md">
                {user.username}
              </Text>
              <Text fontSize="sm" color={myUser.username === user.username ? "blue.400" : "inherit"}>
                {myUser.username === user.username
                  ? 'Your Account'
                  : `${user.name} • ${user.followers.includes(myUser._id) ? 'Following' : 'Not Following'}`}
              </Text>
            </Box>
          </HStack>
        </Link>
      ))}
    </VStack>
  );
};
