export function getSelectionSortAnimations(array) {
    const animations = [];
    const auxArray = array.slice();
  
    for (let i = 0; i < auxArray.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < auxArray.length; j++) {
        animations.push(["compare", minIdx, j]);
        if (auxArray[j] < auxArray[minIdx]) {
          animations.push(["revert", minIdx, j]);
          minIdx = j;
        } else {
          animations.push(["revert", minIdx, j]);
        }
      }
  
      if (minIdx !== i) {
        [auxArray[i], auxArray[minIdx]] = [auxArray[minIdx], auxArray[i]];
        animations.push(["swap-height", i, auxArray[i]]);
        animations.push(["swap-height", minIdx, auxArray[minIdx]]);
      }
      animations.push(["sorted", i]);
    }
  
    return { animations, sortedArray: auxArray };
  }