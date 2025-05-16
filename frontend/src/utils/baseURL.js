// export const getBaseURL = ()=>{
//   return "https://skogsnallen.onrender.com"
// }

export const getBaseURL = () => {
  return import.meta.env.PROD
    ? "https://skogsnallen.onrender.com"
    : "http://localhost:5000";
};