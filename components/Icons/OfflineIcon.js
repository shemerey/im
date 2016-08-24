'use babel'

import React, {PropTypes, Component} from 'react'

export default class OfflineIcon extends React.Component {
  render() {
    return (
      <svg viewBox="0 0 40 40"
        fill='currentColor'
        preserveAspectRatio='xMidYMid meet'
        height="11"
        width="11" >
        <g><path d="m20.1 7.9q-3.3 0-6.1 1.6t-4.4 4.4-1.6 6.1 1.6 6.1 4.4 4.4 6.1 1.6 6.1-1.6 4.5-4.4 1.6-6.1-1.6-6.1-4.5-4.4-6.1-1.6z m17.2 12.1q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"/></g>
      </svg>
    );
  }
}
