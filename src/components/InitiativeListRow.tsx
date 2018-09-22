import * as React from 'react';
import './InitiativeListRow.css';
import { Row, Col } from 'reactstrap';
import { IInitiatveEntry } from '../types/InitiativeEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textarea from 'react-textarea-autosize';

interface IInitiativeListRowProps {
    entry: IInitiatveEntry,
    index: number,
    isCurrent: boolean,
    duplicatePressed: (id: string) => void,
    removePressed: (id: string) => void,
    itemChanged: (item: IInitiatveEntry) => void
}


class InitiativeListRow extends React.Component<IInitiativeListRowProps, {}> {

    constructor(props: IInitiativeListRowProps) {
        super(props);
        this.state = {}
    }

    // update fields
    public nameChanged = (event: any) => {
        this.props.itemChanged({ ...this.props.entry, name: event.target.value });
    }
    public armorClassChanged = (event: any) => {
        this.props.itemChanged({ ...this.props.entry, armorClass: this.parseNumber(event.target.value, this.props.entry.armorClass) });
    }
    public hitpointsChanged = (event: any) => {
        this.props.itemChanged({ ...this.props.entry, hitpoints: this.parseNumber(event.target.value, this.props.entry.hitpoints) });
    }
    public initiativeChanged = (event: any) => {
        this.props.itemChanged({ ...this.props.entry, initiative: this.parseNumber(event.target.value, this.props.entry.initiative) });
    }
    public freeTextChanged = (event: any) => {
        this.props.itemChanged({ ...this.props.entry, freeText: event.target.value });
    }


    // list actions
    public removePressed = (event: any) => {
        this.props.removePressed(this.props.entry.id);
    }
    public duplicatePressed = (event: any) => {
        this.props.duplicatePressed(this.props.entry.id);
    }

    public render() {
        const highlightedBackground = this.props.isCurrent ? "bg-light current-index" : "";

        return (
            <Row className={highlightedBackground + " initiative-list-row"}>
                <Col md={1}>
                    <input
                        type="text"
                        name="initiative"
                        className="initiative-textfield"
                        value={this.props.entry.initiative}
                        onChange={this.initiativeChanged}
                    />
                </Col>
                <Col md={1}>
                    <input
                        type="text"
                        name="armorClass"
                        className="armor-class-textfield"
                        value={this.props.entry.armorClass}
                        onChange={this.armorClassChanged}
                    />
                </Col>
                <Col md={1}>
                    <input
                        type="text"
                        name="hitpoints"
                        className="hitpoints-textfield"
                        value={this.props.entry.hitpoints}
                        onChange={this.hitpointsChanged}
                    />
                </Col>
                <Col md={3}>
                    <input 
                        type="text" 
                        name="name" 
                        // placeholder="Insert name" 
                        className="name-textfield" 
                        value={this.props.entry.name} 
                        onChange={this.nameChanged} 
                    />
                </Col>
                <Col md={4}>
                    <Textarea 
                        minRows={1}
                        value={this.props.entry.freeText} 
                        onChange={this.freeTextChanged} 
                        // placeholder="Insert conditions, notes etc."
                    />
                </Col>
                <Col md={2}>
                    <Row>
                        <Col className="action-button-container">
                            <button 
                                type="button" 
                                onClick={this.duplicatePressed} 
                                className="clear-button action-button text-dark" 
                                aria-label="Duplicate">
                                    <FontAwesomeIcon size={"1x"} icon="clone" />
                            </button>
                            <button 
                                type="button" 
                                onClick={this.removePressed} 
                                className="clear-button action-button text-dark" 
                                aria-label="Close">
                                <FontAwesomeIcon size={"1x"} icon="trash" />
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    private parseNumber(value: any, defaultValue: number) {
        const num = Number(value);
        if (isNaN(num)) {
            return defaultValue;
        } else {
            return num;
        }
    }
}

export default InitiativeListRow;