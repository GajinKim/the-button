# Troubleshooting boto3
[Article](https://aws.amazon.com/blogs/security/how-to-securely-provide-database-credentials-to-lambda-functions-by-using-aws-secrets-manager/) to help setup a lambda using credentials pulled from aws secrets manager via boto3.

### How to resolve `GetSecretValue operation is not authorized` error with AWS Secrets Manager
Create a new policy and attach it to our relevant roles (lambda and app role). See [here](https://stackoverflow.com/questions/66757368/getsecretvalue-operation-is-not-authorized-error-with-aws-secrets-manager) for stackoverflow post.

1. Go to `IAM > Policies > Create policy > {Create new policy for SecretManager GetSecretValue}
    1. Call it `SecretManagerFullRead`
2. Create a new IAM role for Lambdas called "{Name of App} + Lambda" (e.g. TheButtonAppLambda)
    1. Should have two roles `SecretManagerFullRead` and `AWSLambdaBasicExecutionRole`
3. Attach newly created role to each Serverless Function resource
```yaml
Role: arn:aws:iam::007633048842:role/TheButtonAppLambda
```

<!-- ![alt text](resources\getsecretvalue_operation_is_not_authorized.PNG) -->


** Not sure if I can automate this step in the cloudformation template or not.

```bash
# apparently don't need to install boto3, but keeping here for future reference
pip3 install --target ./package boto3
```

