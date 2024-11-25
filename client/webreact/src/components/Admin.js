import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Admin.css';

function Home() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Position: '',
        HireDate: '',
        Salary: '',
        Status: 'active',
        Login: '',
        Password: '',
        Role: ''
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8080/employeestable");
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                fetchEmployees();
                setFormData({
                    Name: '',
                    Position: '',
                    HireDate: '',
                    Salary: '',
                    Status: 'active',
                    Login: '',
                    Password: '',
                    Role: ''
                });
            } else {
                console.error("Failed to add employee");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="body-admin">
            <div className="greetings">
                <div className="greetings-text">Добро пожаловать!</div>
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
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Должность</label>
                        <input type="text" name="Position" value={formData.Position} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Дата найма</label>
                        <input type="date" name="HireDate" value={formData.HireDate} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Зарплата</label>
                        <input type="number" name="Salary" value={formData.Salary} onChange={handleInputChange} step="0.01" required />
                    </div>
                    <div className="form-group">
                        <label>Статус</label>
                        <select name="Status" value={formData.Status} onChange={handleInputChange}>
                            <option value="active">Активный</option>
                            <option value="inactive">Неактивный</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" name="Login" value={formData.Login} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" name="Password" value={formData.Password} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Роль</label>
                        <select name="Role" value={formData.Role} onChange={handleInputChange} required>
                            <option value="">Выберите роль</option>
                            <option value="admin">Администратор</option>
                            <option value="user">Пользователь</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Добавить</button>
                        <button type="button" onClick={() => setFormData({
                            Name: '',
                            Position: '',
                            HireDate: '',
                            Salary: '',
                            Status: 'active',
                            Login: '',
                            Password: '',
                            Role: ''
                        })}>
                            Очистить
                        </button>
                    </div>
                </form>
            </div>
            <div className="button-logout">
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
}

export default Home;
