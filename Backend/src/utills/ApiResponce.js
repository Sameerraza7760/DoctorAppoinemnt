class ApiResponce {
    constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode; // Represents the HTTP status code.
      this.data = data; // Represents the data included in the response.
      this.message = message; // Represents a message associated with the response (default is "Success").
      this.success = statusCode < 400; // Represents whether the operation was successful based on the HTTP status code.
    }
  }
  export { ApiResponce };
  