export function getInsertionSortAnimations(array) {
    const animations = [];
    const auxArray = array.slice();
    for (let i = 1; i < auxArray.length; i++) {
      let key = auxArray[i];
      let j = i - 1;
      animations.push(["compare", i, j]);
      while (j >= 0 && auxArray[j] > key) {
        animations.push(["swap-height", j + 1, auxArray[j]]);
        auxArray[j + 1] = auxArray[j];
        animations.push(["compare", j, j - 1]);
        animations.push(["revert", j + 1, j]);
        j--;
      }
      auxArray[j + 1] = key;
      animations.push(["swap-height", j + 1, key]);
      animations.push(["sorted", j + 1]);
    }
    animations.push(["sorted", auxArray.length - 1]);
    return { animations, sortedArray: auxArray };
  }