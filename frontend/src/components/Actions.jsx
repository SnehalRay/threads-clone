import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { Flex } from '@chakra-ui/react';

export const Actions = ({ liked, setLiked }) => {
  const handleLikeClick = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const handleOtherClick = (e) => {
    e.preventDefault();
  };

  return (
    <Flex gap={4} alignItems={"center"} justifyContent="flex-start">
      {liked 
        ? <FcLike size="30px" onClick={handleLikeClick} /> 
        : <FaRegHeart size="30px" onClick={handleLikeClick} />}
      <FaRegCommentAlt size="30px" onClick={handleOtherClick} />
      <AiOutlineRetweet size="30px" onClick={handleOtherClick} />
      <FiSend size="30px" onClick={handleOtherClick} />
    </Flex>
  );
};
