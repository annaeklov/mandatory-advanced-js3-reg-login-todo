import { BehaviorSubject } from 'rxjs';

/* export const token$ = new BehaviorSubject(localStorage.getItem("token")); //skapar nytt storage med värdet som finns i localStorage, skapar en observable som vi sparar i vår token$.

//funktion uppdaterar vårt storage med vårt nya token, detta är en action.
export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token); //uppdaterar värdet med next */