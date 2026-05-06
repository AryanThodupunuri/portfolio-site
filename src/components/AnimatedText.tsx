import React, { useEffect, useState } from 'react';

interface AnimatedTextProps {
  texts: string[];
  type?: 'typewriter' | 'fade' | 'slide';
  interval?: number;
  className?: string;
}

const animationClasses = {
  fade: 'transition-opacity duration-700 ease-in-out',
  slide: 'transition-transform duration-700 ease-in-out',
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  texts,
  type = 'typewriter',
  interval = 2000,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (type === 'typewriter') {
      setDisplayed('');
      setTyping(true);
      let i = 0;
      const typeInterval = setInterval(() => {
        setDisplayed(texts[index].slice(0, i + 1));
        i++;
        if (i === texts[index].length) {
          clearInterval(typeInterval);
          setTimeout(() => setTyping(false), interval - 500);
        }
      }, 40);
      return () => clearInterval(typeInterval);
    } else {
      setDisplayed(texts[index]);
      setTyping(false);
    }
  }, [index, texts, type, interval]);

  useEffect(() => {
    if (!typing) {
      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
      }, interval);
      return () => clearTimeout(timeout);
    }
  }, [typing, interval, texts.length]);

  let animationClass = '';
  if (type === 'fade') animationClass = animationClasses.fade;
  if (type === 'slide') animationClass = animationClasses.slide;

  return (
    <span
      className={
        `${className} inline-block ` +
        (type === 'fade' ? `${animationClass} ${typing ? 'opacity-0' : 'opacity-100'}` : '') +
        (type === 'slide' ? `${animationClass} ${typing ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}` : '')
      }
    >
      {displayed}
      {type === 'typewriter' && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default AnimatedText;
