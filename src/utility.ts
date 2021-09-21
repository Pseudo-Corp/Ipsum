import assert from "assert"
import { COPYFILE_FICLONE_FORCE } from "constants"

/**
 * 
 * @param n : A positive integer.
 * @returns The sum of the first n integers, according to Gauss' expression.
 */
export const sumLinear = (n:number):number => {
    return n * (n + 1) / 2   
}
/**
 * 
 * @param n : A positive integer
 * @returns The sum of the first n squares, according to the generalized
 * formula
 */
export const sumQuadratic = (n: number):number => {
    return n * (n + 1) * (2*n + 1) / 6
}

/**
 * 
 * @param n : A positive integer
 * @returns The sum of the first n cubes, which is the square of sumLinear for n.
 */
export const sumCubic = (n: number):number => {
    return Math.pow(sumLinear(n), 2)
}

/**
 * 
 * @param n : A number to be formatted
 * @param accuracy : The amount of decimal digits to be displayed
 * @returns a string of the number formatted to specific conditions.
 */
export const format = (n: number, accuracy = 0):string => {

    if (n < 0)
        return "-" + format(-n, accuracy)

    const truncatedNumber = Math.floor(n);
    const decimalValue = n - truncatedNumber
    
    const stringedInteger = truncatedNumber.toLocaleString();

    const decimalPoint = (accuracy > 0 && n !== 0);

    let returnDecimalRaw = Math.pow(10, accuracy) * decimalValue;
    
    // Fix Float Point Error!
    const tolerance = 1e-6;
    if (Math.ceil(returnDecimalRaw) - returnDecimalRaw < tolerance)
        returnDecimalRaw = Math.ceil(returnDecimalRaw);
    // End of Fix Float Point Error!
    
    let returnDecimalValue = (decimalPoint)? Math.floor(returnDecimalRaw).toString() : ""

    if (returnDecimalValue !== "") {
        while (returnDecimalValue.length < accuracy) {
            returnDecimalValue = "0" + returnDecimalValue;
        }

        returnDecimalValue = "." + returnDecimalValue
    }



    return stringedInteger + returnDecimalValue
}

/**
 * Assert that two numbers are equal within a given error tolerance.
 * @param expected answer expected by the test
 * @param actual   answer actually returned by the module being tested
 * @param delta    actual is considered equal to expected if it's within +/- delta
 * @param message  optional message with extra information about this test case, to display when the assertion fails
 */
 export function assertAlmostEqual(expected:number, actual:number, delta:number, message?:string):void {
    assert(Math.abs(expected - actual) <= delta,
          (message ? message + ", " : "") + "expected <" + expected.toFixed(3) + "> but got <" + actual.toFixed(3) + ">");
}