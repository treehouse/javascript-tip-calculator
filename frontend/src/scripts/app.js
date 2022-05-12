// basic data for calculator
const calculatorData = {
    randomThemeOnLoad: false,
    defaultTotal: {
        showDefaultTotal: true,
        total: 0.00,
    },
    defaultTippingOptions: [5, 10, 15],
    customTip: true,
    defaultSplitTotal: 6
}

const toCalculate = {
    bill: 0,
    tip: 5,
    split: 1,
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
        },
        update: () => {
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
                let percent = '%';
                span.textContent = option
                btn.appendChild(span);
                btn.textContent += percent;
                tipOptions.UI.tipOptionBtnContianer.appendChild(btn);
            });
            // set default active tip
            let tipOptionBtns = document.querySelectorAll('.tip-option');
            tipOptionBtns[0].classList.add('active');
        },
        update: () => {
            
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
        },
        update: () => {

        }
    }
}


const application = {
    build: () => {
        billTotal.UI.build();
        tipOptions.UI.build();
        splitOptions.UI.build();
    },
    update: () => {
        billTotal.UI.update();
        tipOptions.UI.update();
        splitOptions.UI.update();
    }
}

// build 
application.build();
application.update();

