// src/App.test.js
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import App from './App';

// Mock IntersectionObserver for ScrollReveal components
beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
        constructor(callback) { this.callback = callback; }
        observe(element) { this.callback([{ isIntersecting: true, target: element }]); }
        unobserve() { return null; }
        disconnect() { return null; }
    };
});

describe('Portfolio Smoke Tests', () => {

    test('renders preloader with initial terminal text', async () => {
        render(<App />);
        const loadingText = await screen.findByText(/> INITIALIZING SYSTEM.../i);
        expect(loadingText).toBeInTheDocument();
    });

    test('renders main hero content using fake timers', async () => {
        jest.useFakeTimers();
        render(<App />);

        /**
         * 💡 FIX: Since timers are sequential, we need to advance them 
         * multiple times to move through each render cycle.
         */
        for (let i = 0; i < 10; i++) {
            act(() => {
                jest.advanceTimersByTime(1000);
            });
        }

        /**
         * 💡 FIX: Use a function matcher for the greeting.
         * This is the most resilient way to find text that might be split across 
         * different HTML tags or React text nodes.
         */
        const heroGreeting = screen.getByText((content, element) => {
            const hasText = (text) => element.textContent.includes(text);
            const isCorrectElement = element.tagName.toLowerCase() === 'h2';
            return isCorrectElement && hasText("Raziel Sevilla");
        });

        expect(heroGreeting).toBeInTheDocument();

        jest.useRealTimers();
    });
});