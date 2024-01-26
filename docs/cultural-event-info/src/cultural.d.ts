declare module "react-dom" {
  interface Root {
    render(children: React.ReactNode): void;
  }

  function createRoot(container: Element | null): Root;
}

export interface ICultural {
  CODENAME: string;
  GUNAME: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
  ORG_NAME: string;
  USE_TRGT: string;
  USE_FEE: string;
  PLAYER: string;
  PROGRAM: string;
  ETC_DESC: string;
  ORG_LINK: string;
  MAIN_IMG: string;
  RGSTDATE: string;
  TICKET: string;
  STRTDATE: Date;
  END_DATE: Date;
  THEMECODE: string;
  LOT: string;
  LAT: string;
  IS_FREE: string;
  HMPG_ADDR: string;
}
export interface ICulturalResponse {
  list_total_count: number;
  row: ICultural[];
}
declare global {
  interface Window {
    Kakao: any;
  }
}
