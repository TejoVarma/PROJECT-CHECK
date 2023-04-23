const url = "https://project-check-node-tejo.onrender.com";
export const getcars = () => {
  return fetch(`${url}/user/getcars`)
    .then((res) => res.json())
    .catch((err) => alert(err.message));
};
export const getbookingdetails = () => {
  return fetch(`${url}/user/getbookingdetails`)
    .then((res) => res.json())
    .catch((err) => alert(err.message));
};
