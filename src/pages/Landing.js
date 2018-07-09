import Preact, { Component } from "preact";
import Posts from "../components/Posts";
import NewPost from "../components/NewPost";

class Landing extends Component {
  render() {
    return (
      <div>
        <Posts />
        <NewPost />
      </div>
    );
  }
}

export default Landing;
