import { Button, Flex, VStack, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPost } from '../components/UserPost';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const getUserOfPost = async (userID) => {
    const res = await fetch(`/api/users/getUserFromID/${userID}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    const getUserFeed = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/posts/feeds");
        const data = await response.json();
        if (response.ok) {
          const postsWithUserData = await Promise.all(data.map(async (post) => {
            const user = await getUserOfPost(post.user);
            return { ...post, user };
          }));
          setPosts(postsWithUserData);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserFeed();
  }, [toast]);

  return (
    <VStack>
      {loading ? (
        <Text>Loading...</Text>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <Flex
            key={post._id}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="sm"
            w="100%"
            mb={4}
            direction="column"
          >
            <UserPost
              key={post._id}
              likes={post.likes}
              replies={post.replies}
              post={post.img}
              caption={post.text}
              time={timeDifference(post.createdAt)}
              user={post.user}
            />
          </Flex>
        ))
      ) : (
        <Text>No posts to show.</Text>
      )}
    </VStack>
  );
};
