# Task-DashBoard-Emitrr


Here’s a detailed `README.md` file you can include in your project. It summarizes the structure, purpose, features, and implementation of your Task Board App, particularly focusing on the `BoardView` and `BoardDetail` modules.

---

````markdown
# 🧠 Task Board App (Kanban Style Task Manager)

A modern, responsive, and draggable Kanban-style task management tool built using **React**, **Zustand**, **Tailwind CSS**, and **@hello-pangea/dnd**.

This app allows users to create multiple boards, add customizable columns, and manage tasks with drag-and-drop functionality — mimicking a Trello-like interface with full control over the UI and local state management.

---

## 🔧 Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Drag & Drop:** @hello-pangea/dnd
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Rich Text Editing:** Custom TinyMCE/Quill wrapper (RichTextEditor)

---

## 🚀 Features

### ✅ Board View (`BoardView.tsx`)
- 📋 Create new task boards
- 📃 View all existing boards (most recent on top)
- 🗑️ Delete any board
- 🔀 Navigates to detailed board page on click
- 💄 Polished UI with animations and responsive flex layout
- 🧠 State handled using `zustand` global store (`boardStore`)
- 🧼 Includes custom `Header` and animated `FooterNote`

### ✅ Board Detail (`BoardDetail.tsx`)
- 📚 View and manage individual boards
- 🧱 Add new columns
- ✏️ Edit or delete column titles
- 🪄 Drag and drop tasks within and across columns
- 📋 Rich-text task description editing
- 🗂 Paginate tasks (5 per column view)
- 🗓 Assign due dates and mark priority levels
- 🔄 Instant updates with Zustand global store
- 📦 Columns rendered in reverse (newest leftmost)
- 🎨 Styled for UX clarity with hover shadows, transitions, and priority indicators

---

## 🧠 Zustand Store Structure

### `boardStore.ts`
Manages:
- Boards (CRUD)
- Columns within a board
- Tasks within columns
- Task reordering and movement across columns

### `uiStore.ts`
Manages:
- UI preferences like board visibility (useful for conditional rendering in headers)

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/ashugh12/Task-DashBoard-Emitrr.git
cd task-board-app
npm install
npm run dev
````

---

## 🖼 Sample Screens

* ✅ Board List with Delete / Navigate options
* ✅ Responsive column view with scroll
* ✅ Drag-and-drop interactive task cards
* ✅ Rich task editing with description, assignment, due date, and priority

---

## 📂 Directory Structure

```
src/
├── assets/
│   └── BoardView.mp4
├── components/
│   └── RichTextEditor.tsx
├── pages/
│   ├── BoardView.tsx
│   ├── BoardDetail.tsx
│   ├── HeaderPage.tsx
│   └── FooterPage.tsx
├── store/
│   ├── boardStore.ts
│   └── uiStore.ts
```

---

## ✍️ Author

**Ashutosh Mishra**
Made with ❤️ — [LinkedIn](https://linkedin.com/in/ashutosh-mishra) | [Portfolio](https://your-portfolio-link.com)

---

## 📌 Future Improvements

* [ ] Drag to reorder columns
* [ ] Backend syncing (Firebase or Supabase)
* [ ] Multi-user collaboration
* [ ] Dark mode toggle
* [ ] Mobile responsiveness improvements

---
