import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Feed } from '../components/Feed';  
import { SearchBar } from '../components/SearchBar';

export const HomePage = () => {
  return (
    <VStack>
      <SearchBar/>
      <Feed />
    </VStack>
  );
};
