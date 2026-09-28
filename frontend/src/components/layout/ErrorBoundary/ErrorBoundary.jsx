import { Component } from "react";
import ErrorState from "../../states/ErrorState/ErrorState";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Unhandled application error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorState
                    title="Something went wrong"
                    message="The application could not render this page."
                    actionLabel="Reload page"
                    onAction={() => window.location.reload()}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
