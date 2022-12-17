IN ORDER TO USE THIS SET OF APIS:

1. SEND A POST REQUEST TO
   "http://localhost:3000/api/auth/register"
   containing 'mail', 'username', 'password' to register new user.

2. SEND A POST REQUEST TO
   "http://localhost:3000/api/auth/login"
   containing 'mail', 'password' to login an existing user.

3. SEND A GET REQUEST TO
   "http://localhost:3000/api/auth/getdata" specifying HEADER in the format Authorization: `Bearer ${JWT_TOKEN}`. This is a protected route that requires JWT token in order to fetch data.

4. SEND A POST REQUEST TO
   "http://localhost:3000/api/file/upload"
   to upload and save csv file in mongodb database. Place the csv file in the root directory of this app and replace
   "posts.csv" with <FILE_NAME> in 'routes/uploadRoutes.js'
