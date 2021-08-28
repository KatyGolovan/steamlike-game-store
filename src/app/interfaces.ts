export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
  }
  
  export interface FbAuthResponse {
    idToken: any
    expiresIn: any
  }
  
  // export interface Post {
  //   id?: string
  //   title: string
  //   text: string
  //   author: string
  //   date: Date
  // }
  export interface Game {
    bougth: boolean
    name: string
    price: string
    tags: []
  }
  export interface FbCreateResponse {
    name: string
  }
  