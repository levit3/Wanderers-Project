import React, { useState } from 'react';

const ReadMore = ({ children, maxCharacterCount = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const renderText = () => {
    if (isExpanded) {
      return children;
    }
    if (children.length <= maxCharacterCount) {
      return children;
    }
    return `${children.substring(0, maxCharacterCount)}...`;
  };

  return (
    <p>
      {renderText()}
      {children.length > maxCharacterCount && (
        <span onClick={toggleReadMore} className="read-more">
          {isExpanded ? ' Show less' : ' Read more'}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
