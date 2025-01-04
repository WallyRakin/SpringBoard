## **Part I**

1. **Make a directory called first:**

    mkdir first

2. **Change directory to the first folder:**

    cd first

3. **Create a file called person.txt:**

    touch person.txt

4. **Change the name of person.txt to another.txt:**

    mv person.txt another.txt

5. **Make a copy of the another.txt file and call it copy.txt:**

    cp another.txt copy.txt

6. **Remove the copy.txt file:**

    rm copy.txt

7. **Make a copy of the first folder and call it second:**

    cp -r first second

8. **Delete the second folder:**

    rm -r second

# **Terminal Exercises**



## **Part II**

1. **What does the `man` command do? Type in `man rm`. How do you scroll and get out?**
   
   The `man` command displays the manual pages for other commands, providing detailed information. To scroll, use the `Space` bar to go down, `b` to go back, and press `q` to exit.

2. **Look at the `man` page for `ls`. What does the `-l` flag do? What does the `-a` flag do?**
   
   The `-l` flag displays files in a long, detailed list format. The `-a` flag shows all files, including hidden ones.

3. **How do you jump between words in the terminal?**
   
   Use `Alt + b` to move back one word and `Alt + f` to move forward one word.

4. **How do you get to the end of a line in terminal?**
   
   Press `Ctrl + e` to move the cursor to the end of the line.

5. **How do you move your cursor to the beginning in terminal?**
   
   Press `Ctrl + a` to move the cursor to the beginning of the line.

6. **How do you delete a word (without pressing backspace multiple times) in terminal?**
   
   Press `Ctrl + w` to delete the word before the cursor or `Alt + d` to delete the word after the cursor.

7. **What is the difference between a terminal and shell?**
   
   A terminal is the interface where you enter commands, while the shell is the program that interprets and executes those commands.

8. **What is an absolute path?**
   
   An absolute path specifies the complete path from the root directory (`/`) to a file or folder.

9. **What is a relative path?**
   
   A relative path specifies the location of a file or folder relative to the current directory.

10. **What is a flag? Give three examples of flags you have used.**
    
    A flag is an option that modifies a command's behavior. Examples include `-l` with `ls`, `-r` with `cp`, and `-f` with `rm`.

11. **What do the `r` and `f` flags do with the `rm` command?**
    
    The `-r` flag allows `rm` to delete directories and their contents recursively, and the `-f` flag forces deletion without prompting for confirmation.