import slugify from 'slugify';

export function createSlug(text: string): string {
  let slug = text.replace(/[^\w\u0980-\u09FF]+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');
  slug = slug.toLowerCase();
  return slug;
}

export const generateSlugSpace = (title: string): string => {
  return slugify(title, {
    lower: false,
    remove: /[*+~.()'"!:@]/g,
    replacement: ' ',
  });
};

export const slugToTitle = (slug: string): string => {
  return `${slug.toLowerCase().replace(/-/g, ' ').replace(/-+/g, '-')}`;
};
