//Google Client ID
var clientID = "821121065712-pn98t9b5p5dsobjl5lbg73l9auaabm33.apps.googleusercontent.com";

function handleCredentialResponse(response) {
    // Here we can do whatever process with the response we want
    // Note that response.credential is a JWT ID token
    console.log("Encoded JWT ID token: " + response.credential);
}
  
window.onload = function () {
    google.accounts.id.initialize({
        client_id: clientID, // Replace with your Google Client ID
        callback: handleCredentialResponse // We choose to handle the callback in client side, so we include a reference to a function that will handle the response
    });
    // You can skip the next instruction if you don't want to show the "Sign-in" button
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"), // Ensure the element exist and it is a div to display correcctly
        { theme: "outline", size: "medium" }  // Customization attributes
    );
    google.accounts.id.prompt(); // Display the One Tap dialog
}