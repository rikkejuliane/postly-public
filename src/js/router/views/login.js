import { onLogin } from "../../ui/auth/login";

const form = document.forms.login;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.querySelector('button').disabled = true;
  try {
    await onLogin(event);
    window.location.href = "/";
  } catch (error) {
    console.error("Error in login:", error);
    alert(error.message);
  }
  finally {
    document.querySelector('button').disabled = false;
  }
});
