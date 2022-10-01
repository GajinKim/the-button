# Troubleshooting boto3
[Article](https://aws.amazon.com/blogs/security/how-to-securely-provide-database-credentials-to-lambda-functions-by-using-aws-secrets-manager/) to help setup a lambda using credentials pulled from aws secrets manager via boto3.

### How to resolve `GetSecretValue operation is not authorized error with AWS Secrets Manager`
Basically we need to create a new policy and attach it to our relevant roles (lambda and app role). See [here](https://stackoverflow.com/questions/66757368/getsecretvalue-operation-is-not-authorized-error-with-aws-secrets-manager) for stackoverflow post.
![alt text](resources\getsecretvalue_operation_is_not_authorized.PNG)


Remember to do this lol for next time
```bash
pip3 install --target ./package boto3
```