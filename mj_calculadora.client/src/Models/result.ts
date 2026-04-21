export interface Result {
  errorMessage?: string;
  correct: boolean;
  ex?: any; //cualquier tipo 
  objects?: object[]; //lista de Objetos
  object?: object;
}
