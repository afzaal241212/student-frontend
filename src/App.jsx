import { useState } from 'react';
import './App.css';
import StudentList from './StudentList';

function App() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
  });

  const [refreshList, setRefreshList] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'https://student-backend-production-ca79.up.railway.app/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        }
      );

      const data = await res.json();
      alert(data.message);
      setStudent({ name: '', email: '', course: '' });
      setRefreshList(!refreshList);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Full Name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <StudentList refresh={refreshList} />
    </div>
  );
}

export default App;
