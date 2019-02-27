import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import { FormGroup } from 'react-bootstrap'; // ES2015
import Control from './components/Control.react';
import GithubMenuItem from './components/GithubMenuItem.react';
import makeAndHandleRequest from './util/makeAndHandleRequest';
import React, { Fragment } from 'react';
import ReactTable from 'react-table'
import "react-table/react-table.css";

function replaceSymbols(str) {
  if(str) 
    return str.replace(/[{}]/g, "");
  else
    return str;  
}

let data = [{
  "login": "mohancm",
  "id": 19514457,
  "node_id": "MDQ6VXNlcjE5NTE0NDU3",
  "avatar_url": "https://avatars3.githubusercontent.com/u/19514457?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/mohancm",
  "html_url": "https://github.com/mohancm",
  "followers_url": "https://api.github.com/users/mohancm/followers",
  "following_url": "https://api.github.com/users/mohancm/following{/other_user}",
  "gists_url": "https://api.github.com/users/mohancm/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/mohancm/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/mohancm/subscriptions",
  "organizations_url": "https://api.github.com/users/mohancm/orgs",
  "repos_url": "https://api.github.com/users/mohancm/repos",
  "events_url": "https://api.github.com/users/mohancm/events{/privacy}",
  "received_events_url": "https://api.github.com/users/mohancm/received_events",
  "type": "User",
  "site_admin": false,
  "score": 108.17932
},
{
  "login": "mohanchinta",
  "id": 15227041,
  "node_id": "MDQ6VXNlcjE1MjI3MDQx",
  "avatar_url": "https://avatars1.githubusercontent.com/u/15227041?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/mohanchinta",
  "html_url": "https://github.com/mohanchinta",
  "followers_url": "https://api.github.com/users/mohanchinta/followers",
  "following_url": "https://api.github.com/users/mohanchinta/following{/other_user}",
  "gists_url": "https://api.github.com/users/mohanchinta/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/mohanchinta/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/mohanchinta/subscriptions",
  "organizations_url": "https://api.github.com/users/mohanchinta/orgs",
  "repos_url": "https://api.github.com/users/mohanchinta/repos",
  "events_url": "https://api.github.com/users/mohanchinta/events{/privacy}",
  "received_events_url": "https://api.github.com/users/mohanchinta/received_events",
  "type": "User",
  "site_admin": false,
  "score": 16.025797
}];


class AsyncExample extends React.Component {
  state = {
    allowNew: false,
    isLoading: false,
    multiple: false,
    options: [],
  };

  columns = [
    { "Header": "avatar_url", "accessor": "avatar_url" },
    { "Header": "events_url", "accessor": "events_url" },
    { "Header": "followers_url", "accessor": "followers_url" },
    { "Header": "following_url", "accessor": "following_url" },
    { "Header": "gists_url", "accessor": "gists_url" },
    { "Header": "gravatar_id", "accessor": "gravatar_id" },
    { "Header": "html_url", "accessor": "html_url" },
    { "Header": "id", "accessor": "id" },
    { "Header": "login", "accessor": "login" },
    { "Header": "node_id", "accessor": "node_id" },
    { "Header": "organizations_url", "accessor": "organizations_url" },
    { "Header": "received_events_url", "accessor": "received_events_url" },
    { "Header": "repos_url", "accessor": "repos_url" },
    { "Header": "score", "accessor": "score" },
    { "Header": "site_admin", "accessor": "site_admin" },
    { "Header": "starred_url", "accessor": "starred_url" },
    { "Header": "subscriptions_url", "accessor": "subscriptions_url" },
    { "Header": "type", "accessor": "type" },
    { "Header": "url", "id": "url", "accessor": o => replaceSymbols(o["url"]) }
  ]

  render() {
    return (
      <Fragment>
        <AsyncTypeahead
          {...this.state}
          labelKey="login"
          minLength={3}
          onSearch={this._handleSearch}
          placeholder="Search for a Github user..."
          renderMenuItemChildren={(option, props) => (
            <GithubMenuItem key={option.id} user={option} />
          )}
        >
          <ReactTable data={this.state.options} columns={this.columns} />
        </AsyncTypeahead>
        <FormGroup>
          {this._renderCheckboxes()}
        </FormGroup>
      </Fragment>
    );
  }

  _renderCheckboxes() {
    const checkboxes = [
      { label: 'Multi-Select', name: 'multiple' },
      { label: 'Allow custom selections', name: 'allowNew' },
    ];

    return checkboxes.map(({ label, name }) => (
      <Control
        checked={this.state[name]}
        key={name}
        name={name}
        onChange={this._handleChange}
        type="checkbox">
        {label}
      </Control>
    ));
  }

  _handleChange = (e) => {
    const { checked, name } = e.target;
    this.setState({ [name]: checked });
  }

  _handleSearch = (query) => {
    this.setState({ isLoading: true });
    makeAndHandleRequest(query)
      .then(({ options }) => {
        debugger;
        console.dir(options);
        this.setState({
          isLoading: false,
          options,
        });
      });
  }
}

export default AsyncExample;