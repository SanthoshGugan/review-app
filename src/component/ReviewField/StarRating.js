import { Icon, StarIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
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
       rating >= i + 1 ? <Icon as={FaStar} onClick={() => handleStarClick(i)} boxSize={6}/> : 
        <Icon as={FaRegStar} onClick={() => handleStarClick(i)} boxSize={6}/>
      );
    }

    return stars;
  };
  

  return (
    <div className="star-rating">
        <Text>{question}</Text>
      {renderStars()}
    </div>
  );
};

export default StarRating;
