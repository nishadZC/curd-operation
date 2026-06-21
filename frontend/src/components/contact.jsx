import React, { useState } from 'react';
import axios from 'axios';
import './main-css/contact.css'; 
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/contact`, formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <p>If you have any questions or just want to say hello, feel free to reach out!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" rows="5" placeholder="Describe kind of service" value={formData.message} onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
