import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort";
import "./SortingVisualizer.css";

const PRIMARY_COLOR = "#E62020";
const SECONDARY_COLOR = "#FFD700";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayMaxValue: 730,
      selectedAlgorithm: "mergeSort",
      showIntroModal: true, // for the welcome popup
      showLearnModal: false, // for the Learn algorithm details
      sorting: false,
      arraySize: 75,
      animationSpeed: 50,
      speedLevel: 3,
      showAdjustments: false,
    };
    this.timeouts = [];
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    const maxVal = Math.max(...array);
    this.setState({ array, arrayMaxValue: maxVal }, () => {
      // After setting the state, set all bars to red
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "#E62020";
      }
    });
  }

  closeIntroModal = () => {
    this.setState({ showIntroModal: false });
  };

  closeLearnModal = () => {
    this.setState({ showLearnModal: false });
  };

  handleSort() {
    this.setState({ sorting: true }, () => {
      const { selectedAlgorithm } = this.state;
      if (selectedAlgorithm === "mergeSort") this.mergeSort();
      else if (selectedAlgorithm === "quickSort") this.quickSort();
      else if (selectedAlgorithm === "heapSort") this.heapSort();
      else if (selectedAlgorithm === "bubbleSort") this.bubbleSort();
      else if (selectedAlgorithm === "insertionSort") this.insertionSort();
      else if (selectedAlgorithm === "selectionSort") this.selectionSort();
    });
  }

  handleStop() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    this.setState({ sorting: false });

    // Revert all bars to red immediately
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "#e62020";
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    //const arrayBars = document.getElementsByClassName("array-bar");
    const fixedMaxValue = this.state.arrayMaxValue;

    this.timeouts = []; // Reset timeouts array

    animations.forEach((animation, index) => {
      const [type, ...params] = animation;

      switch (type) {
        case "compare":
          this.handleComparison(index, params[0], params[1]);
          break;

        case "split":
          this.handleSplitHighlight(index, params[0]);
          break;

        case "move-start":
          this.handleMoveStart(index, params[0]);
          break;

        case "height-change":
          this.handleHeightChange(index, params[0], params[1], fixedMaxValue);
          break;

        case "move-end":
          this.handleMoveEnd(index, params[0]);
          break;

        case "sorted":
          this.handleSorted(index, params[0]);
          break;

        case "revert-split":
          this.handleRevertSplit(index, params[0]);
          break;
        default:
          break;
      }
    });

    // Final completion cleanup
    this.timeouts.push(
      setTimeout(() => {
        this.setState({ sorting: false });
        this.timeouts = [];
      }, animations.length * this.state.animationSpeed)
    );
  }

  // New helper methods
  handleComparison(index, idx1, idx2) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx1 >= arrayBars.length || idx2 >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;
      }, index * this.state.animationSpeed)
    );
  }

  handleSplitHighlight(index, idx) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.backgroundColor = "#ffd700";
      }, index * this.state.animationSpeed)
    );
  }

  handleMoveStart(index, idx) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.backgroundColor = "#e62020";
      }, index * this.state.animationSpeed)
    );
  }

  handleHeightChange(index, idx, newHeight, maxValue) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx >= arrayBars.length) return;

    const normalizedHeight = (newHeight / maxValue) * 95;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.height = `${normalizedHeight}%`;
      }, index * this.state.animationSpeed)
    );
  }

  handleMoveEnd(index, idx) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.backgroundColor = "#228B22";
      }, index * this.state.animationSpeed)
    );
  }

  handleSorted(index, idx) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.backgroundColor = "#228B22";
      }, index * this.state.animationSpeed)
    );
  }

  handleRevertSplit(index, idx) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.backgroundColor = PRIMARY_COLOR;
      }, index * this.state.animationSpeed)
    );
  }

  // In SortingVisualizer.jsx - Corrected quickSort method
  // In SortingVisualizer.jsx - Updated quickSort method
  quickSort() {
    const { animations, sortedArray } = getQuickSortAnimations(
      this.state.array
    );
    const arrayBars = document.getElementsByClassName("array-bar");
    const fixedMaxValue = this.state.arrayMaxValue;

    this.timeouts = []; // Reset timeouts array

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      if (!Array.isArray(animation)) continue;

      switch (animation[0]) {
        case "compare":
          this.handleColorChange(
            i,
            animation[1],
            animation[2],
            SECONDARY_COLOR
          );
          break;
        case "revert":
          this.handleColorChange(i, animation[1], animation[2], PRIMARY_COLOR);
          break;
        case "swap-height":
          this.handleHeightChange(i, animation[1], animation[2], fixedMaxValue);
          break;
        case "pivot-highlight":
          this.handleSingleColorChange(i, animation[1], "blue");
          break;
        case "pivot-revert":
          this.handleSingleColorChange(i, animation[1], PRIMARY_COLOR);
          break;
        case "sorted":
          this.handleSingleColorChange(i, animation[1], "#228B22");
          break;
        default:
          break;
      }
    }

    // Final completion timeout
    this.timeouts.push(
      setTimeout(() => {
        Array.from(arrayBars).forEach((bar) => {
          bar.style.backgroundColor = "#228B22";
        });
        this.setState({ sorting: false, array: sortedArray });
      }, animations.length * this.state.animationSpeed)
    );
  }

  // New helper methods
  handleColorChange(i, idx1, idx2, color) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (
      idx1 < 0 ||
      idx1 >= arrayBars.length ||
      idx2 < 0 ||
      idx2 >= arrayBars.length
    )
      return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx1].style.backgroundColor = color;
        arrayBars[idx2].style.backgroundColor = color;
      }, i * this.state.animationSpeed)
    );
  }

  handleSingleColorChange(i, idx, color) {
    const arrayBars = document.getElementsByClassName("array-bar");
    if (idx < 0 || idx >= arrayBars.length) return;

    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx].style.backgroundColor = color;
      }, i * this.state.animationSpeed)
    );
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    //const arrayBars = document.getElementsByClassName("array-bar");
    const fixedMaxValue = this.state.arrayMaxValue;

    this.timeouts = [];

    animations.forEach((animation, index) => {
      const [type, ...params] = animation;

      switch (type) {
        case "compare": {
          const [idx1, idx2] = params;
          this.handleColorChange(index, idx1, idx2, SECONDARY_COLOR); // Yellow
          break;
        }
        case "highlight": {
          const [idx] = params;
          this.handleSingleColorChange(index, idx, "#e62020");
          break;
        }
        case "revert": {
          const [idx1, idx2] = params;
          this.handleColorChange(index, idx1, idx2, PRIMARY_COLOR); // Blue
          break;
        }
        case "swap-start": {
          const [idx1, idx2] = params;
          this.handleColorChange(index, idx1, idx2, "#e62020");
          break;
        }
        case "swap-end": {
          const [idx1, idx2] = params;
          this.handleColorChange(index, idx1, idx2, PRIMARY_COLOR); // Blue
          break;
        }
        case "height": {
          const [idx, newHeight] = params;
          this.handleHeightChange(index, idx, newHeight, fixedMaxValue);
          break;
        }
        case "sorted": {
          const [idx] = params;
          this.handleSingleColorChange(index, idx, "#228B22");
          break;
        }
        case "temp-highlight": {
          const [idx] = params;
          this.handleSingleColorChange(index, idx, SECONDARY_COLOR); // Yellow
          break;
        }
        case "revert-temp": {
          const [idx] = params;
          this.handleSingleColorChange(index, idx, PRIMARY_COLOR); // Blue
          break;
        }
        default:
          break;
      }
    });

    // Final completion
    this.timeouts.push(
      setTimeout(() => {
        this.setState({ sorting: false });
        this.timeouts = [];
      }, animations.length * this.state.animationSpeed)
    );
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    const fixedMaxValue = this.state.arrayMaxValue;

    this.timeouts = [];

    animations.forEach((animation, index) => {
      const [type, ...params] = animation;

      switch (type) {
        case "compare": {
          const [idx1, idx2] = params;
          this.timeouts.push(
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = "#ffd700"; // Compare color
              arrayBars[idx2].style.backgroundColor = "#ffd700";
            }, index * this.state.animationSpeed)
          );
          break;
        }
        case "swap-start":
        case "swap-end": {
          const [idx1, idx2] = params;
          this.timeouts.push(
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = "#ffd700"; // Swap color
              arrayBars[idx2].style.backgroundColor = "#ffd700";
            }, index * this.state.animationSpeed)
          );
          break;
        }
        case "compare-revert": {
          const [idx1, idx2] = params;
          this.timeouts.push(
            setTimeout(() => {
              arrayBars[idx1].style.backgroundColor = "#e62020"; // Primary color
              arrayBars[idx2].style.backgroundColor = "#e62020";
            }, index * this.state.animationSpeed)
          );
          break;
        }
        case "height": {
          const [idx, newHeight] = params;
          const normalizedHeight = (newHeight / fixedMaxValue) * 95;
          this.timeouts.push(
            setTimeout(() => {
              arrayBars[idx].style.height = `${normalizedHeight}%`;
            }, index * this.state.animationSpeed)
          );
          break;
        }
        case "sorted": {
          const [idx] = params;
          this.timeouts.push(
            setTimeout(() => {
              arrayBars[idx].style.backgroundColor = "#228B22"; // Sorted color
            }, index * this.state.animationSpeed)
          );
          break;
        }
        default:
          break;
      }
    });

    // Final cleanup
    this.timeouts.push(
      setTimeout(() => {
        this.setState({ sorting: false });
      }, animations.length * this.state.animationSpeed)
    );
  }

  // New helper methods
  handleCompare(index, idx1, idx2) {
    const arrayBars = document.getElementsByClassName("array-bar");
    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
        arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;
      }, index * this.state.animationSpeed)
    );
  }

  handleSwapStart(index, idx1, idx2) {
    const arrayBars = document.getElementsByClassName("array-bar");
    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx1].style.backgroundColor = "#e62020";
        arrayBars[idx2].style.backgroundColor = "#e62020";
      }, index * this.state.animationSpeed)
    );
  }

  // handleHeightChange(index, idx, newHeight, maxValue) {
  //   const arrayBars = document.getElementsByClassName("array-bar");
  //   const normalizedHeight = (newHeight / maxValue) * 95;
  //   this.timeouts.push(
  //     setTimeout(() => {
  //       arrayBars[idx].style.height = `${normalizedHeight}%`;
  //     }, index * this.state.animationSpeed)
  //   );
  // }

  handleSwapEnd(index, idx1, idx2) {
    const arrayBars = document.getElementsByClassName("array-bar");
    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
      }, index * this.state.animationSpeed)
    );
  }

  handleRevertCompare(index, idx1, idx2) {
    const arrayBars = document.getElementsByClassName("array-bar");
    this.timeouts.push(
      setTimeout(() => {
        arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
        arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
      }, index * this.state.animationSpeed)
    );
  }

  insertionSort() {
    const { animations, sortedArray } = getInsertionSortAnimations(
      this.state.array
    );
    const arrayBars = document.getElementsByClassName("array-bar");
    const fixedMaxValue = this.state.arrayMaxValue;

    this.timeouts = [];

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      if (!Array.isArray(animation)) continue;

      switch (animation[0]) {
        case "compare":
          this.handleColorChange(
            i,
            animation[1],
            animation[2],
            SECONDARY_COLOR
          );
          break;
        case "revert":
          this.handleColorChange(i, animation[1], animation[2], PRIMARY_COLOR);
          break;
        case "swap-height":
          this.handleHeightChange(i, animation[1], animation[2], fixedMaxValue);
          break;
        case "sorted":
          this.handleSingleColorChange(i, animation[1], "#228B22");
          break;
        default:
          break;
      }
    }

    this.timeouts.push(
      setTimeout(() => {
        for (let i = 0; i < arrayBars.length; i++) {
          arrayBars[i].style.backgroundColor = "#228B22";
        }
        this.setState({ sorting: false, array: sortedArray });
      }, animations.length * this.state.animationSpeed)
    );
  }

  selectionSort() {
    const { animations, sortedArray } = getSelectionSortAnimations(
      this.state.array
    );
    const arrayBars = document.getElementsByClassName("array-bar");
    const fixedMaxValue = this.state.arrayMaxValue;

    this.timeouts = [];

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      if (!Array.isArray(animation)) continue;

      switch (animation[0]) {
        case "compare":
          this.handleColorChange(
            i,
            animation[1],
            animation[2],
            SECONDARY_COLOR
          );
          break;
        case "revert":
          this.handleColorChange(i, animation[1], animation[2], PRIMARY_COLOR);
          break;
        case "swap-height":
          this.handleHeightChange(i, animation[1], animation[2], fixedMaxValue);
          break;
        case "sorted":
          this.handleSingleColorChange(i, animation[1], "#228B22");
          break;
        default:
          break;
      }
    }

    this.timeouts.push(
      setTimeout(() => {
        for (let i = 0; i < arrayBars.length; i++) {
          arrayBars[i].style.backgroundColor = "#228B22";
        }
        this.setState({ sorting: false, array: sortedArray });
      }, animations.length * this.state.animationSpeed)
    );
  }

  render() {
    const { array, selectedAlgorithm, sorting } = this.state;

    const algorithmDetails = {
      mergeSort: {
        name: "Merge Sort",
        description:
          "Merge Sort is a Divide and Conquer algorithm. It divides the input array into halves, sorts each half, and then merges them to produce the sorted result.",
        steps: [
          "Divide the array into two halves.",
          "Recursively sort each half.",
          "Merge the two sorted halves back together.",
        ],
        complexity: {
          best: "Ω(n log n)",
          average: "Θ(n log n)",
          worst: "O(n log n)",
          space: "O(n)",
        },
      },
      quickSort: {
        name: "Quick Sort",
        description:
          "Quick Sort is a divide-and-conquer algorithm that partitions the array into two parts and recursively sorts them.",
        steps: [
          "Choose a pivot element.",
          "Rearrange elements such that elements less than the pivot are on the left and greater are on the right.",
          "Recursively sort the left and right partitions.",
        ],
        complexity: {
          best: "Ω(n log n)",
          average: "Θ(n log n)",
          worst: "O(n²)",
          space: "O(log n)",
        },
      },
      heapSort: {
        name: "Heap Sort",
        description:
          "Heap Sort builds a max heap from the array and repeatedly extracts the maximum element to sort the array.",
        steps: [
          "Build a max heap from the array.",
          "Swap the root (max element) with the last element.",
          "Reduce the heap size and heapify the root.",
          "Repeat until the heap size is 1.",
        ],
        complexity: {
          best: "Ω(n log n)",
          average: "Θ(n log n)",
          worst: "O(n log n)",
          space: "O(1)",
        },
      },
      bubbleSort: {
        name: "Bubble Sort",
        description:
          "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
        steps: [
          "Start from the first element.",
          "Compare each pair of adjacent elements.",
          "Swap them if they are in the wrong order.",
          "Repeat until the array is sorted.",
        ],
        complexity: {
          best: "Ω(n)",
          average: "Θ(n²)",
          worst: "O(n²)",
          space: "O(1)",
        },
      },
      insertionSort: {
        name: "Insertion Sort",
        description:
          "Insertion Sort builds the final sorted array one element at a time by comparing and inserting elements into their correct position.",
        steps: [
          "Start from the second element.",
          "Compare it with elements before and insert it into the correct position.",
          "Repeat for all elements.",
        ],
        complexity: {
          best: "Ω(n)",
          average: "Θ(n²)",
          worst: "O(n²)",
          space: "O(1)",
        },
      },
      selectionSort: {
        name: "Selection Sort",
        description:
          "Selection Sort selects the minimum element from the unsorted part and puts it at the beginning, one step at a time.",
        steps: [
          "Start from the first element.",
          "Find the smallest element in the remaining unsorted array.",
          "Swap it with the current element.",
          "Repeat for all elements.",
        ],
        complexity: {
          best: "Ω(n²)",
          average: "Θ(n²)",
          worst: "O(n²)",
          space: "O(1)",
        },
      },
    };

    const selectedDetails = algorithmDetails[selectedAlgorithm];

    return (
      <>
        {this.state.showIntroModal && (
          <div className="modal">
            <div className="modal-content welcome-modal">
              <button className="modal-close" onClick={this.closeIntroModal}>
                &times;
              </button>
              <h2>Welcome to Sorting Visualizer!</h2>
              <p>
                This interactive tool helps you understand sorting algorithms
                through animations.
              </p>
              <h3>Features:</h3>
              <ul>
                <li>Visualize Bubble, Selection, Merge, Quick Sort and more</li>
                <li>Adjust array size and animation speed</li>
                <li>Step-by-step comparisons and swaps</li>
                <li>Interactive and beginner-friendly</li>
              </ul>
              <p>Click the ❌ button to start exploring!</p>
            </div>
          </div>
        )}
        <div>
          <nav className="navbar">
            <div className="navbar-logo">SORTING VISUALiZER</div>
            <select
              className="dropdown"
              value={selectedAlgorithm}
              onChange={(e) =>
                this.setState({ selectedAlgorithm: e.target.value })
              }
              disabled={sorting}
            >
              <option value="mergeSort">Merge Sort</option>
              <option value="quickSort">Quick Sort</option>
              <option value="heapSort">Heap Sort</option>
              <option value="bubbleSort">Bubble Sort</option>
              <option value="insertionSort">Insertion Sort</option>
              <option value="selectionSort">Selection Sort</option>
            </select>
            <button
              className="navbar-button"
              onClick={() => this.resetArray()}
              disabled={sorting}
            >
              Generate New Array
            </button>
            <button
              className="navbar-button"
              onClick={() => this.handleSort()}
              disabled={sorting}
            >
              Sort
            </button>
            <button
              className="navbar-button"
              onClick={() => this.setState({ showLearnModal: true })}
              disabled={sorting}
            >
              Learn
            </button>
            <button
              className="navbar-button"
              onClick={() =>
                this.setState({ showAdjustments: !this.state.showAdjustments })
              }
              disabled={sorting}
            >
              Adjust
            </button>

            {this.state.showAdjustments && (
              <div className="slider-container">
                <label>
                  Array Size
                  <input
                    type="range"
                    min="10"
                    max="310"
                    value={this.state.arraySize}
                    disabled={sorting}
                    onChange={(e) =>
                      this.setState({ arraySize: Number(e.target.value) }, () =>
                        this.resetArray()
                      )
                    }
                  />
                </label>
                <label>
                  Speed
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={this.state.speedLevel}
                    disabled={sorting}
                    onChange={(e) => {
                      const speedMap = {
                        1: 100,
                        2: 75,
                        3: 50,
                        4: 25,
                        5: 10,
                      };
                      const selectedLevel = Number(e.target.value);
                      this.setState({
                        speedLevel: selectedLevel,
                        animationSpeed: speedMap[selectedLevel],
                      });
                    }}
                  />
                </label>
              </div>
            )}
          </nav>
          <div className="array-container">
            {(() => {
              // Dynamic bar width and margin based on array size, revert to inline styles for bar sizing
              const barWidth = Math.max(
                2,
                Math.floor(1000 / this.state.arraySize)
              ); // dynamic width
              const margin = 1;
              // Use fixed max value for normalization to match animation scaling and animations
              const fixedMaxValue = this.state.arrayMaxValue;
              return array.map((value, idx) => {
                // Always use value / fixedMaxValue * 95 for height, matching animation logic
                const normalizedHeight = (value / fixedMaxValue) * 95;
                return (
                  <div
                    className="array-bar"
                    key={idx}
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      height: `${normalizedHeight}%`,
                      width: `${barWidth}px`,
                      margin: `0 ${margin}px`,
                      display: "inline-block",
                    }}
                  ></div>
                );
              });
            })()}
          </div>
          {this.state.showLearnModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>{selectedDetails.name}</h2>
                <p>{selectedDetails.description}</p>
                <div className="complexity">
                  <h4>Time & Space Complexity:</h4>
                  <ul>
                    <li>Best: {selectedDetails.complexity.best}</li>
                    <li>Average: {selectedDetails.complexity.average}</li>
                    <li>Worst: {selectedDetails.complexity.worst}</li>
                    <li>Space: {selectedDetails.complexity.space}</li>
                  </ul>
                </div>
                <button className="modal-close" onClick={this.closeLearnModal}>
                  ×
                </button>
              </div>
            </div>
          )}
          {sorting && (
            <div className="stop-button-container">
              <button className="stop-button" onClick={() => this.handleStop()}>
                STOP !
              </button>
            </div>
          )}
          <footer className="footer">
            <p>&copy; Sorting Visualizer. All rights reserved.</p>
          </footer>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
