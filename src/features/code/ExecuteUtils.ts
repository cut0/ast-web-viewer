export const execute = async (code: string) => {
  const res = await fetch("http://api.paiza.io:80/runners/create", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      source_code: code,
      language: "javascript",
      api_key: "guest",
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
  return res;
};

export const fetchResult = async (id: string) => {
  const query = new URLSearchParams({
    id,
    api_key: "guest",
  });
  const res = await fetch(`http://api.paiza.io/runners/get_details?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.stderr) {
        throw new Error(data.stderr);
      }
      return data;
    });
  return res;
};
