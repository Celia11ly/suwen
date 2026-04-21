export type TimePeriod = 'Q1' | '4月份' | '5月份' | '6月份' | '7月份';

export interface ReportItem {
  title: string;
  content: string;
  period?: TimePeriod | TimePeriod[]; // Which period this applies to
  type?: 'milestone' | 'action' | 'highlight' | 'goal' | 'normal';
  links?: { label: string; url: string }[];
  tags?: string[];
  imageUrl?: string;
  images?: string[];
}

export interface SectionData {
  id: string;
  title: string;
  description?: string;
  items: ReportItem[];
  layout: 'grid' | 'timeline' | 'full' | 'flex' | 'typography' | 'interactive-list' | 'interactive-stack' | 'diagram' | 'business-loop' | 'interactive-split' | 'horizontal-gallery';
  sideImage?: string;
}

export const TIMELINE: TimePeriod[] = ['Q1', '4月份', '5月份', '6月份', '7月份'];
