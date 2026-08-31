import nodemailer from 'nodemailer';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isInitialized = false;

  private async init() {
    if (this.isInitialized) return;

    try {
      // Configuration pour Ethereal (Dev/Mock)
      const testAccount = await nodemailer.createTestAccount();
      
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      this.isInitialized = true;
      console.log('Ethereal Email Service initialisé');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Nodemailer:', error);
    }
  }

  public async sendEmail({ to, subject, html }: EmailPayload): Promise<void> {
    if (!this.isInitialized) await this.init();

    if (!this.transporter) {
      console.error("Transporter non initialisé.");
      return;
    }

    try {
      const info = await this.transporter.sendMail({
        from: '"Equipe COAB" <no-reply@coab.fr>',
        to,
        subject,
        html,
      });

      console.log("Message sent: %s", info.messageId);
      // Lien pour prévisualiser l'email sur Ethereal
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  }
}

export const emailService = new EmailService();
