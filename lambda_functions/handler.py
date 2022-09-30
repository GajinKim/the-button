from package import pymysql
import json

import boto3
import base64
from botocore.exceptions import ClientError

def get_secret():
    secret_name = "TheButtonDBSecret"
    region_name = "us-east-1"

    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )

    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            raise e
    else:
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            secret = base64.b64decode(get_secret_value_response['SecretBinary'])

    return json.loads(secret)  # returns the secret as dictionary

# Configuration endpoints
endpoint = "thebuttonapp-dbprimaryinstance-i49jimw6ohcf.ck4gxkbnmkf4.us-east-1.rds.amazonaws.com"
username = 'pokisimp'
password = 'ilovepokimane123'
database_name = "the_button"
bruh = get_secret()['password']

# Connection
connection = pymysql.connect(
    host=endpoint, user=username, password=password, db=database_name
)

def create_button_counter_table(event, context):
    cursor = connection.cursor()
    cursor.execute(f"CREATE TABLE `the_button`.`button_counter` (`id` INT NOT NULL, `counter` INT NOT NULL, `date` DATETIME NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE, UNIQUE INDEX `counter_UNIQUE` (`counter` ASC) VISIBLE);")
    connection.commit()
    return {"statusCode": 201, "body": bruh }
    # return {"statusCode": 201, "body": "Successfuly created button_counter table!", "username": test, "password"}