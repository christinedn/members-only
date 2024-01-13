# members-only
An application in which users can be created and are authenticated. Users can create posts, but the author of the posts and the date that the posts was created is not visible to those without an account. Users can gain membership or admin privileges by entering a secret passcode. Those with membership roles can see the author of the posts and the date that the posts was created. Those with admin roles can delete posts.  


## Technologies used
Backend:
- Node.js
- Express
- MongoDB

Frontend:
- HTML
- CSS
- EJS


## Run it locally
### Prerequisites
- A running MongoDB instance, either locally or on the cloud. Follow [this documentation](https://www.mongodb.com/docs/atlas/getting-started/) to deploy one easily.
- Nodejs

### Clone the repository
```
# Clone the repository
$ git clone git@github.com:christinedn/members-only.git

# Go into the repository
$ cd members-only

```

### Getting the server ready

```

# Install dependencies

$ npm install

```

### Setting up environment variables
- Rename file `keys-example.js` to `keys.js`
- Update placeholders for `dbURI` with your MongoDB instance's data
- Update `cookieKey`
- Update passwords for becoming an member and admin.

```
# Start the server
$ npm start
```
#

