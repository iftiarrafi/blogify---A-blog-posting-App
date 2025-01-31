## Introduction
This is a full-stack blog posting application built with **Laravel** for the backend and **React (Vite)** for the frontend. It allows users to create, read, update, and delete blog posts with image integration.

## Features
- User authentication (Login & Register)
- Create, edit, and delete blog posts
- Image integration using dynamic URLs
- Responsive and modern UI

## Tech Stack
### Backend:
- Laravel (PHP framework)
- MySQL (Database)
- RESTful API

### Frontend:
- React (Vite)
- Tailwind CSS
- Axios for API requests

## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend Setup (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
- Configure the `.env` file with database credentials.
- Run migrations:
```bash
php artisan migrate
```
- Start the Laravel server:
```bash
php artisan serve
```

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
```
- Start the React development server:
```bash
npm run dev
```

## API Endpoints
| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | /api/blogs     | Fetch all blogs     |
| POST   | /api/blogs     | Create a new blog   |
| PUT    | /api/blogs/{id} | Update a blog       |
| DELETE | /api/blogs/{id} | Delete a blog       |

## Image Integration
Images are dynamically generated using **Picsum.photos**. The blog images use the following format:
```bash
https://picsum.photos/seed/{blog_id}/200/300
```
This ensures that each blog post gets a unique and persistent random image.

## Deployment
### Backend:
- Deploy Laravel on **Heroku/Vercel/Railway** or any PHP hosting.
- Set up environment variables.

### Frontend:
- Deploy React on **Vercel/Netlify**.
- Update `VITE_API_BASE_URL` in `.env`.

## Contributing
Feel free to submit pull requests. Contributions are welcome!

## License
This project is open-source and available under the [MIT License](LICENSE).


