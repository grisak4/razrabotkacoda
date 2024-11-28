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
    const [editMode, setEditMode] = useState(false); // Режим редактирования
    const [editId, setEditId] = useState(null); // ID редактируемого сотрудника

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://localhost:8080/employees");
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
        const url = editMode ? `http://localhost:8080/employees/${editId}` : "http://localhost:8080/employees";
        const method = editMode ? "PUT" : "POST";
    
        const formattedHireDate = formData.HireDate
            ? new Date(formData.HireDate).toISOString()
            : "0001-01-01T00:00:00Z"; // Установка формата ISO или значения по умолчанию
    
        const dataToSend = {
            ...formData,
            HireDate: formattedHireDate,
            Salary: parseFloat(formData.Salary), // Преобразуем строку в float
        };
    
        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
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
                setEditMode(false);
                setEditId(null);
            } else {
                console.error("Failed to process employee");
            }
        } catch (error) {
            console.error("Error processing employee:", error);
        }
    };

    const handleEdit = (employee) => {
        setFormData({
            Name: employee.name || '',
            Position: employee.position || '',
            HireDate: employee.hire_date || '',
            Salary: employee.salary || '',
            Status: employee.status || 'active',
            Login: employee.login || '',
            Password: employee.password, // Пароль пустой для безопасности
            Role: employee.role || ''
        });
        setEditId(employee.id);
        setEditMode(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить сотрудника?")) {
            try {
                const response = await fetch(`http://localhost:8080/employees/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    fetchEmployees();
                } else {
                    console.error("Failed to delete employee");
                }
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
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
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
    {employees.length > 0 ? (
        employees.map((employee) => (
            <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                <td>{employee.salary ? employee.salary.toFixed(2) : "0.00"}</td>
                <td>{employee.status}</td>
                <td>{employee.login}</td>
                <td>{employee.role}</td>
                <td>
                    <button onClick={() => handleEdit(employee)}>Редактировать</button>
                    <button onClick={() => handleDelete(employee.id)}>Удалить</button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="9">Сотрудники не найдены.</td>
        </tr>
    )}
</tbody>

                </table>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" name="Name" value={formData.Name || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Должность</label>
                        <input type="text" name="Position" value={formData.Position || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Дата найма</label>
                        <input type="date" name="HireDate" value={formData.HireDate || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Зарплата</label>
                        <input type="number" name="Salary" value={formData.Salary || ''} onChange={handleInputChange} step="0.01" required />
                    </div>
                    <div className="form-group">
                        <label>Статус</label>
                        <select name="Status" value={formData.Status || 'active'} onChange={handleInputChange}>
                            <option value="active">Активный</option>
                            <option value="inactive">Неактивный</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" name="Login" value={formData.Login || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" name="Password" value={formData.Password || ''} onChange={handleInputChange} required={!editMode} />
                    </div>
                    <div className="form-group">
                        <label>Роль</label>
                        <select name="Role" value={formData.Role || ''} onChange={handleInputChange} required>
                            <option value="">Выберите роль</option>
                            <option value="admin">Администратор</option>
                            <option value="user">Пользователь</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="submit">{editMode ? "Сохранить" : "Добавить"}</button>
                        <button type="button" onClick={() => {
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
                            setEditMode(false);
                            setEditId(null);
                        }}>
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
