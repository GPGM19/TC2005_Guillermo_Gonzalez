/*
 * Collection of functions that will be used in the games
 *
 * Gilberto Echeverria
 * 2026-02-10
 */

"use strict";

/*
 * Detect a collision of two box colliders
 *
 * Arguments:
 * - obj1: An instance of the Rect class with properties x, y, width, height
 * - obj2: An instance of the Rect class with properties x, y, width, height
 *
 * Returns:
 * - true if the boxes overlap, false otherwise
 */
function boxOverlap(obj1, obj2) {
    // Declare legible names for the borders
    //Object 1 sides
    let l1 = obj1.position.x - obj1.halfSize.x;
    let r1 = obj1.position.x + obj1.halfSize.x;
    let t1 = obj1.position.y - obj1.halfSize.y;
    let d1 = obj1.position.y + obj1.halfSize.y;
    //Object 2 sides
    let l2 = obj2.position.x - obj2.halfSize.x;
    let r2 = obj2.position.x + obj2.halfSize.x;
    let t2 = obj2.position.y - obj2.halfSize.y;
    let d2 = obj2.position.y + obj2.halfSize.y;
    // Compare the values to determine if the boxes overlap
    //Compare Values between the sides
    return(l1 < r2 && r1 > l2 && t1 < d2 && d1 > t2);
}

/*
 * Generate a random integer in the range [start, start + size - 1]
 *
 * Arguments:
 * - size: The size of the range (number of possible values)
 * - start: The starting value of the range (default is 0)
 *
 * Returns:
 * - A random integer in the specified range
*/
function randomRange(size, start) {
    return Math.floor(Math.random() * size) + ((start === undefined) ? 0 : start);
}

//export { boxOverlap, randomRange };
