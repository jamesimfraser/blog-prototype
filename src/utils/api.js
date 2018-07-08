export default (url, payload = {}, method = "GET") => {
  const params = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: method !== "GET" ? JSON.stringify(payload) : null
  };

  return fetch(url, params).then(r => {
    if (!r.ok) {
      throw Error(`${r.statusText}`);
    }

    return r.json();
  });
};
