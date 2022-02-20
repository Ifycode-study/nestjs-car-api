# Nestjs (used) car API

Course: "NestJS: The Complete Developer's Guide" by Stephen Grider.

| App overview | API design | Module design |
|--|--|--|
|<img width="989" alt="Car api overview" src="https://user-images.githubusercontent.com/45185388/154809181-f28f248c-8162-4a7c-a1cb-c10d0882d489.png">|<img width="997" alt="Car api design" src="https://user-images.githubusercontent.com/45185388/154809257-2b617c58-1b71-4b59-aaab-1f52f51a2033.png">|<img width="988" alt="Car apii module design" src="https://user-images.githubusercontent.com/45185388/154810112-094d5ae4-38d5-4532-a95f-dddf3b743a5e.png">|

## Install typeorm and DB
````
npm i @nestjs/typeorm typeorm sqlite3
````

## Database connection setup
Database name is db.sqlite as written in the appModuleinside the TypeOrmModule object. Starting your development server in the terminal will cause a file called db.sqlite to be generated in the root of the project (I've added this file to gitignore since I don't know if iit's safe to upload it to github).
https://github.com/follow-course/nestjs-car-api/blob/d631aadd2303e97bd730b16bee615be66ebb7e6d/src/app.module.ts#L12

## Creating an entity
- Create an entity file: The class in the fiile will list all the properties that your entity will have.
- Connect the entity to it's parent moduule - this creates an entity.
- Connect the entity to the root i.e. the appModule.

## Viewing a DB's content: Using vscode SQLite extension
You will only be able to view the generated db.sqlite file the first time you open it up with the editor. To view the DB's content, you need to install an external extension or program. Using vscode extension:
- Install "SQLite" from vscode extension
- Still in vscode, go to view > command pallete
- Search for "SQLite: open database"
- Click on the database name which is same as the one in the root of your project

After these, you'll find a "sqlite explorer" collapsible dropdown towards the bottom of your vscode explorer. You will find your DB content in there.
