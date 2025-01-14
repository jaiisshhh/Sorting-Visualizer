import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      selectedAlgorithm: "mergeSort",
      showModal: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  handleSort() {
    const { selectedAlgorithm } = this.state;
    if (selectedAlgorithm === "mergeSort") this.mergeSort();
    else if (selectedAlgorithm === "quickSort") this.quickSort();
    else if (selectedAlgorithm === "heapSort") this.heapSort();
    else if (selectedAlgorithm === "bubbleSort") this.bubbleSort();
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    if (arrayBars.length === 0) return;

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];

      if (barOneIdx >= arrayBars.length || barTwoIdx >= arrayBars.length) {
        console.error(`Invalid indices: ${barOneIdx}, ${barTwoIdx}`);
        continue;
      }

      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle = arrayBars[barTwoIdx]?.style;

      if (i % 2 === 0) {
        setTimeout(() => {
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          if (arrayBars[barIdx]) {
            arrayBars[barIdx].style.height = `${newHeight}px`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];

      if (barTwoIdx !== -1) {
        if (barOneIdx < arrayBars.length && barTwoIdx < arrayBars.length) {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          setTimeout(() => {
            const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }
      } else {
        if (barOneIdx < arrayBars.length) {
          const [barIdx, newHeight] = animations[i];
          setTimeout(() => {
            arrayBars[barIdx].style.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];

      if (barTwoIdx !== -1) {
        if (barOneIdx < arrayBars.length && barTwoIdx < arrayBars.length) {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          setTimeout(() => {
            const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }
      } else {
        if (barOneIdx < arrayBars.length) {
          const [barIdx, newHeight] = animations[i];
          setTimeout(() => {
            arrayBars[barIdx].style.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  }

  render() {
    const { array, selectedAlgorithm, showModal } = this.state;

    const algorithmDetails = {
      mergeSort: {
        name: "Merge Sort",
        description:
          "Merge Sort is a divide-and-conquer algorithm that splits the array into halves, sorts each half, and merges them back together.",
        steps: [
          "Divide the array into two halves.",
          "Recursively sort each half.",
          "Merge the two sorted halves back together.",
        ],
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
      },
    };

    const selectedDetails = algorithmDetails[selectedAlgorithm];

    return (
      <div>
        <nav className="navbar">
          <div className="navbar-logo">Sorting Visualizer</div>
          <select
            className="dropdown"
            value={selectedAlgorithm}
            onChange={(e) =>
              this.setState({ selectedAlgorithm: e.target.value })
            }
          >
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="heapSort">Heap Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
          </select>
          <button className="navbar-button" onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button className="navbar-button" onClick={() => this.handleSort()}>
            Sort
          </button>
          <button
            className="navbar-button"
            onClick={() => this.setState({ showModal: true })}
          >
            Learn
          </button>
        </nav>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedDetails.name}</h2>
              <p>{selectedDetails.description}</p>
              <ul>
                {selectedDetails.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
              <button
                className="modal-close"
                onClick={() => this.setState({ showModal: false })}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
