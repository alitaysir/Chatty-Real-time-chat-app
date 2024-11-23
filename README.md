# Real-Time Chat Application  

This is a **real-time chat application** built using the **MERN stack and socket.io**.
Real time functionality is enabled using socket.io
It allows users to chat with others seamlessly while providing a visually appealing and customizable user interface.
Project deployed on render.
---
## Live Demo  
Check out the live application [here](https://chatty-sx8k.onrender.com/).  


## Features  

### **Authentication**
- **Login/Signup:** Users can create an account or log in using their credentials.  
- Tokens are generated and stored in cookies for secure authentication.  
- Logout option to delete tokens and end the session.  

### **Home Page**
- After login/signup, users are redirected to the home page.  

### **Profile Management**
- **Profile Update:** Users can update their profile picture via the profile update page.  

### **Themes**
- A **Settings page** allows users to select from **32 themes** provided by DaisyUI to customize the app’s appearance.  

### **Chat Functionality**
- **User List:**  
  - Left section displays a list of users.  
  - A checkbox filters to show only online users.  
  - Online users have a green dot and an "online" status.  
- **Chat Component:**  
  - Opens on clicking a user from the list.  
  - Displays user details (name, online/offline status).  
  - "X" button to close the chat.  
  - Chat messages:  
    - Sent messages appear on the **right** with a timestamp and profile picture.  
    - Received messages appear on the **left**.  
  - Input options for text, images, and a send button.  
---
### **Real-Time Functionality**  
- **Socket.IO** enables real-time functionality in the application.  
- **Backend:** The `socket.io` package is used for the server.  
- **Frontend:** The `socket.io-client` package is used for the client.  
- Features implemented using real-time communication:  
  - Display online users.  
  - Live messaging between users.
---

## Tech Stack  

### **Frontend**
- **React.js**  
- **Tailwind CSS** with **DaisyUI** for UI components and themes.  
- **Zustand** for global state management.  
- **Lucide React** for icons.  

### **Backend**
- **Node.js** with **Express.js** for server-side logic.  
- **MongoDB** for database storage.  
- **Socket.IO** for real-time, bi-directional communication between the client and server.  

---
