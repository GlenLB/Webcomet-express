// MAIL
let btnSubmit = document.querySelector("#btnSubmit");

btnSubmit.onclick = () => {
    let emailAddress = document.querySelector("#emailAddress").value;
    let message = document.querySelector("#message").value;
    let formulaire = document.querySelector("form");
    let divReponse = document.querySelector("#reponse");

    divReponse.innerHTML = "";
    divReponse.style.display = "block";
    let gifLoading = document.createElement("img");
    gifLoading.src = "/img/loading.gif";
    gifLoading.style.width = "25px";
    divReponse.appendChild(gifLoading);

    if (emailAddress.length >= 10 && message.length >= 10 && emailAddress.includes('@')) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                if (xhr.responseText == 'ok') {
                    divReponse.innerHTML = "";
                    divReponse.style.backgroundColor = "yellowgreen";
                    divReponse.innerText = "Votre message a été envoyé avec succès. J'y répondrai dans les meilleurs délais.";
                } else if (xhr.responseText == 'error') {
                    divReponse.innerHTML = "";
                    divReponse.style.backgroundColor = "red";
                    divReponse.innerText = "Il y a eu une erreur au niveau du serveur.<br>Merci de réesayer dans quelques minutes."
                }
            }
        }
        xhr.open('POST', '/mail', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`emailAddress=${emailAddress}&message=${message}`);
    } else {
        divReponse.innerHTML = "";
        divReponse.style.backgroundColor = "red";
        divReponse.innerText = "Merci de bien remplir les champs demandés";
    }
}
