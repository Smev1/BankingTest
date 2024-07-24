const loginForm = document.getElementById('login-form');
const dashboardContainer = document.getElementById('dashboard-container');
const transferButton = document.getElementById('transfer-button');
const transactionsButton = document.getElementById('transactions-button');
const transferForm = document.getElementById('transfer-form');
const transactionsList = document.getElementById('transactions-list');

const SPREADSHEET_ID = '1fAPCoNpNh3SVwwItXrQQ-KZJunEjxVrwLFvqo4M_KvY';
const API_KEY = 'AIzaSyCTLv7w6jZyjA9W6U4zhi16i7UB2rDyksU';

// Authenticate with Google Sheets API
async function authenticate() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?ranges=Sheet1!A1:D100&key=${API_KEY}`);
    const data = await response.json();
    return data.valueRanges[0].values;
}

// Login functionality
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = await authenticate();
    const user = data.find((row) => row[0] === username && row[1] === password);
    if (user) {
        dashboardContainer.style.display = 'block';
        loginForm.style.display = 'none';
        document.getElementById('balance').textContent = `Balance: ${user[2]}`;
       