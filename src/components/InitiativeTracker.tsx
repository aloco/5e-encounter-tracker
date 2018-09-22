import * as React from 'react';
import './InitiativeTracker.css';
import { Button, Container, Row, Col } from 'reactstrap';
import { IInitiatveEntry } from './../types/InitiativeEntry';
import InitiativeListRow from "./InitiativeListRow";
import { Guid } from "guid-typescript";


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

        this.setState({ ...this.state,
            currentInitiativeIndex: this.state.currentInitiativeIndex + 1
        });
    }

    public addNewItem = () => {
        const newEntry: IInitiatveEntry = {
            id: Guid.create().toString(),
            freeText: "",
            name: "",
            initiative: 0
        }

        this.setState({ ...this.state,
            currentItems: this.state.currentItems.concat(newEntry)
        });
    }


    public itemChanged = (item: IInitiatveEntry) => {

        const updatedArray = this.state.currentItems.map((entry) => {
            if (entry.id === item.id) {
                return item;
            } else {
                return entry;
            }
        });

        // update list with new item
        this.setState({ ...this.state, 
            currentItems: this.sortListByInitiative(updatedArray)
        });
    } 

    public removeEntry = (id: string) => {
        this.setState({ ...this.state,
            currentItems: this.state.currentItems.filter((entry) => {
                return id !== entry.id;
            })
        });
    }

    public duplicateEntry = (id: string) => {
        // copy object
        const item = { ...this.state.currentItems.find((entry) => {
            return entry.id === id;
        })} as IInitiatveEntry;
   
        if (item !== undefined) {
            // create new id
            item.id = Guid.create().toString();
            this.setState({ ...this.state, 
                currentItems: this.state.currentItems.concat(item)
            });
        }
    }

    public sortListByInitiative = (items: IInitiatveEntry[]): IInitiatveEntry[] => {
        return items.sort((a, b) => {
            if (a.initiative > b.initiative) { return -1 };
            if (a.initiative < b.initiative) { return 1 };
            return 0;
        });
    }

    public renderList = () => {
        return this.state.currentItems.map((item, currentIndex) => {
            return <InitiativeListRow 
                key={item.id} 
                entry={item} 
                index={currentIndex} 
                removePressed={this.removeEntry} 
                duplicatePressed={this.duplicateEntry}
                isCurrent={currentIndex === this.state.currentInitiativeIndex} 
                itemChanged={this.itemChanged}
            />
        });
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
                        <Button color="primary" onClick={this.addNewItem}>
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