# Kommentezős weboldal fejlesztése

Szluka András, XC291J

Programrendszerek fejlesztése IMN109L-1


## Feladat megvalósítása

### Backend:

- backend statikusan hostolja a frontendet: 
    - public mappába ment 
- MogoDB: 
    -   localhoston keresztül csatlakozik hozzá
- Bootstrapelés (seedelés): 
    -   db/seed.js
- 2 modell:
     -   Listing és Comment
- hook: 
    -   jelszó titkosítás regisztrációkor
    -   A FELHASZNÁLÓNEVET ÁTÍRJA CSUPA KISBETŰRE!!!
- lokális auth. stratégia: 
    -   passport.js
- login session szerverrel: 
    -   passport.js
- CRUDok és Routeok: 
    -   users.router.js & listings.router.js

### Frontend:

- kommunikáció: 
    -   igen
- routok: 
    -   app-routing.module.ts
- A frontend rendelkezik legalább egy regisztráció, egy login, egy főoldal/terméklista, egy admin felület, egy termék részletező és egy egyéb komponenssel, melyek fel vannak töltve megfelelő tartalommal: 
    -   login, register, list, rá lehet kattintani az egyes posztokra, logout.
- A frontend a bejelentkezéshez a backend megfelelő végpontjait szólítja meg: 
    -   igen
- A backenddel való kommunikáció elemei ki vannak szervezve service-ekbe: 
    -   igen
- Van authguard, amely védi a login, register utáni route-okat és az admin felületét:
    - auth.guard.ts

## Lokális telepítés, tesztelés, futtatás

### 1. Környezet

A program futtatásához szükséges a Node.js és a NPM telepítése. Valamint a MongoDB szerver elérhetősége. (én lokális MongoDB-t használtam)

### 2. Telepítés

a `backend` mappában:

```bash
cd client
npm install
```

a `frontend` mappában:

```bash
cd server
npm install
```

### 3. Futtatás

a `frontend` mappában:

```bash
npm run build
```

majd a `backend` mappában:

```bash
npm run start
```

### 4. Bejelentkezés
    Sima user:
    Felhasználónév: user
    Jelszó: user

    Admin:
    Felhasználónév:: admin
    Jelszó: admin

### 5. Extra infók
    sima userként csak a saját kommentedet tudod törölni
    saját kommentedet nem tudod lájkolni