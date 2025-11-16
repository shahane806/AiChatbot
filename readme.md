
### **Project:** AI Chatbot (Mega Project 2025)

**Description:**
An intelligent chatbot system built using machine learning and full-stack technologies, enabling interactive conversations and automated responses through a unified interface.

### **Key Modules & Responsibilities:**

1. **🧠 Machine Learning Module**

   * Implemented a **Decision Tree Classifier** using **scikit-learn** for intent recognition and response generation.
   * Designed and trained custom datasets to enhance chatbot understanding accuracy.
   * Integrated ML logic within **Django backend (views.py)** to handle user queries and model predictions dynamically.

2. **🌐 Frontend Module (React.js)**

   * Built a dynamic **Chatbot UI** using **React.js** for smooth, real-time interactions.
   * Managed app-wide state using **Redux & Redux-Thunk** for API handling and user context.
   * Integrated **custom chatbot icons** and reusable components (`chatbotUi.jsx`).

3. **⚙️ Backend API (Django + Node.js)**

   * Developed robust RESTful APIs for message exchange between frontend and ML model.
   * Used **Django** for ML logic hosting and **Node.js** for socket communication.
   * Implemented **WebSocket connections** for real-time chatbot responses.

4. **🗃️ Database & Configuration Module**

   * Managed chatbot configurations (icon, name, URLs) in the **Admin Panel**.
   * Stored and retrieved chatbot data (chat history, user info) efficiently using **MongoDB**.
   * Supported multi-chatbot integration by dynamically linking chatbot icons and names.

5. **🧩 Admin Panel Module**

   * Enabled chatbot creation through the Admin interface with custom settings:

     * `IconUrl`, `ChatBotName`, `BackendUrl`, and `FrontendUrl`.
   * Allowed easy deployment of multiple chatbots with unique ML logic.

6. **💬 Chatbot Interface (Integration Module)**

   * Connected front-end chat interface with backend ML model responses in real time.
   * Handled bidirectional message flow and dynamic UI updates using **WebSocket** and **Axios**.
   * Ensured seamless multi-chatbot rendering from the `AllApps/IconRender` component.

7. **🔐 Security & Optimization**

   * Implemented secure API endpoints and controlled admin access.
   * Optimized data exchange and minimized latency using efficient WebSocket communication.

---

## 🧾 **GitHub README (Professional Version)**

````markdown
# 🤖 MEGA PROJECT 2025: AI Chatbot  

An intelligent AI Chatbot system integrating **Machine Learning**, **React.js**, **Node.js**, and **Django** to enable real-time interactive conversations.  
This chatbot uses a **Decision Tree Classifier** model to predict user intent and respond dynamically.  

---

## 🧠 Core Technologies

| Layer | Technologies Used |
|-------|--------------------|
| **Frontend** | React.js, Redux, Redux-Thunk |
| **Backend** | Django (Python), Node.js |
| **Machine Learning** | scikit-learn (Decision Tree Classifier) |
| **Database** | MongoDB |
| **Other Tools** | WebSocket, REST API, VS Code, Postman, Git |

---

## ⚙️ Project Modules

### 1. Machine Learning (AI Logic)
- Implemented Decision Tree Classifier using scikit-learn.
- Built custom dataset and trained model for chatbot intent prediction.
- Integrated ML logic in `ai/chatbot/chatbot/views.py` for live responses.

### 2. Frontend (React.js)
- Designed **ChatBot UI** (`Components/ChatBotUi/chatbotUi.jsx`).
- Added icons from `src/Assets/ChatbotIcons/icon.png`.
- Managed app-wide state using **Redux** & **Thunk**.
- Integrated WebSocket for real-time chat communication.

### 3. Admin Panel
- Created module for new chatbot creation:
  - **IconURL:** `"../../Assets/ChatbotIcons/TSI.png"`
  - **ChatBotName:** `"TSI"`
  - **BackendUrl:** `"http://127.0.0.1:8000/"`
  - **FrontendUrl:** `"../ChatBotUI/TSI"`
- Enabled quick chatbot deployment and customization.

### 4. Backend (Django + Node.js)
- Django serves ML responses via REST APIs.
- Node.js handles WebSocket connections for live message exchange.
- Provides scalable multi-chatbot integration.

### 5. Database & Configuration
- Stored chatbot settings, user info, and message logs in **MongoDB**.
- Linked new chatbots dynamically through `AllApps → IconRender`.

---

## 🚀 Features

- Interactive chatbot interface with AI-powered responses  
- Multi-chatbot support with custom configurations  
- Real-time WebSocket-based messaging  
- Admin panel for chatbot creation and management  
- Secure API architecture with fast response handling  
- Full-stack integration between React, Node, and Django  

---

## 📂 Project Setup

```bash
# Clone repository
git clone https://github.com/yourusername/ai-chatbot-2025.git

# Frontend setup
cd frontend
npm install
npm start

# Backend setup
cd backend
pip install -r requirements.txt
python manage.py runserver

# Node WebSocket server
cd socket-server
npm install
npm run start
````

---

## 📸 Screenshots

***HappyHacking***
<p align="center">
  <img src="https://github.com/user-attachments/assets/8cc8e6d6-95e0-4be5-a128-ce9a899914b6" width="22%">
  <img src="https://github.com/user-attachments/assets/9daac0a0-4156-40db-96bd-bc7163af0dda" width="22%">
  <img src="https://github.com/user-attachments/assets/0b99bcf9-fd92-4409-8f93-a7be7a368bac" width="22%">
  <img src="https://github.com/user-attachments/assets/73a79c4f-56a4-413c-854d-dea11e8f33e2" width="22%">
  <img src="https://github.com/user-attachments/assets/06746d4a-6308-4980-821e-86b322bdea35" width="22%">
  <img src="https://github.com/user-attachments/assets/a2f3ef72-96e5-4586-8f39-53efd7d21916" width="22%">
  <img src="https://github.com/user-attachments/assets/4468cc40-1746-4832-a633-71d9dee9b14d" width="22%">
  <img src="https://github.com/user-attachments/assets/f294cec8-5e59-45df-ba71-eceea0c92903" width="22%">
  <img src="https://github.com/user-attachments/assets/140d6360-002a-4acf-aa77-f0589de7b33d" width="22%">
  <img src="https://github.com/user-attachments/assets/f2d1a252-9695-4dfe-9bb0-2aded8b8b931" width="22%">
  <img src="https://github.com/user-attachments/assets/5aee4cae-9fb7-4fdb-bc7d-15c8088454e0" width="22%">
  <img src="https://github.com/user-attachments/assets/9adb56a6-a4c4-4cc6-b8be-36b595ca2ab3" width="22%">
  <img src="https://github.com/user-attachments/assets/96519030-ba25-4f4a-b97e-20d18bfef629" width="22%">
  <img src="https://github.com/user-attachments/assets/78719dd2-6610-4d89-a2ec-72d48fbe8bae" width="22%">
  <img src="https://github.com/user-attachments/assets/9ba478cc-48c3-4b04-8396-a199c3f1e499" width="22%">
  <img src="https://github.com/user-attachments/assets/43317e31-ff9c-44a5-9ae6-f2cedc9b732e" width="22%">
  <img src="https://github.com/user-attachments/assets/277396ff-b37d-484f-8fa3-cc0904d180d1" width="22%">
  <img src="https://github.com/user-attachments/assets/e421b352-8a9f-4c6b-b805-e15db736ac85" width="22%">
  <img src="https://github.com/user-attachments/assets/6de63c2b-9514-4c4d-a63f-690aead7bd21" width="22%">
  <img src="https://github.com/user-attachments/assets/26f0be15-f52e-4927-9b4f-86595edcbf7d" width="22%">
  <img src="https://github.com/user-attachments/assets/ea7eff8b-c14d-49de-9e9f-ba560a20fd2f" width="22%">
  <img src="https://github.com/user-attachments/assets/40192ef1-59a4-4d3a-b3a4-fab1b356a4bb" width="22%">
  <img src="https://github.com/user-attachments/assets/6e030921-8745-4822-a072-0b81ca62a6db" width="22%">
  <img src="https://github.com/user-attachments/assets/e17563bf-74d6-4ede-9a96-1d0d3a53ac72" width="22%">
  <img src="https://github.com/user-attachments/assets/15b211e2-0aa3-473b-82d0-bf566d575530" width="22%">
  <img src="https://github.com/user-attachments/assets/fa2f9239-efa2-4fb4-b13d-9cbf3aaff9e9" width="22%">
  <img src="https://github.com/user-attachments/assets/50693bf7-a03e-491a-aabc-3a010f9743b7" width="22%">
  <img src="https://github.com/user-attachments/assets/4b75c3cd-5b7f-4e63-b8cc-745aea0e22cd" width="22%">
  <img src="https://github.com/user-attachments/assets/efeab750-b53e-4ff1-a4b4-a0bd7b759ccb" width="22%">
  <img src="https://github.com/user-attachments/assets/9f5df274-a72a-4cf7-8da2-bbfa5cb090a1" width="22%">
  <img src="https://github.com/user-attachments/assets/c4f6aaf7-3e8c-47b9-b880-4c4f62900ec6" width="22%">
  <img src="https://github.com/user-attachments/assets/2a9d1d74-1c08-40cb-a460-4860f756a61c" width="22%">
  <img src="https://github.com/user-attachments/assets/f6a1c7a3-b83c-46bd-b86a-ba459a509d46" width="22%">
</p>


---

## 🧑‍💻 Author

**Om Shahane**
Full Stack & AI Developer
📧 [om.p.shahane@gmail.com](mailto:om.p.shahane@gmail.com)
🌐 [LinkedIn](https://linkedin.com/in/omshahane) | [GitHub](https://github.com/shahane806)

---

