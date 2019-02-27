import fetch from 'isomorphic-fetch';

// Polyfill Promises for IE and older browsers.
require('es6-promise').polyfill();

const SEARCH_URI = 'https://api.github.com/search/users';

export default function makeAndHandleRequest(query, page = 1) {
  return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=50`)
    .then((resp) => resp.json())
    .then(({items, total_count}) => {
      // const options = items.map((i) => ({
      //   avatar_url: i.avatar_url,
      //   id: i.id,
      //   login: i.login,
      // }));
      const options = items;
      return {options, total_count};
    });
}