# Folder Structure
```
bed-ca2-shoelesshoe
├─ public
│  ├─ css
│  │  ├─ loginRegister.css
│  │  └─ styles.css
│  ├─ media
│  │  ├─ items
│  │  │  ├─ 1.webp
│  │  ├─ plants
│  │  │  ├─ 1.webp
│  │  │  ├─ 2.webp
│  │  │  ├─ 3.webp
│  │  │  ├─ 4.webp
│  │  │  ├─ 5.webp
│  │  │  ├─ 6.webp
│  │  │  ├─ 7.webp
│  │  │  ├─ 8.webp
│  │  │  ├─ 9.webp
│  │  │  ├─ 10.webp
│  │  │  ├─ 11.webp
│  │  │  ├─ 12.webp
│  │  │  ├─ 13.webp
│  │  │  ├─ 14.webp
│  │  │  └─ 15.webp
│  │  ├─ store
│  │  │  ├─ 1.webp
│  │  │  └─ 2.webp
│  │  ├─ defaultpfp.jpg
│  │  ├─ favicon.png
│  │  ├─ night.jpg
│  │  ├─ sunset.jpg
│  │  ├─ trophy1.jpg
│  │  ├─ trophy2.jpg
│  │  └─ trophy3.jpg
│  ├─ js
│  │  ├─ getAllPlantTypes.js
│  │  ├─ getCurrentURL.js
│  │  ├─ getLeaderboard.js
│  │  ├─ getSingleTaskInfo.js
│  │  ├─ getSingleUserInfo.js
│  │  ├─ inventory.js
│  │  ├─ loginUser.js
│  │  ├─ messages.js
│  │  ├─ navbarFooterToggle.js
│  │  ├─ profile.js
│  │  ├─ queryCmds.js
│  │  ├─ registerUser.js
│  │  ├─ starredTasks.js
│  │  ├─ store.js
│  │  ├─ tasks.js
│  │  └─ users.js
│  ├─ index.html
│  ├─ inventory.html
│  ├─ leaderboard.html
│  ├─ login.html
│  ├─ messages.html
│  ├─ plants.html
│  ├─ profile.html
│  ├─ register.html
│  ├─ singleTaskInfo.html
│  ├─ singleUserInfo.html
│  ├─ starredTasks.html
│  ├─ store.html
│  └─ users.html
├─ src                       
│  ├─ configs                
│  │  ├─ initTables.js      
│  │  └─ createSchema.js
│  ├─ controllers            
│  │  ├─ inventoryController.js
│  │  ├─ leaderboardController.js
│  │  ├─ messageController.js
│  │  ├─ plantTypeController.js
│  │  ├─ recommendedTaskController.js
│  │  ├─ starredTaskController.js
│  │  ├─ storeController.js
│  │  ├─ streakController.js
│  │  ├─ taskController.js
│  │  ├─ taskProgressController.js
│  │  └─ userController.js
│  ├─ middleware
│  │  ├─ bcryptMiddleware.js
│  │  ├─ controllerMiddleware.js
│  │  ├─ jwtMiddleware.js
│  │  └─ modelMiddleware.js
│  ├─ models                 
│  │  ├─ inventoryModel.js
│  │  ├─ leaderboardModel.js
│  │  ├─ messageModel.js
│  │  ├─ plantTypeModel.js
│  │  ├─ recommendedTaskModel.js
│  │  ├─ starredTaskModel.js
│  │  ├─ storeModel.js
│  │  ├─ streakModel.js
│  │  ├─ taskModel.js
│  │  ├─ taskProgressModel.js
│  │  └─ userModel.js  
│  ├─ routes                 
│  │  ├─ inventoryRoutes.js
│  │  ├─ leaderboardRoutes.js
│  │  ├─ mainRoutes.js
│  │  ├─ messageRoutes.js 
│  │  ├─ plantTypeRoutes.js      
│  │  ├─ recommendedTaskRoutes.js    
│  │  ├─ starredTaskRoutes.js   
│  │  ├─ storeRoutes.js     
│  │  ├─ streakRoutes.js     
│  │  ├─ taskProgressRoutes.js     
│  │  ├─ taskRoutes.js     
│  │  └─ userRoutes.js     
│  ├─ services               
│  │  └─ db.js               
│  └─ app.js   
├─ .gitignore                 
├─ index.js                  
├─ package.json       
├─ package-lock.json       
└─ README.md                 
```

# Database Design
https://dbdiagram.io/d/6588412589dea627997c0222

# Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

# Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/bed-ca2-shoelesshoe.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

# Set Up the Environment

1. In the project root directory, create a new file named `.env`.

2. Open the `.env` file in a text editor.

3. Copy the following example environment variables into the `.env` file:

    ```plaintext
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_DATABASE=<your_database_name>
    JWT_SECRET_KEY=<your-secret-key>
    JWT_EXPIRES_IN=<your-expiry-time>
    JWT_ALGORITHM=<your-encryption-algorithm>
    ```

    For example:

    ```plaintext
    DB_HOST=host
    DB_USER=root
    DB_PASSWORD=password
    DB_DATABASE=db
    JWT_SECRET_KEY=secretkey235012@gfg
    JWT_EXPIRES_IN=15m
    JWT_ALGORITHM=HS256
    ```

   Update the values of the environment variables according to your MySQL database configuration.

# Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

# Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

# Webpages

## index.html

- View all the created tasks by all users
- Create a new task
- Edit your own created tasks
- Delete your own created tasks
- Star a task that you want in your starred tasks from the task pool
- View task details

## inventory.html

- View all plants that you own
- View all items that you own
- Delete plants that you own
- Use items that you own
- Delete items that you own

## leaderboard.html

- View all types of leaderboards

## login.html

- Login with username and password

## messages.html

- View all messages
- Send messages
- Edit your own messages
- Delete your own messages

## plants.html

- View all the different types of plants and their stats

## profile.html

- View your own profile
- Edit your username and email
- Delete your account

## register.html

- Register with your username, email and password

## singleTaskInfo.html

- View the task details (created by, total number of people who starred the task and the total number of people who completed it)
- Link to the user's singleUserInfo.html who created the task

## singleUserInfo.html

- View the user details (streak, total points earned, total points spent and their inventory)

## starredTasks.html

- View all your starred tasks 
- Complete your starred tasks
- View all your completed tasks
- Unstar your starred task
- View task details
- Edit task completion notes
- Delete task completion

## store.html

- View all the items in the store
- Purchase items in the store

## users.html

- View all the users' details
- View a specific user's details

# Endpoints
## /api/register
### POST /api/register
- Request Body:
    ```json
    {
        "username": "test",
        "email": "test@example.com",
        "password": "test"
    }
    ```

- Response: 201 Created
    ```json
    {
        "token": "sdfsdffghdfsngjignaehrguiesg"
        "user_id": 1
    }
    ```

- Error Handling:
    - If the provided `email` or `username` is already associated with another user, return 409 Conflict.
    - If the request body is missing `username` or `email`, return 400 Bad Request.

## /api/login
### POST /api/login
- Request Body:
    ```json
    {
        "username": "test",
        "password": "test"
    }
    ```

- Response: 200 OK
    ```json
    {
        "token": "sdfsdffghdfsngjignaehrguiesg"
        "user_id": 1
    }
    ```

- Error Handling:
    - If the request body is missing `username` or `password`, return 400 Bad Request.
    - If user does not exist, return 404 Not Found.
    - If password is wrong, return 401 Unauthorised.

## /api/users
### GET /api/users
- Response: 200 OK
    ```json
    [
        {
            "user_id": 1,
            "username": "greenUser123",
            "email": "user123@example.com",
            "created_on": "2024-02-03 12:58:02",
            "last_login": "2024-02-03 12:58:02"
        },
        {
            "user_id": 2,
            "username": "ecoWarrior",
            "email": "warrior@example.com",
            "created_on": "2024-02-03 12:58:02",
            "last_login": "2024-02-03 12:58:02"
        }
    ]
    ```

### GET /api/users/current_user
- Response: 200 OK
    ```json
    {
        "user_id": 2,
        "username": "test",
        "email": "test@gmail.com",
        "net_points": 0,
        "created_on": "2024-02-03 13:09:27",
        "last_login": "2024-02-03 13:32:36",
        "streak": 0,
        "total_points": 0
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/users/{user_id}
- Response: 200 OK
    ```json
    {
        "user_id": 1,
        "username": "root",
        "email": "root@gmail.com",
        "created_on": "2024-02-03 12:58:02",
        "last_login": "2024-02-03 12:58:02",
        "total_points": "2100",
        "net_points": 1600,
        "streak": 1
    }
    ```

- Error Handling:
    - If request params `user_id` is missing, return 400 Bad Request.
    - If requested `user_id` does not exist, return 404 Not Found.

### GET /api/users/points/current_user
- Response: 200 OK
    ```json
    {
        "net_points": 0
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/users/points/{user_id}
- Response: 200 OK
    ```json
    {
        "net_points": 0
    }
    ```

- Error Handling:
    - If request params `user_id` is missing, return 400 Bad Request.
    - If requested `user_id` does not exist, return 404 Not Found.

### PUT /api/users/{user_id}
- Request Body:
    ```json
    {
        "username": "test123",
        "email": "test123"
    }
    ```

- Response: 200 OK
    ```json
    {
        "user_id": 2,
        "username": "test123",
        "email": "test123"
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the request params `user_id` is missing, return 400 Bad Request.
    - If the requested `user_id` does not exist, return 404 Not Found.
    - If the provided `username` or `email` is already associated with another user, return 409 Conflict.

### DELETE /api/users/{user_id}
- Response: 204 No Content

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the requested `user_id` does not exist, return 404 Not Found.

## /api/tasks
### POST /api/tasks
- Request Body:
    ```json
    {
        "title": "No Plastic Bottles",
        "description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
        "points": 40
    }
    ```

- Response: 201 Created
    ```json
    {
        "results": {
            "task_id": 3,
            "owner_id": 2,
            "title": "No Plastic Bottles",
            "description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
            "points": 40
        },
        "logged_in_user_id": 2
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the request body is missing `title` or `description` or points, return 400 Bad Request

### GET /api/tasks
- Response: 200 OK
    ```json
    [
        {
            "task_id": 1,
            "title": "Plant a Tree",
            "description": "Plant a tree in your neighborhood or a designated green area.",
            "points": 50
        },
        {
            "task_id": 2,
            "title": "Use Public Transportation",
            "description": "Use public transportation or carpool instead of driving alone.",
            "points": 30
        }
    ]
    ```

### GET /api/tasks/current_user
- Response: 200 OK
    ```json
    {
        [
            {
                "task_id": 1,
                "title": "Plant a Tree",
                "description": "Plant a tree in your neighborhood or a designated green area.",
                "points": 50
            },
            {
                "task_id": 2,
                "title": "Use Public Transportation",
                "description": "Use public transportation or carpool instead of driving alone.",
                "points": 30
            }
        ],
        "logged_in_user_id": 2
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/tasks/{task_id}
- Response: 200 OK
    ```json
    {
        "tasks": {
            "task_id": 1,
            "owner_id": 1,
            "title": "testtask",
            "description": "testign",
            "points": 50,
            "username": "root"
        },
        "total_stars": {
            "total_stars": 1
        },
        "total_completions": {
            "total_completions": 2
        }
    }
    ```

- Error Handling:
    - If the requested `task_id` does not exist, return 404 Not Found.

### PUT /api/tasks/{task_id}
- Request Body:
    ```json
    {
        "title": "Plant Two Trees",
        "description": "Plant two trees in your neighborhood or a designated green area.",
        "points": 60
    }
    ```

- Response: 200 OK
    ```json
    {
        "task_id": 3,
        "owner_id": 2,
        "title": "Plant Two Trees",
        "description": "Plant two trees in your neighborhood or a designated green area.",
        "points": 60
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the requested `task_id` does not exist, return 404 Not Found.
    - If the request body is missing `title` or `description` or `points`, return 400 Bad Request.

### DELETE /api/tasks/{task_id}
- Response: 204 Created

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the requested `task_id` does not exist, return 404 Not Found.

## /api/task_progress
### POST /api/task_progress/current_user/${task_id}
- Request Body:
    ```json
    {
        "user_id": 1,
        "task_id": 1,
        "notes": "Planted a tree in the park near my house."
    }
    ```

- Response: 201 Created
    ```json
    {
        "progress_id": 1,
        "user_id": 1,
        "task_id": 1,
        "completion_date": "2023-07-30",
        "notes": "Planted a tree in the park near my house."
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the request body `user_id`, `task_id` or `notes` is missing, return 400 Bad Request.
    - If the requested `user_id` or `task_id` does not exist, return 404 Not Found.


### GET /api/task_progress/current_user
- Response: 200 OK
    ```json
    [
        {
            "progress_id": 4,
            "task_id": 1,
            "title": "testtask",
            "description": "testign",
            "points": 50,
            "completion_date": "2024-02-03 13:52:37",
            "notes": "Planted a tree in the park near my house."
        },
        {
            "progress_id": 5,
            "task_id": 1,
            "title": "tesask",
            "description": "ttgn",
            "points": 505,
            "completion_date": "2024-02-05 13:52:37",
            "notes": "Planted a tree in the park."
        }
    ]
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/task_progress/user/{user_id}
- Response: 200 OK
    ```json
    [
        {
            "progress_id": 4,
            "task_id": 1,
            "title": "testtask",
            "description": "testign",
            "points": 50,
            "completion_date": "2024-02-03 13:52:37",
            "notes": "Planted a tree in the park near my house."
        },
        {
            "progress_id": 5,
            "task_id": 1,
            "title": "tesask",
            "description": "ttgn",
            "points": 505,
            "completion_date": "2024-02-05 13:52:37",
            "notes": "Planted a tree in the park."
        }
    ]
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the request body is missing `user_id`, return 400 Bad Request.
    - If the requested `user_id` does not exist, return 404 Not Found.

### GET /api/task_progress/progress/{progress_id}
- Response: 200 OK
    ```json
    {
        "progress_id": 1,
        "user_id": 1,
        "task_id": 1,
        "completion_date": "2024-02-03 12:58:37",
        "notes": "yes"
    }
    ```

- Error Handling:
    - If the request body is missing `progress_id`, return 400 Bad Request.
    - If the requested `progress_id` does not exist, return 404 Not Found.

### PUT /api/task_progress/{progress_id}
- Request Body:
    ```json
    {
        "notes": "Planted two trees this time!"
    }
    ```

- Response: 200 OK
    ```json
    {
        "progress_id": 1,
        "user_id": 1,
        "task_id": 1,
        "completion_date": "2024-02-03 12:58:37",
        "notes": "Planted two trees this time!"
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the requested `progress_id` does not exist, return 404 Not Found.
    - If the request body is missing `notes`, return 400 Bad Request.

### DELETE /api/task_progress/{progress_id}
- Response: 204 Created

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If the requested `progress_id` does not exist, return 404 Not Found.

## /api/starred_tasks
### POST /api/starred_tasks/current_user/{task_id}
- Response: 201 Created
    ```json
    {
        "starred_id": 1,
        "user_id": 1,
        "task_id": 1
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `task_id` or `user_id` is missing, return 400 Bad Request.
    - If `task_id` does not exist, return 404 Not Found.

### GET /api/starred_tasks/current_user
- Response: 200 OK
    ```json
    [
        {
            "starred_id": 3,
            "task_id": 1,
            "title": "testtask",
            "description": "testign",
            "points": 50
        },
        {
            "starred_id": 4,
            "task_id": 2,
            "title": "teask",
            "description": "teign",
            "points": 550
        }
    ]
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/starred_tasks/{user_id}
- Response: 200 OK
    ```json
    [
        {
            "starred_id": 1,
            "task_id": 1,
            "title": "testtask",
            "description": "testign",
            "points": 50
        },
        {
            "starred_id": 2,
            "task_id": 2,
            "title": "hack",
            "description": "hack",
            "points": 2000
        }
    ]
    ```

- Error Handling:
    - If `user_id` does not exist, return 404 Not Found.
    - If `user_id` is missing, return 400 Bad Request.

### GET /api/starred_tasks/{user_id}/{task_id}
- Response: 200 OK
    ```json
    {
        "task_id": 1,
        "title": "testtask",
        "description": "testign",
        "points": 50
    }
    ```

- Error Handling:
    - If `user_id` or `task_id` does not exist, return 404 Not Found.
    - If `user_id` or `task_id` is missing, return 400 Bad Request.

### DELETE /api/starred_tasks/{user_id}/{task_id}
- Response: 204 No Response

- Error Handling:
    - If `user_id` or `task_id` is missing, return 400 Bad Request.
    - If `user_id` or `task_id` does not exist, return 404 Not Found.

## /api/recommended_tasks
###  GET /api/recommended_tasks
- Response: 200 OK
    ```json
    [
        {
            "task_id": 3,
            "owner_id": 2,
            "title": "Plant Two Trees",
            "description": "Plant two trees in your neighborhood or a designated green area.",
            "points": 60
        },
        {
            "task_id": 2,
            "owner_id": 1,
            "title": "hack",
            "description": "hack",
            "points": 2000
        },
        {
            "task_id": 1,
            "owner_id": 1,
            "title": "testtask",
            "description": "testign",
            "points": 50
        }
    ]
    ```

## /api/streak
### GET /api/streak/current_user
- Response: 200 OK
    ```json
    {
        "user_id": 2,
        "username": "test123",
        "streak": 1
    }
    ```

### GET /api/streak/{user_id}
- Response: 200 OK
    ```json
    {
        "user_id": 2,
        "username": "test123",
        "streak": 1
    }
    ```

- Error Handling:
    - If `user_id` does not exist, return 404 Not Found.
    - If `user_id` is missing, return 400 Bad Request.

## /api/plant_types
### GET /api/plant_types
- Response: 200 OK
    ```json
    [
        {
            "type_id": 1,
            "name": "Doom Shroom",
            "rarity": "Rare"
        },
        {
            "type_id": 2,
            "name": "Sunflower",
            "rarity": "Common"
        },
        {
            "type_id": 3,
            "name": "Snow Pea",
            "rarity": "Rare"
        },
        {
            "type_id": 4,
            "name": "Repeater",
            "rarity": "Rare"
        },
        {
            "type_id": 5,
            "name": "Wall Nut",
            "rarity": "Common"
        },
        {
            "type_id": 6,
            "name": "Puff Shroom",
            "rarity": "Common"
        },
        {
            "type_id": 7,
            "name": "Hypno Shroom",
            "rarity": "Rare"
        },
        {
            "type_id": 8,
            "name": "Ice Shroom",
            "rarity": "Rare"
        },
        {
            "type_id": 9,
            "name": "Squash",
            "rarity": "Legendary"
        },
        {
            "type_id": 10,
            "name": "Kernel Pult",
            "rarity": "Common"
        },
        {
            "type_id": 11,
            "name": "Winter Melon",
            "rarity": "Legendary"
        },
        {
            "type_id": 12,
            "name": "Gattling Pea",
            "rarity": "Legendary"
        },
        {
            "type_id": 13,
            "name": "Star Fruit",
            "rarity": "Common"
        },
        {
            "type_id": 14,
            "name": "Potato Mine",
            "rarity": "Common"
        },
        {
            "type_id": 15,
            "name": "Cherry Bomb",
            "rarity": "Common"
        }
    ]
    ```

## /api/store
### POST /api/store/current_user/{store_item_id}
- Response: 201 Created
    ```json
    {
        "name": "Streak Freezer",
        "ability": "Freeze your streak for 1 day",
        "acquired_on": "2024-02-03 15:00:08",
        "used_on": null
    }
    ```

- Error Handling:
    - If `store_item_id` does not exist, return 404 Not Found.
    - If `store_item_id` is missing, return 400 Bad Request.
    - If user does not have enough points, return 403 Forbidden.

### GET /api/store
- Response: 201 Created
    ```json
    [
        {
            "store_item_id": 1,
            "name": "Streak Freezer",
            "ability": "Freeze your streak for 1 day",
            "cost": 100
        },
        {
            "store_item_id": 2,
            "name": "Streak Doubler",
            "ability": "Double your streak for 1 day",
            "cost": 200
        }
    ]
    ```

## /api/leaderboard
### GET /api/leaderboard/streak
- Response: 200 OK
    ```json
    [
        {
            "username": "root",
            "streak": 1,
            "user_id": 1
        },
        {
            "username": "test123",
            "streak": 1,
            "user_id": 2
        }
    ]
    ```

### GET /api/leaderboard/completed_tasks
- Response: 200 OK
    ```json
    [
        {
            "username": "root",
            "total_completed_tasks": 2,
            "user_id": 1
        },
        {
            "username": "test123",
            "total_completed_tasks": 1,
            "user_id": 2
        }
    ]
    ```

### GET /api/leaderboard/points
- Response: 200 OK
    ```json
    [
        {
            "username": "root",
            "total_points_earned": "2050",
            "user_id": 1
        },
        {
            "username": "test123",
            "total_points_earned": "50",
            "user_id": 2
        }
    ]
    ```

### GET /api/leaderboard/plant_level
- Response: 200 OK
    ```json
    [
        {
            "username": "root",
            "plant_level": 1,
            "plant_type_id": 1,
            "plant_name": "Doom Shroom",
            "plant_rarity": "Rare",
            "user_id": 1
        }
    ]
    ```

## /api/inventory
### GET /api/inventory/current_user
- Response: 200 OK
    ```json
    {
        "owned_plants": [],
        "owned_items": [
            {
                "item_id": 2,
                "item_type_id": 1,
                "name": "Streak Freezer",
                "ability": "Freeze your streak for 1 day",
                "acquired_on": "2024-02-03 15:00:08",
                "used_on": null
            }
        ]
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/inventory/{user_id}
- Response: 200 OK
    ```json
    {
        "owned_plants": [
            {
                "plant_type_id": 1,
                "plant_id": 1,
                "name": "Doom Shroom",
                "rarity": "Rare",
                "level": 1,
                "planted_on": "2024-02-03 13:00:17"
            }
        ],
        "owned_items": [
            {
                "item_id": 1,
                "item_type_id": 1,
                "name": "Streak Freezer",
                "ability": "Freeze your streak for 1 day",
                "acquired_on": "2024-02-03 12:59:57",
                "used_on": null
            }
        ]
    }
    ```

- Error Handling:
    - If `user_id` is missing, return 400 Bad Request.
    - If `user_id` does not exist, return 404 Not Found.

### PUT /api/inventory/items/{item_id}
- Response: 200 OK
    ```json
    {
        "item_id": 2,
        "owner_id": 2,
        "item_type_id": 1,
        "acquired_on": "2024-02-03 15:00:08",
        "used_on": "2024-02-02 15:18:04"
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `user_id` or `item_id` is missing, return 400 Bad Request.
    - If item is already used, return 403 Forbidden.
    - If `user_id` or `item_id` does not exist, return 404 Not Found.

### DELETE /api/inventory/items/{item_id}
- Response: 204 No Response

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `item_id` is missing, return 400 Bad Request.
    - If `item_id` does not exist, return 404 Not Found.

### DELETE /api/inventory/plants/{plant_id}
- Response: 204 No Response

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `plant_id` is missing, return 400 Bad Request.
    - If `plant_id` does not exist, return 404 Not Found.

## /api/messages
### POST /api/messages
- Response: 201 Created
    ```json
    {
        "id": 3,
        "message_text": "hey",
        "user_id": 2,
        "created_at": "2024-02-03 15:23:58"
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `message_text` is missing, return 400 Bad Request.

### GET /api/messages
- Response: 200 OK
    ```json
    {
        "results": [
            {
                "username": "test123",
                "user_id": 2,
                "id": 3,
                "message_text": "hey",
                "created_at": "2024-02-03 15:23:58"
            },
            {
                "username": "test123",
                "user_id": 2,
                "id": 2,
                "message_text": "hi",
                "created_at": "2024-02-03 15:23:34"
            },
            {
                "username": "test123",
                "user_id": 2,
                "id": 1,
                "message_text": "hi",
                "created_at": "2024-02-03 15:22:34"
            }
        ]
    }
    ```

### GET /api/messages/current_user
- Response: 200 OK
    ```json
    {
        "results": [
            {
                "username": "test123",
                "user_id": 2,
                "id": 3,
                "message_text": "hey",
                "created_at": "2024-02-03 15:23:58"
            },
            {
                "username": "test123",
                "user_id": 2,
                "id": 2,
                "message_text": "hi",
                "created_at": "2024-02-03 15:23:34"
            },
            {
                "username": "test123",
                "user_id": 2,
                "id": 1,
                "message_text": "hi",
                "created_at": "2024-02-03 15:22:34"
            }
        ],
        "logged_in_user_id": 2
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.

### GET /api/messages/message/{id}
- Response: 200 OK
    ```json
    {
        "id": 1,
        "message_text": "hi",
        "user_id": 2,
        "created_at": "2024-02-03 15:22:34"
    }
    ```

- Error Handling:
    - If `id` is missing, return 400 Bad Request.
    - If `id` does not exist, return 404 Not Found.

### PUT /api/messages/{id}
- Request Body:
    ```json
    {
        "message_text": "sdfdsf"
    }
    ```

- Response: 200 OK
    ```json
    {
        "id": 1,
        "message_text": "sdfdsf",
        "user_id": 2,
        "created_at": "2024-02-03 15:22:34"
    }
    ```

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `id` or `message_text` is missing, return 400 Bad Request.
    - If `id` does not exist, return 404 Not Found.

### DELETE /api/messages/{id}
- Response: 204 No Response

- Error Handling:
    - If no token provided, return 401 Unauthorised.
    - If `id` is missing, return 400 Bad Request.
    - If `id` does not exist, return 404 Not Found.