import React from 'react'
import { UserPost } from '../components/UserPost'
import { Comment } from '../components/Comment'


export const PostPage = () => {
  return (
    <>
    <UserPost likes={'400k'} replies={'70k'} post={'/post1.png'} caption={"Let's go Portugal"}></UserPost>
    <Comment></Comment>
    <Comment></Comment>
    <Comment></Comment>
    <Comment></Comment>

    </>
  )
}


