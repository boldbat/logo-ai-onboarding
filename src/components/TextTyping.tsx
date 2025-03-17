import React, { useState, useEffect } from 'react';
import { Text, TextStyle } from 'react-native';

type Props = {
  text: string;
  textStyle?: TextStyle;
  speed?: number;
  onComplete?: () => void; // Add the onComplete prop
};

const TextTyping = ({ text, textStyle, speed = 100, onComplete }: Props) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.(); // Call onComplete when typing is done
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <Text style={textStyle}>{displayedText}</Text>;
};

export default TextTyping;
