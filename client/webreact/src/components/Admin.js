import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Admin.css'; // Importing the CSS file

function Home() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleApiTable = async () => {
        try {
            const response = await fetch("http://localhost:8080/employeestable");
            const data = await response.json();
            setEmployees(data); // Assuming the data is an array of employees
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        handleApiTable(); // Fetch data on component mount
    }, []);

    return (
        <div>
            <div className="greetings">
                <div className="greetings-text">
                    Добро пожаловать!
                </div>
            </div>
            <div className="tablebase">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Должность</th>
                            <th>Дата найма</th>
                            <th>Зарплата</th>
                            <th>Статус</th>
                            <th>Логин</th>
                            <th>Роль</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.ID}>
                                <td>{employee.ID}</td>
                                <td>{employee.Name}</td>
                                <td>{employee.Position}</td>
                                <td>{employee.HireDate}</td>
                                <td>{employee.Salary.toFixed(2)}</td>
                                <td>{employee.Status}</td>
                                <td>{employee.Login}</td>
                                <td>{employee.Role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="button-logout">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;
