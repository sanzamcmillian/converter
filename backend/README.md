# stringToArray-API

Created a server-side API endpoint that will receive a webhook containing a single string of data. The code then converts the string into an array of characters, order the array alphabetically, and return the array as a word.

# Features

This is a simple FastAPI application that exposes a POST API endpoint to receive a webhook containing a string. The string is processed by:

1. Converting it to lowercase
2. Splitting it into characters
3. Sorting the characters alphabetically
4. Returning the sorted characters as a JSON array

# API Endpoints
POST `webhook/sort-word`

Request body:
  ```plaintext
  {
  data: "example"
  }
  ```

Response: 
  ```plaintext
  {
  word: ["a," "e," "e," "l," "m," "p,", "x”]
  }
  ```


# Installation
1. Clone the repo:

    ```bash
    git clone https://github.com/sanzamcmillian/converter.git
    cd converter/backend
  
2. Create a Virtual Environment

    ```bash
    python -m venv venv
    source venv/bin/activate
  
3. Install Dependencies

    ```bash
    pip install -r requirements.txt
  
4. Run the server:

    ```bash
    uvicorn main:app  --reload
  

5. Visit Swagger UI at http://localhost:8000/docs


# Running tests

    pytest

# Live link
   https://converter-api-1t50.onrender.com/