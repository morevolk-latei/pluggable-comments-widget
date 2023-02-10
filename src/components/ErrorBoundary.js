import React, { Component } from 'react'


export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    const { logService = null } = props

    // generic logging service instantiation with abstraction under init method.
    // init method accepts config if any, @returns the actual log service instance
    // example usage: this.state.log('error log and component tree stack')
    if (typeof logService === 'function') {
      this.state = {
        log: logService.init()
      }
    } else {
      this.state = {}
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { log = null } = this.state

    // sending logs to custom logging service, eg: Sentry, Dynatrace, LogRocket, New Relic etc
    if (typeof log === 'function') {
      log(error, errorInfo);
    }
  }

  render() {
    const { hasError = false } = this.state

    if (hasError) {
      return <h1>Something went wrong. please reload the page!</h1>;
    }

    return (
      this.props.children
    )
  }
}

