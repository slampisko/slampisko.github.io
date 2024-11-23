const redirectToBossList = () => {
    window.location.assign("./active-bosses/index.html");
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#js_test").textContent = "You'll be redirected to it shortly.";
    setTimeout(redirectToBossList, 5000);
});
