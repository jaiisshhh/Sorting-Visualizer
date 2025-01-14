export function getQuickSortAnimations(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      const pivotIdx = partition(array, low, high, animations);
      quickSortHelper(array, low, pivotIdx - 1, animations);
      quickSortHelper(array, pivotIdx + 1, high, animations);
    }
  }
  
  function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push([j, high]);
      animations.push([j, high]);
      if (array[j] < pivot) {
        i++;
        animations.push([i, array[j]]);
        animations.push([j, array[i]]);
        [array[i], array[j]] = [array[j], array[i]];
      } else {
        animations.push([-1, -1]);
      }
    }
    animations.push([i + 1, array[high]]);
    animations.push([high, array[i + 1]]);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  }