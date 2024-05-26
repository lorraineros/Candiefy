import { useState } from 'react';
import './styles.css';

export const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        alert('Form submitted successfully!');
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="about-page">
      <div className="about-info">
        <h1>About Candiefy</h1>
        <p>At Candiefy, we're passionate about bringing joy to your taste buds with our delightful selection of candies. Our journey began with a simple love for sweets and a desire to share that happiness with others.</p>
        <p>Candiefy was born out of a shared love for candies and a vision to create a place where everyone could find their favorite treats. Whether it's nostalgic classics or innovative flavors, we believe that every candy tells a story and brings people together.</p>
        <p>We'd love to hear from you! Have a question or feedback? Feel free to reach out to us. Your satisfaction is our top priority, and we're here to ensure your Candiefy experience is nothing short of amazing.</p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && <span className="error">{formErrors.message}</span>}
          </div>
          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};
