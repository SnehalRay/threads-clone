import { FormControl, FormLabel, Input, useColorModeValue, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UserList } from './UserList'; // Assuming UserList is in the same directory

export const SearchBar = () => {
  const [inputs, setInputs] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("black", "white");

  useEffect(() => {
    if (inputs === "") {
      setUsers([]);
      setMessage("");
      return;
    }

    const searchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/search/${inputs}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setUsers(data);
            setMessage("");
          } else {
            setMessage("DOES NOT EXIST");
            setUsers([]);
          }
        } else {
          setMessage("Error searching for users");
          setUsers([]);
        }
      } catch (error) {
        setMessage("Error searching for users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    searchUser();
  }, [inputs]);

  return (
    <VStack spacing={4} width="100%">
      <FormControl width="100%">
        <FormLabel>
          <Input
            placeholder='Search Users'
            onChange={(e) => setInputs(e.target.value)}
            bg={bgColor}
            color={color}
            width="100%" 
            maxW="800px" 
            _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
          />
        </FormLabel>
      </FormControl>
      {loading ? (
        <Text>Loading...</Text>
      ) : users.length > 0 ? (
        <UserList users={users} />
      ) : (
        message && <Text>{message}</Text>
      )}
    </VStack>
  );
};
