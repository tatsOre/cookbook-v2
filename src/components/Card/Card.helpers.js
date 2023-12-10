import { getRandomNumber } from "@/utils/number";

const images = [
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/01_tray84.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/02_alqgzq.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/03_uyc45h.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/04_httcf5.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691697/cookbook/card_patterns/05_bkmw3o.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/06_do6ni9.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/07_o1xxmv.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/08_ersbja.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/09_dldynk.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/10_cb4skj.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/11_nzycaz.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/12_qbf5pa.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/13_xblxd5.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/14_w6o6r3.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626962/cookbook/card_patterns/15_ahhjrs.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/16_eamnlf.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690878/cookbook/card_patterns/17_1_jrbg76.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690878/cookbook/card_patterns/18_1_adtigr.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/19_gue4cq.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690095/cookbook/card_patterns/20_1_yhpet8.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690095/cookbook/card_patterns/21_1_mtlrsk.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690095/cookbook/card_patterns/22_1_daglax.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690348/cookbook/card_patterns/23_1_bk3bm3.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690349/cookbook/card_patterns/24_1_f3j5uu.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690349/cookbook/card_patterns/25_1_skul05.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695690349/cookbook/card_patterns/26_1_axwz30.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691751/cookbook/card_patterns/27_1_dcu6u6.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691763/cookbook/card_patterns/28_1_ltfjpr.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691764/cookbook/card_patterns/29_1_elbwih.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691765/cookbook/card_patterns/30_1_nnrmzt.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691765/cookbook/card_patterns/31_1_nnk2kl.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691767/cookbook/card_patterns/32_1_i2vdgh.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691766/cookbook/card_patterns/33_1_r8fuk7.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691767/cookbook/card_patterns/34_1_lszr7p.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691768/cookbook/card_patterns/35_1_ijhiv1.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695691769/cookbook/card_patterns/36_1_yndhm2.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695692246/cookbook/card_patterns/38_1_amq61r.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695692247/cookbook/card_patterns/39_1_zzyvf2.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695692247/cookbook/card_patterns/40_1_gzgxtl.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1695692248/cookbook/card_patterns/41_1_vwyrem.png'
]

export const getRandomCardPattern = () => {
    const max = images.length - 1
    const index = getRandomNumber(0, max)
    return images[index]
}
