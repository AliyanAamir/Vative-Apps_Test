function romanToInt(s: string): number {
    const romanValues: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
  
    let result = 0;
    let prevValue = 0;
  
    for (let i = s.length - 1; i >= 0; i--) {
      const currentChar = s[i];
      const currentValue = romanValues[currentChar];
  
      if (currentValue === undefined) {
        throw new Error(`Invalid Roman character: ${currentChar}`);
      }
  
      if (currentValue >= prevValue) {
        result += currentValue;
      } else {
        result -= currentValue;
      }
  
      prevValue = currentValue;
    }
  
    return result;
  }
  
  // Test cases
  try {
    console.log(romanToInt("III"));
    console.log(romanToInt("IV"));
    console.log(romanToInt("XI"));
    console.log(romanToInt("LVIII"));
    console.log(romanToInt("MCMXCIV"));
    console.log(romanToInt("MMMCMXCIX"));
    console.log(romanToInt("A"));
  } catch (error) {
    console.error((error as  Error).message);
  }
  