const createFetch = (url, method, onSuccess, onError) => (formData) => fetch(
  url,
  {
    method: method,
    credentials: 'same-origin',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch((err) => {
    onError(err);
  });

export {createFetch};
