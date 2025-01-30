//  set session key
export function setLocalKey(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

//  get value from session storage
export const getLocalKey = (key: string | any) => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem(key)) return localStorage.getItem(key);
  return false;
};
//  remove key from session storage
export const removeLocalKey = (key: string) => {
  if (typeof window !== "undefined") localStorage.removeItem(key);
};

export const getAccessToken = () => {
  if (localStorage.getItem("token")) {
    let token = localStorage.getItem("token");
    if (token) {
      return token;
    }
  }
};

export const permissions = () => {
  return ["list of all the assing permission"];
};
