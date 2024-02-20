import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";

const ContactUs = () => {
  const contactOptions = ["Conatact", "Suggestion", "Report"];
  const [formData, setFormData] = useState({
    subject: "",
    contact: "",
    message: "",
    fullName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? Math.max(0, value) : value,
    }));
  };



  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
  }

  return (
    <>
      <StudentNavbar />
      <div className="add-que-container">
        <h2 className="gradient-underline">Contact Us</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="add-que">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subejct"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="add-que">
            <label htmlFor="contact">Contact</label>
            <select
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Select a reason to contact"
            >
              {contactOptions.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="add-que">
            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Write you message here.."
            />
          </div>
          <div className="add-que">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="add-que">
            <label htmlFor="email">Email(optional)</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="add-que">
            <button type="submit" className="submit">
              Submit Your Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
