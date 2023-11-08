const todayDate = (date) => {
   const targetDate = date || new Date();
   const year = targetDate.getFullYear();
   const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
   const day = String(targetDate.getDate()).padStart(2, '0');
   return `${year}/${month}/${day}`;
}


const textOnly = (value) => {
   return /^[A-Za-z\s]*$/.test(value);
}

const numbersOnly = (value) => {
   return /^\d+$/.test(value);
}

export { todayDate, textOnly, numbersOnly };