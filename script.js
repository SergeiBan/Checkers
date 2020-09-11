class Square extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.content}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [
                    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'], 
                    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
                    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'], 
                    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'], 
                    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'], 
                    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'], 
                    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
                    ],
            blackIsNext: true,
            squareIsPicked: false,
            pickedSquare: [0, 0],
        }
    }

    handleClick(rowNumber, spotNumber) {
        const value = this.state.squares[rowNumber][spotNumber];

        if (value !== 'V') {
            this.state.pickedSquare = [rowNumber, spotNumber];
            this.state.squareIsPicked = true;
            console.log('Picked', this.state.pickedSquare);
            return;
        }
        
        const pickedRow = this.state.pickedSquare[0];
        const pickedSpot = this.state.pickedSquare[1];

        const pickedOne = this.state.squares[pickedRow][pickedSpot];
        if (
            (pickedOne === 'W') && 
            (rowNumber === pickedRow - 1) &&
        ((spotNumber === pickedSpot - 1) || (spotNumber === pickedSpot + 1)) 
        ) {
            const newSquares = this.state.squares.slice();
            newSquares[pickedRow][pickedSpot] = 'V';
            newSquares[rowNumber][spotNumber] = 'W';
            this.setState({ squares: newSquares, squareIsPicked: false });
            return;
        }
        if (
            (pickedOne === 'B') && 
            (rowNumber === pickedRow + 1) &&
        ((spotNumber === pickedSpot - 1) || (spotNumber === pickedSpot + 1)) 
        ) {
            const newSquares = this.state.squares.slice();
            newSquares[pickedRow][pickedSpot] = 'V';
            newSquares[rowNumber][spotNumber] = 'B';
            this.setState({ squares: newSquares, squareIsPicked: false });
            return;
        }
        
        
    }

    renderSquare(rowNumber, spotNumber) {
        return (
            <Square 
                content = {this.state.squares[rowNumber][spotNumber]}
                onClick = {() => this.handleClick(rowNumber, spotNumber)}
            />
        )
    }
        
    render() {
        const fullBoard = [];
        {
            this.state.squares.map((val, ind) => {
                this.state.squares[ind].map((val2, ind2) => {
                    fullBoard.push(this.renderSquare(ind, ind2));
                });
            });
        }
        return (
            <div className="board">
                <div className="row">
                   {fullBoard}
                </div>
                
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <Board />
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);