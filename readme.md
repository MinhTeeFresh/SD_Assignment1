# Software Engineering Assignment 1

Project Completed by Minh Tran

# Features
- Get all tweets (created time ("created_at"), and tweet text ("text")) in the file

- Get all users' ID

- Get the details of tweet (text, created time), given ID

- Create a tweet (given text and ID)

- Update a screen_name (given name and new screen_name)

- Delete a tweet (given ID)

# How to use:

## Starting the Website -
1. Open up the terminal on your computer
2. Find where the project is located.
    - Utilize ***ls*** to display the folders inside your current location.
    > ls
    - Utilize ***cd [name of folder]*** to move to desired folder.
    > cd Assignment1

3. Once inside the project folder run the command:
    > npm install express

4. After the installation is complete, run the command:
    > node app.js
5. Go to your web browser and type in the following URL:
    - http://127.0.0.1:3000/
6. Press enter, the website should open up.

## Using the Website - 
### *Retrieving All Tweets* 
- Clicking the blue button labelled **Tweets** will display a table with all tweets, including:

    - When they were made
    - What they say
    - The tweet ID

  ![All Tweets Reveal](/Pictures/tweetsBtn.png)

- To refresh the table, close the table by pressing the **Tweets** button again and reopening the table by pressing the button one more time.

### *Retrieving All Users*
- By clicking the blue **Users** button, a table will display showing all the current users.
- This table will only refresh when the website is ran again.

    ![All Users Reveal](/Pictures/userBtn.png)

### *Searching For a Tweet*
- Look for the form under the title "**Search for a Tweet:**". 
- Filling this form labelled **_Tweet Search_** with the ID of a specific tweet and pressing the button below **Search** will make a table appear. 

    ![Search Button](/Pictures/searchBtn.png)

- This table should contain:
    - when the specific tweet was made
    - what the tweet says.

### *Making a Tweet*
- Look for the forms under the title "**Enter new Tweet here:**". 
- Fill out the form for **_Tweet ID_** with a desired tweet id.
- Fill out the form **_Text_** with the desired tweet text. 
- When you are finished, press the **Tweet** button to complete the tweet.

    ![Tweeting Button](/Pictures/tweetBtn.png)

### *Deleting a Tweet*
- To delete a tweet, look for the form under the title "**Enter ID to delete:**". 
- Enter the specific tweet ID into the field **_Delete ID_**. 
- When finished, press the button underneath labelled **Delete**. 

    ![Delete Button](/Pictures/deleteBtn.png)

- This will delete the tweet.

### *Update Screen Name*

- To update the screen name of a user, look for the fields under "**Enter to change name**:"
- Fill out the **_Current Name_** field with the current full name of a user you want to change (It is case sensitive).
- Fill out the **_New Name_** field with the new name you want to replace the screen name with.
- When finished, press the green **Update** button to confirm your changes.

    ![Update Button](/Pictures/updateBtn.png)

## Used References:

Dr. Ji Hwan Park's example_code:
 + https://canvas.ou.edu/courses/249256/pages/course-materials

Learn Coding Tutorial's AJAX, RESTful API tutorial
 + https://www.youtube.com/watch?v=G0BzzuXS8gI