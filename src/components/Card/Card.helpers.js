import { getRandomNumber } from "../utils/number";

const images = [
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/01_tray84.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/02_alqgzq.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/03_uyc45h.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/04_httcf5.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626960/cookbook/card_patterns/05_s1bzox.png',
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
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/17_ekvw8l.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/18_heoy4s.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626961/cookbook/card_patterns/19_gue4cq.png',
    'https://res.cloudinary.com/dshl3pgv4/image/upload/v1692626962/cookbook/card_patterns/20_f17caz.png'
]

export const getRandomCardPattern = () => {
    const max = images.length - 1
    const index = getRandomNumber(0, max)
    return images[index]
}
