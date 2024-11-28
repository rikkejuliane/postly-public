# JavaScript 2 Course Assignment

## 2023/4 Study Plan

### Introduction

In this course assignment, you will be building a client-side social media application. This application will allow users to perform CRUD operations (Create, Read, Update, and Delete) on their own posts, as well as enable additional features such as following/unfollowing users, commenting on posts, and reacting to a post with an emoji.

Unlike previous projects, you will be working on the app logic first and styling the application later.

### Project Template

This project has been set up with a Vite template using Vanilla JavaScript settings, using MPA (Multi-page application) mode. Additional HTML pages not originally included in the project template must be listed in the `vite.config.js` file.

The template contains JavaScript files that must be finished to complete this assignment.

This project comes with some basic unit tests. They can be used to get instant feedback while developing. To run all tests write `npm run test` in your console. To only test a specific file write `npx vitest <name-of-file>`.

Example to test your login function: `npx vitest login`


### Resources

- Noroff API Documentation:  
  https://docs.noroff.dev/docs/v2/social/posts

- Noroff API Swagger:  
  https://v2.api.noroff.dev/docs/static/index.html#/social-profiles

# **FED1 Project Exam 1 - Rikke Juliane Andreassen & Nikolas Bishop**  
![Social Media App Logo](https://via.placeholder.com/600x300?text=Social+Media+App+Logo)

### **Table of Contents 📚**  
1. [Project Overview](#project-overview-🌍)  
2. [Client](#client-💼)  
3. [Key Features](#key-features-✨)  
4. [Installation](#installation-⚙️)  
5. [Usage](#usage-🛠️)  
6. [Tech Used](#tech-used-💻)  
7. [Contact Us](#contact-us-📬)  

---

## **Project Overview 🌍**  
This project is a **social media application** built as part of the **JavaScript 2 Course Assignment**. Users can create, read, update, and delete (CRUD) their posts while enjoying additional features like commenting, reacting to posts, and following other users. The app leverages the **Noroff Social Media API** and focuses on functionality and error handling over visual styling. 

The project was collaboratively developed by **Rikke Juliane Andreassen** and **Nikolas Bishop**.

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
   git clone https://github.com/YourRepoHere.git

## **Usage 🛠️**  
### User Actions:
1. **Register**:  
   Navigate to `/register.html`, fill in your details, and submit.  

2. **Login**:  
   Navigate to `/login.html`, enter your credentials, and log in.  

3. **Create Post**:  
   Navigate to `/post/new`, add post details (title, body, tags, media), and publish.  

4. **Edit or Delete Post**:  
   Access your post via `/post/:id`, then choose to update or delete it.  

5. **Follow/Unfollow**:  
   Visit a user's profile and click the "Follow" or "Unfollow" button.

---

## **Tech Used 💻**  
* **HTML, CSS, JavaScript**: Core languages for the project.  
* **Noroff Social Media API**: Backend API for all user and post interactions.  
* **LocalStorage**: For storing JWT tokens and user data.  
* **Vite**: Development environment and build tool.  
* **Netlify**: Hosting and deployment platform.

---
