# curd-operation
CRUD operation using MERN stack

# To run frontend docker
- Go to frontend directory
- sudo docker build -t frontend .
- sudo docker run --rm -p 8080:80 frontend

# To run backend docker
- Go to back-end folder
- sudo docker build -t back-end .
- sudo docker run --rm -p 3001:3001 -e MONGODB_URI=mongodb+srv://vn07244_db_user:OMAqyd5PnOt7Ddbx@cluster0.mfjfyb8.mongodb.net/EventManagement backend

# To see container running status
- docker ps 

# Use Docker compose to run everything at once
- sudo docker compose down
- sudo docker compose up --build