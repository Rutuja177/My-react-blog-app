<h1>My-react-blog-app</h1>
<p>TeachTinker: A blog app where you explore and learn about web technologies. Create an account, login, upvote blogs, and engage with comments. Frontend: React, Backend: Node.js, Express.js, Database: MongoDB, Authentication: Firebase. Hosted on GCP.</p>

You can visit here: https://myreactblogapp.uc.r.appspot.com/

<img width="943" alt="image" src="https://github.com/Rutuja177/My-react-blog-app/assets/47986024/83a5bc33-dfc5-4953-904b-b593e9176be6">
<img width="943" alt="image" src="https://github.com/Rutuja177/My-react-blog-app/assets/47986024/387787fa-432b-4de7-b098-284756915c55">

npm install
cd .\server\
npm start
this will start on port 8080
Go to http://localhost:8000/


1. Install the necessary dependencies by running the following command in your project's root directory:
```
npm install
```

2. Navigate to the server directory by running the following command:
```
cd server
```

3. Start your server on port 8080 by running the following command:
```
npm start
```
Your server should now be running locally on `http://localhost:8080`.

4. Open your web browser and go to `http://localhost:8080` to verify that your server is working correctly.



<h4>To host your React blog app on Google Cloud Platform (GCP), you can follow these steps: </h4>

1. Prepare your project on the Google Cloud Console and note down the project ID.

2. Build the frontend of your application by running the following command in your project's root directory:
```
npm run build
```
This will create a build folder containing all the compiled and optimized files for the frontend.

3. Move the build folder to your server folder. It's recommended to add the build folder to your project's .gitignore file to avoid committing it to version control.

4. Make sure your Node.js server serves the build folder as static files. In your server file, you can use a middleware like `express.static` to serve the frontend files. Here's an example using Express.js:
```javascript
const express = require('express');
const app = express();

// Serve static files from the build folder
app.use(express.static('build'));

// ... Your other server routes and logic

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
```

5. Add a `app.yaml` file to your project's root directory. This file is used by GCP to configure your app's runtime environment. Here's an example `app.yaml` file for a Node.js app:
```yaml
runtime: nodejs14

instance_class: F2

handlers:
  - url: /.*
    static_files: build/index.html
    upload: build/index.html

  - url: /static
    static_dir: build/static
```
This configuration specifies that all requests should be served with the `build/index.html` file, except for requests to the `/static` path, which will be served with the files in the `build/static` directory.

6. Update your `package.json` file to include a start script that runs your app on GCP. Modify the `"scripts"` section as follows:
```json
"scripts": {
  "start": "node server.js"
}
```
Make sure to replace `server.js` with the filename of your server file.

7. Open the Google Cloud CLI and authenticate by running the following command and following the prompts:
```
gcloud auth login
```

8. Set the project ID for your GCP project:
```
gcloud config set project <projectId>
```
Replace `<projectId>` with your actual project ID.

9. Deploy your app to GCP by running the following command:
```
gcloud app deploy
```
This command will upload your app's files to GCP and deploy them to the App Engine.

10. Once the deployment process is complete, you will be provided with a URL where your app is hosted. You can visit this URL to access your React blog app on GCP.

If you need to make any updates to your app in the future, you can repeat steps 2-9 to deploy the changes to GCP.

Remember to update your README file with these deployment steps for reference.





