var base_url =
  process.env.NODE_ENV === "production"
    ? "http://testmasterlive.com/"
    : "http://localhost:4000/";

const commonOptions = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

export async function get(url) {
  let response = await fetch(base_url + url, {
    ...commonOptions
  });
  let data = await response.json();

  return data;
}

export async function post(url, body = {}) {
  let response = await fetch(base_url + url, {
    ...commonOptions,
    method: "post",
    body: JSON.stringify(body)
  });
  let data = await response.json();

  return data;
}

export async function del(url, body = {}) {
  let response = await fetch(base_url + url, {
    ...commonOptions,
    method: "delete",
    body: JSON.stringify(body)
  });

  let data = await response.json();

  return data;
}

export async function put(url, body = {}) {
  let response = await fetch(base_url + url, {
    ...commonOptions,
    method: "put",
    body: JSON.stringify(body)
  });

  let data = await response.json();

  return data;
}
