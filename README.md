# caching-proxy-app

**caching-proxy-app** is a Node.js-based caching proxy server that intercepts incoming HTTP requests, forwards them to a specified origin server, and caches responses in Redis. A caching server that caches responses from other servers. By leveraging caching, the proxy reduces the load on the origin server and improves response times for subsequent requests. This project is built with modern Node.js libraries and follows best practices for configuration, error handling, and input validation. Project idea gotten from [here](https://roadmap.sh/projects/caching-server)

---

## Table of Contents

- [Features](#features)
- [Technologies & Dependencies](#technologies--dependencies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Request Forwarding:** Forwards incoming GET requests to an origin server.
- **Response Caching:** Caches responses in Redis for 1 hour to serve repeated requests faster.
- **Custom Cache Headers:** Adds an `X-Cache` header (`HIT` or `MISS`) to help identify whether the response was served from cache.
- **Command-Line Interface:** Uses Commander for CLI-based configuration, including port selection, origin URL specification, and cache clearing.
- **Input Validation:** Validates and sanitizes user inputs (port numbers and URLs) with Validator.
- **Environment Configuration:** Leverages dotenv for environment-based configuration.

---

## Technologies & Dependencies

This project makes use of the following packages:

- **[axios](https://www.npmjs.com/package/axios):** For forwarding HTTP requests to the origin server.
- **[chalk](https://www.npmjs.com/package/chalk):** For colorizing console output, which improves log readability.
- **[commander](https://www.npmjs.com/package/commander):** For building a robust command-line interface.
- **[dotenv](https://www.npmjs.com/package/dotenv):** For loading environment variables from a `.env` file.
- **[express](https://www.npmjs.com/package/express):** For creating the HTTP server and handling routing.
- **[http-status-codes](https://www.npmjs.com/package/http-status-codes):** For using standardized HTTP status codes.
- **[redis](https://www.npmjs.com/package/redis):** For connecting to a Redis instance used as the cache store.
- **[validator](https://www.npmjs.com/package/validator):** For validating and sanitizing input values (such as URLs and ports).

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/kxng0109/caching-proxy-app.git
   cd caching-proxy-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**

   Create a `.env` file in the project root to override or set environment-specific variables. For example:

   ```ini
   PORT=3000
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_USERNAME=yourusername   # optional
   REDIS_PASSWORD=yourpassword   # optional
   ```

Note: If you want to use Redis cloud, REDIS_USERNAME and REDIS_PASSWORD are needed.

---

## Configuration

The application can be configured using both command-line options and environment variables:

- **Port:**  
  Specify the port on which the caching proxy will run. The default port is `3000` if not specified via CLI or environment variable.

- **Origin URL:**  
  Provide the URL of the origin server where requests will be forwarded. The URL is validated using a custom sanitizer.

- **Clear Cache:**  
  Use the `--clear-cache` option to flush the Redis cache.

---

## Usage

Start the caching proxy using the following command:

```bash
node app.js --port 3000 --origin https://example.com
```

**Command-Line Options:**

- `-p, --port <number>`  
  The port the proxy server will run on. This option is also linked to the `PORT` environment variable. If this option isn't specified, it'll run using the `PORT` in your environment variable. If none is found, it will default in `3000`.

- `-o, --origin <url>`  
  The URL of the origin server to which requests will be forwarded. The URL is validated to ensure it follows the HTTP/HTTPS format.

- `-c, --clear-cache`  
  Clears the entire Redis cache before starting the server.

**Example:**

To start the proxy on port 3000 and forward requests to `https://dummyjson.com`:

```bash
node app.js --port 3000 --origin https://dummyjson.com
```

To clear the Redis cache:

```bash
node app.js --clear-cache
```

---

## Project Structure

```
caching-proxy-app/
├── app.js                         # Main entry point; sets up CLI options and orchestrates server start.
├── server.js                      # Starts the Express server and connects to Redis.
└── src/
    ├── services/
    │   ├── axiosService.js        # Forwards requests using Axios and caches responses in Redis.
    │   ├── expressService.js      # Configures Express routes and middleware.
    │   └── redisClient.js         # Initializes and manages the Redis client connection.
    └── utils/
        ├── checkCache.js          # Checks Redis for cached responses.
        ├── sanitizeOrigin.js      # Validates and sanitizes the origin URL.
        └── sanitizePort.js        # Validates and sanitizes the port number.
```

---

## How It Works

1. **CLI Initialization:**  
   The application uses Commander to parse CLI options (port, origin, clear-cache) and dotenv to load environment variables. Custom sanitizers ensure valid port numbers and URLs.

2. **Server & Cache Setup:**  
   The Express server (`server.js`) is started on the specified port, and a connection to Redis is established. If the `--clear-cache` option is used, the entire Redis cache is flushed.

3. **Request Handling:**  
   All incoming GET requests are handled by Express (`expressService.js`):
   - The middleware first checks Redis (via `checkCache.js`) for a cached response using the request URL as the cache key.
   - If a cached response is found, it is returned immediately with an `X-Cache: HIT` header.
   - If not, the request is forwarded to the origin server via Axios. The response is then cached in Redis for one hour and returned with an `X-Cache: MISS` header.

4. **Error Handling:**  
   The application gracefully handles errors (e.g., invalid URLs, unreachable origin servers) by logging descriptive error messages using Chalk and returning appropriate HTTP status codes.

---

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request. Before contributing, please ensure that your code adheres to the project’s coding standards and includes appropriate tests if necessary.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*For any questions or issues, please feel free to contact the project maintainer.*

---

This README should help users understand the purpose of the project, how to install and configure it, and the overall structure and workflow of the application. If you need any further modifications or additional details, please let me know!