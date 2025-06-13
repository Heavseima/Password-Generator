import { useState, useEffect } from "react";
import { Cookie, CheckCircle } from "lucide-react";

const PersistentCookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonsSwapped, setButtonsSwapped] = useState(false);

  const funnyTexts = [
    "🍪 We use cookies (the digital kind, sadly not chocolate chip)",
    "🕵️ Our cookies are watching you... but in a friendly way!",
    "🤖 Beep boop! Cookies detected. Resistance is futile.",
    "🍪 Warning: Our cookies may cause mild addiction to our site",
    "👻 Our cookies are less scary than your browser history",
    "🔮 We predict you'll click 'Accept' anyway. Am I right?",
    "🍪 These cookies won't make you fat, just slightly tracked",
    "🎭 Plot twist: The cookies were inside you all along!",
    "🧠 Our cookies are smarter than your average cookie",
    "🍪 Accept cookies or we'll be very disappointed 😢",
  ];

  const reasons = [
    "To remember if you like dark mode (very important)",
    "So we don't show you this popup 847 times",
    "To count how many passwords you've generated (for bragging rights)",
    "To remember your preferred level of password chaos",
    "So our analytics can feel important and loved",
    "To make our lawyers happy (they're very sad otherwise)",
  ];

  const successMessages = [
    "🎉 Congratulations! You've officially joined the cookie club!",
    "🍪 Welcome to the dark side... we have cookies!",
    "🎊 You've made our cookies very happy. They're doing a little dance!",
    "🏆 Achievement unlocked: Cookie Accepter Extraordinaire!",
    "🎈 Party time! Even our servers are celebrating!",
  ];

  // Check if user has already accepted cookies
  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Rotate funny text every 3 seconds
  useEffect(() => {
    if (!isVisible || showSuccess) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentJoke((prev) => (prev + 1) % funnyTexts.length);
        setIsAnimating(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, showSuccess]);

  const handleAccept = async () => {
    setIsLoading(true);

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookieAcceptedDate', new Date().toISOString());

    setIsLoading(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3500);
  };

  const handleReject = () => {
    // Do nothing - user must accept!
    setCurrentJoke((prev) => (prev + 1) % funnyTexts.length);
  };

  const handleRejectHover = () => {
    setButtonsSwapped(!buttonsSwapped);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" />

      {/* Cookie Consent Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 pointer-events-auto transform animate-in zoom-in-50 duration-500 ease-out">

        {showSuccess ? (
          // Success State
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="text-green-600 dark:text-green-400" size={48} />
                </div>
                <div className="absolute -top-2 -right-2 text-2xl animate-spin">🍪</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Mission Accomplished! 🎯
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {successMessages[Math.floor(Math.random() * successMessages.length)]}
              </p>
            </div>

            <div className="text-6xl animate-pulse">🎉</div>
          </div>
        ) : (
          // Main Cookie Consent
          <div className="p-6 space-y-4">
            {/* Header with Cookie Icon */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Cookie
                  className="text-amber-600 dark:text-amber-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cookie Alert! 🚨
              </h3>
            </div>

            {/* Rotating Funny Text */}
            <div className="min-h-[3rem] flex items-center">
              <p
                className={`text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                {funnyTexts[currentJoke]}
              </p>
            </div>

            {/* Reasons List */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                We use cookies to:
              </p>
              <div className="space-y-1 ml-4">
                {reasons.slice(0, 3).map((reason, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons - Reject first, Accept second */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {!buttonsSwapped ? (
                <>
                  <button
                    onClick={handleReject}
                    onMouseEnter={handleRejectHover}
                    className="flex-1 px-4 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-300 text-sm cursor-pointer transform hover:scale-105"
                  >
                    Reject (Try me! 😈)
                  </button>

                  <button
                    onClick={handleAccept}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Accept All Cookies 🍪"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleAccept}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Accept All Cookies 🍪"
                    )}
                  </button>

                  <button
                    onClick={handleReject}
                    onMouseEnter={handleRejectHover}
                    className="flex-1 px-4 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-300 text-sm cursor-pointer transform hover:scale-105"
                  >
                    Reject (Nope! 😏)
                  </button>
                </>
              )}
            </div>

            {/* Fine Print */}
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center pt-2">
              By using this site, you agree that cookies are delicious (legally speaking)
            </p>

            <p className="text-xs text-red-500 dark:text-red-400 text-center">
              Too bad, So Sad 😈
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersistentCookieConsent;