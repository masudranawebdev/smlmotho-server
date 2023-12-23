"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugToTitle = exports.generateSlugSpace = exports.createSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
function createSlug(text) {
    let slug = text.replace(/[^\w\u0980-\u09FF]+/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');
    slug = slug.toLowerCase();
    return slug;
}
exports.createSlug = createSlug;
const generateSlugSpace = (title) => {
    return (0, slugify_1.default)(title, {
        lower: false,
        remove: /[*+~.()'"!:@]/g,
        replacement: ' ',
    });
};
exports.generateSlugSpace = generateSlugSpace;
const slugToTitle = (slug) => {
    return `${slug.toLowerCase().replace(/-/g, ' ').replace(/-+/g, '-')}`;
};
exports.slugToTitle = slugToTitle;
