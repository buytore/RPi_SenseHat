import os

#RDB_HOST =  os.environ.get('rpi3_1') or 'localhost'
RDB_HOST =  'rpi3_1'
RDB_PORT = os.environ.get(28015) or 28015
PROJECT_DB = 'senseHat'
PROJECT_TABLE = 'senseData'