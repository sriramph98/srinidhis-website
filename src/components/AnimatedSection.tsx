'use client';

import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

const fadeIn: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)',
    transition: { duration: 0.6 }
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const serviceCard: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)',
    transition: { duration: 0.5 }
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5 }
  },
  whileHover: { 
    y: -4,
    filter: 'blur(0px)',
    boxShadow: '0px 4px 24px rgba(255, 182, 47, 0.24)',
    transition: { duration: 0.2 } 
  }
};

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  isContainer?: boolean;
}

export function AnimatedSection({ children, className = "", variants = fadeIn, isContainer = false, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={isContainer ? staggerContainer : variants}
      {...props}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedElementProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export function AnimatedElement({ 
  children, 
  className = "", 
  variants = fadeIn,
  ...props 
}: AnimatedElementProps) {
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

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedButton({ children, className = "", onClick, ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedServiceCard({ children, className = "", ...props }: AnimatedCardProps) {
  return (
    <motion.div
      className={`${className} transition-shadow duration-200`}
      variants={serviceCard}
      whileHover="whileHover"
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedFormProps extends HTMLMotionProps<"form"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedForm({ children, className = "", ...props }: AnimatedFormProps) {
  return (
    <motion.form
      className={className}
      variants={fadeIn}
      {...props}
    >
      {children}
    </motion.form>
  );
}

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function AnimatedInput({ className = "", ...props }: AnimatedInputProps) {
  return (
    <motion.div
      className="mb-4"
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      <input
        className={className}
        {...props}
      />
    </motion.div>
  );
}

interface AnimatedTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function AnimatedTextArea({ className = "", ...props }: AnimatedTextAreaProps) {
  return (
    <motion.div
      className="mb-4"
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      <textarea
        className={className}
        {...props}
      />
    </motion.div>
  );
} 