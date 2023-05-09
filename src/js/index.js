import 'normalize.css';
import { bind } from './nice-select2.js';

// const NewSelect = bind(document.getElementsByClassName("select"), {searchable: true});
    const NewSelect1 = bind(document.getElementById("status-select"), {searchable: true});
    new NewSelect1();

    const NewSelect2 = bind(document.getElementById("species-select"), {searchable: true});
    new NewSelect2();

    const NewSelect3 = bind(document.getElementById("type-select"), {searchable: true});
    new NewSelect3();

    const NewSelect4 = bind(document.getElementById("gender-select"), {searchable: true});
    new NewSelect4();


