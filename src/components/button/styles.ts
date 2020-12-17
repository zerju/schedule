
export const button = (type: 'normal' | 'circle' | 'big' | 'small'): string => {
  switch(type){
    case 'normal':
      return 'rounded border mr-2 p-2 pt-1 pb-1 capitalize';
    case 'circle':
      return 'rounded-full border mr-2 p-1 pl-3 pr-3 capitalize';
    default:
      return 'rounded border mr-2 p-2 pt-1 pb-1 capitalize';
  }
};
export const whiteButtonStyle = (addedClasses = '', type: 'normal' | 'circle' | 'big' | 'small') => `${button(type)} bg-white hover:bg-gray-200 ${addedClasses}`;
export const redBorderButtonStyle = (addedClasses = '', type: 'normal' | 'circle' | 'big' | 'small') =>
  `${button(type)} bg-white border-red-400 hover:bg-red-100 text-red-600 ${addedClasses}`;
export const greenBorderButtonStyle = (addedClasses = '', type: 'normal' | 'circle' | 'big' | 'small') =>
  `${button(type)} bg-white border-green-400 hover:bg-green-100 text-green-600 ${addedClasses}`;
export const blueBorderButtonStyle = (addedClasses = '', type: 'normal' | 'circle' | 'big' | 'small') =>
  `${button(type)} bg-white border-blue-400 hover:bg-blue-100 text-blue-600 ${addedClasses}`;