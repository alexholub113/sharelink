import { motion, Target, Transition } from 'framer-motion';
import { PropsWithChildren } from 'react';

type FallingDivProps = {
    direction: 'up' | 'down';
    className?: string;
    initial?: Target;
    animate?: Target;
    transition?: Transition;
} & PropsWithChildren;

const FallingDiv = ({ children, initial, animate, direction, transition, className = '' }: FallingDivProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: (direction === 'down' ? -100 : 100), ...initial }}
            animate={{ opacity: 1, y: 0, ...animate }}
            transition={transition}>
            {children}
        </motion.div>
    );
};

export default FallingDiv;
