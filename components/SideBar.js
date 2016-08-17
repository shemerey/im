'use babel'

import React, { Component } from 'react'

export default class SideBar extends Component {
  render() {
    const logoUrl = 'http://placehold.it/48x48'

    return (
      <div className="im-side-bar">
        <div className="teams">
          <ul className="list-of-teams">
            <li><img src={logoUrl} alt="First"/></li>
            <li><img src={logoUrl} alt="First"/></li>
            <li><img src={logoUrl} alt="First"/></li>
            <li><img src={logoUrl} alt="First"/></li>
          </ul>
          <div className="separator"></div>
          <button className='add-new-team btn btn-lg icon icon-file-add inline-block-tight'></button>
        </div>
        <div className="chats">
         <div className="user-info">Anton</div>
         <ul className="channels">
           <li>#general</li>
           <li>#random</li>
           <li>#RebelIcons</li>
           <li>#HaKaTon</li>
         </ul>

         <ul className="direct-messages">
           <li>#general</li>
           <li>#random</li>
           <li>#RebelIcons</li>
           <li>#HaKaTon</li>
         </ul>
        </div>
      </div>
    )
  }
}
