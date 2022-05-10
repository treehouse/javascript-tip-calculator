// basic data for calculator
const calculatorData = {
    randomThemeOnLoad: true,
    defaultTotal: 0.00,
    defaultTippingOptions: [5, 10, 15],
    customTip: true,
    totalSplit: 6
}


// theme logic
if (calculatorData.randomThemeOnLoad) {
    const colors = ['#87C0D0', '#8FBDBA', '#B38EAE', '#A3BE8C'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.setProperty('--main-theme', colors[randomIndex]);
}


