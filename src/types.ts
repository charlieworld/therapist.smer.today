export interface Resource {
  name: string;
  gender: string;
  title: string;
  region: string;
  regions: string[];
  is_remote: boolean;
  agency: string;
  booking: string;
  topics: string[];
  notes: string;
}

export interface ResourceData {
  updated_at: string;
  source: string;
  count: number;
  resources: Resource[];
}
