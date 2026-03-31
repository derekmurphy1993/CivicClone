import React from 'react';
import ErrorMessage from './ErrorMessage';

const DEFAULT_ERROR_MESSAGE = "Oops! Something went wrong. Please try again later.";

export default class ErrorBoundary extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorMessage message={DEFAULT_ERROR_MESSAGE}/>;
        } else {
            return this.props.children
        }
    }
}
