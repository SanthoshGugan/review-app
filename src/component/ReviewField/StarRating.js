import { Icon, StarIcon } from '@chakra-ui/icons';
import { Center, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ 
    maxStars = 5,
    rating,
    question,
    updateRating = () => {},
    fieldIndex
}) => {

  const handleStarClick = (index) => {
    updateRating(index + 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxStars; i++) {
      stars.push(
       rating >= i + 1 ? <Icon as={FaStar} onClick={() => handleStarClick(i)} boxSize={10} color="gold"/> : 
        <Icon as={FaRegStar} onClick={() => handleStarClick(i)} boxSize={10} color="gold"/>
      );
    }

    return stars;
  };
  

  return (
    <Center className="star-rating" marginTop="1rem">
      {renderStars()}
    </Center>
  );
};

export default StarRating;
