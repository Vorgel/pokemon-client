# Pokémon Client

A modern frontend application built with **React + Tailwind CSS** for exploring, filtering, and viewing Pokémon data.

This project is powered by the backend API available at:  
[https://github.com/Vorgel/pokemon-api](https://github.com/Vorgel/pokemon-api) — a **.NET 8** Web API that serves as the data source.

---

## Features

- Paginated and sortable Pokémon list
- Search and filter by name, number, type, move, generation
- Pokémon detail modal with stats, abilities, types, moves, and evolution info
- Dashboard with Pokémon counts per type and generation
- Responsive layout and elegant UI with Flowbite components

---

## Tech Stack

- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/) – UI component library
- [Axios](https://axios-http.com/) – HTTP client
- [React Router v6](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/) – notifications

---

## Requirements

- Node.js v18+
- npm or yarn
- Running instance of [`pokemon-api`](https://github.com/Vorgel/pokemon-api)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will run at:  
`http://localhost:3000`

---

## Project Structure

```
pokemon--client/
├── public/
├── src/
│   ├── api/                # Axios wrappers for API communication
│   ├── components/         # UI components like modals, summaries, tables
│   ├── pages/              # List page and detail modal logic
│   ├── models/             # TypeScript models/interfaces
│   ├── index.tsx
│   └── App.tsx
├── .env                    # (git-ignored)
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Main Dependencies

- `react`, `react-dom`, `react-router-dom`
- `axios`
- `tailwindcss`, `@tailwindcss/cli`, `autoprefixer`, `postcss`
- `flowbite`, `flowbite-react`
- `react-toastify`
- `react-icons`

---

## License

MIT
