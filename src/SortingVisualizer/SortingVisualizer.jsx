import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
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
    // Implementation of Quick Sort.
  }

  heapSort() {
    // Implementation of Heap Sort.
  }

  bubbleSort() {
    // Implementation of Bubble Sort.
  }

  render() {
    const { array, selectedAlgorithm } = this.state;

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
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
