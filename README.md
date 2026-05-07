# FIGTakeHome
To get the DB setup:
1. open appsettings.json in the API project
2. adjust the line: "Default": "Server=.\\SQL2022;Database=FIGTakeHomeDB;Trusted_Connection=True;TrustServerCertificate=True;"
  a. change the "Service = .\\SQL2022;..." to your local server name
3. open package manager console
4. run "dotnet ef migrations add SeedInitialData --project FIGTakeHomeAPI"
5. then run "dotnet ef database update --project FIGTakeHomeAPI"
6. run the API project and open sql server and confirm the seed data is there. 


To run the app:
1. Run the API Project
2. CD into localLocation\FIGTakeHomeAngular\src\
3. run npm install
4. run ng serve 
