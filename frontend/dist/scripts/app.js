// basic data for calculator
const calculatorData = {
    randomThemeOnLoad: false,
    defaultTotal: {
        showDefaultTotal: true,
        total: '',
    },
    defaultTippingOptions: [5, 10, 15],
    customTip: true,
    defaultSplitTotal: 6
}

const toCalculate = {
    bill: 0,
    tip: 5,
    split: 1,
    customTip: false,
    customTipValue: 0
}


// theme logic
if (calculatorData.randomThemeOnLoad) {
    const colors = ['#87C0D0', '#8FBDBA', '#B38EAE', '#A3BE8C'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.setProperty('--main-theme', colors[randomIndex]);
}

// bill total
const billTotal = {
    total: calculatorData.defaultTotal.total,
    input: document.getElementById('bill-total-input'),
    tipAmountText: document.getElementById('tip-amount-text'),
    totalAmountText: document.getElementById('total-amount-text'),
    UI: {
        build: () => {
            if (calculatorData.defaultTotal.showDefaultTotal) {
                billTotal.input.value = calculatorData.defaultTotal.total;
            }
        }
    }
}

// tip options
const tipOptions = {
    UI: {
        tipOptionBtnContianer: document.getElementById('tip-option-btn-container'),
        build: () => {
            // build tip options
            calculatorData.defaultTippingOptions.forEach(option => {
                let btn = document.createElement('button');
                btn.classList = 'tip-option';
                let span = document.createElement('span');
                span.classList = 'tip-option-number';
                let percent = document.createElement('span');
                percent.textContent = '%';
                span.textContent = option
                btn.appendChild(span);
                btn.appendChild(percent);
                tipOptions.UI.tipOptionBtnContianer.appendChild(btn);
            });
            // set default active tip
            let tipOptionBtns = document.querySelectorAll('.tip-option');
            tipOptionBtns[0].classList.add('active');
        }
    }
}

// split options
const splitOptions = {
    UI: {
        build: () => {
            const container = document.getElementById("split-container");
            for (let i = 0; i < calculatorData.defaultSplitTotal; i++) {
                let li = document.createElement('li');
                let icon = document.createElement('i');
                icon.classList = 'fa-solid fa-person';
                li.appendChild(icon)
                container.appendChild(li);
            }
            // set default active split option
            let defaultSplit = document.querySelectorAll('#split-container li');
            defaultSplit[0].classList.add('active');
        }
    }
}




// function to show additional info
function showAdditionalInfo(visibility) {
    const billInfo = document.getElementById('bill-info');

    if (visibility) {
        billInfo.classList.add('show');
    } else {
        billInfo.classList.remove('show');
    }
}


// function to calculate bill
function calculateBill() {
    const additionalInfo_tipAmount = document.getElementById('tip-amount-text');
    const additionalInfo_totalWithTip = document.getElementById('total-amount-text');

    const finalOutput = document.querySelector('.final-output span');
    let bill = toCalculate.bill;
    let tip;
    let split = toCalculate.split;
    let final;

    if (toCalculate.customTip) {
        tip = toCalculate.customTipValue;

        additionalInfo_tipAmount.textContent = tip.toFixed(2);
        additionalInfo_totalWithTip.textContent = (bill + tip).toFixed(2);

        final = (bill + tip) / split;
    } else {
        tip = toCalculate.tip / 100;
        tipTotal = bill * tip;

        additionalInfo_tipAmount.textContent = tipTotal.toFixed(2);
        additionalInfo_totalWithTip.textContent = (bill + tipTotal).toFixed(2);

        final = (bill + tipTotal) / split;
    }



    finalOutput.textContent = final.toFixed(2);
}

// handling the application
const application = {
    build: () => {
        billTotal.UI.build();
        tipOptions.UI.build();
        splitOptions.UI.build();
    },
    events: { 
        billTotal: () => {
            const input = document.getElementById('bill-total-input');
            input.addEventListener('keyup', e => {
                let value = input.value;
                if (isNaN(value) || value === ' ' || value === '') {
                    input.value = '';
                    toCalculate.bill = 0;
                    showAdditionalInfo(false);
                } else {
                    toCalculate.bill = Number(value);
                    calculateBill();
                    showAdditionalInfo(true);
                }
            })
        },
        tipOptions: () => {
            const tipContainer = document.querySelector('#tip-option-btn-container');
            const customTipBtn = document.getElementById('custom-tip-btn');
            tipContainer.addEventListener('click', e => {
                let tips = document.querySelectorAll('.tip-option-btn-container button');
                let spans = document.querySelectorAll('.tip-option-number');
                tips.forEach(tip => {
                    tip.classList.remove('active');
                });
                tips.forEach((tip, index) => {
                    if (e.target === tip) {
                        toCalculate.tip = Number(spans[index].textContent);
                        toCalculate.customTip = false;
                        tip.classList.add('active');
                        customTipBtn.classList.remove('active');
                        customTipBtn.textContent = 'Custom Tip';
                        calculateBill();
                    }
                });
            });       
        },
        customTip: () => {
            const customTipBtn = document.getElementById('custom-tip-btn');
            const overlay = document.getElementById('overlay')
            const closeModal = document.querySelectorAll('.close-modal');
            const modal_confirmBtn = document.getElementById('confirm-tip');
            const modal_tipInput = document.getElementById('custom-tip-amount');
            customTipBtn.addEventListener('click', () => {
                overlay.classList.toggle('show');
            });
            closeModal.forEach(btn => {
                btn.addEventListener('click', () => {
                    overlay.classList.toggle('show');
                    modal_confirmBtn.classList.add('disabled');
                })
            });
    
            modal_tipInput.addEventListener('keyup', e => {
                let value = e.target.value;
                if (isNaN(value) || value === ' ' || value === '') {
                    modal_tipInput.value = '';
                    toCalculate.customTipValue = 0;
                    modal_confirmBtn.classList.add('disabled');
                    toCalculate.customTip = false;
                } else {
                    toCalculate.customTipValue = Number(value);
                    toCalculate.customTip = true;
                    modal_confirmBtn.classList.remove('disabled');
                    
                }
            })
        },
        confirmCustomTip: () => {
            const customTipBtn = document.getElementById('custom-tip-btn');
            const confirmCustomTipBtn = document.getElementById('confirm-tip');
            const tipOptionsBtns = document.querySelectorAll('.tip-option');
            const modal_tipInput = document.getElementById('custom-tip-amount');
            confirmCustomTipBtn.addEventListener('click', () => {
                customTipBtn.classList.add('active');
                customTipBtn.textContent = `Custom Tip ( $${modal_tipInput.value} )`
                modal_tipInput.value = '';
                calculateBill();
                tipOptionsBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
            })
        },
        splitOptions: () => {
            let lis = document.querySelectorAll('#split-container li');
            lis.forEach((li, index) => {
                li.addEventListener('mouseover', () => {
                    for (let i = 0; i < index; i++) {
                        lis[i + 1].classList.add('pending');
                    }
                });
                li.addEventListener('mouseout', () => {
                    for (let i = 0; i < index; i++) {
                        lis[i + 1].classList.remove('pending');
                    }
                })
            })
    
            lis.forEach((li, index) => {
                li.addEventListener('click', () => {
                    toCalculate.split = Number(index + 1);
                    calculateBill();
                    lis.forEach((item) => {
                        item.classList.remove('active');
                    })
                    li.classList.add('active');
                    for (let i = 0; i < index; i++) {
                        lis[i].classList.add('active');
                    }
                })
            })
        },
        // listener for events
        listen: () => {
            application.events.billTotal();
            application.events.tipOptions();
            application.events.customTip();
            application.events.splitOptions();
            application.events.confirmCustomTip();
        }
     }
}





// build 
application.build();
// events
application.events.listen();

