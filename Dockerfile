# Use Python base image
FROM python:3.9

# Set working directory inside the container
WORKDIR /app

# Copy everything into the container (including static/)
COPY . .  

# Install dependencies
RUN pip install flask flask-cors

# Expose port 5000
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
