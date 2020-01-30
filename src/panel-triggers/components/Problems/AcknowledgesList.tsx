import React from 'react';
import moment from 'moment';
import { ZBXAcknowledge } from '../../types';

interface AcknowledgesListProps {
  acknowledges: ZBXAcknowledge[];
  timeFormat: string;
}

export const AcknowledgesList: React.FC<AcknowledgesListProps> = ({ acknowledges, timeFormat }) => {
  console.log(acknowledges);
  return (
    <div className="problem-ack-list">
      <div className="problem-ack-col problem-ack-time">
        {acknowledges.map(ack => <span key={ack.acknowledgeid} className="problem-ack-time">{formatAckTime(ack, timeFormat)}</span>)}
      </div>
      <div className="problem-ack-col problem-ack-user">
        {acknowledges.map(ack => <span key={ack.acknowledgeid} className="problem-ack-user">{formatAckUser(ack)}</span>)}
      </div>
      <div className="problem-ack-col problem-ack-message">
        {acknowledges.map(ack => <span key={ack.acknowledgeid} className="problem-ack-message">{ack.message}</span>)}
      </div>
    </div>
  );
};

function formatAckTime(ack, timeFormat) {
  return moment.unix(ack.clock).format(timeFormat);
}

function formatAckUser(ack) {
  let user = ack.alias || '';
  if (ack.name || ack.surname) {
    const fullName = `${ack.name || ''} ${ack.surname || ''}`;
    user += ` (${fullName})`;
  }
  return user;
}

export default AcknowledgesList;
