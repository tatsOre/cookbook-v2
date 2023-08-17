import { getRandomNumber } from "../utils/number";
// TODO: save patterns 300x300px
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images
}
export const images = importAll(require.context(
    '../../../public/images/patterns', false, /\.(png|jpe?g|svg)$/)
);

export const getRandomCardPattern = () => {
    // divided by two because images has random extra stuff
    const size = Object.keys(images).length / 2
    const src = getRandomNumber(1, size)
    return images[`${src}.png`].default
}

