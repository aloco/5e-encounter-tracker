import * as React from 'react';
import './InitiativeTracker.css';
import { Button, Container, Row, Col } from 'reactstrap';
import { IInitiatveEntry } from './../types/InitiativeEntry';
import InitiativeListRow from "./InitiativeListRow";

interface IInitiativeTrackerState {
    currentItems: IInitiatveEntry[];
    elapsedTime: number;
    currentRound: number;
    currentInitiativeIndex: number;
}


class InitiativeTracker extends React.Component<{}, IInitiativeTrackerState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            currentItems: [],
            elapsedTime: 0,
            currentRound: 1,
            currentInitiativeIndex: 0
        }
    }

    public getElapsedTime = () => {
        const tempElapsedSeconds = this.state.currentRound * 6;

        const elapsedMinutes = Math.floor(tempElapsedSeconds / 60);
        const elapsedSeconds = tempElapsedSeconds - elapsedMinutes * 60;

        return elapsedMinutes + "m " + elapsedSeconds + "s";
    }

    public nextInitiative = () => {
        if (this.state.currentInitiativeIndex === this.state.currentItems.length - 1) {
            const currentRound = this.state.currentRound + 1;
            this.setState({
                ...this.state,
                currentRound,
                currentInitiativeIndex: 0
            });
            return;
        }
        const nextInitiative = this.state.currentInitiativeIndex + 1;
        this.setState({
            ...this.state,
            currentInitiativeIndex: nextInitiative
        });
    }

    public addNewRow = () => {

        const newEntry: IInitiatveEntry = {
            name: "",
            initiative: 0
        }
        const newItems = this.state.currentItems;
        newItems.push(newEntry);
        this.setState({
            ...this.state,
            currentItems: newItems
        });
    }


    public nameChanged = (index: number, name: string) => {
        const newList = this.state.currentItems.map((entry, currentIndex) => {
            if (currentIndex === index) {
                entry.name = name
            }
            return entry;
        });
        this.setState({
            ...this.state,
            currentItems: newList
        });
    }

    public initiativeChanged = (index: number, initiative: number) => {
        const newList = this.state.currentItems.map((entry, currentIndex) => {
            if (currentIndex === index) {
                entry.initiative = initiative
            }
            return entry;
        });
        this.setState({
            ...this.state,
            currentItems: newList
        });
    }

    public removePressed = (index: number) => {
        const items = this.state.currentItems.filter((entry, currentIndex) => {
            return index !== currentIndex;
        });
        this.setState({
            ...this.state,
            currentItems: items
        })
    }

    public renderList = () => {
        const a =  this.state.currentItems.map((item, currentIndex) => {
            return <InitiativeListRow entry={item} index={currentIndex} removePressed={(index) => { this.removePressed(index);}} isCurrent={currentIndex === this.state.currentInitiativeIndex} key={currentIndex} nameChanged={(name) => { this.nameChanged(currentIndex, name);}} initiativeChanged={(initiative) => { this.initiativeChanged(currentIndex, initiative);}}/>
        });
        return a;
    }

    public render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>
                            Round
                            <span className="round-badge">
                                {this.state.currentRound}
                            </span>
                        </h3>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={this.nextInitiative}>
                            Next Initiative
                        </Button>
                    </Col>
                    <Col>
                        <h3>
                            Elapsed Time
                        </h3>
                    </Col>
                    <Col>
                        {this.getElapsedTime()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" onClick={this.addNewRow}>
                            Add new entry
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            {this.renderList()}
                        </Container>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default InitiativeTracker;