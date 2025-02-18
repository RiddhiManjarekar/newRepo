import React, { useState } from "react";

const Form = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    skills: "",
    email: "",
    phone: "",
    address: "",
  });

  const setDataFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", userData);
  };

  return (
    <div>
      <h1>Form in React</h1>
      <form onSubmit={submitForm}>
        <label>
          First Name:
          <input type="text" name="firstName" value={userData.firstName} onChange={setDataFunction} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={userData.lastName} onChange={setDataFunction} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={userData.age} onChange={setDataFunction} required />
        </label>
        <br />
        <label>
          Gender:
        </label>
        <label>
          <input type="radio" name="gender" value="Male" checked={userData.gender === "Male"} onChange={setDataFunction} required /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={userData.gender === "Female"} onChange={setDataFunction} required /> Female
        </label>
        <br />
        <label>
          Skills:
          <select name="skills" value={userData.skills} onChange={setDataFunction} required>
            <option value="">Select Skill</option>
            <option value="React">React</option>
            <option value="Node.js">Java</option>
            <option value="Python">Python</option>
            <option value="Java">C++</option>
          </select>
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={setDataFunction} required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="number" name="phone" value={userData.phone} onChange={setDataFunction} required />
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" value={userData.address} onChange={setDataFunction} required></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Changes occurring...</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export default Form;
