import React from 'react'
import { UserHeader } from '../components/UserHeader'
import { UserPost } from '../components/UserPost'

export const UserPage = () => {
  return (
    <>
    <UserHeader/>
    <UserPost likes={'400k'} replies={'70k'} post={'./post1.png'} caption={"Literally can't think of any caption but SIUUUUU"}/>
    <UserPost likes={'100k'} replies={'20k'} post={'./post3 (1).png'} caption={"Musk - The Sugar Daddy"}/>
    <UserPost likes={'900k'} replies={'120k'} post={'\GettyImages-1655072121.png'} caption={"This kid is hella good - BELLINGOL"}/>


    </>
  )
}
