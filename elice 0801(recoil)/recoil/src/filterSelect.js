import { atom } from "recoil";

const filterSelect = atom({
    key: 'filterSelect',
    default: {
        'start-date': 1,
        'end-date': 2,
        'weekly-date': 3,
        categories: '',
        subcategories: new Set(),
        seasons: new Set(),
        'serial-number': '',
        limit: 200,
        'deadline-week': 5,
    },
});

export default filterSelect;