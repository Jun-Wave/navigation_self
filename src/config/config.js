const env = process.env.NODE_ENV;
const config = {
  development: {
    baseURL: "/myapi",
    socketURL: "http://localhost:3005"//不用了
  },
  production: {
    baseURL: "/myapi"
  }
}
export default config[env];