DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE department(
 id INT NOT NULL AUTO_INCREMENT,
 department VARCHAR(30),
 PRIMARY KEY (id)
);

CREATE TABLE role(
 id INT NOT NULL AUTO_INCREMENT,
 title VARCHAR(30),
 salary DECIMAL(10,4) NOT NULL,
 department_id INT NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE employee(
employee_id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT DEFAULT NULL,
PRIMARY KEY (employee_id)
);