export interface IImageMetadata {
  file: string;
  description: string;
  subject: string;
  tags: IImageTag[];
}

export interface IImageTag {
  object: string;
  confidence: number;
}