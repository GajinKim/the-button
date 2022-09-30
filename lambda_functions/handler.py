from package import pymysql
import os

# Configuration endpoints
endpoint = "thebuttonapp-dbprimaryinstance-i49jimw6ohcf.ck4gxkbnmkf4.us-east-1.rds.amazonaws.com"
username = os.environ['DB_USERNAME']
password = os.environ['DB_PASSWORD']
database_name = "the_button"

# Connection
connection = pymysql.connect(
    host=endpoint, user=username, password=password, db=database_name
)

def create_button_counter_table(event, context):
    cursor = connection.cursor()
    cursor.execute(f"CREATE TABLE `the_button`.`button_counter` (`id` INT NOT NULL, `counter` INT NOT NULL, `date` DATETIME NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE, UNIQUE INDEX `counter_UNIQUE` (`counter` ASC) VISIBLE);")
    connection.commit()
    return {"statusCode": 201, "body": "Successfuly created button_counter table!"}