# Troubleshooting boto3
[Article](https://aws.amazon.com/blogs/security/how-to-securely-provide-database-credentials-to-lambda-functions-by-using-aws-secrets-manager/) to help setup a lambda using credentials pulled from aws secrets manager via boto3.

### How to resolve `GetSecretValue operation is not authorized` error with AWS Secrets Manager
Create a new policy and attach it to our relevant roles (lambda and app role). See [here](https://stackoverflow.com/questions/66757368/getsecretvalue-operation-is-not-authorized-error-with-aws-secrets-manager) for stackoverflow post.

1. Go to `IAM > Policies > Create policy > {Create new policty for SecretManager GetSecretValue}
2. Click newly created policy and apply to Primary Role (e.g. TheButtonApp aka `arn:aws:iam::007633048842:role/TheButtonApp`)
3. Then attach role to each Serverless Function resource
```yaml
Role: arn:aws:iam::007633048842:role/TheButtonApp
```

<!-- ![alt text](resources\getsecretvalue_operation_is_not_authorized.PNG) -->


** Not sure if I can automate this step in the cloudformation template or not.

```bash
# apparently don't need to install boto3, but keeping here for future reference
pip3 install --target ./package boto3
```

