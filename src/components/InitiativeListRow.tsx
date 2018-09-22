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
    public initiativeChanged = (event: any) => {
        const initiativeNumber = Number(event.target.value);

        // keep value if input is no number
        if (isNaN(initiativeNumber)) {
            this.props.itemChanged({ ...this.props.entry, initiative: this.props.entry.initiative });
        } else {
            this.props.itemChanged({ ...this.props.entry, initiative: initiativeNumber });
        }
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
        const highlightedBackground = this.props.isCurrent ? "bg-light" : "";

        return (
            <Row className={highlightedBackground}>
                <Col>
                    <input
                        type="text"
                        name="initiative"
                        className="initiative-textfield"
                        value={this.props.entry.initiative}
                        onChange={this.initiativeChanged}
                    />
                </Col>
                <Col>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Insert name" 
                        className="name-textfield" 
                        value={this.props.entry.name} 
                        onChange={this.nameChanged} 
                    />
                </Col>
                <Col>
                    <Textarea 
                        value={this.props.entry.freeText} 
                        onChange={this.freeTextChanged} 
                        placeholder="Add text (conditions, notes, etc.)" 
                    />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <button 
                                type="button" 
                                onClick={this.duplicatePressed} 
                                className="close" 
                                aria-label="Duplicate">
                                    <FontAwesomeIcon icon="clone" />
                            </button>
                        </Col>
                        <Col>
                            <button 
                                type="button" 
                                onClick={this.removePressed} 
                                className="close" aria-label="Close">
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default InitiativeListRow;