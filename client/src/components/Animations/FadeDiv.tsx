import { motion, Target } from 'framer-motion';
import { PropsWithChildren } from 'react';

type AppearingDivProps = {
    className?: string;
    initial?: Target;
    animate?: Target;
} & PropsWithChildren;

const FadeDiv = ({ children, initial, animate, className = '' }: AppearingDivProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8, ...initial }}
            animate={{ opacity: 1, scale: 1, ...animate }}
            transition={{
                type: "tween",
                duration: 0.3,
            }}>
            {children}
        </motion.div>
    );
};

export default FadeDiv;
