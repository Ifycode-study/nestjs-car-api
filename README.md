
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

## TypeORM synchronize property
https://github.com/follow-course/nestjs-car-api/blob/2da777c4862cdf7e4cbdbeb687116b0284e07240/src/app.module.ts#L16

`Synchronize: true` should only be used in development, and should not be used in production. SQL database is usually very rigid. To make any changes to the structure of an SQL database/table (e.g. create or remove tables or columns, or even changing the type of data stored iin the columns), you would usually need to write "migration" code. By setting synchronize to true, typeORM will automatically do such migration. It is dangerous to use this in production so that you don't accidentally delete data for example. You need to write migration code for production.

## Understanding typeORM decorators
<img width="849" alt="TypeORM decorators to tables" src="https://user-images.githubusercontent.com/45185388/154826094-17dd42fe-75cd-4b22-96a5-c80367490017.png">

## Quick note on repositories
Check out the repository API for the different methods you can use on a DB at the [typeORM's official documentation](https://typeorm.io/#/repository-api). The diagram below shows and gives brief explanation of some repository methods used in this project:

<img width="990" alt="Screenshot 2022-02-22 at 1 54 48 AM" src="https://user-images.githubusercontent.com/45185388/155044213-a55cc50f-a4ef-4cc5-9e68-d403c16f6a49.png">

## A few extra routes: Just to help understand typeORM
Note: Yellow portin not needed for our app. Those routes are only created to help understand typeORM.
|<img width="939" alt="Screenshot 2022-02-20 at 4 15 52 AM" src="https://user-images.githubusercontent.com/45185388/154827061-3cc32eb3-8439-4289-b717-855a2d75fe82.png">|<img width="946" alt="Screenshot 2022-02-20 at 4 18 17 AM" src="https://user-images.githubusercontent.com/45185388/154827080-b1bbee06-b4a1-486c-b364-fe52e7cbeb80.png">|
|--|--|

## Validation pipe's white list property
The white list property on the validation pipe is a security measure that helps to weed out properties not stated upfront in the Dto file. For example, the user is only allowed to submit email and password fields. If user tries to add a field or property e.g. admin and sets it to true (so that he/she can do things that only admins are supposed to be ale to do), the whitelist property on the validation pipe will ensure such is does not padd through.
https://github.com/follow-course/nestjs-car-api/blob/54980c6be3074d2507c68defb787b392d5c1ad7d/src/main.ts#L9

## Notes on serialzation
The password property for example shouldn't be passed along with data from our api when we attempt to get, post, delete etc. Nest js suggests that you [Exclude the response property](https://github.com/Ifycode-study/nestjs-car-api/commit/996b3559d847f9a1bc44ed334c964603db103149) from within thhe .entity.ts file and with the in built `ClassSerializerInterceptor` used inside of the controller. While this works/helps for the case we are currently using it for, it can't help if you need to separate the response for a regular user from that of the admin. The best way is to build your own custom interceptor and create a Dto file that will expose only properties you want to be included in the response (See commits on Feb 23, 2022).

## Authentication Overview

|![Screenshot_20220225-065325](https://user-images.githubusercontent.com/45185388/155663298-cc9774f1-4c19-45f4-95a9-95e89775646d.jpg)|![Screenshot_20220225-072451](https://user-images.githubusercontent.com/45185388/155858124-7a667445-c4ba-45a6-b2f3-77af3481bcf4.jpg)|
|--|--|

Note: The methods inside AuthService can instead be inside of the UserService if the application is small. But in large applications it is better that this separate AuthService is created. The AuthService depends on the UserService.


## Notes on salting and hashing
Passwords should not be stored directly as plain strings in the database... Salt and hash the password before storing for security reasons.

|![Screenshot_20220225-075636](https://user-images.githubusercontent.com/45185388/155858079-1ca59ceb-0f5a-4400-9d74-2679cf349f1e.jpg)|![Screenshot_20220225-075737](https://user-images.githubusercontent.com/45185388/155858080-4992bd1f-86df-4465-9a7b-49e6b72d6962.jpg)|![Screenshot_20220225-075846](https://user-images.githubusercontent.com/45185388/155858081-4c083a34-1499-4442-9f0c-feb52ec84e40.jpg)|
|--|--|--|

Use these inbuilt node packages: `randomBytes` to generate a salt (i.e. a string of random letters) and `scrypt`  which is thhe hashing function for hashing your password. Note that naturally, scrypt would make us uuse a callback - the `promisify` package ensures that it instead returns a promise not a callback.
