"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateElanContract = generateElanContract;
exports.generateCohabilisCharter = generateCohabilisCharter;
exports.generateRentReceipt = generateRentReceipt;
exports.generatePaymentNotice = generatePaymentNotice;
const puppeteer_1 = __importDefault(require("puppeteer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
async function generatePdfFromTemplate(templateName, data) {
    const templatePath = path_1.default.join(__dirname, '..', 'templates', `${templateName}.ejs`);
    const html = (await ejs_1.default.renderFile(templatePath, data));
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            bottom: '20px',
            left: '20px',
            right: '20px'
        }
    });
    await browser.close();
    return new Uint8Array(pdfBuffer);
}
/**
 * Génère un contrat Loi ELAN
 */
async function generateElanContract(matchId, seniorName, juniorName, formula, date, seniorSignature, juniorSignature, rentAmount = 0, chargesAmount = 0, paidServices = []) {
    const data = {
        matchId,
        seniorName,
        juniorName,
        formula,
        date,
        rentAmount,
        chargesAmount,
        paidServices,
        seniorSignature,
        juniorSignature
    };
    return generatePdfFromTemplate('contract-elan', data);
}
/**
 * Génère la Charte Cohabilis
 */
async function generateCohabilisCharter(matchId, seniorName, juniorName, date, seniorSignature, juniorSignature) {
    const data = {
        matchId,
        seniorName,
        juniorName,
        date,
        seniorSignature,
        juniorSignature
    };
    return generatePdfFromTemplate('charter', data);
}
/**
 * Génère une quittance de loyer (Format Facture/Quittance)
 */
async function generateRentReceipt(matchId, juniorName, seniorName, rentAmount, chargesAmount, period, date) {
    const data = {
        matchId,
        juniorName,
        seniorName,
        juniorAddress: 'Adresse du locataire',
        seniorAddress: 'Adresse du bailleur',
        rentAmount,
        chargesAmount,
        totalAmount: rentAmount + chargesAmount,
        paidServices: [],
        period,
        date,
        seniorSignature: null,
        juniorSignature: null
    };
    return generatePdfFromTemplate('receipt', data);
}
/**
 * Génère un avis de paiement
 */
async function generatePaymentNotice(matchId, juniorName, seniorName, rentAmount, chargesAmount, period, date) {
    const data = {
        matchId,
        juniorName,
        seniorName,
        rentAmount,
        chargesAmount,
        totalAmount: rentAmount + chargesAmount,
        paidServices: [],
        period,
        date
    };
    return generatePdfFromTemplate('notice', data);
}
//# sourceMappingURL=pdf.service.js.map