import Preact, { Component } from "preact";
import { Provider } from "react-redux";

import Landing from "./pages/Landing";
import FullPost from "./pages/FullPost";
import store from "./store";

class App extends Component {
  state = { area: "landing" };

  components = {
    landing: <Landing />,
    fullPost: <FullPost />
  };

  componentWillMount() {
    window.location.hash = "landing";
    window.addEventListener("hashchange", this.setAreaFromHash);
  }

  setAreaFromHash = () => {
    this.setState({
      area: window.location.hash.split("#")[1]
    });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="base">
          {this.components[this.state.area] || this.components.landing}
        </div>
      </Provider>
    );
  }
}

export default App;
