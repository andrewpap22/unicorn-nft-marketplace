/**
 *
 * Utility function to generate a unique blockchain ID
 * An example of a blockchain ID is:
 * 0x8abf5b2dca9e81c2bfb18b0303e53a8013383a3d
 *
 * We will shorten it though to look like:
 * 0x8ab...3a3d
 *
 * @param {*} length - the length of the ID
 */
export const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
