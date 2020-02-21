// life

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

class Cell {
    constructor(value = 0) {
        this.state = value;
        this.isVisited = false;
    }

    SetState(value) {
        this.state = value;
    }

}

class LifeMap {
    constructor(cols, rows) {
        this.grid = make2DArray(cols, rows);
        this.cols = cols;
        this.rows = rows;
        this.drawable = false;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.grid[i][j] = new Cell();
            }
        }
    }

    InsertCell(cell, i, j) {
        this.grid[i][j] = cell;
    }

    GetCellState(i, j) {
        return this.grid[i][j].state;
    }

    SetCell(value, i, j) {
        this.grid[i][j].SetState(value);
    }

    CountNeighbors(x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i != 0 || j != 0) {
                    let col = (x + i + cols) % cols;
                    let row = (y + j + rows) % rows;
                    sum += this.GetCellState(col, row);
                }
            }
        }

        return sum;
    }

    Propagate() {

        let nextMap = new LifeMap(this.cols, this.rows);

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let state = this.GetCellState(i, j);
                let neighbors = this.CountNeighbors(i, j);

                // Apply rules of life
                if (state == 0 && neighbors == 3) {
                    nextMap.SetCell(1, i, j);
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    nextMap.SetCell(0, i, j);
                } else {
                    nextMap.SetCell(state, i, j);
                }
            }
        }

        this.grid = nextMap.grid;

    }

    Draw() {
        background(50);

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (this.GetCellState(i, j) == 1) {
                    fill(255, 255, 0);
                    stroke(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }
            }
        }
    }

    // a few patterns

    Random(maxstates = 2) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let value = floor(random(maxstates));
                this.SetCell(value, i, j);
            }
        }
    }

    Clear() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.SetCell(0, i, j);
            }
        }
    }

    Border() {
        for (let i = 0; i < this.cols; i++) {
            this.SetCell(1, i, 0);
            this.SetCell(1, i, this.rows - 1);
        }
        for (let j = 0; j < this.rows; j++) {
            this.SetCell(1, 0, j);
            this.SetCell(1, this.cols - 1, j);
        }
    }

    Cross() {
        for (let i = 0; i < this.cols; i++) {
            this.SetCell(1, i, floor(this.rows / 2));
        }
        for (let j = 0; j < this.rows; j++) {
            this.SetCell(1, floor(this.cols / 2), j);
        }
    }

}