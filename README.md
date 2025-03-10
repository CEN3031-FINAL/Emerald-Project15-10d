# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Emerald-Project15-10d (Work result)
* ### Upgraded and improved upon the student portal/home upon log in
![studentportal](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/ed44563f-c2c5-4dc1-b541-e68db61f49f0)
![studentportal2](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/8fdde2bd-98e0-4f41-bf60-ef36c5fc90bf)


* ### Student Programs Page
![programview](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/131409210/659180a8-2b1c-4089-a125-84a750dd884b)



* ### Share Program Feature
![share3](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/3d20c874-b02f-42f1-a17b-7377aa505b5f)
![share4](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/6f986aaa-43ad-4d8e-a3cf-2742ca9ffbef)
![share1](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/bc6479bb-d5d4-4f46-ad7c-787a79350acd)
![share2](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/9ffbc988-fbc7-4bf7-a4e5-8013cd6d8568)


* ### Important Content Portal
![missed](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/2386f85b-58d4-4077-9132-e2653b69779b)
![missed2](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/f6802dfd-122d-4af6-9a2a-61b86744c1a0)
![missed3](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/51fe772f-d289-4e1e-873d-7abeb974e824)


* ### Parent Sign-in and Sign-up verification
![signup](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/453c49f1-ce52-4532-a355-4310583587b2)
![signup2](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/392bf480-e79c-4252-824a-b3f9bbe33e3f)
![signin](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/6553b736-6929-46fe-bd7b-55bbeb356b8c)


* ### Student & Shared Programs List
![list](https://github.com/CEN3031-FINAL/Emerald-Project15-10d/assets/100718093/7140fe91-4f16-4a03-9747-0cea1bdde3d6)


## Updating database and server connections
### Prerequisites
- Docker and Docker Compose installed
- Current working setup of `casmm-db-dev`

### Steps to Update

1. **Pull the Latest PostgreSQL Image**
   Update the PostgreSQL image to the latest or desired version.
   `bash
   docker pull postgres:[tag]
   `
```services:
  casmm-db-dev:
    image: postgres:[tag]
```

Replace [tag] with the specific version you wish to use.

2. **Re-run Docker Compose**
  Apply the changes by running:
`docker-compose up -d`
This will recreate the casmm-db-dev container with the updated PostgreSQL image.

3. **Verify Database Initialization**
Ensure that the init_db.sh script runs correctly with the new database container to seed the database as needed.

ALWAYS REMEMBER TO BACKUP BEFORE UPDATING. 

## Update the database and STRAPI dump files in your file directory
More info can be found in the README in the [scripts](/scripts#scripts) directory

## Outstanding work
### Enhanced Student Portal
* Revamped user interface for improved user experience.
* Optimized for better navigation and accessibility.

### Student Programs Page
* Overhauled layout for easier program exploration.
* Streamlined design for enhanced user interaction

### Share Program Feature
* New feature for easy program sharing among students.
* Facilitates collaborative learning and engagement.

### Important Content Portal
* Centralized access to essential materials and announcements.
* Improved information dissemination and student engagement.

### Parent Authentication Process
* Stregthened sign-in and sign-up verification for security.
* Enhanced authentication mechanisms for parents.

## Built upon
* https://docs.strapi.io/dev-docs/quick-start
* https://drive.google.com/file/d/1K007KsVYyB-ifSdOJ0q04jBgAbkL0ksB/view
* https://stackoverflow.com/
* https://react.dev/learn
* https://www.docker.com/101-tutorial/

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit
