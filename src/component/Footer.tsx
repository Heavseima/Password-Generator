import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const funnyMessages = [
    "Made with ☕ and questionable life choices",
    "No passwords were harmed in the making of this app",
    "Warning: May contain traces of bugs 🐛",
    "Built by humans, debugged by coffee",
    "Side effects may include: strong passwords & mild addiction",
    "Proudly generating chaos since 2024",
    "Fueled by caffeine and imposter syndrome",
    "Your password's personal trainer 💪",
    "Making hackers cry since day one",
    "Assembled by sleep-deprived developers",
    "Contains 100% organic randomness",
    "Tested on my mom's computer",
    "Password strength: stronger than my will to live",
    "Crafted with love, shipped with anxiety",
    "Warning: Highly addictive password generation ahead",
    "Surgically enhanced with Unicode symbols",
    "Satisfaction guaranteed or your sanity back",
    "Made by humans who forgot their own passwords",
    "Powered by pure procrastination energy",
    "Your friendly neighborhood password dealer 🕷️",
    "Endorsed by 4 out of 5 cybersecurity experts*",
    "(*The 5th one is still typing their password)",
    "Breaking weak passwords since the dawn of time",
    "Handcrafted by artisanal code monkeys 🐒",
    "Randomly generated with carefully calculated chaos",
    "Protecting your accounts from your ex since forever",
    "Password security level: Fort Knox meets Area 51",
    "Turning 'password123' into digital gold ✨",
    "Warning: Side effects include feeling secure",
    "Blessed by the gods of cyber security",
    "Made with 50% skill, 50% luck, 100% caffeine",
    "Your digital bodyguard in code form 🛡️",
    "Crushing weak passwords like bubble wrap",
    "Featuring military-grade random number abuse",
    "Powered by sheer determination and Red Bull",
    "Making 'qwerty' users everywhere uncomfortable",
    "Scientifically proven to annoy password crackers",
    "Built with tears of hackers who gave up",
    "Contains no artificial preservatives, only chaos",
    "Password entropy: maximum; developer sanity: minimum"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Function to get next random message index (different from current)
  const getNextRandomIndex = (currentIndex: number) => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * funnyMessages.length);
    } while (nextIndex === currentIndex && funnyMessages.length > 1);
    return nextIndex;
  };

  useEffect(() => {
    // Set initial random message
    setCurrentMessageIndex(Math.floor(Math.random() * funnyMessages.length));

    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);

      setTimeout(() => {
        // Change message after fade out completes
        setCurrentMessageIndex(prev => getNextRandomIndex(prev));
        // Start fade in
        setIsVisible(true);
      }, 500); // Match the transition duration for perfect timing
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-6 md:py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-2">
          {/* Animated funny message */}
          <div className="min-h-[1.5rem] md:min-h-[1.75rem] flex items-center justify-center overflow-hidden">
            <p
              className={`text-sm md:text-base text-gray-600 dark:text-gray-400 italic transition-all duration-500 ease-in-out transform ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 -translate-y-2 scale-95'
              }`}
            >
              {funnyMessages[currentMessageIndex]}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} Sigma Password Generator Co. |
            <span className="ml-1">
              All rights reserved (including the right to remain silent)
            </span>
          </p>

          {/* Extra silly note */}
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600">
            Remember: Your password is like your underwear - change it regularly
            and don't share it! 🔐
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;