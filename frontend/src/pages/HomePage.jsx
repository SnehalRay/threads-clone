import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Feed } from '../components/Feed';  // Ensure this path is correct

export const HomePage = () => {
  return (
    <VStack>
      <Feed />
    </VStack>
  );
};
