export enum InquiryCategory {
  SERVICE_QUESTION = 'SERVICE_QUESTION',
  FEEDBACK = 'FEEDBACK',
  DEFAULT = 'DEFAULT',
}

export interface InquiryInput {
  content: string;
  userEmail: string;
  category: InquiryCategory;
}
