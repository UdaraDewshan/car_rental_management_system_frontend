# 🚗 UdaraDirect.Car - Enterprise Fleet Management System

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-21-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**UdaraDirect.Car** is a premium, full-stack vehicle rental solution engineered for high-performance fleet operations. Built with a robust **Spring Boot** micro-service architecture and a sleek, reactive **TypeScript** frontend, this system streamlines the entire rental lifecycle from vehicle onboarding to intelligent driver assignment.

---

## 🚀 System Architecture & Logic

This project isn't just about CRUD. It implements sophisticated business logic:
* **Driver Availability Engine:** Automated state management. Drivers are automatically marked as `Busy` when assigned to a booking and returned to `Free` state upon booking completion or rejection.
* **Real-time Revenue Analytics:** Dynamic calculation of business health metrics directly from the persistence layer.
* **Secure API Layer:** Stateless authentication using JWT (JSON Web Tokens).

---

## ✨ Key Features

### 🛠 Admin Dashboard (The Control Center)
* **Live Metrics:** Interactive charts (Bar Charts) visualizing fleet distribution by fuel type and total revenue.
* **Intelligent Booking Workflow:** Seamless approval process with automated driver selection dropdowns.
* **Inventory Control:** Comprehensive vehicle management with live preview cards and image URL validation.
* **User/Customer Management:** Searchable database of all registered clients.
* **Driver Onboarding:** Manage a dedicated driver pool with contact and license tracking.

### 👤 Customer Experience
* **Interactive Fleet Gallery:** High-end UI with dark mode support for browsing vehicles.
* **Smart Booking Engine:** Real-time price calculation based on rental duration and driver requirements (LKR 2,500/day driver fee).
* **Personal Dashboard:** Track booking statuses (Pending ➔ Approved ➔ Completed) in real-time.

---

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (v21), TypeScript, Tailwind CSS, Heroicons |
| **Backend** | Spring Boot 3, Java 17, Spring Security (JWT) |
| **Data** | MySQL, Spring Data JPA, Hibernate |
| **Tools** | SweetAlert2 (UX), Recharts (Data Viz), ModelMapper, Lombok |

---

## ⚙️ Installation & Setup

### Backend (Spring Boot)
1. Navigate to the `backend` directory.
2. Configure your MySQL credentials in `src/main/resources/application.properties`.
3. Build and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
