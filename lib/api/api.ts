import axios from "axios";
import type {  Note } from "../../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
const api = axios.create({
  // baseURL: "https://notehub-api.goit.study",
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  // baseURL:  "http://localhost:3000/api",
  
withCredentials:true
});




export interface RegisterData {
  email: string;
  password: string;
}


export interface CheckSession{
  success:boolean
}