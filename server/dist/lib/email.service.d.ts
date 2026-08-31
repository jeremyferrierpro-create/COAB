interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}
declare class EmailService {
    private transporter;
    private isInitialized;
    private init;
    sendEmail({ to, subject, html }: EmailPayload): Promise<void>;
}
export declare const emailService: EmailService;
export {};
//# sourceMappingURL=email.service.d.ts.map