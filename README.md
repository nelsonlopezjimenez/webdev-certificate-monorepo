# webdev-certificate-monorepo

## last modified: 8.17.2025

## 8.17.2025

1. cis-244-246: recipe-app-2025
    1. Frontend starting code has an object to pass the hardcoded recipe array and the id number for each recipe.
    1. The logic is to add new recipes to the array and increase the id number by one
    1. The app is not connected to the backend yet.
    1. The problem for students is to figure out how to deal with the array inside and/or outside the object and how to elimitate the id number when connecting to the backend when mongo assigns a unique id.
    1. PLAN: refactor the starting app to have an array instead of an object and to add separately the id and then eliminate it easily

## 5.11.2025
1. https://www.robinwieruch.de/web-applications/
1. https://www.reddit.com/r/reactjs/comments/rm48bc/what_is_storybook_used_for/

## 5.10.2025

## bash command line piping dir content to md file

``` sh
$ for i in *.*; do echo "## item "; echo $i; echo "<pre>"; cat $i; echo "</pre>";echo ; done > all.md
```


## Quick setup — if you’ve done this kind of thing before

1. Set up in Desktop
1. or
1. HTTPS or SSH
1. git@github.com:nelsonlopezjimenez/webdev-certificate-monorepo.git
1. Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and .gitignore.

## …or create a new repository on the command line
1. echo "# webdev-certificate-monorepo" >> README.md
1. git init
1. git add README.md
1. git commit -m "first commit"
1. git branch -M main
1. git remote add origin git@github.com:nelsonlopezjimenez/webdev-certificate-monorepo.git
1. git push -u origin main

## …or push an existing repository from the command line
1. git remote add origin git@github.com:nelsonlopezjimenez/webdev-certificate-monorepo.git
1. git branch -M main
1. git push -u origin main
