import React, { useState } from "react";
import { Box, VStack, Text, IconButton, Heading, useColorModeValue } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const moods = ["happy", "energized", "tired", "anxious", "motivated"];

const MoodCard = ({ mood, onSwipe }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box p={8} borderRadius="lg" boxShadow="md" bg={bgColor} textAlign="center" minH="200px" display="flex" alignItems="center" justifyContent="center">
      <Heading size="xl">{mood}</Heading>
    </Box>
  );
};

const Index = () => {
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);
  const [swipedMoods, setSwipedMoods] = useState([]);

  const handleSwipe = (direction) => {
    setSwipedMoods([...swipedMoods, { mood: moods[currentMoodIndex], direction }]);
    setCurrentMoodIndex((prevIndex) => (prevIndex + 1) % moods.length);
  };

  return (
    <Box p={8}>
      <Heading mb={8} textAlign="center">
        Swipe Your Mood
      </Heading>
      {currentMoodIndex < moods.length ? (
        <VStack spacing={8}>
          <MoodCard mood={moods[currentMoodIndex]} />
          <Box>
            <IconButton icon={<FaThumbsDown />} aria-label="Swipe Left" onClick={() => handleSwipe("left")} size="lg" mr={4} />
            <IconButton icon={<FaThumbsUp />} aria-label="Swipe Right" onClick={() => handleSwipe("right")} size="lg" />
          </Box>
        </VStack>
      ) : (
        <Box textAlign="center">
          <Heading size="xl" mb={8}>
            Your Swiped Moods
          </Heading>
          {swipedMoods.map(({ mood, direction }, index) => (
            <Text key={index} fontSize="xl">
              {mood} - {direction === "left" ? "👎" : "👍"}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Index;
