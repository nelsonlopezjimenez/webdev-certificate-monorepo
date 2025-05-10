# webdev-certificate-monorepo

## last modified: 5.10.2025

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
