const url = "http://api.paiza.io/runners";

export const execute = async (code: string) => {
  const query = new URLSearchParams({
    source_code: code,
    language: "javascript",
    api_key: "guest",
  });
  const res = await fetch(`${url}/create?${query}`, {
    method: "POST",
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
  const res = await fetch(`${url}/get_details?${query}`, {
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
