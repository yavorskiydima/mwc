import React, { Component } from 'react';
import styled from 'styled-components';
import Workspace from './containers/Workspace';
import { Space } from './components/styled-components';
import { Provider } from 'react-redux';
import store from './store';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  background-size: cover;
  video {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Workspace />
        <Wrapper>
          <Space />
        </Wrapper>
      </Provider>
    );
  }
}

export default App;
