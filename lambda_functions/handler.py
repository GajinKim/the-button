from package import pymysql
from urllib.request import urlopen
import boto3
import json
from botocore.exceptions import ClientError

# connection configurations
endpoint = "thebutton-dbprimaryinstance-86e1a6iuvxho.ck4gxkbnmkf4.us-east-1.rds.amazonaws.com"
username = 'notapokisimp'
password = None
database_name = "the_button"

secret_name = "arn:aws:secretsmanager:us-east-1:007633048842:secret:TheButtonSecrets-HgAPc3"
region_name = "us-east-1"
connection = None

def open_connection():
    global connection
    password = "None"

    # Create a Secrets Manager client
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
            j = json.loads(secret)
            password = j['password']
        else:
            decoded_binary_secret = base64.b64decode(get_secret_value_response['SecretBinary'])
            password = decoded_binary_secret.password

    try:
        if (connection is None):
            connection = pymysql.connect(host=endpoint, user=username, password=password, db=database_name, connect_timeout=5)
        elif (not connection.open):
            connection = pymysql.connect(host=endpoint, user=username, password=password, db=database_name, connect_timeout=5)
    except Exception as e:
        raise e

# def country_information():
#     # declare your IP Address here
#     ip_address = "127.0.0.1"

#     # get your token from IPinfo's account dashboard
#     token = ""

#     # create the url for the API, using f-string
#     url = f"https://www.ipinfo.io/{ip_address}?token={token}"

#     # call the API and save the response
#     with urlopen(url) as response:
#         response_content = response.read()

#     # parsing the response 
#     data = json.loads(response_content)

#     print(data)

def create_button_counter_table(event, context):
    try:
        open_connection()
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE TABLE `the_button`.`button_counter` (`id` INT NOT NULL AUTO_INCREMENT, `buton_color` VARCHAR(255) NULL, `ip_address` VARCHAR(255) NULL, `country` VARCHAR(255) NULL, `date` DATETIME NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);")
            connection.commit()
    except Exception as e:
        print(e)
    finally:
        if (connection is not None and connection.open):
            connection.close()
    response = { "statusCode": 201, "body": "Successfuly created button_counter table!" }
    return response

# def delete_button_counter_table(event, context):
#     try:
#         open_connection()
#         cursor = connection.cursor()
#         cursor.execute(f"DROP TABLE `the_button`.`button_counter`;")
#         connection.commit()
#     except Exception as e:
#         print(e)
#     finally:
#         if (connection is not None and connection.open):
#             connection.close()
#     response = { "statusCode": 202, "body": "Successfuly deleted button_counter table!" }
#     return response

# def insert_click_button_counter_table(event,context):
#     try:
#         open_connection()
#         cursor = connection.cursor()
#         cursor.execute(f"INSERT INTO `the_button`.`button_counter` (`buton_color`, `ip_address`, `country`, `date`) VALUES ('GREEN', '8.8.8.8', 'TEST', '9999-12-31 23:59:59');")
#         connection.commit()
#     except Exception as e:
#         print(e)
#     finally:
#         if (connection is not None and connection.open):
#             connection.close()
#     response = { "statusCode": 203, "body": "Successfuly inserted row into button_counter table!" }
#     return response