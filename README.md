# Notes (notes-manager)

Website Project for Note Management with Quasar and Vue 3

This project consists of a web application developed with the Quasar framework and Vue.js 3 for efficient note management. It includes integration with a private API for enhanced functionality, offering an intuitive interface and scalable architecture. The application allows users to manage notes, authenticate with JWT, and efficiently manage sessions.

Features

    User Authentication:

    Secure login system with JWT for user authentication.

    Session management to maintain user login status.

    CRUD Functionality for Notes:

    Full create, read, update, and delete (CRUD) functionality for notes.

    Option to view, edit, and delete individual notes.

    Attachments:

    Users can attach files to notes according to the API functionality.

    The attached files are stored locally in the project's own directory for easy access and management.

    State Management with Stores:

    Use centralized state management using Pinia to manage application states, such as user authentication and notes.

    Scalable and Flexible Architecture:

    Designed with a flexible and scalable architecture to easily adapt to future extensions or feature modifications.

    Intuitive Interface:

    Modern and responsive design, developed with Quasar for a fluid user experience across all devices.

Technologies Used

    Quasar Framework: To create the user interface and ensure consistent design and performance across all platforms.
    Vue 3: For application structure and logic, offering reactivity and a component-based design.
    Pinia: For centralized state management, managing states such as authentication and note data.
    Vite: For rapid application development and packaging.
    JWT (JSON Web Tokens): For secure user authentication and session management.

## Prolibu API Base URL

This environment variable is used to securely store the base URL for your Prolibu API.

The variable is defined in the .env file, which is used to configure your project without hardcoding sensitive information.

Place the Prolibu API base URL in the following variable to use it for making API calls:

    VITE_API_BASE_URL=https://stg.prolibu.com

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### List of implemented icons

- [publicalo](https://www.flaticon.es/icono-gratis/publicalo_889648?term=notes&related_id=889648)

### list of implemented APIs

- [Prolibu-Api](https://stg.prolibu.com)
