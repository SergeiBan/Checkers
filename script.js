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
        }
    }

    handleClick(rowNumber, spotNumber) {
        const value = this.state.squares[rowNumber][spotNumber];
        const upSpace = (rowNumber > 0);
        const leftSpace = (spotNumber > 0);
        const rightSpace = (spotNumber < 7);
        const newSquares = this.state.squares.slice();
        console.log(upSpace, leftSpace, rightSpace);
        if (upSpace && leftSpace
            && newSquares[rowNumber-1][spotNumber-1] === 'V') {
                newSquares[rowNumber-1][spotNumber-1] = 'W';
                newSquares[rowNumber][spotNumber] = 'V';
                this.setState({
                    squares: newSquares,
                });
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
                    console.log(val2, ind2);
                    fullBoard.push(this.renderSquare(ind, ind2));
            });
            })
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