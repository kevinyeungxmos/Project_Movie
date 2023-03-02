// clear form upon page-refreshing
const body = document.querySelector("body")
const paymentForm = document.querySelector("form")

if (localStorage.getItem("isRedirectedFromNowPlaying")) {
    localStorage.removeItem("isRedirectedFromNowPlaying")
}

// var for input validation
const qtyErrorMsg = document.getElementById("qty-error-msg")
const paymentErrorMsg = document.getElementById("payment-error-msg")

const resetPage = () => {
    paymentForm.reset()
    qtyErrorMsg.innerText = ""
    paymentErrorMsg.innerText = ""
    paypalLoginDiv.innerHTML = ""
    cardInfoDiv.innerHTML = ""
}

const setupErrorMsgContainer = (element) => {
    element.style.border = "2px solid #C70000"
    element.style.borderRadius = "10px"
    element.style.padding = "15px"
    element.style.marginTop = "10px"
    element.style.lineHeight = "1.5"
}

const resetErrorMsgContainer = (element) => {
    element.style.border = "none"
    element.style.borderRadius = "0"
    element.style.padding = "0"
    element.style.marginTop = "0"
    element.style.lineHeight = "0"
}

body.onload = () => { resetPage() }

// update movie showtime summary
document.getElementById("movie-title").innerText = localStorage.getItem("nowPlaying")
document.getElementById("show-date").innerText = localStorage.getItem("showDate")
document.getElementById("time").innerText = localStorage.getItem("showTime")


// update summary upon changes in ticket quantity inputs
const generalQtyInput = document.querySelector("#general-admission")
const generalQty = document.querySelector("#general-qty")
const generalTotal = document.querySelector("#general-total")

const discountQtyInput = document.querySelector("#discount-admission")
const discountQty = document.querySelector("#discount-qty")
const discountTotal = document.querySelector("#discount-total")

const subtotal = document.querySelector("#subtotal")
const tax = document.querySelector("#tax")
const totalAmt = document.querySelector("#total-payment")

const GENERAL_PRICE = 15.99
const DISCOUNT_PRICE = 12.99

const updateGeneralSummary = () => {
    const qty = parseInt(generalQtyInput.value)    // also prevent string concatenation upon innerText
    generalQty.innerText = qty
    const amt = GENERAL_PRICE * qty
    generalTotal.innerText = amt.toFixed(2)
}

const updateDiscountQty = () => {
    const qty = parseInt(discountQtyInput.value)
    discountQty.innerText = qty
    const amt = DISCOUNT_PRICE * qty
    discountTotal.innerText = amt.toFixed(2)
}

const updateSubtotal = () => {
    const amt = parseFloat(generalTotal.innerText) + parseFloat(discountTotal.innerText)
    subtotal.innerText = amt.toFixed(2)
}

const updateTax = () => {
    const amt = parseFloat(subtotal.innerText) * 0.13
    tax.innerText = amt.toFixed(2)
}

const updateTotalAmt = () => {
    const amt = parseFloat(subtotal.innerText) + parseFloat(tax.innerText)
    totalAmt.innerText = amt.toFixed(2)
}

const updateSummary = () => {
    updateGeneralSummary()
    updateDiscountQty()
    updateSubtotal()
    updateTax()
    updateTotalAmt()
}

updateSummary()

const allQtyInput = [generalQtyInput, discountQtyInput]
allQtyInput.forEach( element => {
    element.addEventListener("input", (value) => {
        if (!value.data && !element.value) {
            element.value = 0
        } else {
            element.value = parseInt(element.value)
        }
    
        updateSummary()
    })
})

// payment method
const paymentMethods = document.querySelectorAll(".payment-method")
const cardInfoDiv = document.querySelector("#card-info")
const paypalLoginDiv = document.querySelector("#paypal-login-info")

const resetPaypalLoginInfo = () => {
    paypalLoginDiv.innerHTML = ""
}

const resetCardInfo = () => {
    cardInfoDiv.innerHTML = ""
}

const initPaypalCredentialField = () => {
    paypalLoginDiv.innerHTML = "<input type='text' id='username' placeholder='Enter your Paypal username' required>"
        + "<br>"
        + "<input type='password' id='password' placeholder='Enter your Paypal password' required>"
}

const initCardCredentialField = () => {
    cardInfoDiv.innerHTML = "<input type='text' id='card-number' placeholder='Credit/Debit Card Number' required>"
        + "<br>"
        + "<input type='password' id='CCV' placeholder='CCV' required>"
}

const showPaypalForm = () => {
    resetCardInfo()
    initPaypalCredentialField()
}

const showCardForm = () => {
    resetPaypalLoginInfo()
    initCardCredentialField()
}

for (const btn of paymentMethods) {
    btn.addEventListener("change", () => {
        btn.value === "paypal" ? showPaypalForm() : showCardForm()
    })
}

// payment validation
const cardPayment = document.getElementById("card-payment")
const paypalPayment = document.getElementById("paypal-payment")

const validateQty = () => {
    if (Number(generalQtyInput.value) === 0 && Number(discountQtyInput.value) === 0) {
        generalQtyInput.style.border = "2px solid red"
        discountQtyInput.style.border = "2px solid red"
        qtyErrorMsg.innerHTML = "<span>Error:</span><br>- <span>Ticket quantities</span> cannot be zero.<br>"
        setupErrorMsgContainer(qtyErrorMsg)
        return false
    }
    return true
}

const resetPaymentMethodColor = () => {
    paypalPayment.style.border = "2px solid white"
    cardPayment.style.border = "2px solid white"
}

const validateCredentials = () => {
    let errorMsg = "<span>Error:</span><br>"
    let errorField = []

    if (document.getElementById("paypal").checked) {
        resetPaymentMethodColor()
        const username = document.getElementById("username")
        const password = document.getElementById("password")

        if (!username.value) {
            errorMsg += "- <span>Username</span> must be entered.<br>"
            errorField.push(username)

        } 
        
        if (!password.value) {
            errorMsg += "- <span>Password</span> must be entered.<br>"
            errorField.push(password)
        }
    } else if (document.getElementById("card").checked) {
        resetPaymentMethodColor()
        const cardNumber = document.getElementById("card-number")
        const ccv = document.getElementById("CCV")

        if (!cardNumber.value) {
            errorMsg += "- <span>Card Number</span> must be entered.<br>"
            errorField.push(cardNumber)

        } else if (isNaN(cardNumber.value)) {
            errorMsg += "- <span>Card Number</span> must only contain digits.<br>"
            errorField.push(cardNumber)

        } else if (cardNumber.value.length != 16) {
            errorMsg += "- <span>Card Number</span> must be 16 digits.<br>"
            errorField.push(cardNumber)
        }

        if (!ccv.value) {
            errorMsg += "- <span>CCV</span> must be entered.<br>"
            errorField.push(ccv)

        } else if (isNaN(ccv.value)) {
            errorMsg += "- <span>CCV</span> must only contain digits.<br>"
            errorField.push(ccv)

        } else if (ccv.value.length != 3) {
            errorMsg += "- <span>CCV</span> must be 3 digits.<br>"
            errorField.push(ccv)
        }

    } else {
        errorMsg += "- <span>Payment method</span> must be selected.<br>"
        errorField.push(paypalPayment)
        errorField.push(cardPayment)
    }

    if (errorField.length > 0) {
        errorField[0].focus()
        console.log(errorField)
        errorField.forEach( element => element.style.border = "2px solid red" )
        paymentErrorMsg.innerHTML = errorMsg
        setupErrorMsgContainer(paymentErrorMsg)
        return false
    }

    return true
}

const resetInputBorder = () => {
    const errorFields = document.querySelectorAll("input")
    errorFields.forEach( element => element.style.border = "2px solid gray")
}

const purchaseTickets = () => {
    if (!validateQty()) {
        return
    }

    // reset error msg and re-arrange page layout upon correct input
    qtyErrorMsg.innerText = ""
    resetErrorMsgContainer(qtyErrorMsg)
    resetInputBorder()

    if (!validateCredentials()) {
        return
    }

    paymentErrorMsg.innerText = ""
    resetErrorMsgContainer(paymentErrorMsg)
    resetInputBorder()

    alert("Purchase Success.")
    resetPage()
    updateSummary()
}

document.querySelector("button").addEventListener("click", purchaseTickets)