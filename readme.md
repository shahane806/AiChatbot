
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
<img  width="22%" alt="image" src="https://github.com/user-attachments/assets/72ce5bea-c48b-4f10-b939-968d5204fb43" />
<img  width="22%" alt="image" src="https://github.com/user-attachments/assets/d381ac25-0284-4637-8abf-35b83e2f9db0" />
<img width="22%"  alt="image" src="https://github.com/user-attachments/assets/c7f9aaef-5548-4117-b842-a3148513d262" />

<img  width="22%"  alt="image" src="https://github.com/user-attachments/assets/dce22894-9b44-41de-8af0-166f96cdec58" />


---

## 🧑‍💻 Author

**Om Shahane**
Full Stack & AI Developer
📧 [om.p.shahane@gmail.com](mailto:om.p.shahane@gmail.com)
🌐 [LinkedIn](https://linkedin.com/in/omshahane) | [GitHub](https://github.com/shahane806)

---

