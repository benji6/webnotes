# Webnotes

## What?

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

## Acknowledgements

- Teddy for user acceptance testing
- All the awesome open source software used by this project
