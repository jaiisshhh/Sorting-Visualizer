export function getHeapSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const auxiliaryArray = array.slice();

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(auxiliaryArray, n, i, animations);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Highlight swap (red)
    animations.push(['swap-start', 0, i]);
    // Perform swap
    [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];
    // Height updates
    animations.push(['height', 0, auxiliaryArray[0]]);
    animations.push(['height', i, auxiliaryArray[i]]);
    // Revert color (blue)
    animations.push(['swap-end', 0, i]);
    
    // Mark as sorted (green -> yellow -> blue -> green)
    animations.push(['sorted', i]);
    animations.push(['temp-highlight', i]);
    animations.push(['revert-temp', i]);
    animations.push(['sorted', i]);

    heapify(auxiliaryArray, i, 0, animations);
  }
  animations.push(['sorted', 0]); // Mark last element

  return animations;
}

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Check left child
  if (left < n) {
    animations.push(['compare', left, largest]);
    if (array[left] > array[largest]) {
      animations.push(['revert', largest, left]);
      largest = left;
      animations.push(['highlight', largest]);
    } else {
      animations.push(['revert', left, largest]);
    }
  }

  // Check right child
  if (right < n) {
    animations.push(['compare', right, largest]);
    if (array[right] > array[largest]) {
      animations.push(['revert', largest, right]);
      largest = right;
      animations.push(['highlight', largest]);
    } else {
      animations.push(['revert', right, largest]);
    }
  }

  // If largest changed
  if (largest !== i) {
    // Highlight swap (red)
    animations.push(['swap-start', i, largest]);
    // Perform swap
    [array[i], array[largest]] = [array[largest], array[i]];
    // Height updates
    animations.push(['height', i, array[i]]);
    animations.push(['height', largest, array[largest]]);
    // Revert color (blue)
    animations.push(['swap-end', i, largest]);
    
    heapify(array, n, largest, animations);
  }
}
