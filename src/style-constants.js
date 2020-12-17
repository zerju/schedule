export const button = (addedClasses = '') => `rounded border mr-2 p-2 pt-1 pb-1 capitalize ${addedClasses}`;
export const whiteButtonStyle = (addedClasses = '') => `${button()} bg-white hover:bg-gray-200 ${addedClasses}`;
export const redBorderButtonStyle = (addedClasses = '') =>
  `${button()} bg-white border-red-400 hover:bg-red-100 text-red-600 ${addedClasses}`;
