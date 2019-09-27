import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ICbtEntry, ICbtData, ICbtStreak } from '../interfaces/interfaces';

@Injectable()
export class HelperService {
    constructor(private afAuth: AngularFireAuth, private aFirestoreDb: AngularFirestore) { }
    public CryptoJS = require("crypto-js");

    public testHelper() {
        console.log('helper working?', this.afAuth.auth.currentUser);
        // let dbM = this.aFdatabase.list('/streak/' + `${this.afAuth.auth.currentUser.uid}`);
        // dbM.valueChanges().subscribe((data) => {
        //     console.log('helper working???', data);
        // });
        const collection = this.aFirestoreDb.collection('streak');
        collection.doc('te2b23fEcsMtGR48lt5RklD7bAB3').collection('19').valueChanges().subscribe((o) => {
            console.log('is it thoughhhh?', o);

        });

    }

    public async getUserName(uid: string): Promise<string | any> {
        let userName: string;
        const collection = this.aFirestoreDb.collection('users');
        return new Promise((resolve) => {
            collection.doc(uid).valueChanges().subscribe((o) => {
                if (o) {
                    userName = (o as any).userName as string;
                    return resolve(userName);
                }
            });
        });
    }

    public async getUserTotal(uid: string): Promise<ICbtData | any> {
        let userTotal: ICbtData;
        const collection = this.aFirestoreDb.collection('total');
        return new Promise((resolve, reject) => {
            collection.doc(uid).valueChanges().subscribe((o) => {
                if (o) {
                    userTotal = o as ICbtData;
                    return resolve(userTotal);
                } else {
                    return reject(null);
                }
            });
        });
    }

    public async addNewEntry(uid: string, entry: ICbtEntry, date: string): Promise<void> {
        // Encrypt
        var ciphertext = this.CryptoJS.AES.encrypt(JSON.stringify(entry), uid);

        const dateEntry = { [date]: ciphertext.toString() }
        const collection = this.aFirestoreDb.collection('cbtDay');
        return new Promise((resolve) => {
            collection.doc(uid).set(dateEntry, { merge: true }).then((ret) => {
                return resolve();
            });
        });
    }

    public async getUserDayData(uid: string, date: string): Promise<ICbtEntry | any> {
        let value: number;
        const collection = this.aFirestoreDb.collection('cbtDay');
        return new Promise((resolve, reject) => {
            collection.doc(uid).valueChanges().subscribe((o) => {
                if (o[date]) {
                    value = o[date];
                    var bytes = this.CryptoJS.AES.decrypt(value.toString(), uid);
                    var decryptedData = JSON.parse(bytes.toString(this.CryptoJS.enc.Utf8));
                    return resolve(decryptedData);
                } else {
                    return reject(null);
                }
            });
        });
    }

    public async getUserMonthData(uid: string, date: string): Promise<ICbtData | any> {
        let monthData: ICbtData;
        const collection = this.aFirestoreDb.collection('cbtMonth');
        return new Promise((resolve) => {
            collection.doc(uid).collection(date).doc(date).valueChanges().subscribe((o) => {
                if (o) {
                    monthData = o as ICbtData;
                    return resolve(monthData);
                } else {
                    return resolve(null);
                }
            });
        });
    }

    public async getUserYearData(uid: string, year: number): Promise<ICbtData | any> {
        let yearData: ICbtData;
        const collection = this.aFirestoreDb.collection('cbtYear');
        return new Promise((resolve, reject) => {
            collection.doc(uid).collection(`${year}`).doc(`${year}`).valueChanges().subscribe((o) => {
                if (o) {
                    yearData = o as ICbtData;
                    return resolve(yearData);
                } else {
                    return reject(null);
                }
            });
        });
    }

    public async getUserStreak(uid: string): Promise<any> {
        let streak: ICbtStreak = { count: 0, average: 0, total: 0, lastDate: 's' };
        const collection = await this.aFirestoreDb.collection('streak');
        return new Promise((resolve, reject) => {
            collection.doc(uid).valueChanges().subscribe((o) => {
                if (o) {
                    streak = o as ICbtStreak;
                    return resolve(streak);
                } else {
                    return reject(null);
                }
            });
        });
    }

    public async setUserStreak(uid: string, streak: ICbtStreak): Promise<void> {
        const collection = this.aFirestoreDb.collection('streak');
        await collection.doc(uid).set(streak).then(ret => {
            console.log('did it work', ret)
        })
    }

}