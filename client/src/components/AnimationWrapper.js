import React from 'react';
import { CSSTransition } from 'react-transition-group/';

const AnimationWrapper = ({ children, ...props }) => {
    const nodeRef = React.useRef(null);

    return (
        <CSSTransition timeout={800} classNames="fade" nodeRef={nodeRef} {...props}>
            <tr style={{ fontSize: "1.3em", position: "relative" }} ref={nodeRef}>
                {children}
            </tr>
        </CSSTransition>
    );
};

export default AnimationWrapper;