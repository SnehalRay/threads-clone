import React, { useEffect, useState } from 'react';
import { VStack, Flex, Text, useToast } from '@chakra-ui/react';
import { UserPost } from '../components/UserPost';
import { Link } from 'react-router-dom';

export const Feed = () => {
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
          toast({
            title: "Error",
            description: data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching the feed.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    getUserFeed();
  }, [toast]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
  };

  return (
    <VStack>
      {loading ? (
        <Text>Loading...</Text>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <Link to={`${post.user.username}/post/${post._id}`} key={post._id} style={{ width: '100%' }}>
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
                likes={post.likes}
                replies={post.replies}
                post={post.img}
                caption={post.text}
                time={timeDifference(post.createdAt)}
                user={post.user}
                postid={post._id}
                onDelete={handleDeletePost}
              />
            </Flex>
          </Link>
        ))
      ) : (
        <Text>No posts to show.</Text>
      )}
    </VStack>
  );
};
