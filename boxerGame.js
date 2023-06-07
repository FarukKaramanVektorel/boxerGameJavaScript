class Boksor {
    constructor(ad, guc, saglik, siklet, kacinmaOrani) {
        this.ad = ad;
        this.guc = guc;
        this.saglik = saglik;
        this.siklet = siklet;
        this.kacinmaOrani = kacinmaOrani;
    }

    hit(rakip) {
        console.log("------------");
        console.log(this.ad + " => " + rakip.ad + " " + this.guc + " hasar vurdu.");
        if (this.kacinma()) {
            console.log(rakip.ad + " gelen hasarı savurdu.");
            return rakip.saglik;
        }
        if (rakip.saglik - this.guc < 0) {
            return 0;
        }
        return rakip.saglik - this.guc;
    }

    kacinma() {
        let rastgeleDeger = Math.random() * 100; // 0.0 to 99.9
        return rastgeleDeger <= this.kacinmaOrani;
    }
}
class Musabaka {
    constructor(boksor1, boksor2, minSiklet, maxSiklet) {
        this.boksor1 = boksor1;
        this.boksor2 = boksor2;
        this.minSiklet = minSiklet;
        this.maxSiklet = maxSiklet;
    }

    roundBasla() {
        let raund = 1;
        if (this.sikletKontrolEt()) {
            while (this.boksor1.saglik > 0 && this.boksor2.saglik > 0) {
                if (this.roundKontrol(raund)) {
                    break;
                }
                console.log("======== " + raund + ". ROUND ===========");
                this.boksor2.saglik = this.boksor1.hit(this.boksor2);
                if (this.kazanan()) {
                    break;
                }
                this.boksor1.saglik = this.boksor2.hit(this.boksor1);
                if (this.kazanan()) {
                    break;
                }
                this.spiker();
                raund++;
            }
        } else {
            console.log("Sporcuların ağırlıkları uyuşmuyor.");
        }
    }

    sikletKontrolEt() {
        return (this.boksor1.siklet >= this.minSiklet && this.boksor1.siklet <= this.maxSiklet) &&
            (this.boksor2.siklet >= this.minSiklet && this.boksor2.siklet <= this.maxSiklet);
    }

    kazanan() {
        if (this.boksor1.saglik === 0) {
            console.log("Maçı Kazanan: " + this.boksor2.ad);
            return true;
        } else if (this.boksor2.saglik === 0) {
            console.log("Maçı Kazanan: " + this.boksor2.ad);
            return true;
        }
        return false;
    }

    roundKontrol(raund) {
        if (raund === 6) {
            console.log("Toplamda oynanan round: " + raund);
            if (this.boksor1.saglik < this.boksor2.saglik) {
                console.log("Maçı Kazanan: " + this.boksor2.ad);
                return true;
            } else if (this.boksor2.saglik < this.boksor1.saglik) {
                console.log("Maçı Kazanan: " + this.boksor1.ad);
                return true;
            } else {
                console.log("Maç Berabere Bitti");
                return true;
            }
        }
        return false;
    }

    spiker() {
        console.log("------------");
        console.log(this.boksor1.ad + " Kalan Can: " + this.boksor1.saglik);
        console.log(this.boksor2.ad + " Kalan Can: " + this.boksor2.saglik);
    }
}


const ahmet = new Boksor("Ahmet", 15, 100, 90, 60);
const ali = new Boksor("Ali", 10, 85, 90, 50);
const mac = new Musabaka(ahmet, ali, 90, 100);
mac.roundBasla();
