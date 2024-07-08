import { VStack, Flex, Box, Avatar, Text, Image, useColorModeValue, Menu, MenuButton, MenuList, Button, MenuItem, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgMoreO } from "react-icons/cg";
import { Actions } from './Actions';

export const UserPost = ({ user, likes, replies, post, caption, time, postid, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/posts/delete/${postid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: "Post deleted.",
          description: "The post has been deleted successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onDelete(postid); // Call the onDelete function passed from parent to update state
      } else {
        const data = await response.json();
        toast({
          title: "Failed to delete post.",
          description: data.message || "There was an error deleting the post.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to delete post.",
        description: error.message || "There was an error deleting the post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="sm" color={useColorModeValue("black", "white")}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Flex gap={2} alignItems={"center"}>
            <Link to={`/${user.username}/post/${postid}`}>
              <Avatar
                name={user.name}
                src={user.profilePic}
                size={'lg'}
                bg="purple.500"
                color="white"
              />
            </Link>
            <Box>
              <Link to={`/${user.username}/post/${postid}`}>
                <Text fontSize='xl' as='b'>{user.name}</Text>
                <Text fontSize={'2xl'}>{caption}</Text>
              </Link>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex direction={"column"} gap={2} alignItems={"center"}>
            <Text align={'center'} fontSize={'xl'}> {time} </Text>
            <Menu>
              <MenuButton as={Button} variant="ghost" onClick={(e) => e.stopPropagation()}>
                <CgMoreO size="20px" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Link to={`/${user.username}/post/${postid}`}>
          <Image src={post} />
        </Link>
      </Box>
      <Actions liked={liked} setLiked={setLiked} />
      <Flex gap={2} alignItems={"center"} justifyContent="flex-start">
        <Text color={"gray.light"}> {likes} likes</Text>
        <Text color={"gray.light"}> {replies} replies</Text>
      </Flex>
    </VStack>
  );
};
