import { Button, useColorModeValue, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Textarea, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { MdAddBox } from "react-icons/md";
import { CreatePostModal } from './CreatePostModal';

export const CreatePost = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<MdAddBox />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        size={'lg'}
        fontSize={'xl'}
        p={6}
        borderRadius={'full'}
        _hover={{
          bg: useColorModeValue("gray.400", "gray.darker")
        }}
        _active={{
          bg: useColorModeValue("gray.500", "gray.darkest")
        }}
        onClick={onOpen}
      >
        POST
      </Button>

      <CreatePostModal isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
