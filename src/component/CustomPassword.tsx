import { useForm, type SubmitHandler } from "react-hook-form";
import { useCustomPassStore } from "../store/useCustomPassStore";
import Button from "./Button&Display";
import TabsHeader from "./tabs-component/TabsHeader";
import Slider from "@mui/material/Slider";
import { useEffect, useState, useCallback } from "react";

type FormData = {
  lowercase: number;
  uppercase: number;
  symbol: number;
  number: number;
};

const CustomPassword = () => {

  // Zustand Destructuring
  const {
    password,
    isShuffled,
    toggleShuffled,
    lengthLowercase,
    lengthNumber,
    lengthSymbol,
    lengthUppercase,
    setAllLengths,
    generatePassword,
  } = useCustomPassStore();

  // Useform Destructuring
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues : {
      lowercase: lengthLowercase,
      uppercase: lengthUppercase,
      symbol: lengthSymbol,
      number: lengthNumber,
    }
  });

  const value = watch()

  const [disableButton, setDisableButton] = useState(false)

  const totalLength = (
  (isNaN(value.lowercase) ? 0 : value.lowercase) +
  (isNaN(value.uppercase) ? 0 : value.uppercase) +
  (isNaN(value.symbol) ? 0 : value.symbol) +
  (isNaN(value.number) ? 0 : value.number)
)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateStore = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (lowercase: number, uppercase: number, number: number, symbol: number) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setAllLengths(lowercase, uppercase, number, symbol);
        }, 300); // 300ms delay
      };
    })(),
    [setAllLengths]
  );

  // Update button state and store (debounced)
  useEffect(() => {
    setDisableButton(totalLength < 4 || totalLength > 480 );

    // Only update store if values are valid numbers
    if (!isNaN(value.lowercase) && !isNaN(value.uppercase) && !isNaN(value.number) && !isNaN(value.symbol)) {
      debouncedUpdateStore(value.lowercase, value.uppercase, value.number, value.symbol);
    }
  }, [value.lowercase, value.uppercase, value.number, value.symbol, totalLength, debouncedUpdateStore]);

  const [justGenerated, setJustGenerated] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setAllLengths(data.lowercase, data.uppercase, data.number, data.symbol);
    await new Promise(resolve => setTimeout(resolve, 750));
    generatePassword();
    setJustGenerated(true)
  };

  return (
    <>
      <div className="md:px-6">
        <TabsHeader
          title="Custom Style Password"
          subtitle="Custom Password has a minimum of 4 digits and maximum of 480 digits in total length."
        />

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="space-y-6">
            <div>
              <div className="space-y-2">
                <label
                  htmlFor="lowercase"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Lowercase letters (a-z)
                </label>
                <div className="md:flex md:gap-8 md:items-center">
                  <Slider
                    defaultValue={2}
                    min={0}
                    max={120}
                    aria-label="lowercase"
                    valueLabelDisplay="auto"
                    value={isNaN(value.lowercase) || value.lowercase == null ? 0 : value.lowercase}
                    onChange={(_, newValue) => setValue("lowercase", Number(newValue))}
                  />
                  <input
                    type="number"
                    id="lowercase input"
                    min={0}
                    max={120}
                    placeholder="Enter length"
                    {...register("lowercase", { valueAsNumber: true })}
                    className="
                                    w-full px-3 py-2.5 text-sm
                                    bg-white dark:bg-gray-800
                                    border border-gray-300 dark:border-gray-600
                                    rounded-lg mb-5 md:mb-0
                                    text-gray-900 dark:text-white
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                    dark:focus:ring-blue-400/20 dark:focus:border-blue-400
                                    transition-colors duration-200
                                "
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="uppercase"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Uppercase letters (A-Z)
                </label>
                <div className="md:flex md:gap-8 md:items-center">
                  <Slider
                    defaultValue={2}
                    min={0}
                    max={120}
                    aria-label="uppercase input"
                    valueLabelDisplay="auto"
                    value={isNaN(value.uppercase) || value.uppercase == null ? 0 : value.uppercase}
                    onChange={(_, newValue) => setValue("uppercase", Number(newValue))}
                  />
                  <input
                    type="number"
                    id="uppercase"
                    min={0}
                    max={120}
                    placeholder="Enter length"
                    {...register("uppercase", {valueAsNumber : true})}
                    className="
                                    w-full px-3 py-2.5 text-sm
                                    bg-white dark:bg-gray-800
                                    border border-gray-300 dark:border-gray-600
                                    rounded-lg mb-5 md:mb-0
                                    text-gray-900 dark:text-white
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                    dark:focus:ring-blue-400/20 dark:focus:border-blue-400
                                    transition-colors duration-200
                                "
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Numbers (0-9)
                </label>
                <div className="md:flex md:gap-8 md:items-center">
                  <Slider
                    defaultValue={2}
                    min={0}
                    max={120}
                    aria-label="number input"
                    valueLabelDisplay="auto"
                    value={isNaN(value.number) || value.number == null ? 0 : value.number}
                    onChange={(_, newValue) => setValue("number", Number(newValue))}
                  />
                  <input
                    type="number"
                    id="number"
                    min={0}
                    max={120}
                    placeholder="Enter length"
                    {...register("number", {valueAsNumber : true})}
                    className="
                                    w-full px-3 py-2.5 text-sm
                                    bg-white dark:bg-gray-800
                                    border border-gray-300 dark:border-gray-600
                                    rounded-lg mb-5 md:mb-0
                                    text-gray-900 dark:text-white
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                    dark:focus:ring-blue-400/20 dark:focus:border-blue-400
                                    transition-colors duration-200
                                "
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="symbol"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Symbols (!@#$%^&*)
                </label>
                <div className="md:flex md:gap-8 md:items-center">
                  <Slider
                    defaultValue={2}
                    min={0}
                    max={120}
                    aria-label="symbol input"
                    valueLabelDisplay="auto"
                    value={isNaN(value.symbol) || value.symbol == null ? 0 : value.symbol}
                    onChange={(_, newValue) => setValue("symbol", Number(newValue))}
                  />
                  <input
                    type="number"
                    id="symbol"
                    min={0}
                    max={120}
                    placeholder="Enter length"
                    {...register("symbol", {valueAsNumber : true})}
                    className="
                                    w-full px-3 py-2.5 text-sm
                                    bg-white dark:bg-gray-800
                                    border border-gray-300 dark:border-gray-600
                                    rounded-lg
                                    text-gray-900 dark:text-white
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                    dark:focus:ring-blue-400/20 dark:focus:border-blue-400
                                    transition-colors duration-200
                                "
                  />
                </div>
              </div>

              {/* Total Password Length Display */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Password Length
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-md ${
                    totalLength < 4 || totalLength > 480
                      ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                      : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                  }`}>
                    {totalLength} characters
                  </span>
                </div>
                {totalLength < 4 && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Minimum 4 characters required
                  </p>
                )}
                {totalLength > 480 && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Maximum 480 characters allowed only
                  </p>
                )}
              </div>

            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Shuffle Option
              </h4>
              <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="shuffle"
                    checked={isShuffled}
                    onChange={toggleShuffled}
                    className="
                                    w-4 h-4 text-blue-600
                                    bg-white dark:bg-gray-800
                                    border-gray-300 dark:border-gray-600
                                    rounded focus:ring-blue-500 focus:ring-2
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                  />
                  <span
                    className={"text-sm text-gray-400 dark:text-gray-500"
                  }
                  >
                    Shuffle Password
                  </span>
                </label>
              </div>
          </div>

          <Button
            result={password}
            disableButton={disableButton}
            isSubmitting={isSubmitting}
            justGenerated={justGenerated}
            setJustGenerated={setJustGenerated}
          />
        </form>
      </div>
    </>
  );
};

export default CustomPassword;
