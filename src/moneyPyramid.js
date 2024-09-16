import { v4 as uuidv4 } from "uuid";
const arr = [
    { id: 10, amount: "₹5,00,00,000" },
    { id: 9, amount: "₹1,00,00,000" },
    { id: 8, amount: "₹50,00,000" },
    { id: 7, amount: "₹25,00,000" },
    { id: 6, amount: "₹12,50,000" },
    { id: 5, amount: "₹6,40,000" },
    { id: 4, amount: "₹3,20,000" },
    { id: 3, amount: "₹1,00,000" },
    { id: 2, amount: "₹50,000" },
    { id: 1, amount: "₹25,000" },
];

arr.forEach((item, index) => {
    item.uuid = uuidv4();
});

export { arr };
