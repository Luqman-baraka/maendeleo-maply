
export interface Budget {
  total: number;
  breakdown: {
    category: string;
    amount: number;
  }[];
}

export interface Timeline {
  start: string;
  end: string;
  milestones: {
    date: string;
    description: string;
  }[];
}

export interface Update {
  date: string;
  description: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  location: {
    city: string;
    county: string;
  };
  sector: string;
  scope: string;
  budget: Budget;
  timeline: Timeline;
  progress: number;
  updates: Update[];
  implementingAgency: {
    name: string;
    contact: Contact;
  };
  imageUrl?: string;
}
