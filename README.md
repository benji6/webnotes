# Webnotes

## About

Webnotes is a free app that lets you create and manage notes. It's simple to use and because it runs in your browser you can use it across all your devices!

[Check it out here](https://webnotes.link)

## Deploying

### Backend and infrastructure

```sh
cd terraform
terraform apply
```

**N.B. making changes to the API doesn't trigger a new deployment, but you can trigger a manual deployment by copying the `deploy_api_command` terraform output and running that.**

```sh
aws apigateway create-deployment --rest-api-id a6zs5gaxx6 --stage-name prod
```

### UI

```sh
cd client
yarn deploy
```

**N.B. because icons take a long time to generate and do not change often they are created from the master svg file by running `yarn icons` in the `/client` dir and committed to version control.**

## Acknowledgements

- Teddy for user acceptance testing
- All the awesome open source software used by this project
