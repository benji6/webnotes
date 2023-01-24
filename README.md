# Webnotes

![CI](https://github.com/benji6/webnotes/workflows/CI/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d2dd6bbe-a459-4ff9-b4e3-33a8e0924f61/deploy-status)](https://app.netlify.com/sites/benji6-webnotes/deploys)

## About

Webnotes is a free and open source web app that lets you create and manage notes. It's simple to use, works offline and because it runs in your browser you can use it across all your devices!

[Check it out here](https://webnotes.link)

The Webnotes UI was built using a component library I made called [Eri](https://github.com/benji6/eri).

## Getting started

### Install dependencies

```sh
make init
```

### Test

```sh
make test
```

### Run

```sh
make start
```

### Deploy

#### Backend and infrastructure

Majority of the infrastructure is managed with Terraform (a few things that aren't well supported have been done manually).

```sh
make deploy
```

**N.B. making changes to the API doesn't trigger a new deployment, but you can trigger a manual deployment by copying the `deploy_api_command` Terraform output and running that.**

#### UI

Continuously deployed with [Netlify](http://netlify.com).

**N.B. because icons take a long time to generate and do not change often they are created from the master svg file by running `npm run icons` in the `/client` dir and committed to version control.**

## Acknowledgements

- Teddy for user acceptance testing
- All the awesome open source software used by this project
