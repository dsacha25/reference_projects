import React, { Component } from "react";

import {
	ErrorImageOverlay,
	ErrorImageContainer,
	ErrorImageText,
} from "./error-boundary.styles";

export class ErrorBoundary extends Component {
	state = {
		hasErrored: false,
	};

	static getDerivedStateFromError(error) {
		// process the error
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		// Side effects for error
		console.log(error);
		console.log(info);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
					<ErrorImageText>Sorry this page is broken</ErrorImageText>
				</ErrorImageOverlay>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
