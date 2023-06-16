import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext'
const About = () => {
  return (
    <div>
      <h2>About</h2>
      <p>Welcome to our note-making website!</p>
      <p>Our goal is to provide you with a simple and intuitive platform to create, manage, and organize your notes. Whether you need a place to jot down your thoughts, keep track of important information, or collaborate with others, our website has you covered.</p>
      <p>Key Features:</p>
      <ul>
        <li>Create an account: Sign up and login to access your personalized note-taking experience.</li>
        <li>Create notes: Add titles, descriptions, and tags to your notes for easy organization and retrieval.</li>
        <li>Edit and delete notes: Make changes to your notes or remove them when they are no longer needed.</li>
        <li>User-friendly interface: Our website offers a clean and intuitive interface, making it easy to navigate and use.</li>
        <li>Secure and private: We prioritize the security and privacy of your data, ensuring that your notes are safe.</li>
      </ul>
      <p>Whether you're a student, professional, or simply someone who loves to stay organized, our note-making website is designed to streamline your workflow and keep your thoughts in one place.</p>
      <p>Thank you for choosing our platform, and we hope you enjoy using it!</p>
    </div>
  )
}

export default About
