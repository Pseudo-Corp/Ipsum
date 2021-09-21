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