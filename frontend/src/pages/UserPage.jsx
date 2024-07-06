import React, { useEffect, useState } from 'react';
import { UserHeader } from '../components/UserHeader';
import { UserPost } from '../components/UserPost';
import { useParams } from 'react-router-dom';
import { useToast, Spinner, Center, Box, Text } from '@chakra-ui/react';

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
  }, [username]);

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
  }, [user]);

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
              posts.map((post) => (
                <UserPost 
                  key={post._id}
                  user={user} 
                  likes={post.likes} 
                  replies={post.replies} 
                  post={post.img} 
                  caption={post.text} 
                  time={timeDifference(post.createdAt)}
                />
              ))
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
  )
}
