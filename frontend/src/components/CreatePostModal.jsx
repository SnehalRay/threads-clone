import React, { useRef, useState } from 'react';
import { Button, useColorModeValue, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Textarea, FormLabel, Flex, Image, Box } from '@chakra-ui/react';
import { GrGallery } from 'react-icons/gr';
import { useToast } from '@chakra-ui/react';
import Compressor from 'compressorjs';

export const CreatePostModal = ({ isOpen, onClose }) => {
  const fileRef = useRef(null);
  const toast = useToast();

  const initialState = {
    text: "",
    img: ""
  };

  const [inputs, setInputs] = useState(initialState);

  const handleSubmit = async () => {
    try {
      // Create a new post
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // Fix Content-Type
        },
        body: JSON.stringify({
          text: inputs.text,
          img: inputs.img
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Post created.",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        resetInputs();
        onClose();
      } else {
        toast({
          title: "An error occurred.",
          description: data.error || "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

      console.log(inputs);

    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: "Unable to POST. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const handleImagePost = () => {
    fileRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInputs({ ...inputs, img: reader.result });
            console.log(reader.result);
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err.message);
          toast({
            title: "An error occurred.",
            description: "Failed to upload image. Please upload a PNG or JPEG file.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "An error occurred.",
        description: "Failed to upload image. Please upload a PNG or JPEG file.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const resetInputs = () => {
    setInputs(initialState);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); resetInputs(); }} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "gray.900")}>
        <ModalHeader color="white">Create Post</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pb={6}>
          {inputs.img && (
            <Box display="flex" justifyContent="center" mb={4}>
              <Image 
                src={inputs.img} 
                alt="Uploaded image" 
                borderRadius="md"
                maxHeight="200px"
                objectFit="cover"
              />
            </Box>
          )}
          <FormControl>
            <FormLabel color="white">Post Content</FormLabel>
            <Textarea
              placeholder="Write your post here..."
              size="lg"
              resize="vertical"
              bg={useColorModeValue("gray.200", "gray.700")}
              borderColor={useColorModeValue("gray.300", "gray.600")}
              _hover={{
                borderColor: useColorModeValue("gray.400", "gray.500")
              }}
              _focus={{
                borderColor: useColorModeValue("blue.500", "blue.300"),
                boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)"
              }}
              value={inputs.text}
              onChange={(e) => setInputs({ ...inputs, text: e.target.value })}
            />
          </FormControl>
          <Flex mt={4} justifyContent="flex-start">
            <Button
              aria-label="Add to gallery"
              leftIcon={<GrGallery />}
              size="lg"
              variant="ghost"
              onClick={handleImagePost}
              color="white"
              borderColor="gray.600"
              _hover={{
                bg: "gray.700",
                borderColor: "gray.500"
              }}
              _focus={{
                bg: "gray.800",
                borderColor: "gray.400"
              }}
            >
              Add Image
            </Button>
            <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => { onClose(); resetInputs(); }}>
            Close
          </Button>
          <Button variant='solid' colorScheme='teal' onClick={handleSubmit}>Post</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
