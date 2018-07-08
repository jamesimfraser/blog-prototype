import Preact, { Component } from "preact";
import { Provider } from "react-redux";

import Landing from "./scenes/Landing";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="base">
          <Landing />
        </div>
      </Provider>
    );
  }
}

export default App;
