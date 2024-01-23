import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'

function App() {


    return (
        <Game />
    )
}

function Game() {
    const [turn, setTurn] = useState(true);
    const [markMap, setMarkMap] = useState({});

    const [msg, setMsg] = useState("X의 턴");

    const [turnCount, setTurnCount] = useState(1);

    const onClickCell = (index) => {
        if (typeof (markMap[index]) === 'undefined') {
            setTurnCount(turnCount + 1);
            let markStr = turn ? "X" : "O";
            const newMarkMap = markMap;
            newMarkMap[index] = markStr;
            setMarkMap(newMarkMap);
            if (getWinner(markMap) !== "") {
                setMsg(getWinner(markMap));
            } else {
                if (turnCount === 9) {
                    setMsg("무승부");
                } else {
                    setMsg((!turn ? "X" : "O") + "의 턴");
                }

            }
            setTurn(!turn);
        }
    };

    const resetGame = () => {
        setMarkMap({});
        setTurn(true);
        setMsg("X의 턴");
        setTurnCount(1);
    }

    return (
        <>
            <Container>
                <Row className='board-title'>{msg}</Row>
                <Row className='button-1row marT20'>
                    <Square clickFunction={onClickCell} marker={markMap} index={0} />
                    <Square clickFunction={onClickCell} marker={markMap} index={1} />
                    <Square clickFunction={onClickCell} marker={markMap} index={2} />
                </Row>
                <Row className='button-1row'>
                    <Square clickFunction={onClickCell} marker={markMap} index={3} />
                    <Square clickFunction={onClickCell} marker={markMap} index={4} />
                    <Square clickFunction={onClickCell} marker={markMap} index={5} />
                </Row>
                <Row className='button-1row'>
                    <Square clickFunction={onClickCell} marker={markMap} index={6} />
                    <Square clickFunction={onClickCell} marker={markMap} index={7} />
                    <Square clickFunction={onClickCell} marker={markMap} index={8} />
                </Row>
                {
                    (getWinner(markMap) === "" && turnCount < 10) ?
                        <></>
                        :
                        <Row className='board-title marT20'>
                            <Button onClick={resetGame}>다시하기</Button>
                        </Row>
                }
            </Container>
        </>
    )
}

function Square({ clickFunction, marker, index }) {
    return (
        <Col className='button-col'>
            <div className='button-div'>
                <Button className='button-cell' variant="flat" onClick={() => clickFunction(index)} disabled={(getWinner(marker) !== "")}>{marker[index]}</Button>
            </div>
        </Col>
    )
}

function getWinner(markMap) {
    const winnerMark = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let markArrStr = "";
    let winner = "";
    winnerMark.forEach(function (mark) {
        mark.forEach(function (index) {
            markArrStr += markMap[index];
        });
        if (markArrStr === "OOO") {
            winner = "O가 승리하였습니다.";
            return;
        } else if (markArrStr === "XXX") {
            winner = "X가 승리하였습니다.";
            return;
        } else {
            markArrStr = "";
        }
    });

    return winner;
}
export default App
