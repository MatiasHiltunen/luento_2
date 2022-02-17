// Kopioitiin serverin luomiseen liittyvä koodi Node.js:n omalta sivulta:
// https://nodejs.org/en/about/
// Vaihdettiin commonJs moduuli const http = require('http');
// käyttämään ES Moduuleja:
import http from 'http'

// Tuotiin getJokes funktio tiedostosta jokes.js.
// Lisää importista ja exportista kurssimateriaaleista:
// https://wojsdocs.wp-uc.com/materiaalit/#javascript-modules
import {​​​​​​ getJokes }​​​​​​ from './jokes.js';

// Palvelin tarvii ip osoitteen (hostname) ja portin jota se alkaa kuuntelemaan, 
// nämä olivat kopioidussa koodissa oletuksena:
const hostname = '127.0.0.1';
const port = 3000;

// Node.js:n sisään rakennettu http kirjasto sisältää metodin createServer.
// Se luo uuden server objektin - instanssin.

// createServer ottaa parametrinä funktion, missä req on kysely (request) jonka selain tekee palvelimelle
// ja res on response millä palvelin vastaa selaimelle.

// Tehtiin callback funktiosta async jotta voitiin käyttää 'await':iä funktiossa.
const server = http.createServer(async(req, res) => {​​​​​​ 

    // Asetetaan vastaukseen selaimelle statuskoodi 200
    // Mitä statuscodeja on olemassa ja mitä ne tarkoittavat:
    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    res.statusCode = 200; 

    // Asetettiin responsen heariin content-type jotta selain tietää minkä tyyppistä
    // dataa palvelin lähettää:
    // Lisää headereista: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
    res.setHeader('Content-Type', 'application/json'); 

    // Käytettiin aiemmin luotua getJokes funktiota, joka hakee vitsit jokes-rajapinnasta,
    // Koska getJokes on async funktio niin odotellaan sen valmistuminen awaitilla.
    const jokesArray = await getJokes() 

    // Muutettiin jokesArray JSON stringiksi.
    // res.end() lähettää vastauksen selaimelle.
    res.end(JSON.stringify(jokesArray));
}​​​​​​);

// Server listen käynnistää palvelimen, se ottaa kolme parametria,
// portin, hostnamen (ip), ja callback funktion jonka se suorittaa kun palvelin käynnistetään
server.listen(port, hostname, () => {​​​​​​ 
    console.log(`Server running at http://${​​​​​​hostname}​​​​​​:${​​​​​​port}​​​​​​/`);
}​​​​​​);