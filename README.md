# Puslpais naudojant Node, React ir MySQL

Visi duomenų bazės nustatymai yra .env faile \
Duomenų bazės naudojamos lentelės pavyzdys yra ./RecipeApp.sql

Docker konfiguracijos neveikia

Puslapio adresas http://localhost:5173/ \
Serverio adresas http://localhost:4000 \
Puslapis prisijungia prie MySQL http://0.0.0.0:3306 adresu

Norint paleisti rekia atsisiusti bibliotekas paleidus aplankuose ./api ir ./client \
"pnpm install"

Paleisti naudojama ./startup.sh arba iš pagrindinio atskirai paleidus \
cd ./api && node index.js \
cd ./client && pnpm dev

Puslapio navigacija naudoja "react-router" pas vartotoją ir duomenys iš duomenų bazės gaunami siunčiant prašymus serverio adresu http://localhost:4000 \
Nuotraukos saugomos ./api/uploads aplanke, o duomenų bazėje adresai

Puslapio funkcijos:
- Registracija
- Prisijungimas
- Kurti receptą
- Redaguoti receptą
- Pridėti nuotrauką receptui
- Atlikti paiešką receptų
- Pasirinkti porcijas

Formos nėra apsaugotos nuo neteisingo įvedimo