/* eslint-disable */
import React from 'react';
import FacebookAuth from './FacebookAuth';

interface ConnectFormsProps {
  selectedChannel: string
}

function ConnectForms(props: ConnectFormsProps) {
  return <>{props.selectedChannel === 'facebook' && <FacebookAuth />}</>;
}

export default ConnectForms;
