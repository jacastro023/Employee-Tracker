USE employeeTracker_db;

  INSERT INTO department(department) VALUES
 ("Sales"),
 ("Engineering"),
 ("Finance"),
 ("Legal");

INSERT INTO role(title, salary, department_id) VALUES
 ("Sales Lead", 100000, 1),
 ("Sales Person", 80000, 1),
 ("Lead Engineer", 150000, 2), 
 ("Software Engineer", 120000, 2),
 ("Accountant", 125000, 3),
 ("Legal Team Lead", 250000, 4),
 ("Lawyer", 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", 1, null),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, 3),
("Jose", "Castro", 2, 1),
("Nalia", "Brown", 5, null),
("Sarah", "Lourd", 6, null),
("Tom","Allen",7,7),
("Christian","Eckenroe",4,3),
("Tammer","Golal",4,3);
