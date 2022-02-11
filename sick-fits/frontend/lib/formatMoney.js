export default function formatMoney(cents = 0) {
  const options = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  };

  // check if its a full amount
  if (cents % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(cents / 100);
}
