import React, { PureComponent } from 'react';
import { GFZBXProblem, ZBXEvent, ZBXAcknowledge } from '../../types';

interface Props {
  problem: GFZBXProblem;
  getProblemEvent: (problem: GFZBXProblem) => Promise<ZBXEvent>;
  onClick: (event?) => void;
}

interface State {
  acknowledges: ZBXAcknowledge[];
}

export default class AlertAcknowledges extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      acknowledges: [],
    };
  }

  async componentDidMount() {
    const { problem, getProblemEvent } = this.props;
    const event = await getProblemEvent(problem);
    console.log(event);
    this.setState({ acknowledges: event.acknowledges });
  }

  handleClick = (event) => {
    this.props.onClick(event);
  }

  render() {
    const { problem } = this.props;
    const { acknowledges } = this.state;
    const ackRows = acknowledges && acknowledges.map(ack => {
      return (
        <tr key={ack.acknowledgeid}>
          <td>{ack.time}</td>
          <td>{ack.user}</td>
          <td>{ack.message}</td>
        </tr>
      );
    });
    return (
      <div className="ack-tooltip">
        <table className="table">
          <thead>
            <tr>
              <th className="ack-time">Time</th>
              <th className="ack-user">User</th>
              <th className="ack-comments">Comments</th>
            </tr>
          </thead>
          <tbody>
            {ackRows}
          </tbody>
        </table>
        {problem.showAckButton &&
          <div className="ack-add-button">
            <button id="add-acknowledge-btn" className="btn btn-mini btn-inverse gf-form-button" onClick={this.handleClick}>
              <i className="fa fa-plus"></i>
            </button>
          </div>
        }
      </div>
    );
  }
}
