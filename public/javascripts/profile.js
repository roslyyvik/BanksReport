let newPasswordValue
let confirmationValue
const submitBtn = document.getElementById('update-profile')
const newPassword = document.getElementById("new-password")
const confirmation = document.getElementById("password-confirmation")
const validationMessage = document.getElementById("validation-message")
function validatePasswords(message, add, remove) {
  validationMessage.textContent = message
  validationMessage.classList.add(add)
  validationMessage.classList.remove(remove)
}
confirmation.addEventListener("input", e => {
  e.preventDefault()
  newPasswordValue = newPassword.value
  confirmationValue = confirmation.value
  if(newPasswordValue != confirmationValue){
    validatePasswords("Паролі не збігаються", "color-red", "color-green")
    submitBtn.setAtribute('disabled', true)
  }else {
    validatePasswords("Паролі збігаються", "color-green", "color-red")
    submitBtn.removeAtribute('disabled')
  }
})
