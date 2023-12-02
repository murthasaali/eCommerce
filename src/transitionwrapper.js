// TransitionWrapper.js

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './transitionWrapper.css'// CSS file for transitions

const TransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <div className="fade">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
