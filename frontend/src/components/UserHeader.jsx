import React, { useState } from 'react'
// import { VStack, Flex, Box, Avatar, Text, Menu, MenuButton, MenuList, Button } from '@chakra-ui/react'
import { VStack, Flex, Box, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { SlSocialInstagram } from "react-icons/sl";
import { CgMoreO } from "react-icons/cg";
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import {Link as RouterLink} from 'react-router-dom'





export const UserHeader = ({user}) => {

    const myUser = useRecoilValue(userAtom);

    const toast = useToast();

    const [following,setfollowing] = useState(user.followers.includes(myUser._id));

    const [followerCount, setFollowerCount] = useState(user.followers.length)

    console.log(followerCount)
    


    const handleFollowUnfollow = async () => {
      try{
        const response = await fetch(`api/users/followunfollow/${user._id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          }
        })
        const data = await response.json();
        console.log(data)
        if(response.ok){
          console.log(`CHECKING THE BOOLEAN: ${data.followStatus}`)
          setfollowing(data.followStatus);
          console.log("FOLLOWED/UNFOLLOWED")
          if(data.followStatus){
            setFollowerCount(followerCount+1)
          }
          else{
            setFollowerCount(followerCount-1)
          }
        }
        else{
          toast({
            title: 'Unable to follow/unfollow',
            description: data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }

      }
      catch(error){
         
          toast({
            title: 'Unable to follow/unfollow',
            description: "Error",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        
      }
    }


    const copyClipboard = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
              title: 'Link copied.',
              description: "The current URL has been copied to your clipboard.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }).catch(err => {
            toast({
              title: 'Failed to copy.',
              description: "Could not copy the URL. Please try again.",
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
        
    }

  return (
    <VStack
  gap={4}
  align='start'
>
  <Flex justifyContent={"space-between"} w={"full"}>
  
    <Box>
    {/* BOX 1 */}
    <Text fontSize={'3xl'} as={'b'} fontStyle={''}> {user.name} </Text>

    <Flex gap={5} alignItems={"center"}>

    <Text fontSize={'xl'} fontStyle={''}>{user.username}</Text>
    <Text fontSize={'lg'} fontStyle={''} backgroundColor={"grey.light"}> threads.next </Text>
    


    </Flex>

    </Box>
    <Box>
    <Avatar
    name={user.name}
    src={user.profilePic}
    size={'2xl'}
    bg="purple.500" color="white"
    />
  </Box>

  </Flex>


  <Text fontSize={'xl'}>{user.bio}</Text>


  {myUser._id === user._id && (
  <Link as={RouterLink} to='/editProfile'>
    <Button>Edit Profile</Button>
  </Link>
)}

{myUser._id !== user._id && (
          <Button onClick={handleFollowUnfollow}>
            {following ? 'Unfollow' : 'Follow'}
          </Button>
        )}


  <Flex justifyContent={"space-between"} w={"full"}>

    <Flex  gap={2} alignItems={"center"}>
        <Text color={"gray.light"}>{followerCount} followers</Text>
        <Text color={"gray.light"}> - </Text>
        <Link color={"gray.light"} href="https://instagram.com">instagram.com</Link>
    </Flex>

    <Flex gap={2} alignItems={"center"}>
        <Box className='circular-icon'>
            <SlSocialInstagram size={30}/>
        </Box>
        <Box className='circular-icon'>
            <Menu>
              <MenuButton as={Button}>
                <CgMoreO size={30}/>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={copyClipboard}>Copy Clipboard</MenuItem>
              </MenuList>
            </Menu>
          </Box>
    </Flex>



  </Flex>

  <Flex w={"full"}>
    <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
        <Text fontWeight={"bold"}>Threads</Text>
    </Flex>
    <Flex flex={1} borderBottom={"1.8px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
        <Text fontWeight={"bold"}>Replies</Text>
    </Flex>

  </Flex>




</VStack>
  )
}
