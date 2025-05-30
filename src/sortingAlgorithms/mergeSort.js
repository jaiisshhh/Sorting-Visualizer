export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) {
    animations.push(["sorted", startIdx]); // Mark single element as sorted
    return;
  }
  
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  // Visualize middle element
  animations.push(["split", middleIdx]);
  animations.push(["revert-split", middleIdx]);
  
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // Compare elements (yellow highlight)
    animations.push(["compare", i, j]);
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Highlight element being moved (red)
      animations.push(["move-start", i]);
      animations.push(["height-change", k, auxiliaryArray[i]]);
      animations.push(["move-end", k]);
      
      mainArray[k] = auxiliaryArray[i];
      i++;
    } else {
      // Highlight element being moved (red)
      animations.push(["move-start", j]);
      animations.push(["height-change", k, auxiliaryArray[j]]);
      animations.push(["move-end", k]);
      
      mainArray[k] = auxiliaryArray[j];
      j++;
    }
    k++;
    
    // Revert comparison colors
    animations.push(["revert", i-1, j-1]);
  }

  // Handle remaining elements
  while (i <= middleIdx) {
    animations.push(["move-start", i]);
    animations.push(["height-change", k, auxiliaryArray[i]]);
    animations.push(["move-end", k]);
    
    mainArray[k] = auxiliaryArray[i];
    i++;
    k++;
  }

  while (j <= endIdx) {
    animations.push(["move-start", j]);
    animations.push(["height-change", k, auxiliaryArray[j]]);
    animations.push(["move-end", k]);
    
    mainArray[k] = auxiliaryArray[j];
    j++;
    k++;
  }

  // Mark merged range as sorted
  for (let idx = startIdx; idx <= endIdx; idx++) {
    animations.push(["sorted", idx]);
  }
}
