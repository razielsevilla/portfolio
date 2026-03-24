// src/components/Logo.js
import React from "react";
import { motion } from "framer-motion";

export const Logo = ({ size = "40px", color = "white" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scaleX: -1 }} // Added scaleX: -1 here
            animate={{ opacity: 1, y: 0, scaleX: -1 }}  // Added scaleX: -1 here
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: size, height: size, color: color }}
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%' }}
            >
                <path
                    d="M25 30H75V40H35L75 70H25V60H65L25 30Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
                <rect x="48" y="42" width="4" height="16" fill="currentColor" opacity="0.2" />
            </svg>
        </motion.div>
    );
};

export const LogoText = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', lineHeight: '1' }}>
        <span style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'inherit',   /* inherits from the nav's forground — theme-aware */
            fontFamily: "'Space Grotesk', sans-serif",
        }}>
            ie
        </span>
    </div>
);