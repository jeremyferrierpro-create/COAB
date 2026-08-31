/**
 * Génère un contrat Loi ELAN
 */
export declare function generateElanContract(matchId: string, seniorName: string, juniorName: string, formula: string, date: string, seniorSignature?: string | null, juniorSignature?: string | null, rentAmount?: number, chargesAmount?: number, paidServices?: string[]): Promise<Uint8Array>;
/**
 * Génère la Charte Cohabilis
 */
export declare function generateCohabilisCharter(matchId: string, seniorName: string, juniorName: string, date: string, seniorSignature?: string | null, juniorSignature?: string | null): Promise<Uint8Array>;
/**
 * Génère une quittance de loyer (Format Facture/Quittance)
 */
export declare function generateRentReceipt(matchId: string, juniorName: string, seniorName: string, rentAmount: number, chargesAmount: number, period: string, date: string): Promise<Uint8Array>;
/**
 * Génère un avis de paiement
 */
export declare function generatePaymentNotice(matchId: string, juniorName: string, seniorName: string, rentAmount: number, chargesAmount: number, period: string, date: string): Promise<Uint8Array>;
//# sourceMappingURL=pdf.service.d.ts.map