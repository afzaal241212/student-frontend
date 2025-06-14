import { useState, useEffect } from 'react';
import './App.css';
import StudentList from './StudentList';

function App() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: '',
  });

  const [students, setStudents] = useState([]); // 👈 new state for student list
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ✅ Load existing students from server on first render
  useEffect(() => {
    fetch('https://student-backend-production-ca79.up.railway.app/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Error loading students:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://student-backend-production-ca79.up.railway.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });

      const data = await res.json();
      setMessage(data.message);

      // ✅ Add the new student to local list
      setStudents([...students, student]);

      setStudent({ name: '', email: '', course: '' });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>Register New Student</h2>

      {message && <div className="message-box">{message}</div>}

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

      <StudentList students={students} />
    </div>
  );
}

export default App;
