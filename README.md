# Simple Task Manager API

This is a simple RESTful API for a task manager application built using Node.js, Express.js. The API allows users to perform CRUD operations on tasks, including creating, reading, updating, and deleting tasks. The tasks have a title, description, completion status, priority level and created date.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/simple-task-manager-api.git
   ```

2. Install the dependencies:

   ```bash
   cd simple-task-manager-api
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

   The API will be accessible at `http://localhost:3000`. 
## Endpoints

#### API is accessible via - [https://airtribe-task-manager-api.up.railway.app](https://airtribe-task-manager-api.up.railway.app)

The API provides the following endpoints:

- `GET /tasks`: Retrieves all tasks.
- `GET /tasks/:id`: Retrieves a single task by its ID.
- `POST /tasks`: Creates a new task.
- `PUT /tasks/:id`: Updates an existing task by its ID.
- `DELETE /tasks/:id`: Deletes a task by its ID.
- `GET /tasks/priority/:level`: Retrieves tasks based on priority level.

#### Sorting and Filtering options are available for `GET /tasks` and `GET /tasks/priority/:level`. Example given below.

## Validations

The input for Post and Put requests are validated before storing. 

- "title": required,
- "description": required,
- "isCompleted": required (Acceptable values - true/false),
- "priority": required (Acceptable values - low/medium/high)

## Request and Response Examples

### GET /tasks

Request:

```http
GET /tasks
```

Response:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "tasks": [
    {
      "title": "Task 3",
      "description": "Test task",
      "isCompleted": "true",
      "priority": "low",
      "created-at": "2023-06-21T07:25:36.487Z",
      "ID": 3
    },
    {
      "title": "Task 1 done",
      "description": "Test task",
      "isCompleted": "true",
      "priority": "low",
      "ID": 1,
      "created-at": "2023-06-21T07:25:04.153Z"
    }
  ]
}

```
#### Sort and Filter
- To filter based on completion status and sort based on created date pass `?sort={created-at-asc/created-at-desc}&isCompleted={true/false}` query string.

### POST /tasks

Request:

```http
POST /tasks
Content-Type: application/json

{
  "title": "Task 1 done",
  "description": "Test task",
  "isCompleted": "true",
  "priority": "low"
}
```

Response:

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
    "title": "Task 1 done",
    "description": "Test task",
    "isCompleted": "true",
    "priority": "low"
    "created-at": "2023-06-21T08:22:01.761Z",
    "ID": 9
}
```
Note: `ID` and `created-at` are auto-generated

### PUT /tasks/:id

Request:

```http
PUT /tasks/3
Content-Type: application/json

{
   "title": "Test task updated",
   "description": "Test task description updated",
   "isCompleted": "true",
   "priority": "high"
}
```

Response:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "title": "Test task updated",
    "description": "Test task description updated",
    "isCompleted": "true",
    "priority": "high",
    "ID": 8,
    "created-at": "2023-06-21T08:22:00.746Z"
}
```

### GET /tasks/priority/:level  (Optional)

Request:

```http
GET /tasks/priority/low
Content-Type: application/json
```

Response:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "tasks": [
        {
            "title": "Task New done",
            "description": "Test task",
            "isCompleted": "false",
            "priority": "low",
            "created-at": "2023-06-21T08:21:54.902Z",
            "ID": 4
        },
        {
            "title": "Task New updated",
            "description": "Test task",
            "isCompleted": "false",
            "priority": "low",
            "created-at": "2023-06-21T08:21:57.342Z",
            "ID": 5
        }
        ...
    ]
}
```

#### Sort and Filter
- To filter based on completion status and sort based on created date pass `?sort={created-at-asc/created-at-desc}&isCompleted={true/false}` query string.


### DELETE /tasks/:id

Request:

```http
DELETE /tasks/3
```

Response:

```json
HTTP/1.1 204 No Content
```

## Error Handling

The API handles invalid requests and provides appropriate error responses with corresponding HTTP status codes and error messages.

## Sort and Filter

To filter

 tasks based on completion status, append the following query parameter to the URL:

```
?isCompleted=true
```

To sort tasks by creation date in ascending order, append the following query parameter to the URL:

```
?sort=created-at-asc
```

To sort tasks by creation date in descending order, append the following query parameter to the URL:

```
?sort=created-at-desc
```


## Testing

You can test the API using Postman or Curl. Make sure the server is running locally or accessible at  [https://airtribe-task-manager-api.up.railway.app](https://airtribe-task-manager-api.up.railway.app).

## Conclusion

This simple task manager API provides basic CRUD operations for managing tasks. It can be extended further to suit more complex requirements or integrated into a larger application.
