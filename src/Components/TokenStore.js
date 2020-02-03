import { BehaviorSubject } from "rxjs";

export const token$ = new BehaviorSubject(localStorage.getItem("token")); //skapar nytt storage med värdet som finns i localStorage, skapar en observable som vi sparar i vår token$. skapar en ny instans med nyckelordet new.

//funktion uppdaterar vårt storage med vårt nya token, detta är en action.
export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token); //uppdaterar värdet med next
}



/*------ COMMENTS ------*/

// getitem = hämtar 
// setItem = lokala minnet, för att inte behöva logga in hela tiden
// removeItem = tar bort token från lokala minnet
// token$ = variabeln som blir instansen, är en Observable
// token = (kan heta vad som helst) det långa lösenordet vi får ifrån servern
