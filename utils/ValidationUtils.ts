/**
 * Represents a rule for an input to be validated properly
 */
export type ValidationRules = {
  required: boolean;
  minLength: number | null;
  maxLength: number | null;
};

/**
 * Take all properties of <T> and require them to have ValidationRules
 * Example usage:
 *      type UserInfoValidationObject = TValidationObject<IUserInfo>
 */
export type TValidationObject<T> = {
  [P in keyof T]: ValidationRules;
};

/** Returns a default ValidationRules that pretty much allows anything */
export function getDefaultValidationRules(): ValidationRules {
  return {required: false, minLength: 0, maxLength: Number.MAX_VALUE};
}

/**
 * Given a rule and a string value, returns true if the {val} adheres to the {rule}.
 * Returns TRUE if the validation is CORRECT.
 */
export function evaluateValidationRule(
  rule: ValidationRules,
  val?: string,
): boolean {
  // If required, it must have a value...
  if (rule.required && !val) {
    return false;
  }

  // If there's no value, we can't check length, so just return true...
  if (!val) {
    return true;
  }

  // If there are min/max lengths, enforce them...
  if (rule.minLength && val.length < rule.minLength) {
    return false;
  }
  if (rule.maxLength && val.length > rule.maxLength) {
    return false;
  }

  return true;
}

export function validateEmail(
  input: string | null,
  maxLength: number = 100,
): boolean {
  if (input && input.length > maxLength) {
    return false;
  }
  var validRegex =
    /^[\w!#$%&'*+-/=?^`{|}~]+(?:\.[\w!#$%&'*+-/=?^`{|}~]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

  if (input?.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
