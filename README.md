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
