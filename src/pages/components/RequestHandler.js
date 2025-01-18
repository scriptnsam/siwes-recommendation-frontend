
// Custom axios request functions for making HTTP requests

import axios from "axios";

/* The `RequestHandler` class is a JavaScript class that handles making HTTP requests using Axios with
customizable headers, timeout, and response type. */
class RequestHandler {
  constructor(url, headers = {}, timeout = 0, responseType = 'json') {
    this.axiosInstance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: timeout,
      responseType: responseType
    });
  }

  async post(url, data, headers = {}) {
    try {
      const response = await this.axiosInstance.post(url, data, {
        headers: {
          ...headers
        }
      });
      return response;
    } catch (error) {
      console.error('Error making POST request:', error.message);
      return error.response.data;
    }
  }

  async get(url, params = {}, headers = {}) {
    try {
      const response = await this.axiosInstance.get(url, {
        params,
        headers: {
          ...headers
        }
      });
      return response;
    } catch (error) {
      console.error('Error making GET request:', error.message);
      return error.response.data;
    }
  }
  async put(url, data, headers = {}) {
    try {
      const response = await this.axiosInstance.put(url, data, {
        headers: {
          ...headers
        }
      });
      return response;
    } catch (error) {
      console.error('Error making PUT request:', error.message);
      return error.response.data;
    }
  }
}

export default RequestHandler;

// Usage example:
// const api = new RequestHandler('https://api.example.com', {
//   'Authorization': 'Bearer token123'
// }, 5000);

// // GET request example
// async function fetchUsers() {
//   try {
//     const users = await api.getRequest('/users', { page: 1 });
//     console.log('Users:', users);
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//   }
// }

// // POST request example
// async function createUser(userData) {
//   try {
//     const newUser = await api.postRequest('/users', {
//       name: userData.name,
//       email: userData.email
//     });
//     console.log('Created user:', newUser);
//   } catch (error) {
//     console.error('Failed to create user:', error);
//   }
// }
