
/** articles indexes **/
db.getCollection("articles").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** category indexes **/
db.getCollection("category").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** categorys indexes **/
db.getCollection("categorys").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** contacts indexes **/
db.getCollection("contacts").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** departments indexes **/
db.getCollection("departments").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** employees indexes **/
db.getCollection("employees").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** articles records **/
db.getCollection("articles").insert({
  "_id": ObjectId("5391988501dd4a0413000002"),
  "body": "Angular.js är ett MVC-ramverk. Dess anhängare gör också anspråk på att i stort sett kunna ersätta en mängd andra bibliotek (t.ex. jQuery), vilket tills viss del stämmer.AngularJS — Superheroic JavaScript MVW Framework.Det som kan kännas lite skrämmande när man lär sig angular.js (och kommer från ”vanilla” HTML\/CSS\/JS\/jQuery) är att det både är flera nya koncept (MVC, routers, filters, promises etc) och en ny syntax ($.scope, $.http etc) som man behöver bemästra.Veckan som Benjamin hade med gick igenom ganska mycket kring flera ganska avancerade koncept i angular.js, därefter har många av er valt att lära er mer genom att inkludera och basera era grupparbeten på angular.js. Vilket är fantastiskt att se!Men det finns också dem som är lite lätt förvirrade av angular.js forfarande (jag kan räkna in mig själv här ibland). I grunden är dock MVC ingen magi – vilket våra inledande exempel denna vecka när jag på två timmar byggde en liten grund för en MVC-motor visar. Ingen magi och ingen rocket science, så ge det tid och du kna lära dig!",
  "categoryId": "5395995b01dd4ae420000002",
  "smallbody": "Angular.js är ett MVC-ramverk. Dess anhängare gör också anspråk på att i stort sett kunna ersätta en mängd andra bibliotek (t.ex. jQuery), vilket tills viss del stämmer.AngularJS — Superheroic JavaScript MVW Framework.",
  "title": "Angular.js revisited"
});
db.getCollection("articles").insert({
  "_id": ObjectId("5391998001dd4ad81f000000"),
  "body": "When making the calls, we need to remember that the first parameter contains the actual data. These data will be used as the parameters of the API. This can be appended like query strings or POSTed. The API will use these data to filter the response. Where as the second parameter overrides the default parameters for the resource definition. It is used by Angular to decide how to make the REST call. In our case, we used – “\/api\/booking\/:Id” as our api entry point and then defined default parameters as – {Id: “@Id” }. So here, the second parameter will help angular decide which URL (by providing the value for Id) to make the request to. We didn’t need to pass any data but we did need to pass the ID in some methods. This is why most of the methods were passed an empty object as the first parameter.",
  "categoryId": "5395996b01dd4ae420000003",
  "smallbody": "When making the calls, we need to remember that the first parameter contains the actual data. These data will be used as the parameters of the API. This can be appended like query strings or POSTed. The API will use these data to filter the response.",
  "title": "REST"
});
db.getCollection("articles").insert({
  "_id": ObjectId("5391972701dd4ad41c000001"),
  "body": "Git är i grunden command line-baserat, dvs. man skriver olika textkommandon för att använda sig av Git. En mycket bra tutorial om du vill lära dig Gits textkommandon är:Git Immersion – Brought to you by Neo. På sikt är det väldigt bra att behärska Gits textkommandon. Det ger en bättre förståelse för Git och därmed större möjlighet att lösa problem som kan uppkomma i versionshanteringen. Den grafiska klient vi installerar nedan (SmartGit) tar normalt hand installationen av Git-protokollet i sig på din dator, men skulle den inte göra det kan du följa instruktionerna på Git Immersion kring hur du installerar Git. På Mac- och Linux-datorer kan du skriva Git-kommandon direkt i den vanliga terminalen (när du är i en mapp som versionskontrolleras av Git). På Windows-datorer behöver du en speciell terminal. Använder du ett program som SmartGit (se nedan) kan du nå denna terminal från programmet Tools -> Open Git-shell.",
  "categoryId": "5395994b01dd4ae420000001",
  "smallbody": "Git är i grunden command line-baserat, dvs. man skriver olika textkommandon för att använda sig av Git. En mycket bra tutorial om du vill lära dig Gits textkommandon är:Git Immersion – Brought to you by Neo.",
  "title": "Local storage"
});

/** category records **/

/** categorys records **/
db.getCollection("categorys").insert({
  "_id": ObjectId("5395994b01dd4ae420000001"),
  "name": "JavaScript"
});
db.getCollection("categorys").insert({
  "_id": ObjectId("5395995b01dd4ae420000002"),
  "name": "Angular"
});
db.getCollection("categorys").insert({
  "_id": ObjectId("5395996b01dd4ae420000003"),
  "name": "Rest"
});

/** contacts records **/
db.getCollection("contacts").insert({
  "firstname": "Harry",
  "lastname": "Harry",
  "age": NumberInt(22),
  "_id": ObjectId("538710bb0704c310145f5e9b"),
  "__v": NumberInt(0)
});

/** departments records **/
db.getCollection("departments").insert({
  "_id": ObjectId("53871a4601dd4a1015000000"),
  "name": "CocaCola",
  "streetAdress": "Main str., 12",
  "zipCode": "12456",
  "town": "NewJork",
  "info": "This company make cola"
});
db.getCollection("departments").insert({
  "_id": ObjectId("53871aa501dd4a1015000001"),
  "name": "Macdonalds",
  "streetAdress": "Green str., 65",
  "zipCode": "12236",
  "town": "Basington",
  "info": "This company make smorgos"
});

/** employees records **/
db.getCollection("employees").insert({
  "departmentId": "53871a4601dd4a1015000000",
  "pno": NumberInt(1234),
  "firstname": "Peter",
  "lastname": "Jacob",
  "age": NumberInt(66),
  "salary": NumberInt(1500),
  "_id": ObjectId("53871ac4f398313c0a9cf497"),
  "__v": NumberInt(0)
});
db.getCollection("employees").insert({
  "departmentId": "53871aa501dd4a1015000001",
  "pno": NumberInt(4534555),
  "firstname": "Harry",
  "lastname": "Potter",
  "age": NumberInt(18),
  "salary": NumberInt(2000),
  "_id": ObjectId("53871b2cf398313c0a9cf498"),
  "__v": NumberInt(0)
});
db.getCollection("employees").insert({
  "departmentId": "53871a4601dd4a1015000000",
  "pno": NumberInt(7876565),
  "firstname": "Olle",
  "lastname": "Nilsson",
  "salary": NumberInt(5000),
  "_id": ObjectId("538850ac0592cb6822f8d6cd"),
  "__v": NumberInt(0)
});

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "name": "_id_",
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "wages_database.employees"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "name": "_id_",
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "wages_database.contacts"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "name": "_id_",
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "wages_database.departments"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "name": "_id_",
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "wages_database.articles"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "name": "_id_",
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "wages_database.category"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "name": "_id_",
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "wages_database.categorys"
});
