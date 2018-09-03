import * as React from 'react';
import './InitiativeListRow.css';
import { Button, Row, Col } from 'reactstrap';
import { IInitiatveEntry } from '../types/InitiativeEntry';

interface IInitiativeListRowProps {
    entry: IInitiatveEntry,
    index: number,
    isCurrent: boolean
    nameChanged: (name: string) => void,
    initiativeChanged: (initiative: number) => void,
    removePressed: (index: number) => void
}


class InitiativeListRow extends React.Component<IInitiativeListRowProps, {}> {

    constructor(props: IInitiativeListRowProps) {
        super(props);
        this.state = {}
    }

    public nameChanged = (event: any) => {
        this.props.nameChanged(event.target.value);
    }

    public initiativeChanged = (event: any) => {
        this.props.initiativeChanged(event.target.value);
    }

    public render() {
        const highlightedBackground = this.props.isCurrent ? "bg-light" : "";

        return (
            <Row className={highlightedBackground}>
                <Col>
                    <input type="text" name="initiative" className="initiative-textfield" value={this.props.entry.initiative} onChange={this.initiativeChanged}/>
                </Col>
                <Col>
                    <input type="text" name="name" className="name-textfield" value={this.props.entry.name} onChange={this.nameChanged}/>
                </Col>
                <Col>
                    <Button color="danger" onClicke={this.props.removePressed}>Remove</Button>
                </Col>
            </Row>                
        );
    }
}

export default InitiativeListRow;