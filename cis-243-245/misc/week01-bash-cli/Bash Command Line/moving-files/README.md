# Bash: Moving Files **Last modified 7.20.2025**

An assignment designed to challenge students to manipulate files and folders on the command line.

## Learning Objectives

Upon completion of this assignment, students should be able to:

1.	Write Unix commands to manipulate files and/or folders (directories) in the following manners:
-	Copy
-	Create
-	Delete 
-	Rename

2.	Use advanced Bash commands such as downloading images and redirecting content to a specific file. 

## Instructions

The base requirements for this assignment are to complete the following list of tasks. Your completion of these tasks provides evidence of your success. You will create, delete, move and rename files and folders in several ways.

1. Navigate to the `challenge_files` directory, located in this repository.

2. Use the `cp` command to copy `index.html` to `index.html.bak`. (Note: This is a common naming convention when you wish to back up a file.)
  - E.g: ``cp``: ``cp <source_file_or_folder> <destination_file_or_folder>``.

3. Use the `mkdir` command to create a directory named `tmp` inside of the `challenge_files` folder.
  - E.g: ``mkdir <new_folder>``.

4. Use the `cp` command to copy `index.html` to `tmp/keepme.html`.

5. Use the `rm` command to remove (or "delete") the file `deleteme.html`.
  - E.g: ``rm <file>``.

6. Use the `rmdir` command to remove (or "delete") the directory `delete_this_directory/`. 
  - Does it work? Or did you get an error?
  - Figure out how to remove `delete_this_directory/` and all the contents within. (Remember the recursive
  option on the `rm` command!) 

7. Use the `curl` command to download an image and save it inside the `moving-files/challenge_files/img` directory.
  - The URL of the image is: ``http://localhost:22022/websites/www.w3schools.com/html/pic_trulli.jpg`` and you should save it as ``trulli.jpg``. 
  - You will need to redirect the output of the command with ``>``. 
  
  Your command should look something like this:

    curl <image-location> > <name-of-image>

8. Once you have completed the above commands, commit and sync your changes.