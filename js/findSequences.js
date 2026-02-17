/*
Given a list of <td> elements. Each element has and id (unique), and has attributes of "freq" (float), "coln", "rown" (integers as string).
Implement a javascript function that:
Takes 4 elements as parameter: 1st is list of elements. 2nd is the start element, 3rd is the end element, and 4th is the step count. 
The function prepares all the possibe lists that fulfill the following conditions:
A list have stepcount piece of elements.
1st element is the start element, 6th is the end element.
The elements' freq attribute are incremental from 1st element to 6th element, no equal freq is allowed.
For any 2 consecutive elements of the list it is valid that the difference between their coln attribute must be less or equal than 5.
For any 2 consecutive elements of the list it is valid that the difference between their rown attribute must be less or equal than 1.
For any 3 consecutive elements of the list it is valid that the difference between 1st item coln attribute and 3rd item coln attribute must be less or equal than 5.
For any 4 consecutive elements they can't have the same rown.
*/

function findSequences(allElements, startElem, endElem, stepCount) {
    // Validate inputs
    if (stepCount < 4) {
        console.error('stepCount must be at least 4 for quadruple constraint');
        return [];
    }
    
    // Get all td elements
    //const allElements = Array.from(document.querySelectorAll('td'));
    
    // Validate that start and end elements exist in the DOM
    if (!allElements.includes(startElem) || !allElements.includes(endElem)) {
        console.error('Start or end element not found in DOM');
        return [];
    }
    
    // Extract attributes from elements
    const getAttributes = (elem) => ({
        id: elem.id,
        freq: parseFloat(elem.getAttribute('freq')),
        coln: parseInt(elem.getAttribute('coln')),
        rown: parseInt(elem.getAttribute('rown'))
    });
    
    const startAttrs = getAttributes(startElem);
    const endAttrs = getAttributes(endElem);
    
    // Early validation checks
    if (startAttrs.freq >= endAttrs.freq) {
        console.error('Start freq must be less than end freq');
        return [];
    }
    
    // Main function to find all valid sequences
    const results = [];
    
    // DFS function to explore all possible sequences
    function dfs(currentPath, currentIndex) {
        const currentPathLength = currentPath.length;
        const currentElem = currentPath[currentPathLength - 1];
        const currentAttrs = getAttributes(currentElem);
        
        // If we've reached the desired length
        if (currentPathLength === stepCount) {
            // Check if the last element is our target
            if (currentElem === endElem) {
                results.push([...currentPath]);
            }
            return;
        }
        
        // If we're at the last position but it's not the end element
        if (currentPathLength === stepCount - 1) {
            // Only consider the end element if it's valid
            if (isValidTransition(currentAttrs, endAttrs, currentPath)) {
                currentPath.push(endElem);
                dfs(currentPath, currentIndex + 1);
                currentPath.pop();
            }
            return;
        }
        
        // Calculate remaining steps
        const remainingSteps = stepCount - currentPathLength - 1;
        
        // Find all possible next elements
        for (const nextElem of allElements) {
            // Skip if element is already in the path
            if (currentPath.includes(nextElem)) continue;
            
            const nextAttrs = getAttributes(nextElem);
            
            // Check basic constraints
            if (!isValidTransition(currentAttrs, nextAttrs, currentPath)) continue;
            
            // Check if this can potentially lead to the end element
            if (!canReachEnd(nextAttrs, endAttrs, remainingSteps)) continue;
            
            // Check frequency ordering (must be strictly increasing)
            if (nextAttrs.freq <= currentAttrs.freq) continue;
            
            // Add to path and continue exploration
            currentPath.push(nextElem);
            dfs(currentPath, currentIndex + 1);
            currentPath.pop();
        }
    }
    
    // Helper function to check if transition between two elements is valid
    function isValidTransition(from, to, currentPath) {
        // Check column difference (between consecutive elements)
        if (Math.abs(from.coln - to.coln) > 5) return false;
        
        // Check row difference (between consecutive elements)
        if (Math.abs(from.rown - to.rown) > 1) return false;
        
        // Check frequency (must be strictly increasing)
        if (from.freq >= to.freq) return false;
        
        // Check the triple constraint for COLUMN difference
        // For any 3 consecutive elements [A, B, C]: |A.coln - C.coln| ≤ 5
        const pathLength = currentPath.length;
        if (pathLength >= 2) {
            const firstInTriple = currentPath[pathLength - 2];
            const firstAttrs = getAttributes(firstInTriple);
            
            // Check COLUMN difference between 1st and 3rd element in triple
            if (Math.abs(firstAttrs.coln - to.coln) > 5) {
                return false;
            }
        }
        
        // NEW: Check quadruple constraint - 4 consecutive elements can't have same rown
        if (pathLength >= 3) {
            // We're trying to add the 4th element in a sequence
            // Check if the last 3 elements + new element would all have same rown
            const lastThreeRows = [
                getAttributes(currentPath[pathLength - 3]).rown,
                getAttributes(currentPath[pathLength - 2]).rown,
                getAttributes(currentPath[pathLength - 1]).rown,
                to.rown
            ];
            
            // Check if all 4 rows are the same
            const allSameRow = lastThreeRows.every(row => row === lastThreeRows[0]);
            if (allSameRow) {
                return false; // Reject: 4 consecutive elements would have same rown
            }
        }
        
        return true;
    }
    
    // Helper function to check if we can reach the end from current position
    function canReachEnd(current, end, stepsRemaining) {
        // Minimum required changes to reach end
        const minColSteps = Math.ceil(Math.abs(current.coln - end.coln) / 5);
        const minRowSteps = Math.ceil(Math.abs(current.rown - end.rown) / 1);
        
        // Calculate minimum steps needed
        const minStepsNeeded = Math.max(minColSteps, minRowSteps);
        
        // Also need to ensure frequency can increase enough
        const freqStepSize = (end.freq - current.freq) / (stepsRemaining + 1);
        
        return minStepsNeeded <= stepsRemaining && freqStepSize > 0;
    }
    
    // Start DFS from the first element
    dfs([startElem], 0);
    
    return results;
}

// Optimized version with memorization
function findSequencesOptimized(allElements, startElem, endElem, stepCount) {
    if (stepCount < 4) {
        console.error('stepCount must be at least 4 for quadruple constraint');
        return [];
    }
    
    //const allElements = Array.from(document.querySelectorAll('td'));
    const getAttributes = (elem) => ({
        id: elem.id,
        freq: parseFloat(elem.getAttribute('freq')),
        coln: parseInt(elem.getAttribute('coln')),
        rown: parseInt(elem.getAttribute('rown'))
    });
    
    const startAttrs = getAttributes(startElem);
    const endAttrs = getAttributes(endElem);
    
    if (startAttrs.freq >= endAttrs.freq) return [];
    
    // Memoization cache - now tracking last 3 elements for quadruple constraint
    const memo = new Map();
    
    function dfs(lastThreeElems, step) {
        const currentElem = lastThreeElems[lastThreeElems.length - 1];
        const memoKey = `${lastThreeElems.map(e => e ? e.id : 'null').join('_')}_${step}`;
        
        if (memo.has(memoKey)) {
            return memo.get(memoKey);
        }
        
        const currentAttrs = getAttributes(currentElem);
        
        // Base case: reached the end at correct step
        if (step === stepCount - 1) {
            return currentElem === endElem ? [[currentElem]] : [];
        }
        
        // Base case: if we're at the second to last step
        if (step === stepCount - 2) {
            if (isValidTransition(currentAttrs, endAttrs, lastThreeElems)) {
                return [[currentElem, endElem]];
            }
            return [];
        }
        
        const allPaths = [];
        
        // Find possible next elements
        for (const nextElem of allElements) {
            if (nextElem === currentElem) continue;
            
            const nextAttrs = getAttributes(nextElem);
            
            // Check constraints including triple and quadruple constraints
            if (!isValidTransition(currentAttrs, nextAttrs, lastThreeElems)) continue;
            
            // Create new lastThree array for next recursive call
            const newLastThree = [...lastThreeElems, nextElem];
            if (newLastThree.length > 3) {
                newLastThree.shift(); // Keep only last 3 elements
            }
            
            // Recursively find paths from next element
            const nextPaths = dfs(newLastThree, step + 1);
            
            // Prepend current element to all found paths
            for (const path of nextPaths) {
                allPaths.push([currentElem, ...path]);
            }
        }
        
        memo.set(memoKey, allPaths);
        return allPaths;
    }
    
    function isValidTransition(from, to, lastThreeElems) {
        // Check consecutive constraints
        if (Math.abs(from.coln - to.coln) > 5) return false;
        if (Math.abs(from.rown - to.rown) > 1) return false;
        if (from.freq >= to.freq) return false;
        
        // Check triple constraint for COLUMN difference
        if (lastThreeElems && lastThreeElems.length >= 2) {
            const firstInTriple = lastThreeElems[lastThreeElems.length - 2];
            const firstAttrs = getAttributes(firstInTriple);
            
            // Check COLUMN difference between 1st and 3rd element in triple
            if (Math.abs(firstAttrs.coln - to.coln) > 5) {
                return false;
            }
        }
        
        // NEW: Check quadruple constraint - 4 consecutive elements can't have same rown
        if (lastThreeElems && lastThreeElems.length >= 3) {
            // We have at least 3 previous elements, checking if adding 'to' makes 4 with same row
            const rowsToCheck = [
                ...lastThreeElems.slice(-3).map(e => getAttributes(e).rown),
                to.rown
            ];
            
            // Check if all 4 rows are identical
            const firstRow = rowsToCheck[0];
            const allSameRow = rowsToCheck.every(row => row === firstRow);
            if (allSameRow) {
                return false; // Reject: 4 consecutive elements would have same rown
            }
        }
        
        return true;
    }
    
    return dfs([startElem], 0);
}

// Utility function to validate a complete sequence
function validateSequence(sequence) {
    const getAttributes = (elem) => ({
        freq: parseFloat(elem.getAttribute('freq')),
        coln: parseInt(elem.getAttribute('coln')),
        rown: parseInt(elem.getAttribute('rown'))
    });
    
    // Check all consecutive pairs
    for (let i = 0; i < sequence.length - 1; i++) {
        const current = getAttributes(sequence[i]);
        const next = getAttributes(sequence[i + 1]);
        
        // Check consecutive constraints
        if (Math.abs(current.coln - next.coln) > 5) {
            return { valid: false, error: `Column diff > 5 at positions ${i}-${i+1}` };
        }
        if (Math.abs(current.rown - next.rown) > 1) {
            return { valid: false, error: `Row diff > 1 at positions ${i}-${i+1}` };
        }
        if (current.freq >= next.freq) {
            return { valid: false, error: `Frequency not strictly increasing at positions ${i}-${i+1}` };
        }
        
        // Check triple constraint for every 3 consecutive elements (COLUMN)
        if (i >= 1) {
            const first = getAttributes(sequence[i - 1]);
            if (Math.abs(first.coln - next.coln) > 5) {
                return { valid: false, error: `Triple column diff > 5 at positions ${i-1},${i},${i+1}` };
            }
        }
        
        // NEW: Check quadruple constraint for every 4 consecutive elements
        if (i >= 2) {
            const rows = [
                getAttributes(sequence[i - 2]).rown,
                getAttributes(sequence[i - 1]).rown,
                getAttributes(sequence[i]).rown,
                getAttributes(sequence[i + 1]).rown
            ];
            
            // Check if all 4 rows are the same
            const allSameRow = rows.every(row => row === rows[0]);
            if (allSameRow) {
                return { valid: false, error: `Quadruple same row at positions ${i-2},${i-1},${i},${i+1}` };
            }
        }
    }
    
    return { valid: true };
}