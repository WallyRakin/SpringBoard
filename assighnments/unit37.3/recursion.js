/** product: calculate the product of an array of numbers. */
function product(nums) {
  // Base case: empty array has a product of 1
  if (nums.length === 0) return 1;
  // Recursive case: multiply the first number by the product of the rest
  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */
function longest(words) {
  // Base case: empty array has length 0
  if (words.length === 0) return 0;
  // Recursive case: compare the first word's length with the longest of the rest
  const firstLength = words[0].length;
  const restLongest = longest(words.slice(1));
  return firstLength > restLongest ? firstLength : restLongest;
}

/** everyOther: return a string with every other letter. */
function everyOther(str) {
  // Base case: empty string returns empty string
  if (str.length === 0) return "";
  // Recursive case: take the first character and skip the next
  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */
function isPalindrome(str) {
  // Base case: strings with 0 or 1 character are palindromes
  if (str.length <= 1) return true;
  // Recursive case: check the first and last characters and recurse on the substring
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
function findIndex(arr, val, index = 0) {
  // Base case: if index exceeds array length, return -1
  if (index >= arr.length) return -1;
  // If current element matches val, return current index
  if (arr[index] === val) return index;
  // Otherwise, recurse with the next index
  return findIndex(arr, val, index + 1);
}

/** revString: return a copy of a string, but in reverse. */
function revString(str) {
  // Base case: empty string returns empty string
  if (str.length === 0) return "";
  // Recursive case: reverse the substring and append the first character at the end
  return revString(str.slice(1)) + str[0];
}

/** gatherStrings: given an object, return an array of all of the string values. */
function gatherStrings(obj) {
  let strings = [];
  // Iterate through each key in the object
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      strings.push(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recurse if the value is a nested object
      strings = strings.concat(gatherStrings(obj[key]));
    }
  }
  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present).
 */
function binarySearch(arr, val, left = 0, right = arr.length - 1) {
  // Base case: if the search space is invalid
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === val) return mid;
  else if (arr[mid] > val) {
    // Search in the left half
    return binarySearch(arr, val, left, mid - 1);
  } else {
    // Search in the right half
    return binarySearch(arr, val, mid + 1, right);
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
