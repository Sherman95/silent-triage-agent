# 🛡️ SILENT TRIAGE: Zero-Chat Incident Response Protocol

> **Submission for Algolia Agent Studio Challenge: Consumer-Facing Non-Conversational Experiences**

![Silent Triage Demo](https://via.placeholder.com/800x400.png?text=Add+Your+Screenshot+Here)
*(Replace this link with a real screenshot of your UI)*

## 🚨 The Problem
When a **P0 Incident** strikes at 3:00 AM, SREs and DevOps engineers don't have time to chat with a bot. 
They don't want to say "Hello", "Please help", or navigate through "How can I assist you?" menus.
**They need a deterministic input/output machine.**

## ⚡ The Solution
**Silent Triage** is a tactical "War Room" interface that bypasses conversational friction.
It transforms raw error logs into actionable, enterprise-grade intelligence in milliseconds.

**No Chat. No Prompting. Just Resolution.**

## 🛠️ Tech Stack & Features

### 🧠 Core Intelligence
* **Algolia Agent Studio:** Powered by NeuralSearch to retrieve and reason over incident history (`incident_history` index).
* **RAG (Retrieval-Augmented Generation):** Grounds answers in truth, citing specific past incidents (e.g., `INC-001`) to prevent hallucinations.

### 🛡️ Tactical Frontend (React + Vite)
* **Cyberpunk HUD UI:** Dark/Light modes for high-contrast visibility in low-light NOC environments.
* **Client-Side Telemetry:** Real-time Regex extraction of IPs, Error Codes (HTTP 500, 0x...), and File Paths *before* submission.

### 📋 Compliance & Automation
* **One-Click Report:** Auto-generates an official **PDF Audit Report** using `jspdf`.
* **Jira Ready:** Formats analysis into Jira/Textile syntax for instant ticketing.

## 🚀 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone [https://github.com/TU_USUARIO/silent-triage-agent.git](https://github.com/TU_USUARIO/silent-triage-agent.git)
