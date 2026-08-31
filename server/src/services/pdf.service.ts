import puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';

async function generatePdfFromTemplate(templateName: string, data: any): Promise<Uint8Array> {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.ejs`);
  const html: string = (await ejs.renderFile(templatePath, data)) as string;

  const browser = await puppeteer.launch({
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
export async function generateElanContract(
  matchId: string, 
  seniorName: string, 
  juniorName: string, 
  formula: string, 
  date: string,
  seniorSignature?: string | null,
  juniorSignature?: string | null,
  rentAmount: number = 0,
  chargesAmount: number = 0,
  paidServices: string[] = []
): Promise<Uint8Array> {
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
export async function generateCohabilisCharter(
  matchId: string, 
  seniorName: string, 
  juniorName: string, 
  date: string,
  seniorSignature?: string | null,
  juniorSignature?: string | null
): Promise<Uint8Array> {
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
export async function generateRentReceipt(
  matchId: string, 
  juniorName: string, 
  seniorName: string, 
  rentAmount: number, 
  chargesAmount: number, 
  period: string, 
  date: string
): Promise<Uint8Array> {
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
export async function generatePaymentNotice(
  matchId: string, 
  juniorName: string, 
  seniorName: string, 
  rentAmount: number, 
  chargesAmount: number, 
  period: string, 
  date: string
): Promise<Uint8Array> {
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
