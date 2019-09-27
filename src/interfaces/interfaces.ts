export interface ICbtEntry {
    timeStamp: string,
    q1: string,
    q2: string,
    q3: string,
    q4: string,
    q5: string,
    a1: number,
    a2: string,
    a3: string,
    a4: string,
    a5: string
}

export interface ICbtData {
    average: number,
    count: number,
    total: number
    days? : number[];
}

export interface ICbtStreak extends ICbtData {
    lastDate: string
}