🏥 Patient & Visit Management System
A full-stack CRUD application for managing patients and their medical visits, built with:

Frontend: Angular

Backend: NestJS

Database: MongoDB

📁 Project Structure


project-root/
├── frontend/      # Angular Frontend
└── backend/       # NestJS Backend (API)

✅ Prerequisites
Ensure you have the following tools installed:

Node.js (v18 or higher)

Angular CLI

NestJS CLI

MongoDB

npm

📥 Clone the Repository

git clone https://github.com/GlennOliva/Oliva-GlennAngelo-finalehealth-sd-test.git
cd Oliva-GlennAngelo-finalehealth-sd-test or cd patient-visit-management

🔧 Install Dependencies
Backend (NestJS)

cd backend
npm install

Frontend (Angular)

cd ../frontend
npm install

🚀 Start the Application
Start Backend (NestJS)

cd backend
npm run start
Backend runs at: http://localhost:3000

Start Frontend (Angular)

cd ../frontend
ng serve
Frontend runs at: http://localhost:4200

🌐 Environment Setup
Backend .env
In the backend/ folder, create a .env file:

env

MONGO_URI=mongodb+srv://root:admin123@cluster-1.5q1cit5.mongodb.net/patient_db?retryWrites=true&w=majority

Frontend environment.ts
In frontend/src/environments/environment.ts:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/'
};


✨ Features
✅ Add / Edit / Delete Patients

✅ Add / Edit / Delete Visits per Patient

📊 View total visits per patient (summary view)

✔️ Form validation with error handling

🔔 Toast notifications (for success messages)

📝 Notes
Backend uses Mongoose and class-validator for schema validation.

Frontend uses Reactive Forms for managing and validating form state.

Data is persisted using MongoDB Atlas or your local MongoDB setup.

👤 Author
Glenn Angelo Oliva
GitHub: @GlennOliva
