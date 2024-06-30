import React, { useEffect, useState } from 'react'
import { UserHeader } from '../components/UserHeader'
import { UserPost } from '../components/UserPost'
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/${username}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          console.log(data); // Log the fetched data
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

  return (
    <>
      {user ? (
        <>
          <UserHeader user={user} />
          <UserPost likes={'400k'} replies={'70k'} post={'/post1.png'} caption={"Literally can't think of any caption but SIUUUUU"} />
          <UserPost likes={'100k'} replies={'20k'} post={'/post3 (1).png'} caption={"Musk - The Sugar Daddy"} />
          <UserPost likes={'900k'} replies={'120k'} post={'/GettyImages-1655072121.png'} caption={"This kid is hella good - BELLINGOL"} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
