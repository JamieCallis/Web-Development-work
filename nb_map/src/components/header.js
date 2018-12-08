import React, { Component } from 'react';


class Header extends Component {
  /***
  * @description - check weather the menu is hidden or not, then call the parent
  function menuToggleChange.
  */
  toggleOnClick = () => {
    if(this.props.menuHidden) {
      this.props.menuToggleChange(false);
    }
    else {
      this.props.menuToggleChange(true);
    }
  }

  render() {
    return (
      <header tab-index="0">
        <button aria-label="menu"
        onClick={this.toggleOnClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>
    )
  }
}



export default Header;
