function handleCredentialResponse(response) {
    // Here we can do whatever process with the response we want
    // Note that response.credential is a JWT ID token
    console.log("Encoded JWT ID token: " + response.credential);
}