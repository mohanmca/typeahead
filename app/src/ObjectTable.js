import React from "react";
import "react-table/react-table.css";

class ObjectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.handleChange = this.handleChange.bind(this);
    this.isFilter = this.isFilter.bind(this);
  }

  render() {
    let data = this.getData();
    console.log(this.state.value);
    return (
      <div>
        <form>
          <label>
            Filter:{" "}
            <input type="text" name="filter" onChange={this.handleChange} />
          </label>
        </form>
        <table border="1">
          <tbody>
            <tr key="header">
              <td>
                <b>Fields</b>
              </td>
              <td>Values</td>
            </tr>
            {Object.keys(data).map((field, i) => (
              <tr key={field}>
                <td key={field + i}>
                  <b>{field}</b>
                </td>
                <td key={field + i + "v"}>{data[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
    console.log(this.state.filter);
    console.log(this.isFilter());
  }

  getData() {
    let data = {
      login: "mohancm",
      id: 19514457,
      node_id: "MDQ6VXNlcjE5NTE0NDU3",
      avatar_url: "https://avatars3.githubusercontent.com/u/19514457?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/mohancm",
      html_url: "https://github.com/mohancm",
      followers_url: "https://api.github.com/users/mohancm/followers",
      following_url:
        "https://api.github.com/users/mohancm/following{/other_user}",
      gists_url: "https://api.github.com/users/mohancm/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/mohancm/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/mohancm/subscriptions",
      organizations_url: "https://api.github.com/users/mohancm/orgs",
      repos_url: "https://api.github.com/users/mohancm/repos",
      events_url: "https://api.github.com/users/mohancm/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/mohancm/received_events",
      type: "User",
      site_admin: false,
      score: 108.17932
    };
    if (this.isFilter()) {
      let filter = this.state.filter;
      let filtered = {};
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          if (typeof data[k] === "string") {
            if (data[k].indexOf(filter) !== -1 || k.indexOf(filter) !== -1) {
              filtered[k] = data[k]
            }  
          } 
        }
      }
      return filtered;
    }
    return data;
  }

  isFilter() {
    return this.state.filter && this.state.filter.length >= 2;
  }
}

export default ObjectTable;
