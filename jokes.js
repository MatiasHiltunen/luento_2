// Tuodaan axios HTTP-kirjasto käytettäväksi tiedostossa axios paketista joka asennettiin 
// komennolla 'npm install axios'
// Axioksen dokumentaatio ja käyttöohjeet löytyvät täältä:
// https://www.npmjs.com/package/axios
import axios from 'axios'

// Tehtiin funktio getJokes käyttämällä fat-arrow syntaksia
// Lisättiin async avainsana mukaan jolla saadaan funktion sisällä 'await' käyttöön.
// Await odottelee asynkronisen operaation valmistumisen, kuten tässä HTTP-rajapintakyselyn, 
// ja jatkaa sitten koodin suorittamista funktion sisällä.   
export const getJokes = async() => {

    // await axios.get() palauttaa Promisen, Promise on ei-tosiaikainen operaatio ja sen valmistuminen täytyy 
    // odotella käyttämällä async funktion tarjoamaa 'await' avainsanaa.

    // Axioksella tehty kysely palauttaa axioksen response objektin joka sisältää varsinaisen datan 
    // avaimella data.

    // Objektin perusteista lisää kurssimateriaalista:
    // https://wojsdocs.wp-uc.com/materiaalit/#object

    // Axios myös muuntaa JSON stringinä saadun vastauksen automaattisesti JavaScript tietotyyppiin, esim. Arrayksi
    // tai objektiksi, riippuen JSON:vastauksesta.

    /* 
    
        Voidaan kuvailla axios response objektia esim. näin:

        AxiosResponse = {
            ...   // muuhun sisältöön meidän ei tarvitse nyt koskea
            data: // Tässä on data joka on saatu rajapinnasta
            ...
        }

        Tässä käytettiin javaScriptin Object destructuring menetelmää jolla saatiin otettua 'data' axiosResponse objektista 
        suoraan omaan muuttujaan 
    */
    const { data } = await axios.get('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=10')

    // Analysoitiin saatua dataa josta nähtiin että data objektin sisällä oli avaimella 'jokes' arvona array 
    // joka sisälti listan objekteja yksittäisestä vitsistä.

    // Luotiin muuttuja jokesArray johon data.jokes.map() luo uuden arrayn mapin callback funktiossa palautetun 
    // datan perusteella

    // Arrayn perusteista ja mapista lisää kurssimateriaalissa:
    // https://wojsdocs.wp-uc.com/materiaalit/#array
    const jokesArray = data.jokes.map((jokeItem) => {
        // Tiedettiin että objekteja oli kahdenlaisia, erottavana tekijänä
        // huomattiin että jokeItem.type oli joko "single" tai "twopart".
        // Käytettiin tätä tietoa hyödyksi eri tyyppisten objektien erottamiseksi keskenään.
        // Eli jos type === 'single' niin funktio palauttaa arvon jokeItem.joke
        if (jokeItem.type === "single") {
            return jokeItem.joke
        }

        // Jos jokeItem.type oli muu kuin single niin oletettiin että tyyppi oli tällöin
        // "twopart". Yhdistettiin kaksiosainen vitsi yhdeksi stringiksi rivinvaihdolla eli "\n" merkillä.
        return jokeItem.setup + '\n' + jokeItem.delivery
    })

    // Palautettiin jokesArray getJokes funktiosta
    return jokesArray
}