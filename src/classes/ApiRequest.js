import axios from "axios";

/** Class representing an API request */
class ApiRequest {
  /**
   * @param { String } url HTTP url to send the request to
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Send a GET request
   * @param { Object } params key value pairs corresponding to the parameters you want to send
   * @return { * } response from the external API
   */
  async get(params) {
    return axios.get(this.url, params);
  }

  /**
   * Send a POST request
   * @param { Object } params key value pairs corresponding to the parameters you want to send
   * @return { * } response from the external API
   */
  async post(params) {
    return axios.post(this.url, params);
  }
}

export {
  ApiRequest,
};
