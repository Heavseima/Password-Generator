import { useEffect, useState } from "react";
import { usePassStore } from "../store/usePassStore";
import Button from "./Button&Display";
import Slider from "@mui/material/Slider";
import TabsHeader from "./tabs-component/TabsHeader";
import {useForm, type SubmitHandler} from "react-hook-form";

interface FieldValues  {
  length: number
}

const SimplePassword = () => {
  const {
    includeNumber,
    includeSymbol,
    includeLowercase,
    includeUppercase,
    length,
    setLength,
    password,
    toggleNumber,
    toggleSymbol,
    toggleLowercase,
    toggleUppercase,
    generatePassword,
  } = usePassStore();

  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<FieldValues>({defaultValues:{length: length}});

  const value = watch();

  const [justGenerated, setJustGenerated] = useState(false)
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    setDisableButton(value.length < 4 || value.length>120 || isNaN(value.length))
    setLength(value.length)
  },[value.length])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLength(data.length);
    await new Promise(resolve => setTimeout(resolve, 750));
    generatePassword();
    setJustGenerated(true)
  };

  const checkedCount =
    (includeLowercase ? 1 : 0) +
    (includeUppercase ? 1 : 0) +
    (includeNumber ? 1 : 0) +
    (includeSymbol ? 1 : 0);

  return (
    <>
      <div className="space-y-6 md:px-6">
        <TabsHeader
          title="Simple Style Password"
          subtitle="Simple Password has a minimum of 4 digits and maximum of 120 digits."
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password Length Input */}
          <div className="space-y-2">
            <label
              htmlFor="length"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password Length
            </label>
            <div className="md:flex md:gap-8 md:items-center">
              <Slider
                defaultValue={4}
                min={0}
                max={120}
                aria-label="Password length"
                valueLabelDisplay="auto"
                value={isNaN(value.length) || value.length == null ? 0 : value.length}
                onChange={(_, value) => setValue("length", value as number)}
              />
              <input
                type="number"
                id="length"
                min={0}
                max={120}
                placeholder="Enter length"
                {...register("length", {
                  required: "Password length is required at least 4 digits",
                  valueAsNumber: true,
                  minLength: 4,
                  maxLength: 120,
                })}
                className="
                              w-full px-3 py-2.5 text-sm
                              bg-white dark:bg-gray-800
                              border border-gray-300 dark:border-gray-600
                              rounded-lg mb-2
                              text-gray-900 dark:text-white
                              placeholder-gray-400 dark:placeholder-gray-500
                              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                              dark:focus:ring-blue-400/20 dark:focus:border-blue-400
                              transition-colors duration-200
                          "
              />
            </div>
            {(value.length < 4 || isNaN(value.length)) && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 md:text-right">
                Minimum 4 characters required
              </p>
            )}
            {value.length > 120 && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 md:text-right">
                Maximum 120 characters allowed only
              </p>
            )}
          </div>
          {/* Character Options */}
          <div className="space-y-3 mb-5 mt-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Character Types
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {/* Lowercase */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="lowercase"
                  id="lowercase"
                  checked={includeLowercase ?? true}
                  onChange={toggleLowercase}
                  disabled={includeLowercase && checkedCount === 1}
                  className="
                                  w-4 h-4 text-blue-600
                                  bg-white dark:bg-gray-800
                                  border-gray-300 dark:border-gray-600
                                  rounded focus:ring-blue-500 focus:ring-2
                                  disabled:opacity-50 disabled:cursor-not-allowed
                              "
                />
                <span
                  className={`text-sm ${
                    includeLowercase && checkedCount === 1
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Lowercase letters (a-z)
                </span>
              </label>
              {/* Uppercase */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="uppercase"
                  id="uppercase"
                  checked={includeUppercase ?? true}
                  onChange={toggleUppercase}
                  disabled={includeUppercase && checkedCount === 1}
                  className="
                                  w-4 h-4 text-blue-600
                                  bg-white dark:bg-gray-800
                                  border-gray-300 dark:border-gray-600
                                  rounded focus:ring-blue-500 focus:ring-2
                                  disabled:opacity-50 disabled:cursor-not-allowed
                              "
                />
                <span
                  className={`text-sm ${
                    includeUppercase && checkedCount === 1
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Uppercase letters (A-Z)
                </span>
              </label>
              {/* Numbers */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="number"
                  id="number"
                  checked={includeNumber ?? true}
                  onChange={toggleNumber}
                  disabled={includeNumber && checkedCount === 1}
                  className="
                                  w-4 h-4 text-blue-600
                                  bg-white dark:bg-gray-800
                                  border-gray-300 dark:border-gray-600
                                  rounded focus:ring-blue-500 focus:ring-2
                                  disabled:opacity-50 disabled:cursor-not-allowed
                              "
                />
                <span
                  className={`text-sm ${
                    includeNumber && checkedCount === 1
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Numbers (0-9)
                </span>
              </label>
              {/* Symbols */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="symbol"
                  id="symbol"
                  checked={includeSymbol ?? true}
                  onChange={toggleSymbol}
                  disabled={includeSymbol && checkedCount === 1}
                  className="
                                  w-4 h-4 text-blue-600
                                  bg-white dark:bg-gray-800
                                  border-gray-300 dark:border-gray-600
                                  rounded focus:ring-blue-500 focus:ring-2
                                  disabled:opacity-50 disabled:cursor-not-allowed
                              "
                />
                <span
                  className={`text-sm ${
                    includeSymbol && checkedCount === 1
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Symbols (!@#$%^&*)
                </span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            disableButton={disableButton}
            isSubmitting={isSubmitting}
            result={password}
            justGenerated={justGenerated}
            setJustGenerated={setJustGenerated}
          />
        </form>
      </div>
    </>
  );
}

export default SimplePassword;
