export interface Props {
    type : string,
    onSubmit : (data:UserDataTypes)=> void
    
  }

  export interface UserDataTypes{
    username : string,
    email : string,
    password : string
  }