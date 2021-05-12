CREATE USER checker WITH PASSWORD 'checkerpwd';
CREATE DATABASE chinese_checker;
GRANT ALL PRIVILEGES ON DATABASE chinese_checker TO checker;
GRANT pg_read_server_files TO checker;