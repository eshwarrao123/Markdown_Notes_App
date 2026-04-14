# Markdown Notes App

A full-stack Markdown Notes application built using React, Node.js, Express, and SQLite.
- Frontend Deployed URL : https://markdown-notes-app-mocha-nu.vercel.app/
- Backend Deployed URL : (in progress)
#### Note : Backend deployment encountered a known SQLite compatibility issue (GLIBC mismatch) on Render. The application works fully in local setup and is demonstrated in the demo video.

## Features

* Create, edit, delete notes
* Markdown support (headings, bold, lists, code, links)
* Live split-screen preview
* Persistent storage using SQLite
* Debounced auto-save (bonus)

## Tech Stack

* Frontend: React, Axios, React-Markdown
* Backend: Node.js, Express
* Database: SQLite

## Setup Instructions

### Backend

* cd backend
* npm install
* node server.js

### Frontend

* cd frontend
* npm install
* npm start

## API Endpoints

* GET /notes
* POST /notes
* PUT /notes/:id
* DELETE /notes/:id

## Key Decisions

* Used SQLite for simplicity and quick setup
* Structured API layer separately for cleaner frontend code
* Implemented debounced auto-save to improve performance

## Demo

https://www.loom.com/share/5562f39c7c3a4e1dbd532373a8f121f6
