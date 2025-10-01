# **CA JS2 - Rikke Juliane Andreassen & Nikolas Bishop**  


### **Table of Contents 📚**  
1. [Project Overview](#project-overview-🌍)   
3. [Key Features](#key-features-✨)  
4. [Installation](#installation-⚙️)  
5. [Usage](#usage-🛠️)  
6. [Tech Used](#tech-used-💻)
7. [Other](#other-💡)

---

## **Project Overview 🌍**  
This project is a **social media application** built as part of the **JavaScript 2 Course Assignment**. Users can create, read, update, and delete (CRUD) their posts while enjoying additional features like commenting, reacting to posts, and following other users. The app leverages the **Noroff Social Media API** and focuses on functionality and error handling over visual styling. 

The project was collaboratively developed by [**Rikke Juliane Andreassen**](https://github.com/rikkejuliane) and [**Nikolas Bishop**](https://github.com/Niksubishi).

[Link to live site🌸](https://js2-ca-rikkejuliane.netlify.app/)

---

## **Key Features ✨**  
1. **User Authentication**:  
   - Users can **register** and **log in** using email and password.  
   - JWT-based authentication ensures secure access to user-specific actions.  

2. **Post Management**:  
   - Users can create, edit, delete, and view posts.  
   - Posts display title, body, tags, media, and comments.  

3. **Social Features**:  
   - **Follow/Unfollow** users to curate a personalized feed.  
   - **React** to posts with emojis and leave comments.  

4. **Error Handling**:  
   - Graceful error handling ensures users are informed of issues (e.g., invalid credentials, failed network requests).  

5. **Search and Filter**:  
   - Search for posts or filter them by tags to find specific content easily.  

6. **Accessibility**:  
   - Semantic HTML and accessible forms ensure compatibility with assistive technologies.  

---

## **Installation ⚙️**  
### Steps to Set Up the Project Locally:
1. Clone the repository:
   ```bash
   git clone (https://github.com/NoroffFEU/js2-ca-rikkejuliane.git)

2. Install dependencies:  
   ```bash
   npm install

3. Run the development server:  
   ```bash
   npm run dev

## **Usage 🛠️**  
- **Register**: `/auth/register`
- **Login**: `/auth/login`
- **Create Post**: `/post/create`
- **Edit Post**: `/post/edit/:id`
- **Delete Post**: Accessible from post view
- **View Posts**: `/post/:id`
- **Logout**: Clears token from local storage

---

## **Tech Used 💻**  
* **HTML, CSS, JavaScript**: Core languages for the project.  
* **Noroff Social Media API**: Backend API for all user and post interactions.  
* **LocalStorage**: For storing JWT tokens and user data.  
* **Vite**: Development environment and build tool.  
* **Netlify**: Hosting and deployment platform.

---

## **Other 💡**    

You must create a user with "@stud.noroff.no" to succesfully create a new user and log in!

---
