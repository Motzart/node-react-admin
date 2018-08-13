import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-dark text-white text-center">
        <div className="container">
          <span className="text-muted">
            Copyright &copy; {new Date().getFullYear()} Simple admin panel
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
