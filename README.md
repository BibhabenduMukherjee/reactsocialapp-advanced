
# Social Media app


Welcome to my social media application! This platform provides users with the ability to register and log in, create posts, view other users' posts, update their profiles, follow and unfollow other users, and search for people based on their names.

With this app, users can share their thoughts and ideas with the world and connect with other users who share similar interests. They can personalize their profile by adding information about their location, education, and job, and also add a profile picture to help others identify them.

The app is designed to be user-friendly, with a clean and intuitive interface that makes it easy to navigate and use. Whether you're looking to make new connections or simply express yourself, this social media app is the perfect platform for you.
## Authors

- [@Bibhabendu Mukherjee](https://github.com/BibhabenduMukherjee)


## API Reference
#### Register User

```http
  POST /register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_name`      | `string` | **Required**. Id of item to fetch |
| `user_email`      | `string` | **Required**. Id of item to fetch |
| `password`      | `string` | **Required**. Id of item to fetch |

#### Login User

```http
  POST /login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

| `user_email`      | `string` | **Required**. Id of item to fetch |
| `password`      | `string` | **Required**. Id of item to fetch |



#### Get all posts

```http
  GET /posts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Not Required**. Your API key |

#### Get User Info

```http
  GET /specificuser/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. Id of item to fetch |

#### Create Post
```http
  POST /specificuser/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_token`      | `string` | **Required**. Id of item to fetch |

#### Upadate Profile
```http
  POST /updateprofile/${user_id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `file` | **not Required**. for updating  |
| `user_name`      | `string` | ** not Required**. for updating |
| `education`      | `string` | **not Required**. for updating  |
| `location`      | `string` | ** not Required**. for updating |
| `job`      | `string` | **not Required**. for updating  |


#### Upload image to file storage


```http
  POST /uploadfile/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `FormData` | **Required**. Id of item to fetch |

#### Get image url


```http
  GET /files/${imageRef}
  -- return a fileName
```

#### Get all user

```http
  GET /users/${user_id}
  -- return all user-[]
```



#### Search user


```http
  GET /search?q={username}
  -- return a username 
```
