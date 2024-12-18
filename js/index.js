//import { initializeApp } from "../../node_modules/firebase/app";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/firestore';
//import 'firebase/compat/auth';

  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "example.firebaseapp.com",
    databaseURL: "https://example.firebaseio.com",
    projectId: "project_id",
    storageBucket: "project_id.firebasestorage.app",
    messagingSenderId: "msg_sender_id",
    appId: "appID"
  };

  // Initialize Firebase
  //initializeApp(firebaseConfig);
  //const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  
  //const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
//const db = firebaseApp.firestore();
//const auth = firebase.auth();

//export { auth, db };
  firebase.auth.Auth.Persistence.LOCAL;

 $("#btn-login").click(function(){
  var email = $("#email").val();
  var password = $("#password").val();

  if(email != "" && password != ""){
    var result = firebase.auth().signInWithEmailAndPassword(email, password);
    result.catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      window.alert("Message: " + errorMessage);
    });
  }else{
    window.alert("Por favor preencha todos os campos!");
  }
 });

 $("#btn-signup").click(function(){
  var email = $("#email").val();
  var password = $("#password").val();
  var cPassword = $("#confirmPassword").val();

  if(email != "" && password != "" && cPassword != ""){
    if(password == cPassword){
      var result = firebase.auth().createUserWithEmailAndPassword(email, password);
      result.catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message: " + errorMessage);
      });
    }else{
      window.alert("Senhas não correspondem!");
    }
  }else{
    window.alert("Por favor preencha todos os campos!");
  }
 });

 $("#btn-resetPassword").click(function(){
  var auth = firebase.auth();
  var email = $("#email").val();

  if(email != ""){
    auth.sendPasswordResetEmail(email).then(function(){
      window.alert("Email enviado com sucesso! Verifique sua caixa de entrada.");
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      window.alert("Message: " + errorMessage);
    });
  }else{
    window.alert("Por favor digite um email!");
  }
 });

 $("#btn-update").click(function(){
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var uf = $("#uf").val();
  var phone = $("#phone").val();
  var gender = $("#gender").val();
  var address = $("#address").val();
  var cpf = $("#cpf").val();

  var rootRef = firebase.database().ref().child("usuario");
  var userID = firebase.auth().currentUser.uid;
  var userRef = rootRef.child(userID);

  if(firstName != "" && lastName != "" && uf != "" && phone != "" && gender != "" && address != "" && cpf != ""){
    userData = {
      "nome": firstName,
      "sobrenome": lastName,
      "telefone": phone,
      "genero": gender,
      "uf": uf,
      "endereco": address,
      "cpf": cpf
    };

    userRef.set(userData, function(error){
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message: " + errorMessage);
      }else{
        window.location.href = "dashboard.html";
      }
    });
  }else{
    window.alert("Por favor preencha todos os campos!");
  }

  
 });

 $("#btn-logout").click(function(){
  firebase.auth().signOut();
 });
 