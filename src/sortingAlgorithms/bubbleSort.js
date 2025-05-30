export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const auxiliaryArray = array.slice();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Phase 1: Compare (yellow highlight)
      animations.push(['compare', j, j + 1]);

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        // Phase 2: Swap highlight (blue)
        animations.push(['swap-start', j, j + 1]);
        
        // Perform swap
        [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
        
        // Phase 3: Height updates
        animations.push(['height', j, auxiliaryArray[j]]);
        animations.push(['height', j + 1, auxiliaryArray[j + 1]]);
        
        // Phase 4: Swap complete (blue)
        animations.push(['swap-end', j, j + 1]);
      } else {
        // Phase 2: No swap (revert immediately)
        animations.push(['compare-revert', j, j + 1]);
      }
    }
    // Mark last unsorted element as sorted (green)
    animations.push(['sorted', n - 1 - i]);
  }
  // Mark first element as sorted
  animations.push(['sorted', 0]);

  return animations;
}
