export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return { animations, sortedArray: array.slice() };
  const auxArray = array.slice();
  quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
  return { animations, sortedArray: auxArray };
}

function quickSortHelper(array, start, end, animations) {
  if (start >= end) {
    // Mark single element as sorted
    animations.push(["sorted", start]);
    return;
  }

  const pivotIndex = partition(array, start, end, animations);
  
  quickSortHelper(array, start, pivotIndex - 1, animations);
  quickSortHelper(array, pivotIndex + 1, end, animations);
}

function partition(array, start, end, animations) {
  const pivot = array[start];
  let i = start + 1;

  // Highlight pivot (phase 1)
  animations.push(["pivot-highlight", start]);
  
  for (let j = start + 1; j <= end; j++) {
    // Comparison highlight (phase 1)
    animations.push(["compare", j, start]);
    
    if (array[j] < pivot) {
      // Swap animation sequence (phase 2-3)
      animations.push(["compare", i, j]);   // pre-swap: compare color
      animations.push(["revert", i, j]);   // pre-swap: revert color
      [array[i], array[j]] = [array[j], array[i]];
      animations.push(["swap-height", i, array[i]]);
      animations.push(["swap-height", j, array[j]]);
      
      i++;
    }
    
    // Revert comparison (phase 2)
    animations.push(["revert", j, start]);
  }

  // Final pivot swap animation
  animations.push(["compare", start, i-1]); // pre-swap: compare color
  animations.push(["revert", start, i-1]);  // pre-swap: revert color
  [array[start], array[i-1]] = [array[i-1], array[start]];
  animations.push(["swap-height", start, array[start]]);
  animations.push(["swap-height", i-1, array[i-1]]);

  // Reinforce pivot highlight before revert so it stays visually blue
  animations.push(["pivot-highlight", start]); // reinforce pivot before revert
  // Revert pivot color (phase 2)
  animations.push(["pivot-revert", start]);

  return i - 1;
}
