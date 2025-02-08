'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const serviceCard = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  whileHover: { scale: 1.03, transition: { duration: 0.2 } }
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: any;
  isContainer?: boolean;
}

export function AnimatedSection({ children, className = "", variants = fadeIn, isContainer = false }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial="initial"
      animate="animate"
      variants={isContainer ? staggerContainer : variants}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedElement({ children, className = "", variants = fadeIn, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedServiceCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={serviceCard}
      whileHover="whileHover"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedForm({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.form
      className={className}
      variants={fadeIn}
    >
      {children}
    </motion.form>
  );
}

export function AnimatedInput({ className = "", ...props }: { className?: string; [key: string]: any }) {
  return (
    <motion.div
      className="mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <input
        className={className}
        {...props}
      />
    </motion.div>
  );
}

export function AnimatedTextArea({ className = "", ...props }: { className?: string; [key: string]: any }) {
  return (
    <motion.div
      className="mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <textarea
        className={className}
        {...props}
      />
    </motion.div>
  );
} 