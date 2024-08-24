import * as React from "react";

interface EmailTemplateProps {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  startDate,
  endDate,
  status,
}) => (
  <div>
    <h1>Dear, {name}!</h1>
    <p>Your leave request's status has been changed to {status}</p>
    <p>Leave start date: {startDate}</p>
    <p>Leave end date: {endDate}</p>
  </div>
);
