import * as React from 'react';
import './InitiativeTracker.css';
import { Container, Row, Col } from 'reactstrap';
import { IInitiatveEntry } from './../types/InitiativeEntry';
import InitiativeListRow from "./InitiativeListRow";
import { Guid } from "guid-typescript";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
        const tempElapsedSeconds = (this.state.currentRound - 1) * 6;

        const elapsedMinutes = Math.floor(tempElapsedSeconds / 60);
        const elapsedSeconds = tempElapsedSeconds - elapsedMinutes * 60;

        return (
            <div>
                <span className="elapsed-time-value">{elapsedMinutes}</span>
                <span className="elapsed-time-unit">m</span>
                <span className="elapsed-time-value">{elapsedSeconds}</span>
                <span className="elapsed-time-unit">s</span>
            </div>
        );
    }

    public previousInitiative = () => {
        // go to previous round if start of the list is reached
        if (this.state.currentInitiativeIndex === 0) {
            const currentRound = this.state.currentRound - 1;
            this.setState({
                ...this.state,
                currentRound: currentRound > 0 ? currentRound : 1, // don´t allow negative or zero rounds
                currentInitiativeIndex: currentRound > 0 ? this.state.currentItems.length - 1 : this.state.currentInitiativeIndex
            });
        } else {
            this.setState({ ...this.state,
                currentInitiativeIndex: this.state.currentInitiativeIndex - 1
            });
        }
    }

    public nextInitiative = () => {
        // start next round if last item in list is reached
        if (this.state.currentInitiativeIndex === this.state.currentItems.length - 1) {
            const currentRound = this.state.currentRound + 1;
            this.setState({
                ...this.state,
                currentRound,
                currentInitiativeIndex: 0 // jump to first entry
            });
        } else {
            this.setState({ ...this.state,
                currentInitiativeIndex: this.state.currentInitiativeIndex + 1
            });
        }
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

        const header = 
        (
            <Row key="header" className="list-header">
                <Col md={1}>
                    Initiative
                </Col>
                <Col md={4}>
                    Name
                </Col>
                <Col md={5}>
                    Notes
                </Col>
                <Col md={2}>
                    Actions
                </Col>
            </Row>
        );

        const list = this.state.currentItems.map((item, currentIndex) => {
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
        return [header, list];
    }

    public render() {
        return (
            <Container>
                <Row className="header-row">
                    <Col>
                        <div className="round-info-container">
                            <span className="round-title"> Round </span>
                            <span className="round-badge bg-dark text-light">
                                {this.state.currentRound}
                            </span>
                        </div>
                    </Col>
                    <Col className="add-initiative-container">
                        <span className="initiative-title"> Initiative </span>
                        <button 
                            type="button" 
                                onClick={this.addNewItem} 
                                className="clear-button" 
                                aria-label="Add">
                            <FontAwesomeIcon className="text-dark" icon="plus-circle" size="3x" />
                        </button>
                    </Col>
                </Row>
                <Row className="header-row">
                    <Col className="elapsed-time">
                        <span className="elapsed-time-title"> Elapsed Time </span>
                        {this.getElapsedTime()}
                    </Col>
                    <Col >
                        <div className="initiative-controls-container">
                            <div className="initiative-arrows">
                                <button 
                                    type="button" 
                                    onClick={this.previousInitiative} 
                                    className="clear-button btn-initiative-progress" 
                                    aria-label="Previous">
                                    <FontAwesomeIcon className="text-dark" icon="chevron-circle-left" size="2x"/>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={this.nextInitiative} 
                                    className="clear-button btn-initiative-progress" 
                                    aria-label="Next">
                                    <FontAwesomeIcon className="text-dark" icon="chevron-circle-right" size="2x" />
                                </button>
                            </div>
                        </div>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container className="initiative-list-container">
                            {this.renderList()}
                        </Container>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default InitiativeTracker;