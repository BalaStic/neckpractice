function findSequences(arrayElements, startElem, endElem, stepCount) {
    // Validate inputs
    if (stepCount < 2) return [];
    
    // Get all td elements
    //const arrayElements = Array.from(document.querySelectorAll('td'));
    
    // Validate that start and end elements exist in the DOM
    if (!arrayElements.includes(startElem) || !arrayElements.includes(endElem)) {
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
        const currentElem = currentPath[currentPath.length - 1];
        const currentAttrs = getAttributes(currentElem);
        
        // If we've reached the desired length
        if (currentPath.length === stepCount) {
            // Check if the last element is our target
            if (currentElem === endElem) {
                results.push([...currentPath]);
            }
            return;
        }
        
        // If we're at the last position but it's not the end element
        if (currentPath.length === stepCount - 1) {
            // Only consider the end element if it's valid
            if (isValidTransition(currentAttrs, endAttrs)) {
                currentPath.push(endElem);
                dfs(currentPath, currentIndex + 1);
                currentPath.pop();
            }
            return;
        }
        
        // Calculate remaining steps
        const remainingSteps = stepCount - currentPath.length - 1;
        
        // Find all possible next elements
        for (const nextElem of arrayElements) {
            // Skip if element is already in the path
            if (currentPath.includes(nextElem)) continue;
            
            const nextAttrs = getAttributes(nextElem);
            
            // Check basic constraints
            if (!isValidTransition(currentAttrs, nextAttrs)) continue;
            
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
    function isValidTransition(from, to) {
        // Check column difference
        if (Math.abs(from.coln - to.coln) > 5) return false;
        
        // Check row difference
        if (Math.abs(from.rown - to.rown) > 1) return false;
        
        // Check frequency (must be strictly increasing)
        if (from.freq >= to.freq) return false;
        
        return true;
    }
    
    // Helper function to check if we can reach the end from current position
    function canReachEnd(current, end, stepsRemaining) {
        // Minimum required changes to reach end
        const minColSteps = Math.ceil(Math.abs(current.coln - end.coln) / 5);
        const minRowSteps = Math.ceil(Math.abs(current.rown - end.rown) / 1);
        
        // We need at least min steps to reach the end position
        const minStepsNeeded = Math.max(minColSteps, minRowSteps);
        
        // Also need to ensure frequency can increase enough
        const freqStepSize = (end.freq - current.freq) / (stepsRemaining + 1);
        
        return minStepsNeeded <= stepsRemaining && freqStepSize > 0;
    }
    
    // Start DFS from the first element
    dfs([startElem], 0);
    
    return results;
}

// Alternative optimized version using memoization (for larger datasets)
function findSequencesOptimized(arrayElements, startElem, endElem, stepCount) {
    if (stepCount < 2) return [];
    
    //const arrayElements = Array.from(document.querySelectorAll('td'));
    const getAttributes = (elem) => ({
        id: elem.id,
        freq: parseFloat(elem.getAttribute('freq')),
        coln: parseInt(elem.getAttribute('coln')),
        rown: parseInt(elem.getAttribute('rown'))
    });
    
    const startAttrs = getAttributes(startElem);
    const endAttrs = getAttributes(endElem);
    
    if (startAttrs.freq >= endAttrs.freq) return [];
    
    // Memoization cache: position -> step -> list of paths
    const memo = new Map();
    
    function dfs(currentElem, step) {
        const currentId = currentElem.id;
        const memoKey = `${currentId}_${step}`;
        
        // Check memoization
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
            if (isValidTransition(currentAttrs, endAttrs)) {
                return [[currentElem, endElem]];
            }
            return [];
        }
        
        const allPaths = [];
        
        // Find possible next elements
        for (const nextElem of arrayElements) {
            if (nextElem === currentElem) continue;
            
            const nextAttrs = getAttributes(nextElem);
            
            if (!isValidTransition(currentAttrs, nextAttrs)) continue;
            
            // Recursively find paths from next element
            const nextPaths = dfs(nextElem, step + 1);
            
            // Prepend current element to all found paths
            for (const path of nextPaths) {
                allPaths.push([currentElem, ...path]);
            }
        }
        
        memo.set(memoKey, allPaths);
        return allPaths;
    }
    
    function isValidTransition(from, to) {
        if (Math.abs(from.coln - to.coln) > 5) return false;
        if (Math.abs(from.rown - to.rown) > 1) return false;
        if (from.freq >= to.freq) return false;
        return true;
    }
    
    return dfs(startElem, 0);
}