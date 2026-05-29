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
- sudo docker compose -f /homevboxuser/task/crud-operation/docker-compose up -d --build

# To push in docker hub (registry)
# frontend
- sudo docker build -t nishadzc/curd-operation-frontend:latest ./frontend
- sudo docker push nishadzc/curd-operation-frontend:latest
# backend
- sudo docker build -t nishadzc/curd-operation-backend:latest ./back-end
- sudo docker push nishadzc/curd-operation-backend:latest 
