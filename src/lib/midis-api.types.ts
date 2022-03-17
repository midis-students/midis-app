export interface IError {
  longmessage: string;
  message: string;
}

export interface APIOK {
  error?: IError;
  ok?: boolean;
}

export interface APIPing {
  vAPI: string;
}

export interface APIUserSchedule {
  error?: IError;
  lastupdate?: number;
  data?: {
    [day: string]: {
      name: string;
      week_1: APIDay[];
      week_2: APIDay[];
      now_day: APIDay;
      next_day: APIDay;
    };
  };
}

export interface APIPar {
  id: number;
  flow: string;
  object: string;
  class: string;
  teacher: string;
  time: {
    start: string;
    end: string;
  };
  danger?: boolean;
}

export interface APIDay {
  name: string;
  pars: APIPar[];
}

export interface APIUserDaily {
  error?: IError;
  lastupdate?: number;
  data?: {
    [object: string]: [
      {
        date: string;
        details: string;
        mark: string;
      },
    ];
  };
}
export interface APIUserAbsence {
  error?: IError;
  lastupdate?: number;
  data?: {
    [object: string]: APIMark[];
  };
}

export interface APIMark {
  date: string;
  mark: string;
  details: string;
  object: string;
}

export interface APIDB {
  error?: IError;
  login?: string;
  authCount?: number;
  profile?: APIUserProfileData;
  tokens?: APIUserToken[];
}

export interface APIAuth {
  token: string;
  error?: IError;
}

export interface APIUsersList {
  group: string;
  login: string;
  name: string;
  pic: string;
}

export interface APIUserProfile {
  error?: IError;
  authCount: number;
  data: APIUserProfileData;
  lastupdate: number;
  tokens: APIUserToken[];
}

export interface APIUserProfileData {
  error?: IError;
  group: string;
  id: number;
  name: string;
  pic: string;
}

export interface APIUserToken {
  error?: IError;
  _: string;
  platform: string;
  vkId: string;
  userAgent: string;
  logintime: number;
}
