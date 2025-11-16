import React, { Component } from "react";
import ErrorModal from "./Components/ErrorModal/ErrorModal";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error occurred:", error, errorInfo);
  }

  handleCloseModal = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      // Render your error modal or any fallback UI
      return (
        <ErrorModal
          show={this.state.hasError}
          onClose={this.handleCloseModal}
          message={this.state.errorMessage}
        />
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
