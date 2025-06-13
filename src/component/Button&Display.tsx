import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import TypingAnimation from "../animation/TypingAnimation"
import React from "react";

interface PropData {
  result: string;
  isSubmitting?: boolean;
  justGenerated: boolean
  setJustGenerated : (val: boolean) => void
  disableButton : boolean
}

const Dots = () => (
  <span className="inline-block">
    <span className="animate-dot text-lg">.</span>
    <span className="animate-dot delay-150 text-lg">.</span>
    <span className="animate-dot delay-300 text-lg">.</span>
  </span>
);

const Button = ({
  result,
  isSubmitting = false,
  justGenerated,
  setJustGenerated,
  disableButton
}: PropData) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Generate Button */}
      <button
        disabled = {isSubmitting || disableButton}
        className="
                    w-full h-12 px-6 py-3 rounded-lg font-semibold text-sm
                    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                    dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700
                    text-white shadow-sm hover:shadow-md
                    transition-all duration-250 ease-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2
                    dark:focus:ring-blue-400/30 dark:focus:ring-offset-gray-800
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
                "
      >
        {isSubmitting ? (
          <>
            Generating <Dots />
          </>
        ) : "Generate Password"}
      </button>

      {/* Result Display */}
      {result && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Generated Password
          </label>
          <div
            className="
                        flex items-center gap-3 p-4
                        bg-gray-50 dark:bg-gray-800/50
                        border border-gray-200 dark:border-gray-700
                        rounded-lg
                        transition-colors duration-200
                    "
          >
            <div className="flex-1 min-w-0">
              <span
                className="
                                block text-sm md:text-base font-mono
                                text-gray-900 dark:text-white
                                break-all select-all
                            "
              >
                <div className="flex-1 min-w-0">
                  {justGenerated ? (
                    <TypingAnimation
                      text={result}
                      duration={750}
                      onDone={() => setJustGenerated(false)}
                    />
                  ) : (
                    <span className="block text-sm md:text-base font-mono text-gray-900 dark:text-white break-all select-all">
                      {result}
                    </span>
                  )}
                </div>
              </span>
            </div>

            <Tooltip
              title={`${copied ? "Copied!" : "Copy to clipboard"}`}
              placement="top"
            >
              <button
                type="button"
                onClick={handleCopy}
                className="
                                    flex-shrink-0 p-2 rounded-md
                                    text-gray-500 dark:text-gray-400
                                    hover:text-gray-700 dark:hover:text-gray-200
                                    hover:bg-gray-200 dark:hover:bg-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/30
                                    transition-all duration-200 cursor-pointer
                                "
                aria-label="Copy password to clipboard"
              >
                <MdContentCopy className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Button);
