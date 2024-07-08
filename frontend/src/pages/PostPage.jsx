import React, { useEffect, useState } from 'react';
import { UserPost } from '../components/UserPost';
import { Comment } from '../components/Comment';
import { useParams, useNavigate } from 'react-router-dom';

export const PostPage = () => {
  const { username, pid } = useParams();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/users/${username}`);
        const userData = await userRes.json();
        setUser(userData);

        const postRes = await fetch(`/api/posts/${pid}`);
        const postData = await postRes.json();
        setPost(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [username, pid]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onDelete = () => {
    navigate(-1);
  }

  return (
    <>
      {post && user ? (
        <UserPost 
          postid={post._id}
          likes={post.likes}
          replies={post.replies}
          post={post.img}
          caption={post.text}
          time={timeDifference(post.createdAt)}
          user={user}
          onDelete={onDelete}
        />
      ) : (
        <p>Loading...</p>
      )}

      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </>
  )
}

// Helper function for time difference
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
