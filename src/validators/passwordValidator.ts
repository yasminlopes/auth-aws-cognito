import { RegExHelper } from "@/utils/regexHelper";

export function validatePassword(password: string): boolean {
  const minLength = 10;

  return (
    password.length >= minLength &&
    RegExHelper.HAS_NUMBER.test(password) &&
    RegExHelper.HAS_SPECIAL_CHAR.test(password) &&
    RegExHelper.HAS_UPPER_CASE.test(password) &&
    RegExHelper.HAS_LOWER_CASE.test(password)
  );
}
