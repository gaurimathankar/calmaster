let sections =document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll=() => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset =sec.offsetTop - 150;
    let height =sec.offsetHeight;
    let id =sec.getAttribute('id');
    if(top>= offset && top < offset + height){
      navLinks.forEach(Links => {
         Links.classList.remove('active');
         document.querySelector('header nav a[href*='+ id +']').classList.add('active');
     
    });
  }
});
}
 
// simple calculator

let result = document.querySelector('.container1 .result-box input');
let btns = document.querySelectorAll('.container1 .btns-box .btn');
let evalBtn = document.querySelector('.container1 .btns-box .eval-btn');
let clrBtn = document.querySelector('.container1 .btns-box .clr-btn');
let delBtn = document.querySelector('.container1 .btns-box .delete-btn');

let getValue =(e)=>{
  let btnText = e.target.innerHTML;
  if(btnText == '×'){
     btnText = '*'    
  }
  if(btnText == '÷'){
     btnText = '/';   
  }
  result.value += btnText;
}

evalBtn.addEventListener('click',()=>{
 try{
   result.value = eval(result.value);   
 }catch(err){
   result.value = btnText;    
 }    
})

clrBtn.addEventListener('click',()=>{
  result.value = '';     
});

delBtn.addEventListener('click',()=>{
  result.value = result.value.substr(0,result.value.length - 1);
})

for(let i=0;i<btns.length;i++){
  btns[i].addEventListener('click',getValue)  
}


// login 

function popup(popup_name)
{
  get_popup=document.getElementById(popup_name);
  if(get_popup.style.display=="flex")
  {
    get_popup.style.display="none";
  }
  else
  {
    get_popup.style.display="flex";
  }
}

// intrest calculator
const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;

let myChart;

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "10000";
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
};

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const calculateEMI = () => {
  checkValues();
  refreshInputValues();
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);