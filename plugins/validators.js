export default function validatePhone (value) {
    let mobileRegx = /^\+94[0-9]{9}$/;
    return mobileRegx.test(value);
}
