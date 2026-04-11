# How to View this Assignment

A good development setup for this assignment may look like: one terminal window on
left-handside with assignment instructions, one terminal on righthand side for
inputting commands. 

(Remember you *can* have multiple terminal instances up at a time. :) )

# INTRO TO UNIX

The purpose of this assignment is to walk students through a set of introductory
Unix commands.

In order to learn how to use the Unix/Linux command line, we will walk through a
set of common tasks developers often perform on the command line. Think of this
less as a project you are working to complete, and more of an obstacle course
meant to help you train and assess your skills. The easier all of these tasks
get, the better. No developer should be without basic command line skills.

Please note that there are differences between different types of Linux and
between Linux and Unix. This assignment focuses on commands and techniques
generally supported accross all *nix  (Unix and Linux) operating systems.

## Learning Objectives 
You are welcome and encouraged to consult any additional documentation or book(s).

Please follow the below instructions carefully.

Upon completion of this assignment you will be able to:  
-   Use commands to navigate through the terminal/your computer & perform 
basic operations. 

## Instructions 

- Use the Unix shell (Git Bash) to complete the following challenges:

**Navigating the Filesystem** 

To begin, make sure you are inside of the ``intro-to-unix``.

1. Use the  ``pwd`` command to find your "path to working directory", that is--
your current location in the filesystem. Paste the output of the ``pwd`` command
to a new file called ``scavenger-hunt.txt`` (You may do this in a variety of
ways, choose one.) 
2. What directories and files do you see when you run ``ls``? (You should see 
``scavenger-hunt.txt``) 
- You can use options to modify how a command runs. Try using ``ls -alh`` 
to see the contents of your current directory. How are the results different 
when you use the ``-alh`` options? 
- Commands can also take arguments, which are usually the names of files or
locations that you want the command to work with.  Try running  ``ls /`` to see
what files are in the root directory of the filesystem. What files and
directories do you see listed? 
- A Unix filesystem has a few special shortcuts to refer to specific locations. 
``/`` indicates the root of the filesystem, meaning the top-most directory in 
the filesystem hierarchy. Use the ``cd``("change directory") command to move 
to the root directory. (Hint: Use ``--help`` to look up the ``cd`` command 
if you have any issues) 
- Then run ``pwd`` to see where you are in your filesystem. 
- Another special shortcut in Unix is the ``~`` location. This indicates the user 
root directory, meaning the top-most directory in the hierarchy that comes 
below your user account. Use ``cd`` to move to ``~`` . 
- Run the   ``pwd`` command. 
3. Change directories into the ``challenge_files`` directory under the ``intro-to-unix`` 
folder. Use ``ls`` to find the files with a ``.demo`` pattern in their name. 
How many files do you find? 
- Use the   ``cd`` command to move "up" one directory. Where are you in the 
filesystem now? 
- Press the up arrow on your keyboard. What just happened? 
- Press the up arrow a few more times. What do you see? 
- Run the ``history`` command. What do you see?

**Observing the System** 
1. Discover what account you are logged into using the ``whoami`` command. 
What username are you currently using? 
2. Run  ``ps aux`` and review the results. (Hint: Use   the ``--help`` to 
learn more about the ``ps`` command and options.) How do you interpret 
what you see here?

**Finding and Viewing Files** 
1. Make sure you are in the ``challenge_files`` directory. Use 
the ``*`` wildcard character and the ``ls`` command to find all the files
that contain the word "credit" in the filename. How many files did you find? 
2. Use the  ``less`` command to view one of the ``credit_cards`` files you just
discovered. (Hint: Type ``q`` to quit viewing the file. Press the ``spacebar``
to page down. Use your keyboard arrows to move up/down line by line.) What day
was this file created? 
3. Use the ``find`` command to search for files more efficiently. The find command goes 
as follows: ``find starting-path options expression.`` Search the files 
under ``challenge_files`` to find the location of a file named ``modi_laboriosam.txt``. 
Your command should look something like ``find . -name modi_laboriosam.txt``.
Where is that file located?
4. Use the ``grep`` command to search for text within a file. Use ``grep`` on
all the ``.user`` files in ``challenge_files`` to find which files contain "WA"
(the abbreviation for Washington state). How many files did you find contain
this string of text? 
5. Use the ``-r`` option of ``grep`` to recursively find
the text "Waldo" hidden in a file somewhere under the challenge_files directory.
Paste the result showing the file name where the word "Waldo" shows up
inside the ``scavenger-hunt.txt`` file you created.

**Pipes and Connecting Commands**  
Sometimes it's useful to output the results of a command to a text file 
for further analysis, reference, or processing. The pipe (|) is used to 
redirect the output of one Unix command into another.

Whereas, the redirect/arrow (> or <) character is used to write output or input 
of a command into a file. Redirecting output has many benefits as it allows you to
more easily view content or save output for later use (for your own reference or
in another script).

1. Navigate to your ``intro-to-unix`` folder. Then, run the command ``ls >
files.txt`` . Run the ``ls`` command. Notice that the file  ``files.txt`` 
was created. View that file using ``less``. What do you see in the ``files.txt`` file? 
2. Navigate to your ``challenge_files`` directory. Then, run the command ``ls -alh``. 
Notice how the files scroll by very quickly. Sometimes it would be better to get the 
results in a paginated format. Try running ``ls -alh | less``. Describe what you see from
this command in your ``scavenger-hunt.txt` file.

# Turning in this assignment 
Save your ``scavenger-hunt.txt``. Your file should contain 3 answers.
