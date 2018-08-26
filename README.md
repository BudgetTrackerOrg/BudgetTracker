# BudgetTracker

## Dev Env Setup
**Requires Python 2 to be [installed](https://www.python.org/downloads/release/python-2715/)
### Firebase Config files

Download 'google-services.json' from firebase console, and place in the following location:

- `./android/app/<here>`
- `./android/src/main/<here>`

Download 'GoogleService-Info.plist' from firebase console, and place in the following location:
- `./ios/<here>`

### Generate .env file

Run `npm run genenv`

Get the Web API key from firebase and place the api key in the .env file

## Practices to follow:

-   **NEVER** format code, this can cause unnecessary conflicts in commits

-   **ALWAYS** use the `--save` or `--save-dev` when adding new _node_modules_

-   **NEVER** commit directly to master, make a branch and a pull request for your commits

-   **ALWAYS** have another developer code review your _file changes_, **NEVER** use your administrative privileges to _approve_ pull requests

-   Branches should be _feature_ based
