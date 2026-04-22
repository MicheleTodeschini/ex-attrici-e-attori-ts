import type { Actress } from "./types"

function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === "object" &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "name" in dati &&
    typeof dati.name === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "awards" in dati &&
    typeof dati.awards === "string" &&
    "nationality" in dati &&
    typeof dati.nationality === "string" &&
    "most_famous_movies" in dati &&
    Array.isArray(dati.most_famous_movies) &&
    dati.most_famous_movies.length === 3 &&
    dati.most_famous_movies.every(movie => typeof movie === "string")
  ) {
    return true
  }
  return false
}

async function getActress(id: number): Promise<Actress | null > {
    try {
        const response = await fetch(`http://localhost:3333/actresses/${id}`)

    if (!response.ok) {
      throw new Error(`Errore http ${response.status}: ${response.statusText}`)
    }
    const dati: unknown = await response.json()
    if (!isActress(dati)) {
      throw new Error('formato dei dati non valido')
    }
    console.log(dati);
    return dati 
  
  } catch (errore) {
    if (errore instanceof Error) {
      console.error(`Errore durante il recupero dei dati`, errore.message)
      
    } else {
      console.error('errore sconosciuto:', errore)
    }
    return null
  }

  
}

getActress(4)


async function getAllActresses(): Promise<Actress[]>{
    try {
        const response = await fetch('http://localhost:3333/actresses')
        if (!response.ok) {
      throw new Error(`Errore http ${response.status}: ${response.statusText}`)
    }
     const dati: unknown = await response.json()
     if (!(dati instanceof Array)) {
        throw new Error('Formato dei dati non valido: non è un Array')
     }
     const attriciEffettive: Actress[]  = dati.filter(isActress)
     return attriciEffettive
    } catch (errore) {
         if (errore instanceof Error) {
      console.error(`Errore durante il recupero dei dati`, errore.message)
      
    } else {
      console.error('errore sconosciuto:', errore)
    }
    return []
    }
}

async function getActresses(id: number[]):Promise < (Actress | null)[]> {
    try {
        const promises = id.map(id => getActress(id))
        const attrici = await Promise.all(promises)
        console.log(attrici);
        
        return attrici
    } catch (errore) {
         if (errore instanceof Error) {
      console.error(`Errore durante il recupero dei dati`, errore.message)
      
    } else {
      console.error('errore sconosciuto:', errore)
    }
    return []
    }
}

getActresses([4, 6, 7, 8])