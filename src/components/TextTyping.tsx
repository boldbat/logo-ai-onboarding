import React, { useState, useEffect } from 'react';
import { Text, TextStyle } from 'react-native';

type Props = {
  text: string;
  textStyle?: TextStyle;
  speed?: number;
};

const TextTyping = ({ text, textStyle, speed = 100 }: Props) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <Text style={textStyle}>{displayedText}</Text>;
};

export default TextTyping;
