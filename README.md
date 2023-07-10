<div align="center">
  <h1>
    ✳️ required API
  </h1>

  > API for simple user authentication flow.

  <strong>🚧 Discontinued 🚧</strong>

  [![build-image]][build-url] [![coveralls-image]][coveralls-url] [![license-image]][license-url]
</div>

## 📝 Requirements

You can find the project requirements [here](https://github.com/MattZ6/required-api/tree/main/.github/requirements).

## 💡 You will need

- First, a cup of coffee ☕
- [Node JS](https://nodejs.org) installed on your host;
- [🐳 Docker](https://www.docker.com) installed on your host — with [Docker compose](https://docs.docker.com/compose/install).

## 🎉 Starting

### Clone

In order to clone the project (via HTTPS), run this command:

```bash
git clone https://github.com/MattZ6/required-api.git
```

> 💡 SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command: `git clone git@github.com:MattZ6/required-api.git`

Go to project folder:

```bash
cd required-api
```

### Dependencies

Install the project dependencies:

```bash
pnpm i
```

### Environment variables

> The project has some environment variables so that we can have dynamic settings based on the context in which it is running.

First, create a copy of `.env.example`:

```bash
cp .env.example .env
```

Then fill in the missing values in the variables:

```bash
# Authentication (👇 JWT tokens secret)
JWT_AUTH_SECRET= # (ex. G4L1NH4C0MQU14B0)

# Database connection
DATABASE_PORT= # (eg. 5432)
DATABASE_USER= # (database user)
DATABASE_PASS= # (database password)
DATABASE_NAME= # (database name)
```

> ⚠ Note that the `DATABASE_DRIVER` & `DATABASE_HOST` variables must remain with the same values (because of the docker compose configuration).

## 🔥 Running

### Start

To start the services - application and database:

```bash
pnpm docker:up
```

### Run migrations

Execute the follow command to create tables and relationships:

```bash
pnpm db:migration:create
```

### Stop

To stop the services you can run:

```bash
pnpm docker:down
```

> Remember that this will cause the services (api and database) to be removed. If you just want to "put the services to sleep", run `docker-compose stop`.

## 🧪 Tests

> 💡 At this point the application has **only unit tests**. These tests cover `use cases`, `controllers`, `decorators` and `middlewares`, focusing on the business rule. In the near future I plan to include end-to-end tests to shield the application in its total flow.

To run the unit tests, you can execute the following command:

```bash
pnpm test
```

## 🤝 Contributing

> Contributions, issues and new features are **always welcome**! You can explore them [here](https://github.com/MattZ6/required-api/issues).

Feel free to submit a new issue with a respective title and description on the the **Required API** repository. If you already found a solution to your problem, i would love to review your pull request! Have a look at our [contribution guidelines](.github/CONTRIBUTING.md) to find out about the coding standards.

## 📜 License

Released in 2022 © This project is under [MIT License](LICENSE.md).

## 👨‍🎤 Author

Made with ❤ by [Matheus Felipe Zanin](https://github.com/MattZ6).<br/>
[Get it touch](https://www.linkedin.com/in/mattz6)!


[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/MattZ6/required-api?color=303030&labelColor=232320&style=for-the-badge

[build-image]: https://img.shields.io/github/actions/workflow/status/mattz6/required-api/coverage.yml?style=for-the-badge&labelColor=232320
[build-url]: https://github.com/MattZ6/required-api/actions

[coveralls-image]: https://img.shields.io/coveralls/github/MattZ6/required-api/main?style=for-the-badge&labelColor=232320
[coveralls-url]: https://coveralls.io/github/MattZ6/required-api?branch=main
