import React from 'react';
import { Container, Box, VStack, Heading, Text } from '@chakra-ui/react';

const Chatbot = () => {
  return (
    <Container maxW='620px' p={4} borderWidth={1} borderRadius="lg" boxShadow="md" bg="gray.50">
      <VStack spacing={4}>
        <Heading size="lg" textAlign="center" color="teal.500">
            Chat with me!
        </Heading>
        <Text fontSize="md" color="gray.600" textAlign="center">
          Ask me anything! I'm here to help you.
        </Text>
        <Box 
          borderWidth={1} 
          borderRadius="lg" 
          overflow="hidden" 
          boxShadow="sm" 
          bg="white" 
          p={2}
          w="100%"
        >
          <iframe
            width="100%"
            height="800"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/afda630b-692c-44b8-bc05-905239f27b6a"
            style={{ border: 'none', backgroundColor: '#f0f0f0' }}
            title="Chatbot"
          ></iframe>
        </Box>
      </VStack>
    </Container>
  );
};

export default Chatbot;
