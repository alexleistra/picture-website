export interface IImageMetadata {
  file: string;
  description: string;
  subject: string;
  tags: IImageTag[];
  processed: string;
}

export interface IImageTag {
  object: string;
  confidence: number;
}