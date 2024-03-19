const todayDate = (date) => {
   const targetDate = date || new Date();
   const year = targetDate.getFullYear();
   const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
   const day = String(targetDate.getDate()).padStart(2, '0');
   const hours = String(targetDate.getHours()).padStart(2, '0');
   const minutes = String(targetDate.getMinutes()).padStart(2, '0');
   const seconds = String(targetDate.getSeconds()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}

const addDays = (date, days) => {
   const result = new Date(date);
   result.setDate(result.getDate() - days);
   return result;
}

const textOnly = (value) => {
   return /^[A-Za-z\s]*$/.test(value);
}

const numbersOnly = (value) => {
   return /^\d+$/.test(value);
}

export { todayDate, textOnly, numbersOnly, addDays };