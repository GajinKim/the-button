from package import pymysql

# Configuration endpoints
endpoint = "thebuttonapp-dbprimaryinstance-i49jimw6ohcf.ck4gxkbnmkf4.us-east-1.rds.amazonaws.com"
username = os.environ['DB_USERNAME']
password = os.environ['DB_PASSWORD']
database_name = "the_button"

# Connection
connection = pymysql.connect(
    host=endpoint, user=username, password=password, db=database_name
)