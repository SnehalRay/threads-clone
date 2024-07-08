import React, { useEffect, useState } from 'react';
import { UserHeader } from '../components/UserHeader';
import { UserPost } from '../components/UserPost';
import { useParams, Link } from 'react-router-dom';
import { useToast, Spinner, Center, Box, Text, VStack, Flex } from '@chakra-ui/react';

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const toast = useToast();

  const timeDifference = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    const intervals = {
      year: 60 * 60 * 24 * 365,
      month: 60 * 60 * 24 * 30,
      day: 60 * 60 * 24,
      hour: 60 * 60,
      minute: 60,
    };

    let unit = 'second';
    let diff = diffInSeconds;

    for (const key in intervals) {
      if (diffInSeconds >= intervals[key]) {
        unit = key;
        diff = Math.floor(diffInSeconds / intervals[key]);
        break;
      }
    }

    return `${diff}${unit.charAt(0)}`;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/${username}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log(data.message);
          toast({
            title: "Error",
            description: data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.log(err.message);
        toast({
          title: "Error",
          description: "An error occurred while fetching user data.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    getUser();
  }, [username, toast]);

  useEffect(() => {
    const getUserPost = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/posts/user/${user._id}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
          console.log(data); // Log the fetched posts
        } else {
          console.log(data.message);
          toast({
            title: "Error",
            description: data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.log(err.message);
        toast({
          title: "Error",
          description: "An error occurred while fetching user posts.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    getUserPost();
  }, [user, toast]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
  };

  return (
    <>
      {user ? (
        <>
          <UserHeader user={user} />
          {loading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
            posts.length > 0 ? (
              <VStack>
                {posts.map((post) => (
                  <Link key={post._id} to={`/${user.username}/post/${post._id}`} style={{ width: '100%' }}>
                    <Flex
                      p={4}
                      borderWidth={1}
                      borderRadius="lg"
                      boxShadow="sm"
                      w="100%"
                      mb={4}
                      direction="column"
                      minH="150px"  // Set a minimum height for all posts
                      maxW="600px"  // Set a maximum width for all posts
                      alignSelf="center"
                    >
                      <UserPost 
                        user={user} 
                        likes={post.likes} 
                        replies={post.replies} 
                        post={post.img} 
                        caption={post.text} 
                        time={timeDifference(post.createdAt)}
                        postid={post._id}
                        onDelete={handleDeletePost}
                      />
                    </Flex>
                  </Link>
                ))}
              </VStack>
            ) : (
              <Box textAlign="center" mt={4}>
                <Text fontSize="xl">The user is yet to make a post</Text>
              </Box>
            )
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
