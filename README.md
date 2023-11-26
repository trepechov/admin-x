# Admin X

Welcome to Admin X! This project is designed to provide a comprehensive administration interface for managing various aspects of your application. With Admin X, you can easily handle user management, data visualization, and much more.

![Screenshot](/docs/screenshot.png)

## Built with React and Vite

Admin X is built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/). React is a popular JavaScript library for building user interfaces, while Vite is a fast build tool for modern web applications.

## Plugins Used

Admin X utilizes the following plugins:

- [React Query](https://react-query.tanstack.com/): A powerful data-fetching library for managing and synchronizing server state in React applications.
- [Axios](https://axios-http.com/): A popular HTTP client library for making API requests.
- [Chakra UI](https://chakra-ui.com/): A simple and customizable component library for building React applications.
- [react-hook-form](https://react-hook-form.com/): A flexible and efficient form validation library for React.

## Mock Backend

To simulate API requests and responses, Admin X uses a mock backend. You can find the documentation for the mock backend at [https://dummyapi.io/docs/user](https://dummyapi.io/docs/user).

The backend api doesn't support phoneNumber, email and fullName so these are randomly generated

## Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/trepechov/admin-x.git
```

2. Install dependencies:

```bash
npm install
```

3. Add configuration in `config.ts` file.

4. Run the project:

```bash
npm run dev
```

# Features:

- Loads the table with users from the backend, with pagination support. (Generates missing backend data fields on the fly.)
- Provides quick filtering of results on the page (since search is not supported by the backend it only filters the current page results).
- Displays a modal for adding new users with front-end validation, handles error responses from the backend. (Phone number and email are passed to the backend, but they are not supported, so random data will be generated for these fields in the table result after refreshiing the data)
- Displays a modal for deleting users with error handling.



## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license. However, please note that this license does not provide any warranty or liability for the software. By using this project, you agree to the terms and conditions of the license.

