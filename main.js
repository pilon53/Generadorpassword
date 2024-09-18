document.addEventListener('DOMContentLoaded', function() {
    const lengthEl = document.getElementById('length');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateEl = document.getElementById('generate');
    const clearEl = document.getElementById('clear');
    const passwordEl = document.getElementById('password');
    const copyEl = document.getElementById('copy');
    const strengthMeterEl = document.querySelector('.strength-meter-fill');

    function generatePassword() {
        const length = +lengthEl.value;
        const hasUpper = uppercaseEl.checked;
        const hasLower = lowercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+{}[]|:;<>,.?/~';

        let chars = '';
        if (hasUpper) chars += upperLetters;
        if (hasLower) chars += lowerLetters;
        if (hasNumber) chars += numbers;
        if (hasSymbol) chars += symbols;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        passwordEl.value = password;
        updateStrengthMeter(password);
    }

    function updateStrengthMeter(password) {
        const strength = calculatePasswordStrength(password);
        strengthMeterEl.style.width = `${strength}%`;
        if (strength < 33) {
            strengthMeterEl.style.backgroundColor = '#ff4d4d';
        } else if (strength < 66) {
            strengthMeterEl.style.backgroundColor = '#ffd633';
        } else {
            strengthMeterEl.style.backgroundColor = '#4CAF50';
        }
    }

    function calculatePasswordStrength(password) {
        let score = 0;
        if (password.length > 0) {
            score += Math.min(6, password.length / 3) * 10;
            if (/[A-Z]/.test(password)) score += 10;
            if (/[a-z]/.test(password)) score += 10;
            if (/[0-9]/.test(password)) score += 10;
            if (/[^A-Za-z0-9]/.test(password)) score += 10;
        }
        return Math.min(100, score);
    }

    function clearPassword() {
        passwordEl.value = '';
        lengthEl.value = '12';
        uppercaseEl.checked = true;
        lowercaseEl.checked = true;
        numbersEl.checked = true;
        symbolsEl.checked = true;
        strengthMeterEl.style.width = '0';
    }

    function copyToClipboard() {
        passwordEl.select();
        document.execCommand('copy');
        alert('¡Contraseña copiada al portapapeles!');
    }

    generateEl.addEventListener('click', generatePassword);
    clearEl.addEventListener('click', clearPassword);
    copyEl.addEventListener('click', copyToClipboard);
});